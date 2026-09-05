/* D-Tool 在线 API 工具共享运行时
   页面 <script type="application/json" id="api-cfg"> 配置 { type, ... }
   支持类型：myip / weather / exchange / hitokoto / dadjoke / randomuser / nameage / pwned / dog / country
   统一提供：加载态、错误处理、超时、结果渲染（行式 / 图片） */

const $ = (s) => document.querySelector(s);
const cfgEl = $('#api-cfg');
if (cfgEl) main();

function main() {
  const { toast, copyText, escapeHtml } = window.DT;
  const cfg = JSON.parse(cfgEl.textContent);
  const type = cfg.type;
  const outEl = $('#api-out');
  const runBtn = $('#api-run');

  /* 带超时的 fetch 封装 */
  async function fetchJSON(url, options = {}, timeoutMs = 20000) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      clearTimeout(timer);
      if (e.name === 'AbortError') throw new Error('请求超时，请稍后重试');
      throw e;
    }
  }

  /* 在输出末尾追加 API 来源信息（服务商 + 完整请求地址） */
  function renderSource() {
    const src = cfg.source || cfg.url;
    if (!src) return '';
    const provider = cfg.provider || '免费公共 API';
    const url = cfg.url ? `${cfg.url}${cfg.url.includes('?') ? '&' : '?'}_t=${Date.now()}` : '';
    return `<div class="api-source">
      <div class="api-source-name">由 <b>${escapeHtml(provider)}</b> 提供 API 服务</div>
      ${url ? `<div class="api-source-url"><code>${escapeHtml(url)}</code><button type="button" class="btn btn-ghost btn-sm" id="api-copy-src">复制</button></div>` : ''}
    </div>`;
  }

  function renderError(msg) {
    outEl.innerHTML = `<div class="api-error">⚠️ ${escapeHtml(msg)}</div>
      <div class="api-hint">网络请求失败？本工具依赖免费公共 API，接口可能临时不可用，请稍后重试。</div>${renderSource()}`;
    bindCopySrc();
  }

  function bindCopySrc() {
    const btn = $('#api-copy-src');
    if (btn) btn.addEventListener('click', () => {
      const code = btn.parentElement?.querySelector('code');
      if (code) copyText(code.textContent).then((ok) => toast(ok ? '已复制 API 地址' : '复制失败'));
    });
  }

  function renderRows(rows) {
    if (!rows || !rows.length) { outEl.innerHTML = '<div class="empty">没有数据</div>' + renderSource(); return; }
    outEl.innerHTML = rows.map((r, i) => `<div class="out-row">
      <span class="out-name">${escapeHtml(r.name)}</span>
      <code class="out-val">${escapeHtml(String(r.value))}</code>
      <button type="button" class="btn btn-ghost btn-sm" data-row="${i}" aria-label="复制 ${escapeHtml(r.name)}">复制</button>
    </div>`).join('') + renderSource();
    outEl.querySelectorAll('[data-row]').forEach((btn) => {
      btn.addEventListener('click', () => {
        copyText(String(rows[Number(btn.dataset.row)].value)).then((ok) => toast(ok ? '已复制' : '复制失败'));
      });
    });
    bindCopySrc();
  }

  function renderImage(src, alt) {
    outEl.innerHTML = `<div class="api-image-wrap"><img class="api-image" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy"></div>
      <div class="api-reload"><button class="btn btn-ghost btn-sm" id="api-again">换一张</button></div>${renderSource()}`;
    const again = $('#api-again');
    if (again && runBtn) again.addEventListener('click', () => run());
    bindCopySrc();
  }

  function loading() {
    outEl.innerHTML = '<div class="api-loading"><span class="api-spinner"></span> 请求中…</div>';
  }

  /* ---------- 各类型处理 ---------- */
  const HANDLERS = {
    /* 我的公网 IP 信息（ip-api 免费版仅支持 http，https 需付费） */
    async myip() {
      const d = await fetchJSON('http://ip-api.com/json/?lang=zh-CN');
      if (d.status !== 'success') throw new Error('IP 查询失败');
      return [
        { name: 'IP 地址', value: d.query },
        { name: '国家/地区', value: `${d.country} (${d.countryCode})` },
        { name: '省份/州', value: d.regionName || '—' },
        { name: '城市', value: d.city || '—' },
        { name: '邮编', value: d.zip || '—' },
        { name: '运营商 ISP', value: d.isp || '—' },
        { name: '组织', value: d.org || '—' },
        { name: '时区', value: d.timezone || '—' },
        { name: '经纬度', value: `${d.lat}, ${d.lon}` },
        { name: 'AS 号', value: d.as || '—' },
      ];
    },
    /* 天气：城市名 → 地理编码 → 7 天预报 */
    async weather() {
      const city = ($('#api-city')?.value || '').trim();
      if (!city) throw new Error('请输入城市名');
      const geo = await fetchJSON(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh`);
      if (!geo.results || !geo.results.length) throw new Error(`未找到城市：${city}`);
      const loc = geo.results[0];
      const w = await fetchJSON(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto&forecast_days=7`);
      const code = (c) => WEATHER_CODES[c] || '未知';
      const rows = [
        { name: '城市', value: `${loc.name}${loc.country ? '，' + loc.country : ''}` },
        { name: '当前温度', value: `${w.current.temperature_2m}°C（体感 ${w.current.apparent_temperature}°C）` },
        { name: '天气', value: code(w.current.weather_code) },
        { name: '湿度', value: `${w.current.relative_humidity_2m}%` },
        { name: '风速', value: `${w.current.wind_speed_10m} km/h（风向 ${w.current.wind_direction_10m}°）` },
        { name: '气压', value: `${w.current.pressure_msl} hPa` },
      ];
      rows.push({ name: '未来 7 天', value: w.daily.time.map((t, i) =>
        `${t.slice(5)} ${code(w.daily.weather_code[i])} ${w.daily.temperature_2m_min[i]}~${w.daily.temperature_2m_max[i]}°C`
      ).join(' | ') });
      return rows;
    },
    /* 实时汇率 */
    async exchange() {
      const amount = parseFloat($('#api-amount')?.value || '1');
      const from = ($('#api-from')?.value || 'CNY').toUpperCase();
      const to = ($('#api-to')?.value || 'USD').toUpperCase();
      if (!amount || amount <= 0) throw new Error('请输入有效金额');
      const d = await fetchJSON(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
      const rate = d.rates[to];
      if (rate == null) throw new Error(`不支持 ${from} → ${to} 的汇率`);
      const converted = amount * rate;
      return [
        { name: '汇率', value: `1 ${from} = ${rate} ${to}` },
        { name: '换算结果', value: `${amount} ${from} = ${converted.toFixed(2)} ${to}` },
        { name: '数据日期', value: d.date },
        { name: '说明', value: '汇率来自欧洲央行（frankfurter.dev），仅供参考' },
      ];
    },
    /* 一言 */
    async hitokoto() {
      const d = await fetchJSON('https://v1.hitokoto.cn/?encode=json');
      return [
        { name: '内容', value: d.hitokoto },
        { name: '出处', value: d.from || '—' },
        { name: '作者', value: d.from_who || '—' },
        { name: '类型', value: ({ a: '动画', b: '漫画', c: '游戏', d: '文学', e: '原创', f: '网络', g: '其他', h: '影视', i: '诗词', j: '网易云', k: '哲学', l: '抖机灵' })[d.type] || d.type || '—' },
      ];
    },
    /* 英文冷笑话 */
    async dadjoke() {
      const res = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d = await res.json();
      return [
        { name: 'Joke', value: d.joke },
        { name: '提示', value: '英文冷笑话（Dad Joke），再来一条点击上方按钮' },
      ];
    },
    /* 随机用户 */
    async randomuser() {
      const d = await fetchJSON('https://randomuser.me/api/?results=1&noinfo');
      const u = d.results[0];
      const dob = new Date(u.dob.date);
      const age = u.dob.age;
      return [
        { name: '姓名', value: `${u.name.title} ${u.name.first} ${u.name.last}` },
        { name: '性别', value: u.gender === 'male' ? '男' : '女' },
        { name: '出生日期', value: `${dob.getFullYear()}-${String(dob.getMonth() + 1).padStart(2, '0')}-${String(dob.getDate()).padStart(2, '0')}（${age} 岁）` },
        { name: '邮箱', value: u.email },
        { name: '电话', value: u.phone },
        { name: '地址', value: `${u.location.street.number} ${u.location.street.name}, ${u.location.city}, ${u.location.state}, ${u.location.country}` },
        { name: '邮编', value: u.location.postcode },
        { name: '用户名', value: u.login.username },
        { name: '国籍', value: u.nat },
      ];
    },
    /* 姓名年龄/性别预测（并行请求，单个失败不影响整体） */
    async nameage() {
      const name = ($('#api-name')?.value || '').trim();
      if (!name) throw new Error('请输入英文名');
      const withTimeout = (p, ms) => Promise.race([p, new Promise((r) => setTimeout(() => r(null), ms))]);
      const [age, gender, nat] = await Promise.all([
        withTimeout(fetchJSON(`https://api.agify.io/?name=${encodeURIComponent(name)}`).catch(() => null), 8000),
        withTimeout(fetchJSON(`https://api.genderize.io/?name=${encodeURIComponent(name)}`).catch(() => null), 8000),
        withTimeout(fetchJSON(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`).catch(() => null), 8000),
      ]);
      const rows = [
        { name: '姓名', value: name },
        { name: '预测年龄', value: age && age.age != null ? `${age.age} 岁（样本 ${age.count}）` : '无数据' },
        { name: '预测性别', value: gender && gender.gender ? `${gender.gender === 'male' ? '男' : '女'}（置信度 ${Math.round((gender.probability || 0) * 100)}%）` : '无数据' },
      ];
      if (nat && nat.country && nat.country.length) {
        const top = nat.country.slice(0, 3).map((c) => `${c.country_id} ${Math.round(c.probability * 100)}%`).join('、');
        rows.push({ name: '可能国籍', value: top });
      } else rows.push({ name: '可能国籍', value: '无数据' });
      return rows;
    },
    /* 密码泄露检查（k-anonymity，不发送完整密码） */
    async pwned() {
      const pwd = $('#api-password')?.value || '';
      if (!pwd) throw new Error('请输入要检查的密码');
      const sha = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(pwd));
      const hash = [...new Uint8Array(sha)].map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const match = text.split('\n').find((l) => l.startsWith(suffix));
      const count = match ? parseInt(match.split(':')[1], 10) : 0;
      return [
        { name: '泄露次数', value: count > 0 ? `⚠️ 已泄露 ${count} 次！请立即更换` : '✅ 未发现公开泄露记录' },
        { name: 'SHA-1 前缀', value: prefix + '…' },
        { name: '检查方式', value: 'k-anonymity：仅发送哈希前 5 位，完整密码不出设备' },
        { name: '建议', value: count > 0 ? '请勿在任何地方使用该密码' : '仍需使用强密码并开启双重认证' },
      ];
    },
    /* 随机狗图 */
    async dog() {
      const d = await fetchJSON('https://dog.ceo/api/breeds/image/random');
      if (d.status !== 'success') throw new Error('获取失败');
      const breed = d.message.match(/breeds\/([^/]+)/)?.[1] || 'unknown';
      outEl.dataset.src = d.message;
      renderImage(d.message, `随机狗狗（${breed}）`);
      return null;
    },
    /* 随机图片（直接返回图片流，带防缓存参数） */
    async randomImage() {
      const url = cfg.url;
      if (!url) throw new Error('未配置图片地址');
      const sep = url.includes('?') ? '&' : '?';
      const full = `${url}${sep}_t=${Date.now()}`;
      outEl.dataset.src = full;
      renderImage(full, cfg.alt || '随机图片');
      return null;
    },
    /* 国家信息（本地内置数据，无需网络） */
    async country() {
      const name = ($('#api-country')?.value || '').trim().toLowerCase();
      if (!name) throw new Error('请输入国家名或代码');
      const mod = await import('../lib/data/countries.js');
      const list = mod.COUNTRY_DATA || [];
      const hit = list.find((c) =>
        c[0].toLowerCase() === name || c[1].toLowerCase() === name || c[2].toLowerCase() === name ||
        c[0].toLowerCase().includes(name) || c[1].toLowerCase().includes(name),
      );
      if (!hit) throw new Error(`未收录该国家（当前内置 ${list.length} 个常用国家/地区）`);
      const [cn, en, code, capital, currency, lang, idd, pop, tz] = hit;
      return [
        { name: '国家', value: `${cn}（${en}，${code}）` },
        { name: '首都', value: capital },
        { name: '货币', value: currency },
        { name: '语言', value: lang },
        { name: '国际区号', value: idd },
        { name: '人口', value: `${pop.toLocaleString()} 万（约 ${(pop / 10000).toFixed(2)} 亿）` },
        { name: '时区', value: tz },
        { name: '说明', value: '内置常用国家/地区数据，离线可用' },
      ];
    },
  };

  const WEATHER_CODES = {
    0: '☀️ 晴', 1: '🌤️ 基本晴朗', 2: '⛅ 局部多云', 3: '☁️ 阴',
    45: '🌫️ 雾', 48: '🌫️ 雾凇', 51: '🌦️ 毛毛雨', 53: '🌦️ 小雨', 55: '🌧️ 中雨',
    61: '🌧️ 小雨', 63: '🌧️ 中雨', 65: '🌧️ 大雨', 71: '🌨️ 小雪', 73: '🌨️ 中雪', 75: '❄️ 大雪',
    80: '🌦️ 阵雨', 81: '🌧️ 强阵雨', 82: '⛈️ 暴雨', 95: '⛈️ 雷阵雨', 96: '⛈️ 雷雨伴冰雹', 99: '⛈️ 强雷雨伴冰雹',
  };

  async function run() {
    if (!HANDLERS[type]) { renderError('未知 API 类型'); return; }
    if (runBtn) runBtn.disabled = true;
    loading();
    try {
      const rows = await HANDLERS[type]();
      if (rows) renderRows(rows);
    } catch (e) {
      renderError(e.message || String(e));
    } finally {
      if (runBtn) runBtn.disabled = false;
    }
  }

  if (runBtn) runBtn.addEventListener('click', run);
  /* 回车触发 */
  document.querySelectorAll('#api-out, .api-form input, .api-form select').forEach((el) => {
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });
  });
  /* 自动加载（无需输入的 API） */
  if (type === 'myip' || type === 'hitokoto' || type === 'dadjoke' || type === 'randomuser' || type === 'dog' || type === 'randomImage') run();
}
