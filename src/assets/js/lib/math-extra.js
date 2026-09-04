/* D-Tool 数学算法库（纯函数，Node 可测）
   覆盖：质数、因数、GCD/LCM、阶乘、排列组合、统计、舍入、利率、生活计算 */

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

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; };
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

/* ---------- 质数判断 ---------- */
export function primeCheck(values) {
  const n = parseInt(values[0], 10);
  if (!n || n < 2) return '请输入 ≥2 的整数';
  const factors = [];
  let x = n;
  for (let i = 2; i * i <= x; i++) {
    while (x % i === 0) { factors.push(i); x /= i; }
  }
  if (x > 1) factors.push(x);
  const isPrime = factors.length === 1 && factors[0] === n;
  const divisors = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) { divisors.push(i); if (i !== n / i) divisors.push(n / i); }
  }
  divisors.sort((a, b) => a - b);
  return [
    { name: '是否为质数', value: isPrime ? '是' : '否' },
    { name: '质因数分解', value: factors.join(' × ') },
    { name: '因数个数', value: `${divisors.length} 个` },
    { name: '全部因数', value: divisors.join(', ') },
  ];
}

/* ---------- GCD / LCM ---------- */
export function gcdLcmCalc(values) {
  const a = parseInt(values[0], 10);
  const b = parseInt(values[1], 10);
  if (!a || !b) return '请输入正整数';
  return [
    { name: '最大公约数 GCD', value: String(gcd(a, b)) },
    { name: '最小公倍数 LCM', value: String(lcm(a, b)) },
  ];
}

/* ---------- 阶乘 ---------- */
export function factorialCalc(values) {
  const n = parseInt(values[0], 10);
  if (n < 0 || n > 170) return '请输入 0-170 的整数';
  let r = 1n;
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  const s = r.toString();
  return [
    { name: `${n}!`, value: s.length > 50 ? `${s.slice(0, 50)}…（${s.length} 位）` : s },
    { name: '科学计数法', value: Number(r).toExponential(6).replace(/\.?0+e/, 'e') },
  ];
}

/* ---------- 排列组合 ---------- */
export function permCombCalc(values) {
  const n = parseInt(values[0], 10);
  const r = parseInt(values[1], 10);
  if (n < 0 || r < 0 || r > n || n > 170) return '请输入 0≤r≤n≤170';
  let p = 1n;
  for (let i = 0; i < r; i++) p *= BigInt(n - i);
  let c = p;
  for (let i = 2; i <= r; i++) c /= BigInt(i);
  return [
    { name: `P(${n},${r}) 排列`, value: p.toString() },
    { name: `C(${n},${r}) 组合`, value: c.toString() },
  ];
}

