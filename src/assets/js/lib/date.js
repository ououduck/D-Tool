/* D-Tool 日期时间算法库（纯函数，Node 可测）
   覆盖：年龄、星座、生肖、干支、闰年、周数、工作日、日期格式化等 */

const WEEK_CN = ['日', '一', '二', '三', '四', '五', '六'];

/* 解析日期字符串 → Date（支持 YYYY-MM-DD、YYYY/M/D、Date 对象） */
function parseDate(v) {
  if (v instanceof Date) return v;
  const s = String(v).trim();
  if (!s) return null;
  if (/^\d{4}-\d{1,2}-\d{1,2}/.test(s) || /^\d{4}\/\d{1,2}\/\d{1,2}/.test(s)) {
    const m = s.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (m) {
      const d = new Date(+m[1], +m[2] - 1, +m[3]);
      return Number.isNaN(d.getTime()) ? null : d;
    }
  }
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}
const fmtDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/* ---------- 年龄计算 ---------- */
export function ageCalc(values) {
  const birth = parseDate(values[0]);
  if (!birth) return '请输入有效出生日期';
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) { months--; const prev = new Date(now.getFullYear(), now.getMonth(), 0); days += prev.getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((now - birth) / 86400000);
  // 下一个生日
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < now) nextBirthday.setFullYear(now.getFullYear() + 1);
  const daysToBirthday = Math.ceil((nextBirthday - now) / 86400000);
  return [
    { name: '周岁', value: `${years} 岁 ${months} 个月 ${days} 天` },
    { name: '总天数', value: `${totalDays.toLocaleString()} 天` },
    { name: '距下次生日', value: `${daysToBirthday} 天` },
    { name: '星期', value: `星期${WEEK_CN[birth.getDay()]}` },
  ];
}

/* ---------- 星座 ---------- */
const ZODIAC = [
  [120, '摩羯座'], [219, '水瓶座'], [320, '双鱼座'], [419, '白羊座'], [520, '金牛座'], [621, '双子座'],
  [722, '巨蟹座'], [822, '狮子座'], [922, '处女座'], [1023, '天秤座'], [1122, '天蝎座'], [1221, '射手座'], [1231, '摩羯座'],
];
export function zodiacCalc(values) {
  const month = parseInt(values[0], 10);
  const day = parseInt(values[1], 10);
  if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) return '请输入合法日期（月/日）';
  const md = month * 100 + day;
  for (const [limit, name] of ZODIAC) if (md <= limit) return name;
  return '摩羯座';
}

/* ---------- 生肖 ---------- */
const ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const ELEMENTS = ['金', '水', '木', '火', '土'];
export function zodiacAnimalCalc(values) {
  const year = parseInt(values[0], 10);
  if (!year || year < 1) return '请输入有效年份';
  const animal = ANIMALS[((year - 4) % 12 + 12) % 12];
  const element = ELEMENTS[Math.floor(((year - 4) % 10 + 10) % 10 / 2)];
  return [{ name: '生肖', value: animal }, { name: '五行', value: element }, { name: '本命年', value: (year - 1984) % 12 === 0 ? '是' : '否' }];
}

/* ---------- 干支纪年 ---------- */
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export function ganzhiCalc(values) {
  const year = parseInt(values[0], 10);
  if (!year || year < 1) return '请输入有效年份';
  const stem = STEMS[((year - 4) % 10 + 10) % 10];
  const branch = BRANCHES[((year - 4) % 12 + 12) % 12];
  return `${stem}${branch}年`;
}

/* ---------- 闰年 ---------- */
export function leapYearCalc(values) {
  const year = parseInt(values[0], 10);
  if (!year || year < 1) return '请输入有效年份';
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  return [{ name: '是否闰年', value: isLeap ? '是' : '否' },
          { name: '二月天数', value: isLeap ? '29 天' : '28 天' },
          { name: '全年天数', value: isLeap ? '366 天' : '365 天' }];
}

/* ---------- 一年中的第几天 / 周数 ---------- */
export function dayOfYearCalc(values) {
  const d = parseDate(values[0]);
  if (!d) return '请输入有效日期';
  const start = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d - start) / 86400000) + 1;
  const week = Math.ceil(dayOfYear / 7);
  const total = ((d.getFullYear() % 4 === 0 && d.getFullYear() % 100 !== 0) || d.getFullYear() % 400 === 0) ? 366 : 365;
  return [
    { name: '一年中第几天', value: `${dayOfYear} / ${total}` },
    { name: '第几周（粗略）', value: `第 ${week} 周` },
    { name: '星期', value: `星期${WEEK_CN[d.getDay()]}` },
    { name: '剩余天数', value: `${total - dayOfYear} 天` },
  ];
}

