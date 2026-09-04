/* IP 地址查询工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const runBtn = $('#ip-run'), statusEl = $('#ip-status');
const v4El = $('#ip-v4'), v6El = $('#ip-v6'), geoEl = $('#ip-geo');

const fmtGeo = (o) => {
  if (!o || o.error) return '未获取到归属地信息';
  const parts = [o.country_name, o.region, o.city, o.org, o.timezone ? `时区 ${o.timezone}` : ''].filter(Boolean);
  return parts.join(' · ') || '未获取到归属地信息';
};

const fetchJson = async (url, timeout = 8000) => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) throw new Error(String(r.status));
    return await r.json();
  } finally {
    clearTimeout(t);
  }
};

runBtn.addEventListener('click', async () => {
  runBtn.disabled = true;
  runBtn.textContent = '查询中…';
  statusEl.textContent = '';
  const t0 = performance.now();
  try {
    // IPv4（ipify 全球节点，CORS 开放）
    try {
      const d = await fetchJson('https://api.ipify.org?format=json');
      if (d.ip) v4El.textContent = d.ip;
    } catch { v4El.textContent = '查询失败'; }

    // IPv6（同一服务商）
    try {
      const d = await fetchJson('https://api64.ipify.org?format=json');
      if (d.ip) v6El.textContent = d.ip;
    } catch { v6El.textContent = '不可用'; }

    // 归属地（ipapi.co，限流 30 次/分）
    try {
      const geo = await fetchJson('https://ipapi.co/json/');
      geoEl.textContent = fmtGeo(geo);
    } catch {
      geoEl.textContent = '归属地服务不可用（网络受限或已限流）';
    }

    statusEl.textContent = `耗时 ${Math.round(performance.now() - t0)}ms`;
  } finally {
    runBtn.disabled = false;
    runBtn.textContent = '查询我的 IP';
  }
});
