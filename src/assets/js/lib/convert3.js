/* D-Tool 转换/数学/日期/开发 补强算法库（纯函数，Node 可测） */

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

/* ================= 转换 ================= */
/* ---------- 鞋码换算（脚长 cm ↔ 欧码/美码/英码/中国码） ---------- */
export function shoeSizeCalc(values) {
  const cm = num(values[0]);
  const mode = values[1] || 'cm';
  if (!cm || cm < 15 || cm > 35) return '请输入脚长（15-35cm）';
  // 常用对照：欧码 ≈ 脚长×1.5+2 的近似拟合
  const eu = Math.round(cm * 1.5 + 2);
  const usM = Math.round(cm * 1.5 - 22);
  const usW = Math.round(cm * 1.5 - 24);
  const uk = Math.round(cm * 1.5 - 24.5);
  const cn = Math.round(cm * 2 - 10);
  return [
    { name: '脚长', value: `${cm} cm` },
    { name: '欧码 EU', value: String(eu) },
    { name: '中国码 CN', value: String(cn) },
    { name: '美码 US(男)', value: String(usM) },
    { name: '美码 US(女)', value: String(usW) },
    { name: '英码 UK', value: String(uk) },
    { name: '提示', value: '不同品牌尺码有偏差，建议按实际试穿' },
  ];
}

/* ---------- 衣服尺码（身高体重 → 建议码） ---------- */
export function clothesSizeCalc(values) {
  const [height, weight, gender] = [num(values[0]), num(values[1]), values[2] || 'male'];
  if (!height || !weight || height < 120 || height > 220) return '请输入身高（120-220cm）与体重';
  const bmi = weight / (height / 100) ** 2;
  // 基于身高的基础码 + BMI 修正
  let size;
  if (gender === 'male') {
    size = height >= 185 ? 'XXL' : height >= 178 ? 'XL' : height >= 170 ? 'L' : height >= 163 ? 'M' : 'S';
    if (bmi >= 26) size = size === 'XXL' ? 'XXXL' : size === 'XL' ? 'XXL' : size === 'L' ? 'XL' : size === 'M' ? 'L' : 'M';
  } else {
    size = height >= 175 ? 'XL' : height >= 168 ? 'L' : height >= 160 ? 'M' : 'S';
    if (bmi >= 25) size = size === 'XL' ? 'XXL' : size === 'L' ? 'XL' : size === 'M' ? 'L' : 'M';
  }
  return [
    { name: '建议尺码', value: size },
    { name: '身高/体重', value: `${height}cm / ${weight}kg` },
    { name: 'BMI', value: fmt(bmi, 1) },
    { name: '提示', value: '版型差异大（修身/宽松），仅供参考' },
  ];
}

/* ---------- K 金纯度换算 ---------- */
export function goldKaratCalc(values) {
  const k = num(values[0]);
  const purity = k / 24 * 100;
  const names = {
    24: '足金（24K）', 22: '22K 金', 18: '18K 金', 14: '14K 金', 10: '10K 金', 9: '9K 金',
  };
  return [
    { name: '纯度', value: `${fmt(purity, 2)}%` },
    { name: '含金量', value: `${fmt(purity / 100, 4)}（千分数 ${Math.round(purity * 10)}‰）` },
    { name: '常见叫法', value: names[k] || '非标准 K 数' },
  ];
}

/* ---------- 屏幕长宽比 ---------- */
export function aspectRatioCalc(values) {
  const [w, h] = [num(values[0]), num(values[1])];
  if (!w || !h) return '请输入宽与高';
  const g = gcd(Math.round(w), Math.round(h));
  return [
    { name: '最简比例', value: `${Math.round(w / g)}:${Math.round(h / g)}` },
    { name: '宽高比', value: fmt(w / h, 4) },
    { name: '高宽比', value: fmt(h / w, 4) },
  ];
}
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

/* ================= 数学 ================= */
/* ---------- 一元二次方程 ax²+bx+c=0 ---------- */
export function quadraticCalc(values) {
  const [a, b, c] = values.map((x) => num(x));
  if (!a) return 'a 不能为 0（否则不是二次方程）';
  const disc = b * b - 4 * a * c;
  if (disc < 0) {
    return [
      { name: '判别式 Δ', value: fmt(disc, 4) },
      { name: '根', value: '无实数根（有两个共轭复根）' },
    ];
  }
  const sqrt = Math.sqrt(disc);
  const x1 = (-b + sqrt) / (2 * a);
  const x2 = (-b - sqrt) / (2 * a);
  const vertexX = -b / (2 * a);
  const vertexY = (4 * a * c - b * b) / (4 * a);
  return [
    { name: '判别式 Δ', value: fmt(disc, 4) },
    { name: '根 x₁', value: fmt(x1, 6) },
    { name: '根 x₂', value: fmt(x2, 6) },
    { name: '顶点坐标', value: `(${fmt(vertexX, 4)}, ${fmt(vertexY, 4)})` },
    { name: '开口方向', value: a > 0 ? '向上（有最小值）' : '向下（有最大值）' },
  ];
}

