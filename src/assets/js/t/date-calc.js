/* 日期计算器工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const nowEl = $('#dc-now'), aEl = $('#dc-a'), bEl = $('#dc-b'), outEl = $('#dc-out');
const addDateEl = $('#dc-add-date'), addNEl = $('#dc-add-n');

const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const fmtD = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const toMid = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d).getTime(); };

const tick = () => {
  const t = new Date();
  nowEl.textContent = `${fmtD(t)} ${WEEK[t.getDay()]}`;
};
tick();
setInterval(tick, 60000);

$('#dc-diff').addEventListener('click', () => {
  if (!aEl.value || !bEl.value) return toast('请选择两个日期');
  const ms = toMid(bEl.value) - toMid(aEl.value);
  const days = Math.round(ms / 86400000);
  const sign = days < 0 ? '早于' : '晚于';
  const abs = Math.abs(days);
  const weeks = Math.floor(abs / 7);
  const extra = abs % 7;
  // 工作日（周一至周五）
  let workdays = 0;
  const start = new Date(toMid(aEl.value) + (days >= 0 ? 86400000 : 0));
  const step = days >= 0 ? 1 : -1;
  for (let i = 0, t = start; i < abs; i++, t = new Date(t.getTime() + step * 86400000)) {
    const day = t.getDay();
    if (day >= 1 && day <= 5) workdays++;
  }
  const bd = new Date(toMid(bEl.value));
  outEl.textContent = [
    `${aEl.value}（${WEEK[new Date(toMid(aEl.value)).getDay()]}）`,
    `${bEl.value}（${WEEK[bd.getDay()]}）`,
    `相差 ${abs} 天（${bEl.value} ${sign} ${aEl.value}）`,
    weeks ? `≈ ${weeks} 周 ${extra ? `零 ${extra} 天` : ''}` : '',
    `其中工作日约 ${workdays} 天`,
  ].filter(Boolean).join('\n');
});

$('#dc-add-run').addEventListener('click', () => {
  if (!addDateEl.value) return toast('请选择起始日期');
  const n = Math.round(Number(addNEl.value) || 0);
  const d = new Date(toMid(addDateEl.value) + n * 86400000);
  outEl.textContent = [
    `${addDateEl.value} ${n >= 0 ? '加上' : '减去'} ${Math.abs(n)} 天 = ${fmtD(d)}`,
    `${WEEK[d.getDay()]}`,
  ].join('\n');
});

$('#dc-clear').addEventListener('click', () => {
  aEl.value = ''; bEl.value = ''; addDateEl.value = ''; addNEl.value = '7';
  outEl.textContent = '等待计算…';
});