/* ---------- 统计 ---------- */
export function statsCalc(input) {
  const nums = input.split(/[\s,，;；]+/).map((x) => parseFloat(x)).filter((n) => Number.isFinite(n));
  if (!nums.length) return '请输入数字（空格或逗号分隔）';
  nums.sort((a, b) => a - b);
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = sum / nums.length;
  const mid = nums.length % 2 ? nums[(nums.length - 1) / 2] : (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
  const modeMap = new Map();
  for (const n of nums) modeMap.set(n, (modeMap.get(n) || 0) + 1);
  let mode = [], maxCount = 0;
  for (const [k, v] of modeMap) { if (v > maxCount) { maxCount = v; mode = [k]; } else if (v === maxCount) mode.push(k); }
  const variance = nums.reduce((a, b) => a + (b - avg) ** 2, 0) / nums.length;
  return [
    { name: '数量', value: String(nums.length) },
    { name: '总和', value: fmt(sum) },
    { name: '平均值', value: fmt(avg) },
    { name: '中位数', value: fmt(mid) },
    { name: '众数', value: mode.join(', ') },
    { name: '最小值', value: fmt(nums[0]) },
    { name: '最大值', value: fmt(nums[nums.length - 1]) },
    { name: '极差', value: fmt(nums[nums.length - 1] - nums[0]) },
    { name: '方差', value: fmt(variance, 6) },
    { name: '标准差', value: fmt(Math.sqrt(variance), 6) },
  ];
}

/* ---------- 舍入 ---------- */
export function roundCalc(values) {
  const v = num(values[0]);
  const places = Math.max(0, Math.min(10, parseInt(values[1], 10) || 0));
  if (!Number.isFinite(v)) return '请输入有效数字';
  const f = 10 ** places;
  return [
    { name: '四舍五入', value: String(Number((Math.round(v * f) / f).toFixed(places))) },
    { name: '向上取整', value: String(Number((Math.ceil(v * f) / f).toFixed(places))) },
    { name: '向下取整', value: String(Number((Math.floor(v * f) / f).toFixed(places))) },
    { name: '截断', value: String(Number((Math.trunc(v * f) / f).toFixed(places))) },
  ];
}

/* ---------- 幂与根 ---------- */
export function powerRootCalc(values) {
  const base = num(values[0]);
  const exp = num(values[1]);
  if (!Number.isFinite(base) || !Number.isFinite(exp)) return '请输入有效数字';
  const pow = base ** exp;
  return [
    { name: `${base}^${exp}`, value: fmt(pow, 8) },
    { name: `√${base}`, value: fmt(Math.sqrt(base), 8) },
    { name: `${base} 的立方根`, value: fmt(Math.cbrt(base), 8) },
    { name: `${base} 的倒数`, value: base ? fmt(1 / base, 8) : '无穷' },
  ];
}

/* ---------- 对数 ---------- */
export function logCalc(values) {
  const v = num(values[0]);
  const base = num(values[1]) || 10;
  if (v <= 0 || base <= 0 || base === 1) return '数值与底数需为正数且底数 ≠1';
  return [
    { name: `log${base}(${v})`, value: fmt(Math.log(v) / Math.log(base), 8) },
    { name: `ln(${v})`, value: fmt(Math.log(v), 8) },
    { name: `log10(${v})`, value: fmt(Math.log10(v), 8) },
    { name: `log2(${v})`, value: fmt(Math.log2(v), 8) },
  ];
}

/* ---------- 三角函数 ---------- */
export function trigCalc(values) {
  const deg = num(values[0]);
  if (!Number.isFinite(deg)) return '请输入角度（度）';
  const rad = (deg * Math.PI) / 180;
  return [
    { name: `sin(${deg}°)`, value: fmt(Math.sin(rad), 8) },
    { name: `cos(${deg}°)`, value: fmt(Math.cos(rad), 8) },
    { name: `tan(${deg}°)`, value: fmt(Math.tan(rad), 8) },
    { name: '弧度', value: fmt(rad, 6) },
  ];
}

/* ---------- 复利 ---------- */
export function compoundInterestCalc(values) {
  const [principal, ratePct, years, freq] = values.map((x) => num(x));
  if (!principal || !ratePct) return '请输入本金与年利率';
  const rate = ratePct / 100;
  const f = freq || 12;
  const total = principal * (1 + rate / f) ** (f * years);
  return [
    { name: '本金', value: fmt(principal, 2) + ' 元' },
    { name: '本息合计', value: fmt(total, 2) + ' 元' },
    { name: '利息', value: fmt(total - principal, 2) + ' 元' },
    { name: '翻倍年数（72法则）', value: fmt(72 / ratePct, 1) + ' 年' },
  ];
}

/* ---------- 单利 ---------- */
export function simpleInterestCalc(values) {
  const [principal, ratePct, years] = values.map((x) => num(x));
  if (!principal || !ratePct) return '请输入本金与年利率';
  const interest = principal * (ratePct / 100) * years;
  return [
    { name: '利息', value: fmt(interest, 2) + ' 元' },
    { name: '本息合计', value: fmt(principal + interest, 2) + ' 元' },
  ];
}

/* ---------- 电费 ---------- */
export function electricityCalc(values) {
  const [powerW, hours, pricePerKwh] = values.map((x) => num(x));
  if (!powerW || !hours) return '请输入功率与时长';
  const kwh = (powerW / 1000) * hours;
  return [
    { name: '耗电量', value: fmt(kwh, 3) + ' 度（kWh）' },
    { name: '电费（按天）', value: fmt(kwh * pricePerKwh, 2) + ' 元' },
    { name: '电费（每月 30 天）', value: fmt(kwh * pricePerKwh * 30, 2) + ' 元' },
  ];
}

/* ---------- 油耗费用 ---------- */
export function fuelCostCalc(values) {
  const [distance, l100, price] = values.map((x) => num(x));
  if (!distance || !l100 || !price) return '请输入里程、油耗与油价';
  const liters = (distance / 100) * l100;
  return [
    { name: '耗油量', value: fmt(liters, 2) + ' 升' },
    { name: '油费', value: fmt(liters * price, 2) + ' 元' },
    { name: '每公里成本', value: fmt(liters * price / distance, 3) + ' 元/公里' },
  ];
}

/* ---------- 跑步配速 ---------- */
export function paceCalc(values) {
  const [distKm, hours, minutes, seconds] = values.map((x) => num(x));
  if (!distKm) return '请输入距离';
  const totalSec = hours * 3600 + minutes * 60 + seconds;
  if (!totalSec) return '请输入用时';
  const pace = totalSec / distKm;
  const paceMin = Math.floor(pace / 60);
  const paceSec = Math.round(pace % 60);
  return [
    { name: '配速', value: `${paceMin}'${String(paceSec).padStart(2, '0')}" /公里` },
    { name: '速度', value: fmt(distKm / (totalSec / 3600), 2) + ' 公里/小时' },
  ];
}

/* ---------- 理想体重（BMI 反向） ---------- */
export function idealWeightCalc(values) {
  const height = num(values[0]); // cm
  const male = values[1] === 'male';
  if (!height || height < 50 || height > 250) return '请输入有效身高（50-250cm）';
  const h = height / 100;
  const min = 18.5 * h * h;
  const max = 23.9 * h * h;
  const devine = male ? 50 + 2.3 * (height / 2.54 - 60) : 45.5 + 2.3 * (height / 2.54 - 60);
  return [
    { name: '健康体重范围', value: `${fmt(min, 1)} - ${fmt(max, 1)} kg` },
    { name: 'BMI 参考', value: '18.5 - 23.9' },
    { name: '理想体重（Devine）', value: fmt(devine, 1) + ' kg' },
  ];
}

/* ---------- BMR 基础代谢 ---------- */
export function bmrCalc(values) {
  const [male, weight, height, age] = [values[0] === 'male', num(values[1]), num(values[2]), num(values[3])];
  if (!weight || !height || !age) return '请输入体重、身高与年龄';
  const bmr = male ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
  const levels = [1.2, 1.375, 1.55, 1.725, 1.9];
  const names = ['久坐', '轻度活动', '中度活动', '高度活动', '极高活动'];
  const rows = levels.map((l, i) => ({ name: `维持体重（${names[i]}）`, value: `${Math.round(bmr * l)} 千卡/天` }));
  return [{ name: 'BMR 基础代谢', value: `${Math.round(bmr)} 千卡/天` }, ...rows];
}

/* ---------- 随机数（crypto） ---------- */
export function randomNumberCalc(values) {
  const [min, max, count] = [parseInt(values[0], 10), parseInt(values[1], 10), parseInt(values[2], 10)];
  if (Number.isNaN(min) || Number.isNaN(max) || min > max) return '请输入合法的范围';
  const n = Math.max(1, Math.min(100, count || 1));
  const arr = new Uint32Array(n);
  crypto.getRandomValues(arr);
  const span = max - min + 1;
  return Array.from({ length: n }, (_, i) => String(min + (arr[i] % span))).join('\n');
}