/* ---------- 日期差 ---------- */
export function daysBetweenCalc(values) {
  const a = parseDate(values[0]);
  const b = parseDate(values[1]);
  if (!a || !b) return '请输入有效日期';
  const days = Math.round((b - a) / 86400000);
  const abs = Math.abs(days);
  const weeks = Math.floor(abs / 7);
  const remain = abs % 7;
  const sign = days > 0 ? '后' : days < 0 ? '前' : '当天';
  return [
    { name: '相差天数', value: `${abs.toLocaleString()} 天` },
    { name: '方向', value: `${fmtDate(b)} 在 ${fmtDate(a)} ${sign}` },
    { name: '周 + 天', value: `${weeks} 周 ${remain} 天` },
    { name: '月（约）', value: `${(abs / 30.44).toFixed(1)} 个月` },
  ];
}

/* ---------- 日期加减 ---------- */
export function dateAddCalc(values) {
  const d = parseDate(values[0]);
  const n = parseInt(values[1], 10);
  if (!d) return '请输入有效日期';
  if (Number.isNaN(n)) return '请输入有效天数';
  const out = new Date(d.getTime() + n * 86400000);
  return [{ name: '结果', value: `${fmtDate(out)} 星期${WEEK_CN[out.getDay()]}` },
          { name: '星期', value: `星期${WEEK_CN[out.getDay()]}` }];
}

/* ---------- 工作日/自然日 ---------- */
export function workdaysCalc(values) {
  const a = parseDate(values[0]);
  const b = parseDate(values[1]);
  if (!a || !b) return '请输入有效日期';
  const [start, end] = a <= b ? [a, b] : [b, a];
  let workdays = 0, weekends = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const w = cur.getDay();
    if (w === 0 || w === 6) weekends++; else workdays++;
    cur.setDate(cur.getDate() + 1);
  }
  const total = Math.round((end - start) / 86400000) + 1;
  return [
    { name: '自然日', value: `${total} 天` },
    { name: '工作日（周一~五）', value: `${workdays} 天` },
    { name: '周末', value: `${weekends} 天` },
    { name: '周数（约）', value: `${(total / 7).toFixed(1)} 周` },
  ];
}

/* ---------- 日期格式化 ---------- */
export function dateFormatCalc(values) {
  const d = parseDate(values[0]);
  if (!d) return '请输入有效日期';
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const pad = (n) => String(n).padStart(2, '0');
  const week = `星期${WEEK_CN[d.getDay()]}`;
  return [
    { name: 'YYYY-MM-DD', value: `${y}-${pad(m)}-${pad(day)}` },
    { name: 'YYYY/MM/DD', value: `${y}/${pad(m)}/${pad(day)}` },
    { name: 'MM/DD/YYYY（美）', value: `${pad(m)}/${pad(day)}/${y}` },
    { name: 'DD/MM/YYYY（欧）', value: `${pad(day)}/${pad(m)}/${y}` },
    { name: 'YYYY年M月D日', value: `${y}年${m}月${day}日 ${week}` },
    { name: '中文长格式', value: `${y} 年 ${m} 月 ${day} 日` },
    { name: 'ISO 完整', value: d.toISOString() },
    { name: 'Unix 时间戳', value: String(Math.floor(d.getTime() / 1000)) },
  ];
}

/* ---------- 未来/过去节日提醒（最近 3 个） ---------- */
export function upcomingHolidayCalc(values) {
  const today = new Date();
  const holidays = [
    [1, 1, '元旦'], [2, 14, '情人节'], [3, 8, '妇女节'], [3, 12, '植树节'],
    [4, 1, '愚人节'], [5, 1, '劳动节'], [5, 4, '青年节'], [6, 1, '儿童节'],
    [7, 1, '建党节'], [8, 1, '建军节'], [9, 10, '教师节'], [10, 1, '国庆节'],
    [12, 24, '平安夜'], [12, 25, '圣诞节'],
  ];
  const list = [];
  for (let offset = 0; offset < 370; offset++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    for (const [m, day, name] of holidays) {
      if (d.getMonth() + 1 === m && d.getDate() === day) {
        list.push({ name: `${name}（${m}月${day}日）`, value: `${offset === 0 ? '今天' : offset + ' 天后'}` });
      }
    }
    if (list.length >= 5) break;
  }
  return list.length ? list : '暂无';
}