/* ---------- 向量计算 ---------- */
export function vectorCalc(values) {
  const [x1, y1, x2, y2] = values.map((x) => num(x));
  if (![x1, y1, x2, y2].every((n) => Number.isFinite(n))) return '请输入四个分量';
  const len1 = Math.sqrt(x1 * x1 + y1 * y1);
  const len2 = Math.sqrt(x2 * x2 + y2 * y2);
  const dot = x1 * x2 + y1 * y2;
  const angle = len1 && len2 ? Math.acos(Math.min(1, Math.max(-1, dot / (len1 * len2)))) * 180 / Math.PI : 0;
  return [
    { name: '向量 a 模长', value: fmt(len1, 4) },
    { name: '向量 b 模长', value: fmt(len2, 4) },
    { name: '点积 a·b', value: fmt(dot, 4) },
    { name: '夹角', value: fmt(angle, 2) + '°' },
    { name: 'a+b', value: `(${fmt(x1 + x2, 4)}, ${fmt(y1 + y2, 4)})` },
    { name: 'a−b', value: `(${fmt(x1 - x2, 4)}, ${fmt(y1 - y2, 4)})` },
  ];
}

/* ================= 日期 ================= */
/* ---------- 农历新年（春节）日期查询 1990-2049 ---------- */
const SPRING_FESTIVAL = {
  1990: '1990-01-27', 1991: '1991-02-15', 1992: '1992-02-04', 1993: '1993-01-23', 1994: '1994-02-10',
  1995: '1995-01-31', 1996: '1996-02-19', 1997: '1997-02-07', 1998: '1998-01-28', 1999: '1999-02-16',
  2000: '2000-02-05', 2001: '2001-01-24', 2002: '2002-02-12', 2003: '2003-02-01', 2004: '2004-01-22',
  2005: '2005-02-09', 2006: '2006-01-29', 2007: '2007-02-18', 2008: '2008-02-07', 2009: '2009-01-26',
  2010: '2010-02-14', 2011: '2011-02-03', 2012: '2012-01-23', 2013: '2013-02-10', 2014: '2014-01-31',
  2015: '2015-02-19', 2016: '2016-02-08', 2017: '2017-01-28', 2018: '2018-02-16', 2019: '2019-02-05',
  2020: '2020-01-25', 2021: '2021-02-12', 2022: '2022-02-01', 2023: '2023-01-22', 2024: '2024-02-10',
  2025: '2025-01-29', 2026: '2026-02-17', 2027: '2027-02-06', 2028: '2028-01-26', 2029: '2029-02-13',
  2030: '2030-02-03', 2031: '2031-01-23', 2032: '2032-02-11', 2033: '2033-01-31', 2034: '2034-02-19',
  2035: '2035-02-08', 2036: '2036-01-28', 2037: '2037-02-15', 2038: '2038-02-04', 2039: '2039-01-24',
  2040: '2040-02-12', 2041: '2041-02-01', 2042: '2042-01-22', 2043: '2043-02-10', 2044: '2044-01-30',
  2045: '2045-02-17', 2046: '2046-02-06', 2047: '2047-01-26', 2048: '2048-02-14', 2049: '2049-02-02',
};
export function springFestivalCalc(values) {
  const year = parseInt(values[0], 10);
  if (!year || !SPRING_FESTIVAL[year]) return '请输入 1990-2049 之间的年份';
  const d = SPRING_FESTIVAL[year];
  const weekday = new Date(d).getDay();
  const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  const animal = animals[((year - 4) % 12 + 12) % 12];
  return [
    { name: '春节日期', value: d },
    { name: '星期', value: '星期' + '日一二三四五六'[weekday] },
    { name: '生肖', value: `${animal}年` },
    { name: '说明', value: '数据覆盖 1990-2049 年' },
  ];
}

