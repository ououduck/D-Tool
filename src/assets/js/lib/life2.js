/* D-Tool 生活/转换补强算法库（纯函数，Node 可测）
   覆盖：卡路里需求、标准体重、体脂率、跑步/骑行配速、三围参考、单位快捷换算、日期星期 */

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

/* ---------- 体脂率估算（海军体脂公式） ---------- */
export function bodyFatCalc(values) {
  const [gender, waist, neck, height, hip] = [values[0], num(values[1]), num(values[2]), num(values[3]), num(values[4])];
  if (!waist || !neck || !height) return '请输入腰围、颈围与身高';
  let bf;
  if (gender === 'male') {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    if (!hip) return '女性需要输入臀围';
    bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
  const levels = gender === 'male'
    ? [['必需脂肪', '<6'], ['运动员', '6-13'], ['健康', '14-17'], ['偏高', '18-24'], ['肥胖', '≥25']]
    : [['必需脂肪', '<14'], ['运动员', '14-20'], ['健康', '21-24'], ['偏高', '25-31'], ['肥胖', '≥32']];
  const level = levels.find(([, r]) => bf < parseFloat(r)) || ['肥胖', levels[4][1]];
  return [
    { name: '估算体脂率', value: fmt(bf, 1) + '%' },
    { name: '评级', value: level[0] + '（' + level[1] + '）' },
    { name: '说明', value: '海军体脂公式估算，误差 ±3%；专业测量用皮脂钳或 DEXA' },
  ];
}

/* ---------- 标准体重（多种公式） ---------- */
export function standardWeightCalc(values) {
  const [height, gender] = [num(values[0]), values[1] || 'male'];
  if (!height || height < 120 || height > 220) return '请输入身高（120-220cm）';
  const h = height / 100;
  const bmiMin = 18.5 * h * h;
  const bmiMax = 23.9 * h * h;
  const broca = gender === 'male' ? height - 100 : height - 105;
  const devine = gender === 'male' ? 50 + 2.3 * (height / 2.54 - 60) : 45.5 + 2.3 * (height / 2.54 - 60);
  return [
    { name: '健康范围（BMI 18.5-23.9）', value: `${fmt(bmiMin, 1)} - ${fmt(bmiMax, 1)} kg` },
    { name: 'Broca 公式', value: fmt(broca, 1) + ' kg' },
    { name: 'Devine 公式', value: fmt(devine, 1) + ' kg' },
    { name: '超重警戒（BMI≥24）', value: fmt(24 * h * h, 1) + ' kg' },
  ];
}

/* ---------- 三围比例参考 ---------- */
export function bodyMeasureCalc(values) {
  const [gender, height] = [values[0], num(values[1])];
  if (!height || height < 120 || height > 220) return '请输入身高（120-220cm）';
  const bust = height * (gender === 'female' ? 0.53 : 0.5);
  const waist = height * (gender === 'female' ? 0.37 : 0.42);
  const hip = height * (gender === 'female' ? 0.54 : 0.5);
  return [
    { name: '参考胸围', value: fmt(bust, 1) + ' cm' },
    { name: '参考腰围', value: fmt(waist, 1) + ' cm' },
    { name: '参考臀围', value: fmt(hip, 1) + ' cm' },
    { name: '说明', value: '为美学比例参考，健康比完美更重要' },
  ];
}

/* ---------- 每日卡路里（简易） ---------- */
export function dailyCalorie(values) {
  const [weight, height, age, gender, activity] = [num(values[0]), num(values[1]), num(values[2]), values[3], values[4]];
  if (!weight || !height || !age) return '请输入体重、身高与年龄';
  const bmr = gender === 'female' ? 10 * weight + 6.25 * height - 5 * age - 161 : 10 * weight + 6.25 * height - 5 * age + 5;
  const factors = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
  const tdee = bmr * (factors[activity] || 1.2);
  return [
    { name: 'BMR', value: Math.round(bmr) + ' 千卡' },
    { name: '维持（TDEE）', value: Math.round(tdee) + ' 千卡' },
    { name: '轻度减脂', value: Math.round(tdee - 300) + ' 千卡' },
    { name: '增肌', value: Math.round(tdee + 300) + ' 千卡' },
  ];
}

/* ---------- 跑步配速对照 ---------- */
export function paceTable(values) {
  const dist = num(values[0]); // km
  const timeStr = String(values[1] || ''); // "1:30:00" 或 "30:00"
  if (!dist || !timeStr) return '请输入距离与用时';
  const parts = timeStr.split(':').map((x) => parseFloat(x));
  if (parts.some((x) => Number.isNaN(x))) return '时间格式：时:分:秒 或 分:秒';
  const secs = parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts[0] * 60 + parts[1];
  const pace = secs / dist;
  const paceMin = Math.floor(pace / 60);
  const paceSec = Math.round(pace % 60);
  return [
    { name: '配速', value: `${paceMin}'${String(paceSec).padStart(2, '0')}" /km` },
    { name: '速度', value: fmt(dist / (secs / 3600), 2) + ' km/h' },
    { name: '半马预估', value: fmt((21097.5 / 1000) * pace / 60, 2) + ' 分钟' },
    { name: '全马预估', value: fmt((42195 / 1000) * pace / 3600, 2) + ' 小时' },
  ];
}

/* ---------- 单位快捷换算（常用对） ---------- */
export function quickConvert(values) {
  const [value, from, to] = [num(values[0]), values[1], values[2]];
  if (!Number.isFinite(value)) return '请输入数值';
  const table = {
    'cm-inch': [0.393701, '厘米 → 英寸'],
    'inch-cm': [2.54, '英寸 → 厘米'],
    'kg-lb': [2.20462, '千克 → 磅'],
    'lb-kg': [0.453592, '磅 → 千克'],
    'km-mile': [0.621371, '公里 → 英里'],
    'mile-km': [1.60934, '英里 → 公里'],
    'c-f': ['cf', '摄氏 → 华氏'],
    'f-c': ['fc', '华氏 → 摄氏'],
    'm-ft': [3.28084, '米 → 英尺'],
    'ft-m': [0.3048, '英尺 → 米'],
    'l-gal': [0.264172, '升 → 美制加仑'],
    'gal-l': [3.78541, '美制加仑 → 升'],
    'hectare-acre': [2.47105, '公顷 → 英亩'],
    'acre-hectare': [0.404686, '英亩 → 公顷'],
  };
  const key = `${from}-${to}`;
  const rule = table[key];
  if (!rule) return '不支持的换算组合（见下拉选项）';
  if (rule[0] === 'cf') return `${fmt(value, 2)} °C = ${fmt(value * 9 / 5 + 32, 2)} °F`;
  if (rule[0] === 'fc') return `${fmt(value, 2)} °F = ${fmt((value - 32) * 5 / 9, 2)} °C`;
  return `${fmt(value, 2)} ${rule[1]} = ${fmt(value * rule[0], 4)}`;
}

/* ---------- 日期星期查询 ---------- */
export function weekdayCalc(values) {
  const d = new Date(values[0]);
  if (Number.isNaN(d.getTime())) return '请输入有效日期';
  const week = '日一二三四五六'[d.getDay()];
  const y = d.getFullYear();
  const start = new Date(y, 0, 1);
  const dayOfYear = Math.floor((d - start) / 86400000) + 1;
  const weekOfYear = Math.ceil(dayOfYear / 7);
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  return [
    { name: '星期', value: `星期${week}` },
    { name: '一年中第几天', value: `${dayOfYear} / ${isLeap ? 366 : 365}` },
    { name: '第几周', value: `第 ${weekOfYear} 周` },
    { name: '是否闰年', value: isLeap ? '是' : '否' },
  ];
}

/* ---------- 生肖年龄速查 ---------- */
export function zodiacAgeCalc(values) {
  const [birthYear, currentYear] = [parseInt(values[0], 10), parseInt(values[1], 10) || new Date().getFullYear()];
  if (!birthYear || birthYear < 1900 || birthYear > currentYear) return '请输入有效出生年份';
  const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  const animal = animals[((birthYear - 4) % 12 + 12) % 12];
  const age = currentYear - birthYear;
  const nominal = age + 1;
  return [
    { name: '生肖', value: animal },
    { name: '周岁', value: `${age} 岁` },
    { name: '虚岁', value: `${nominal} 岁` },
  ];
}
