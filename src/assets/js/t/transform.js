/* 共享运行时：文本输入 → 转换 → 输出
   配置在页面 <script type="application/json" id="x-cfg">：
   { lib, fn, multi, auto, params: [{name, type}] }
   算法函数位于 src/assets/js/lib/<lib>.js，签名 fn(input, ...paramValues)
   返回 string（单输出）或 [{name, value}]（multi 多输出） */

const $ = (s) => document.querySelector(s);
const { toast, copyText, escapeHtml } = window.DT;

const cfgEl = $('#x-cfg');
if (!cfgEl) return;
const cfg = JSON.parse(cfgEl.textContent);

const inEl = $('#x-in');
const outWrap = $('#x-out-wrap');
const labelEl = $('#x-label');
const runBtn = $('#x-run');
const clearBtn = $('#x-clear');
const params = (cfg.params || []).map((p, i) => ({ ...p, el: $(`#xp-${i}`) }));

function collectParams() {
  return params.map((p) => {
    const v = p.el ? p.el.value : '';
    return p.type === 'number' && v !== '' ? String(parseFloat(v)) : v;
  });
}

function render(result) {
  const rows = Array.isArray(result)
    ? (result.length && typeof result[0] === 'object' ? result : result.map((v, i) => ({ name: '结果 ' + (i + 1), value: v })))
    : [{ name: '结果', value: String(result) }];
  outWrap.innerHTML = rows.map((r, i) => `<div class="out-row">
    <span class="out-name">${escapeHtml(r.name)}</span>
    <code class="out-val">${escapeHtml(String(r.value))}</code>
    <button type="button" class="btn btn-ghost btn-sm" data-row="${i}" aria-label="复制 ${escapeHtml(r.name)}">复制</button>
  </div>`).join('');
  outWrap.querySelectorAll('[data-row]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = rows[Number(btn.dataset.row)].value;
      copyText(String(value)).then((ok) => toast(ok ? '已复制' : '复制失败'));
    });
  });
}

let timer = 0;
async function run() {
  const input = inEl.value;
  if (!input && !cfg.allowEmpty) return toast('请先输入内容');
  try {
    const mod = await import(`../lib/${cfg.lib}.js`);
    const fn = mod[cfg.fn];
    if (typeof fn !== 'function') throw new Error(`函数 ${cfg.fn} 不存在`);
    const result = await fn(input, ...collectParams());
    render(result);
  } catch (e) {
    toast('处理出错：' + e.message);
  }
}

if (runBtn) runBtn.addEventListener('click', run);
if (clearBtn) clearBtn.addEventListener('click', () => { inEl.value = ''; outWrap.innerHTML = '<pre id="x-out">等待输入…</pre>'; inEl.focus(); });
if (cfg.auto) {
  inEl.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 350); });
  params.forEach((p) => p.el && p.el.addEventListener('change', run));
}
