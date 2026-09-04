/* BMI 计算器工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const hEl = $('#bi-height'), wEl = $('#bi-weight'), outEl = $('#bi-out');
const vEl = $('#bi-value'), lEl = $('#bi-level'), nEl = $('#bi-normal');

$('#bi-run').addEventListener('click', () => {
  const h = parseFloat(hEl.value) / 100, w = parseFloat(wEl.value);
  if (!Number.isFinite(h) || h <= 0) return toast('请输入有效身高');
  if (!Number.isFinite(w) || w <= 0) return toast('请输入有效体重');
  const bmi = w / (h * h);
  const level = bmi < 18.5 ? '偏瘦' : bmi < 24 ? '正常' : bmi < 28 ? '超重' : '肥胖';
  const lo = 18.5 * h * h, hi = 23.9 * h * h;
  vEl.textContent = bmi.toFixed(1);
  lEl.textContent = level;
  nEl.textContent = `${lo.toFixed(1)} ~ ${hi.toFixed(1)} kg`;
  outEl.textContent = [
    `BMI = ${w} ÷ ${(h * 100).toFixed(0)}² = ${bmi.toFixed(2)}`,
    `体重状态：${level}`,
    `标准体重范围：${lo.toFixed(1)} ~ ${hi.toFixed(1)} kg`,
    `参考标准（亚洲）：<18.5 偏瘦 | 18.5-23.9 正常 | 24-27.9 超重 | ≥28 肥胖`,
  ].join('\n');
});
