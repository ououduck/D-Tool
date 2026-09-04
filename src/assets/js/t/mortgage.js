/* 房贷计算器工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const amtEl = $('#mg-amount'), yearsEl = $('#mg-years'), rateEl = $('#mg-rate'), outEl = $('#mg-out');

const fmt = (n) => '¥' + n.toLocaleString('zh-CN', { maximumFractionDigits: 2 });

$('#mg-run').addEventListener('click', () => {
  const P = parseFloat(amtEl.value) * 10000;
  const years = parseInt(yearsEl.value, 10);
  const r = parseFloat(rateEl.value) / 100 / 12;
  if (!Number.isFinite(P) || P <= 0) return toast('请输入有效的贷款金额');
  if (!Number.isFinite(years) || years <= 0) return toast('请输入有效的贷款年限');
  if (!Number.isFinite(r) || r < 0) return toast('请输入有效的年利率');
  const n = years * 12;

  // 等额本息
  const m1 = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total1 = m1 * n;
  // 等额本金
  const perM = P / n;
  const first = perM + P * r;
  const last = perM + perM * r;
  const total2 = (perM + P * r + perM + perM * r) * n / 2;

  outEl.textContent = [
    '【等额本息】',
    `  每月月供：${fmt(m1)}`,
    `  总利息：${fmt(total1 - P)}`,
    `  还款总额：${fmt(total1)}`,
    '',
    '【等额本金】',
    `  首月月供：${fmt(first)}（每月递减 ${fmt(perM * r)}）`,
    `  末月月供：${fmt(last)}`,
    `  总利息：${fmt(total2 - P)}`,
    `  还款总额：${fmt(total2)}`,
    '',
    `等额本金比等额本息共少付利息：${fmt(Math.max(0, total1 - total2))}`,
  ].join('\n');
});
