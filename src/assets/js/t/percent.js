/* 百分比计算器工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const modeEl = $('#pc-mode'), aEl = $('#pc-a'), bEl = $('#pc-b'), outEl = $('#pc-out');

const fmt = (n) => {
  if (!Number.isFinite(n)) return '—';
  return parseFloat(n.toPrecision(12)).toString();
};

$('#pc-run').addEventListener('click', () => {
  const mode = modeEl.value;
  const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
  if (!Number.isFinite(a)) return toast('请输入有效的 A 值');
  if (!Number.isFinite(b)) return toast('请输入有效的 B 值');

  let lines = [];
  switch (mode) {
    case 'of':
      lines = [`${fmt(a)} 的 ${fmt(b)}% = ${fmt((a * b) / 100)}`];
      break;
    case 'ratio':
      if (b === 0) return toast('B 值不能为 0');
      lines = [`${fmt(a)} 占 ${fmt(b)} 的 ${fmt((a / b) * 100)}%`];
      break;
    case 'change':
      if (b === 0) return toast('B 值不能为 0');
      {
        const ratio = ((a - b) / b) * 100;
        const dir = ratio >= 0 ? '增长' : '下降';
        lines = [
          `相对 ${fmt(b)}，${fmt(a)} ${dir}了 ${fmt(Math.abs(ratio))}%`,
          `绝对差值：${fmt(a - b)}`,
        ];
      }
      break;
    case 'discount':
      lines = [
        `原价 ${fmt(a)} 打 ${fmt(b)} 折 = ${fmt((a * b) / 10)}`,
        `节省：${fmt(a - (a * b) / 10)}`,
      ];
      break;
  }
  outEl.textContent = lines.join('\n');
});

modeEl.addEventListener('change', () => {
  const isPercentMode = modeEl.value === 'of';
  bEl.placeholder = isPercentMode ? '百分比（如 15 表示 15%）' : '数值 B';
});
