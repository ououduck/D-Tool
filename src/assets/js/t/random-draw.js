/* 随机抽奖工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const listEl = $('#rd-list'), countEl = $('#rd-count'), uniqueEl = $('#rd-unique');
const outEl = $('#rd-out'), noteEl = $('#rd-note');

let pool = [];

const randInt = (n) => {
  const arr = new Uint32Array(1);
  const limit = 4294967296 - (4294967296 % n);
  let v;
  do { crypto.getRandomValues(arr); v = arr[0]; } while (v >= limit);
  return v % n;
};

$('#rd-run').addEventListener('click', () => {
  const names = listEl.value.split('\n').map((s) => s.trim()).filter(Boolean);
  if (!names.length) return toast('请先粘贴名单');
  const count = Math.min(100, Math.max(1, Math.round(Number(countEl.value) || 1)));
  if (uniqueEl.checked && pool.length === 0) pool = [...names];
  const source = uniqueEl.checked ? pool : names;
  if (count > source.length) {
    noteEl.textContent = `名单只剩 ${source.length} 人，最多抽取 ${source.length} 人`;
    noteEl.classList.remove('hidden');
    return;
  }
  noteEl.classList.add('hidden');
  const winners = [];
  for (let i = 0; i < count; i++) {
    const idx = randInt(source.length);
    winners.push(source[idx]);
    if (uniqueEl.checked) source.splice(idx, 1);
  }
  outEl.textContent = winners.map((w, i) => `${i + 1}. ${w}`).join('\n');
  if (uniqueEl.checked) noteEl.textContent = `剩余候选：${pool.length} 人`;
});

$('#rd-clear').addEventListener('click', () => {
  listEl.value = ''; outEl.textContent = '等待抽奖…';
  pool = []; noteEl.classList.add('hidden');
});
