/* 共享运行时：参数化生成器（无输入，按钮生成 → 输出）
   配置在页面 <script type="application/json" id="g-cfg">：
   { lib, fn, multi, batch }  算法函数位于 lib/<lib>.js，签名 fn(...paramValues)
   返回 string 或 string[]（multi 多行） */

const $ = (s) => document.querySelector(s);
const { toast, copyText, escapeHtml } = window.DT;

const cfgEl = $('#g-cfg');
if (!cfgEl) return;
const cfg = JSON.parse(cfgEl.textContent);

const outEl = $('#g-out');
const runBtn = $('#g-run');
const params = [...document.querySelectorAll('#g-cfg')].length
  ? [...document.querySelectorAll('[id^="gp-"]')].map((el, i) => ({ el, name: el.id }))
  : [];

function collectParams() {
  return params.map((p) => p.el.value);
}

/* range 滑块的实时数值显示 */
document.querySelectorAll('input[type="range"]').forEach((el) => {
  const val = document.getElementById(el.id + '-val');
  if (val) {
    const sync = () => { val.textContent = el.value; };
    el.addEventListener('input', sync);
    sync();
  }
});

async function run() {
  try {
    const mod = await import(`../lib/${cfg.lib}.js`);
    const fn = mod[cfg.fn];
    if (typeof fn !== 'function') throw new Error(`函数 ${cfg.fn} 不存在`);
    const result = await fn(...collectParams());
    const lines = Array.isArray(result) ? result : [String(result)];
    outEl.textContent = lines.join('\n');
  } catch (e) {
    toast('生成出错：' + e.message);
  }
}

if (runBtn) runBtn.addEventListener('click', run);
run();