/* ================= 开发 ================= */
/* ---------- JSON → YAML（基础） ---------- */
export function jsonToYaml(input) {
  let obj;
  try { obj = JSON.parse(input); } catch (e) { return 'JSON 解析失败：' + e.message; }
  const lines = [];
  const walk = (v, indent) => {
    const pad = '  '.repeat(indent);
    if (v === null) return 'null';
    if (Array.isArray(v)) {
      if (!v.length) return '[]';
      return v.map((item) => `\n${pad}- ${String(walk(item, indent + 1)).replace(/\n/g, '\n' + pad + '  ')}`).join('');
    }
    if (typeof v === 'object') {
      const keys = Object.keys(v);
      if (!keys.length) return '{}';
      return '\n' + keys.map((k) => {
        const val = walk(v[k], indent + 1);
        return `${pad}${k}: ${String(val).replace(/\n/g, '\n' + pad)}`;
      }).join('\n');
    }
    if (typeof v === 'string') return /^[\w\s./-]+$/.test(v) && !v.includes(': ') ? v : JSON.stringify(v);
    return String(v);
  };
  const keys = Object.keys(obj);
  for (const k of keys) {
    const val = walk(obj[k], 0);
    lines.push(`${k}: ${String(val).replace(/\n/g, '\n')}`);
  }
  return lines.join('\n');
}

/* ---------- 代码行数统计 ---------- */
export function codeStats(input) {
  const lines = input.replace(/\r\n/g, '\n').split('\n');
  const total = lines.length;
  const blank = lines.filter((l) => !l.trim()).length;
  const comment = lines.filter((l) => /^\s*(\/\/|#|\/\*|\*|<!--|--)/.test(l)).length;
  const code = total - blank - comment;
  return [
    { name: '总行数', value: String(total) },
    { name: '代码行', value: String(code) },
    { name: '注释行', value: String(comment) },
    { name: '空行', value: String(blank) },
  ];
}

/* ---------- 括号匹配检查 ---------- */
export function bracketCheck(input) {
  const pairs = { ')': '(', ']': '[', '}': '{', '》': '《', '」': '「', '』': '『' };
  const stack = [];
  const openers = new Set(Object.values(pairs));
  let line = 1, col = 0;
  for (const ch of input) {
    col++;
    if (ch === '\n') { line++; col = 0; }
    if (openers.has(ch)) stack.push({ ch, line, col });
    else if (pairs[ch]) {
      const top = stack.pop();
      if (!top) return `第 ${line} 行：多余的闭合括号 ${ch}`;
      if (top.ch !== pairs[ch]) return `第 ${line} 行：括号不匹配（${top.ch} 在 ${top.line}:${top.col} 未闭合，遇到 ${ch}）`;
    }
  }
  if (stack.length) {
    const t = stack[stack.length - 1];
    return `第 ${t.line} 行：${t.ch} 未闭合（共 ${stack.length} 个未闭合）`;
  }
  return '所有括号匹配 ✓';
}

/* ---------- 版本号比较（semver） ---------- */
export function versionCompare(values) {
  const [a, b] = [String(values[0] || '').trim(), String(values[1] || '').trim()];
  if (!a || !b) return '请输入两个版本号';
  const pa = a.replace(/^v/, '').split('.').map((x) => parseInt(x, 10) || 0);
  const pb = b.replace(/^v/, '').split('.').map((x) => parseInt(x, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const x = pa[i] || 0, y = pb[i] || 0;
    if (x > y) return `v${a} > v${b}`;
    if (x < y) return `v${a} < v${b}`;
  }
  return `v${a} = v${b}`;
}

/* ================= 生活 ================= */
/* ---------- 个人所得税（综合所得，年度） ---------- */
export function incomeTaxCalc(values) {
  const annual = num(values[0]);
  const special = num(values[1] || 0); // 专项附加扣除合计
  const threshold = 60000;
  const taxable = Math.max(0, annual - threshold - special);
  const brackets = [
    [36000, 0.03, 0], [144000, 0.1, 2520], [300000, 0.2, 16920],
    [420000, 0.25, 31920], [660000, 0.3, 52920], [960000, 0.35, 85920], [Infinity, 0.45, 181920],
  ];
  let rate = 0.45, quick = 181920;
  for (const [limit, r, q] of brackets) {
    if (taxable <= limit) { rate = r; quick = q; break; }
  }
  const tax = taxable * rate - quick;
  const monthly = tax / 12;
  return [
    { name: '应纳税所得额', value: fmt(taxable, 2) + ' 元' },
    { name: '税率', value: `${Math.round(rate * 100)}%` },
    { name: '全年应纳税额', value: fmt(Math.max(0, tax), 2) + ' 元' },
    { name: '平均每月', value: fmt(Math.max(0, monthly), 2) + ' 元' },
    { name: '说明', value: '按综合所得年度汇算（起征点 6 万/年）估算，专项扣除按输入' },
  ];
}
