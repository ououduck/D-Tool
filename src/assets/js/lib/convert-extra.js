/* D-Tool 转换计算算法库（calc/transform 运行时使用，Node 可测）
   覆盖：百分比/折扣/比例/变化率、科学计数法、分数、有效数字、px 换算、PPI、屏幕尺寸、
   AA 分摊、百分比误差、油耗换算、数字转英文 */

const num = (v, fallback = 0) => { const n = parseFloat(v); return Number.isFinite(n) ? n : fallback; };
const fmt = (n, maxFrac = 4) => {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  let s;
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) s = n.toExponential(6).replace(/\.?0+e/, 'e');
  else s = String(Number(n.toFixed(maxFrac)));
  const [i, f] = s.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : '');
};

/* ---------- 百分比 ---------- */
/* 输入：数值、百分比 → 百分比结果 */
export function percentOf(values) {
  const [v, p] = values.map((x) => num(x));
  return fmt((v * p) / 100);
}
/* 输入：部分、总数 → 占比 */
export function percentOfTotal(values) {
  const [part, total] = values.map((x) => num(x));
  if (!total) return '总数不能为 0';
  return `${fmt((part / total) * 100, 2)}%`;
}
/* 输入：原值、新值 → 变化量与变化率 */
export function percentChange(values) {
  const [oldV, newV] = values.map((x) => num(x));
  if (!oldV) return '原值不能为 0';
  const diff = newV - oldV;
  return [{ name: '变化量', value: (diff >= 0 ? '+' : '') + fmt(diff) },
          { name: '变化率', value: `${(diff >= 0 ? '+' : '')}${fmt((diff / oldV) * 100, 2)}%` }];
}

/* ---------- 折扣 ---------- */
export function discountCalc(values) {
  const [price, discount] = values.map((x) => num(x));
  if (discount < 0 || discount > 100) return '折扣需在 0-100 之间';
  const final = price * (discount / 100);
  return [{ name: '折后价', value: fmt(final) },
          { name: '节省金额', value: fmt(price - final) },
          { name: '节省比例', value: `${fmt(100 - discount, 1)}%` }];
}

/* ---------- 比例 a:b = c:x ---------- */
export function ratioCalc(values) {
  const [a, b, c] = values.map((x) => num(x));
  if (!a || !c) return 'a 和 c 不能为 0';
  return fmt((b * c) / a);
}

/* ---------- 科学计数法 ---------- */
export function scientificNotation(values) {
  const n = num(values[0]);
  if (!n) return [{ name: '科学计数法', value: '0' }, { name: '工程计数法', value: '0' }];
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mantissa = n / 10 ** exp;
  const engExp = Math.floor(exp / 3) * 3;
  const engMantissa = n / 10 ** engExp;
  return [
    { name: '科学计数法', value: `${fmt(mantissa, 6)} × 10^${exp}` },
    { name: '工程计数法', value: `${fmt(engMantissa, 6)} × 10^${engExp}` },
    { name: '指数形式', value: `${fmt(mantissa, 6)}e${exp >= 0 ? '+' : ''}${exp}` },
    { name: '十进制位数', value: String(String(Math.abs(n)).replace('.', '').replace(/^0+/, '').length || 1) },
  ];
}

/* ---------- 分数 ↔ 小数 ---------- */
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
export function fractionToDecimal(values) {
  let [n, d] = values.map((x) => num(x));
  if (!d) return '分母不能为 0';
  if (n === 0) return [{ name: '小数', value: '0' }, { name: '百分数', value: '0%' }, { name: '最简分数', value: '0' }];
  const g = gcd(Math.abs(n), Math.abs(d));
  n /= g; d /= g;
  if (d < 0) { n = -n; d = -d; }
  const decimal = n / d;
  return [{ name: '小数', value: fmt(decimal) },
          { name: '百分数', value: `${fmt(decimal * 100, 2)}%` },
          { name: '最简分数', value: `${n}/${d}` },
          { name: '带分数', value: Math.abs(n) >= Math.abs(d) ? `${Math.trunc(n / d)} ${Math.abs(n % d)}/${d}`.replace(/ 0\/\d+$/, '') : `${n}/${d}` }];
}
export function decimalToFraction(values) {
  const n = num(values[0]);
  if (!Number.isFinite(n)) return '请输入有效数字';
  const abs = Math.abs(n);
  const str = String(abs);
  const frac = str.split('.')[1] || '';
  if (!frac) return `${n} 本身就是整数`;
  const den = 10 ** frac.length;
  let num2 = Math.round(abs * den);
  const g = gcd(num2, den);
  num2 /= g; let d = den / g;
  return `${n < 0 ? '-' : ''}${num2}/${d}`;
}

/* ---------- 有效数字 ---------- */
export function significantFigures(values) {
  const n = num(values[0]);
  const digits = Math.max(1, Math.min(15, parseInt(values[1], 10) || 3));
  if (!Number.isFinite(n)) return '请输入有效数字';
  const rounded = Number(n.toPrecision(digits));
  return [{ name: `保留 ${digits} 位有效数字`, value: String(rounded) },
          { name: '科学计数法', value: rounded.toExponential(digits - 1) }];
}

