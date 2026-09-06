/* 共享运行时：多输入计算 → 输出
   配置在页面 <script type="application/json" id="c-cfg">：
   { lib, fn, unit }  算法函数位于 lib/<lib>.js，签名 fn(values: string[]) → string | [{name,value}]
   注意：ES Module 顶层不允许 return，整个逻辑包在 main() 中 */

const $ = (s) => document.querySelector(s);
const cfgEl = $('#c-cfg');
if (cfgEl) main();

function main() {
  const { toast, copyText, escapeHtml } = window.DT;
  const cfg = JSON.parse(cfgEl.textContent);

  const inputs = [...document.querySelectorAll('.calc-form input, .calc-form select, .calc-form textarea')];
  const runBtn = $('#c-run');
  const outEl = $('#c-out');

  /* 日期类控件为空时填当前时间，打开页面即有所见即所得 */
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const localDT = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const localDate = localDT.slice(0, 10);
  inputs.forEach((el) => {
    if (!el.value && (el.type === 'date' || el.type === 'datetime-local' || el.type === 'time')) {
      el.value = el.type === 'date' ? localDate : el.type === 'time' ? localDT.slice(11) : localDT;
    }
  });

  function render(result) {
    const rows = Array.isArray(result)
      ? (result.length && typeof result[0] === 'object' ? result : result.map((v, i) => ({ name: '结果 ' + (i + 1), value: v })))
      : [{ name: '结果', value: String(result) }];
    if (!rows.length || rows.every((r) => String(r.value ?? '') === '')) {
      outEl.innerHTML = '<div class="out-empty">无匹配结果——请检查输入内容或调整参数</div>';
      return;
    }
    outEl.innerHTML = rows.map((r, i) => `<div class="out-row">
      <span class="out-name">${escapeHtml(r.name)}</span>
      <code class="out-val">${escapeHtml(String(r.value))}</code>
      <button type="button" class="btn btn-ghost btn-sm" data-row="${i}" aria-label="复制 ${escapeHtml(r.name)}">复制</button>
    </div>`).join('');
    outEl.querySelectorAll('[data-row]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const value = rows[Number(btn.dataset.row)].value;
        copyText(String(value)).then((ok) => toast(ok ? '已复制' : '复制失败'));
      });
    });
  }

  async function run() {
    const values = inputs.map((el) => el.value.trim());
    if (values.some((v) => v === '' && !cfg.allowEmpty)) return toast('请填写所有输入项');
    try {
      const mod = await import(`../lib/${cfg.lib}.js`);
      const fn = mod[cfg.fn];
      if (typeof fn !== 'function') throw new Error(`函数 ${cfg.fn} 不存在`);
      const result = await fn(values);
      render(result);
    } catch (e) {
      toast('计算出错：' + e.message);
    }
  }

  if (runBtn) runBtn.addEventListener('click', run);
  inputs.forEach((el) => {
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });
    if (el.tagName === 'SELECT') el.addEventListener('change', run);
  });

  /* 打开页面时若全部输入已有默认值（或允许留空），直接算一次（所见即所得） */
  if (inputs.length && (cfg.allowEmpty || inputs.every((el) => el.value.trim() !== ''))) run();
}
