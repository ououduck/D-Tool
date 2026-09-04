/* 单位换算 —— 线性单位用系数表，温度为仿射变换 */

/* 每种单位：值 → 基准单位 = v * k + b；基准 → 值 = (v - b) / k */
const DEF = (k, b = 0) => [k, b];

export const UNIT_CATEGORIES = {
  length: {
    name: '长度',
    units: {
      mm: ['毫米', ...DEF(0.001)], cm: ['厘米', ...DEF(0.01)], m: ['米', ...DEF(1)],
      km: ['千米', ...DEF(1000)], in: ['英寸', ...DEF(0.0254)], ft: ['英尺', ...DEF(0.3048)],
      yd: ['码', ...DEF(0.9144)], mi: ['英里', ...DEF(1609.344)], nmi: ['海里', ...DEF(1852)],
      li: ['市里', ...DEF(500)],
    },
  },
  weight: {
    name: '重量',
    units: {
      mg: ['毫克', ...DEF(1e-6)], g: ['克', ...DEF(0.001)], kg: ['千克', ...DEF(1)],
      t: ['吨', ...DEF(1000)], oz: ['盎司', ...DEF(0.028349523125)],
      lb: ['磅', ...DEF(0.45359237)], jin: ['斤', ...DEF(0.5)], liang: ['两', ...DEF(0.05)],
    },
  },
  temperature: {
    name: '温度',
    units: {
      c: ['摄氏度 ℃', ...DEF(1, 0), 0], f: ['华氏度 ℉', ...DEF(5 / 9, -32 * 5 / 9), 1],
      k: ['开尔文 K', ...DEF(1, -273.15), 2],
    },
  },
  area: {
    name: '面积',
    units: {
      'm2': ['平方米', ...DEF(1)], 'km2': ['平方千米', ...DEF(1e6)], ha: ['公顷', ...DEF(1e4)],
      mu: ['亩', ...DEF(2000 / 3)], 'ft2': ['平方英尺', ...DEF(0.09290304)],
      'in2': ['平方英寸', ...DEF(0.00064516)], 'yd2': ['平方码', ...DEF(0.83612736)],
      'mile2': ['平方英里', ...DEF(2589988.110336)],
    },
  },
  volume: {
    name: '体积',
    units: {
      ml: ['毫升', ...DEF(1e-6)], l: ['升', ...DEF(0.001)], 'm3': ['立方米', ...DEF(1)],
      'ft3': ['立方英尺', ...DEF(0.028316846592)],
      gal: ['加仑(美)', ...DEF(0.003785411784)], qt: ['夸脱(美)', ...DEF(0.000946352946)],
    },
  },
  speed: {
    name: '速度',
    units: {
      'm/s': ['米/秒', ...DEF(1)], 'km/h': ['千米/小时', ...DEF(1 / 3.6)],
      mph: ['英里/小时', ...DEF(0.44704)], knot: ['节', ...DEF(0.514444444444)],
      'ft/s': ['英尺/秒', ...DEF(0.3048)],
    },
  },
  data: {
    name: '数据大小（二进制）',
    units: {
      b: ['位 b', ...DEF(1 / 8)], B: ['字节 B', ...DEF(1)],
      KB: ['KB (1000)', ...DEF(1000)], MB: ['MB (1000)', ...DEF(1e6)], GB: ['GB (1000)', ...DEF(1e9)],
      KiB: ['KiB (1024)', ...DEF(1024)], MiB: ['MiB (1024)', ...DEF(1024 ** 2)],
      GiB: ['GiB (1024)', ...DEF(1024 ** 3)], TiB: ['TiB (1024)', ...DEF(1024 ** 4)],
    },
  },
  time: {
    name: '时间',
    units: {
      ms: ['毫秒', ...DEF(0.001)], s: ['秒', ...DEF(1)], min: ['分钟', ...DEF(60)],
      h: ['小时', ...DEF(3600)], d: ['天', ...DEF(86400)], week: ['周', ...DEF(604800)],
      month: ['月(30天)', ...DEF(2592000)], year: ['年(365天)', ...DEF(31536000)],
    },
  },
};

export function convertUnits(value, from, to, category) {
  const v = Number(value);
  if (!Number.isFinite(v)) return NaN;
  const [fk, fb] = category.units[from].slice(1, 3);
  const [tk, tb] = category.units[to].slice(1, 3);
  const base = v * fk + fb;
  return (base - tb) / tk;
}

/* 数值格式化：去尾零、千分位、自动缩位 */
export function formatNumber(n, maxFrac = 6) {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  let str;
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) {
    str = n.toExponential(6).replace(/\.?0+e/, 'e');
  } else {
    str = Number(n.toFixed(maxFrac)).toString();
  }
  // 千分位
  const [int, frac] = str.split('.');
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (frac ? '.' + frac : '');
}