/* ---------- px ↔ rem/em/pt/vw ---------- */
export function pxConvert(values) {
  const [px, base] = values.map((x) => num(x));
  if (!base) return '根字号不能为 0';
  return [{ name: 'rem（根字号）', value: fmt(px / base) },
          { name: 'em（父级 16px）', value: fmt(px / 16) },
          { name: 'pt（1pt=1.333px）', value: fmt(px / 1.333333) },
          { name: 'vw（视口 1920）', value: `${fmt((px / 1920) * 100, 4)}vw` }];
}

/* ---------- PPI / 屏幕尺寸 ---------- */
export function ppiCalc(values) {
  const [w, h, diag] = values.map((x) => num(x));
  if (!w || !h || !diag) return '请输入分辨率与对角线尺寸';
  const ppi = Math.sqrt(w * w + h * h) / diag;
  return [{ name: 'PPI', value: fmt(ppi, 1) },
          { name: '物理宽', value: `${fmt(w / ppi, 2)} 英寸` },
          { name: '物理高', value: `${fmt(h / ppi, 2)} 英寸` }];
}
export function screenSizeCalc(values) {
  const [diag, ratioW, ratioH] = values.map((x) => num(x));
  if (!diag || !ratioW || !ratioH) return '请输入对角线尺寸与长宽比';
  const d = Math.sqrt(ratioW * ratioW + ratioH * ratioH);
  const w = (ratioW / d) * diag;
  const h = (ratioH / d) * diag;
  return [{ name: '宽度', value: `${fmt(w, 2)} 英寸` },
          { name: '高度', value: `${fmt(h, 2)} 英寸` },
          { name: '面积', value: `${fmt(w * h, 2)} 平方英寸` }];
}

/* ---------- AA 分摊 ---------- */
export function billSplit(values) {
  const [total, people, tipPct] = values.map((x) => num(x));
  if (!people || people < 1) return '人数至少为 1';
  const tip = total * (tipPct / 100);
  const per = (total + tip) / people;
  return [{ name: '小费', value: fmt(tip) },
          { name: '总金额', value: fmt(total + tip) },
          { name: '人均', value: fmt(per) }];
}

/* ---------- 百分比误差 ---------- */
export function percentError(values) {
  const [measured, actual] = values.map((x) => num(x));
  if (!actual) return '真实值不能为 0';
  return `${fmt(Math.abs((measured - actual) / actual) * 100, 2)}%`;
}

/* ---------- 油耗换算（mpg ↔ L/100km，非线性） ---------- */
export function fuelConvert(values) {
  const v = num(values[0]);
  if (!v) return '请输入数值';
  const mode = values[1] || 'l100';
  if (mode === 'l100') {
    const mpg = 235.214583 / v;
    return [{ name: '升/100公里', value: fmt(v, 2) },
            { name: '英里/加仑(美)', value: fmt(mpg, 2) },
            { name: '公里/升', value: fmt(100 / v, 2) }];
  }
  const l100 = 235.214583 / v;
  return [{ name: '英里/加仑(美)', value: fmt(v, 2) },
          { name: '升/100公里', value: fmt(l100, 2) },
          { name: '公里/升', value: fmt(v * 0.425144, 2) }];
}

/* ---------- 数字转英文（支票/发票场景） ---------- */
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function threeDigits(n) {
  let s = '';
  if (n >= 100) { s += ONES[Math.floor(n / 100)] + ' hundred'; n %= 100; if (n) s += ' '; }
  if (n >= 20) { s += TENS[Math.floor(n / 10)]; if (n % 10) s += '-' + ONES[n % 10]; }
  else if (n > 0) s += ONES[n];
  return s;
}
export function numberToEnglish(values) {
  const raw = String(values[0] ?? '').trim();
  const n = num(raw);
  if (!Number.isFinite(n) || !/^-?\d+(\.\d+)?$/.test(raw)) return '请输入合法数字';
  const neg = n < 0;
  let intPart = Math.floor(Math.abs(n));
  const fracPart = Math.round((Math.abs(n) - intPart) * 100);
  if (fracPart >= 100) { intPart++; }
  const scales = ['', ' thousand', ' million', ' billion', ' trillion', ' quadrillion'];
  let parts = [];
  let i = 0;
  if (intPart === 0) parts.push('zero');
  while (intPart > 0) {
    const chunk = intPart % 1000;
    if (chunk) parts.unshift(threeDigits(chunk) + scales[i]);
    intPart = Math.floor(intPart / 1000);
    i++;
  }
  let out = (neg ? 'negative ' : '') + parts.join(', ');
  if (fracPart > 0) out += ` and ${fracPart}/100`;
  return out;
}

/* ---------- 温度互转（快捷：摄氏→华氏/开尔文） ---------- */
export function tempConvert(values) {
  const c = num(values[0]);
  return [{ name: '摄氏度', value: fmt(c, 2) + ' °C' },
          { name: '华氏度', value: fmt(c * 9 / 5 + 32, 2) + ' °F' },
          { name: '开尔文', value: fmt(c + 273.15, 2) + ' K' }];
}

/* ---------- 长度快捷：公里/英里互转 ---------- */
export function kmMiles(values) {
  const v = num(values[0]);
  const mode = values[1] || 'km';
  if (mode === 'km') return [{ name: '千米', value: fmt(v, 2) + ' km' }, { name: '英里', value: fmt(v * 0.621371, 2) + ' mi' }];
  return [{ name: '英里', value: fmt(v, 2) + ' mi' }, { name: '千米', value: fmt(v / 0.621371, 2) + ' km' }];
}
