/* 随机数生成器工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const minEl = $('#rn-min'), maxEl = $('#rn-max'), countEl = $('#rn-count');
const uniqueEl = $('#rn-unique'), decimalEl = $('#rn-decimal'), outEl = $('#rn-out');

const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));

$('#rn-run').addEventListener('click', () => {
  let lo = Math.floor(Number(minEl.value)), hi = Math.floor(Number(maxEl.value));
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return toast('请输入有效的数值区间');
  if (lo > hi) [lo, hi] = [hi, lo];
  const count = Math.min(1000, Math.max(1, Math.round(Number(countEl.value) || 1)));
  const unique = uniqueEl.checked;
  const decimal = decimalEl.checked;

  const genOne = () => (decimal ? (lo + Math.random() * (hi - lo)).toFixed(2) : String(randInt(lo, hi)));

  if (unique && (hi - lo + 1) < count) {
    return toast(`无法生成 ${count} 个不重复整数（区间 ${lo}-${hi} 仅 ${hi - lo + 1} 个）`);
  }

  const results = [];
  if (unique) {
    const nums = [];
    const total = hi - lo + 1;
    const arr = new Array(total);
    for (let i = 0; i < total; i++) arr[i] = lo + i;
    // Fisher-Yates 部分洗牌
    for (let i = 0; i < count; i++) {
      const j = i + Math.floor(Math.random() * (total - i));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      nums.push(arr[i]);
    }
    results.push(...nums.map(String));
  } else {
    for (let i = 0; i < count; i++) results.push(genOne());
  }
  outEl.value = results.join('\n');
  toast(`已生成 ${count} 个随机数`);
});

$('#rn-clear').addEventListener('click', () => { outEl.value = ''; minEl.focus(); });
