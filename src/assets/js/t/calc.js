/* 共享运行时：多输入数字计算 → 输出
   配置在页面 <script type="application/json" id="c-cfg">：
   { lib, fn, unit }  算法函数位于 lib/<lib>.js，签名 fn(values: string[]) → string */

const $ = (s) => document.querySelector(s);
const { toast, escapeHtml } = window.DT;

const cfgEl = $('#c-cfg');
if (!cfgEl) return;
const cfg = JSON.parse(cfgEl.textContent);

const inputs = [...document.querySelectorAll('.calc-form input')];
const runBtn = $('#c-run');
const outEl = $('#c-out');

async function run() {
  const values = inputs.map((el) => el.value.trim());
  if (values.some((v) => v === '' && !cfg.allowEmpty)) return toast('请填写所有输入项');
  try {
    const mod = await import(`../lib/${cfg.lib}.js`);
    const fn = mod[cfg.fn];
    if (typeof fn !== 'function') throw new Error(`函数 ${cfg.fn} 不存在`);
    const result = await fn(values);
    outEl.textContent = String(result) + (cfg.unit || '');
  } catch (e) {
    toast('计算出错：' + e.message);
  }
}

if (runBtn) runBtn.addEventListener('click', run);
inputs.forEach((el) => el.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); }));
