/* 共享运行时：参数化生成器（无输入，按钮生成 → 输出）
   配置在页面 <script type="application/json" id="g-cfg">：
   { lib, fn, multi, batch }  算法函数位于 lib/<lib>.js，签名 fn(...paramValues)
   返回 string 或 string[]（multi 多行）
   注意：ES Module 顶层不允许 return，整个逻辑包在 main() 中 */

const $ = (s) => document.querySelector(s);
const cfgEl = $('#g-cfg');
if (cfgEl) main();

function main() {
  const { toast, copyText, escapeHtml } = window.DT;
  const cfg = JSON.parse(cfgEl.textContent);

  const outEl = $('#g-out');
  const runBtn = $('#g-run');
  const params = [...document.querySelectorAll('[id^="gp-"]')].map((el) => ({ el }));

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

  function render(result) {
    // 对象数组（[{name,value}]）→ 行式展示；普通数组/字符串 → 逐行文本
    if (Array.isArray(result) && result.length && typeof result[0] === 'object') {
      outEl.innerHTML = result.map((r, i) => `<div class="out-row">
        <span class="out-name">${escapeHtml(r.name)}</span>
        <code class="out-val">${escapeHtml(String(r.value))}</code>
        <button type="button" class="btn btn-ghost btn-sm" data-row="${i}" aria-label="复制 ${escapeHtml(r.name)}">复制</button>
      </div>`).join('');
      outEl.querySelectorAll('[data-row]').forEach((btn) => {
        btn.addEventListener('click', () => {
          copyText(String(result[Number(btn.dataset.row)].value)).then((ok) => toast(ok ? '已复制' : '复制失败'));
        });
      });
    } else {
      const lines = Array.isArray(result) ? result : [String(result)];
      outEl.textContent = lines.join('\n');
    }
  }

  async function run() {
    try {
      const mod = await import(`../lib/${cfg.lib}.js`);
      const fn = mod[cfg.fn];
      if (typeof fn !== 'function') throw new Error(`函数 ${cfg.fn} 不存在`);
      const result = await fn(...collectParams());
      render(result);
    } catch (e) {
      toast('生成出错：' + e.message);
    }
  }

  if (runBtn) runBtn.addEventListener('click', run);
  run();
}
