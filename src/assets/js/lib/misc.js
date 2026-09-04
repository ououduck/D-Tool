/* 编解码与校验算法库：摩斯电码 / 凯撒密码 / Base32 / Luhn / 身份证 / 罗马数字 / 人民币大写 / EAN-13 */

/* ---------- 摩斯电码（ITU 标准，A-Z 0-9） ---------- */
const MORSE_MAP = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....',
  6: '-....', 7: '--...', 8: '---..', 9: '----.',
};
const MORSE_REV = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

export function textToMorse(text) {
  return String(text)
    .toUpperCase()
    .split('')
    .map((ch) => {
      if (ch === ' ') return '/';
      return MORSE_MAP[ch] || '';
    })
    .filter((v, i, arr) => v !== '' || arr[i - 1] !== '/')
    .join(' ');
}

export function morseToText(morse) {
  return String(morse)
    .trim()
    .split(/\s+/)
    .map((code) => {
      if (code === '/') return ' ';
      return MORSE_REV[code] || '?';
    })
    .join('');
}

/* ---------- 凯撒密码 ---------- */
export function caesar(text, shift, decode = false) {
  const s = decode ? -shift : shift;
  return String(text)
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + s + 26) % 26) + 65);
      if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + s + 26) % 26) + 97);
      return ch;
    })
    .join('');
}

/* ---------- Base32（RFC 4648） ---------- */
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Encode(text) {
  const bytes = new TextEncoder().encode(text);
  let bits = 0, value = 0, out = '';
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  while (out.length % 8) out += '=';
  return out;
}

export function base32Decode(b32) {
  const s = String(b32).toUpperCase().replace(/=+$/, '').replace(/\s+/g, '');
  if (!/^[A-Z2-7]+$/.test(s)) throw new Error('不是合法的 Base32 文本');
  let bits = 0, value = 0;
  const bytes = [];
  for (const ch of s) {
    value = (value << 5) | B32.indexOf(ch);
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new TextDecoder().decode(new Uint8Array(bytes));
}

/* ---------- Luhn 校验（银行卡号） ---------- */
export function luhnCheck(digits) {
  const s = String(digits).replace(/[\s-]/g, '');
  if (!/^\d+$/.test(s)) return false;
  let sum = 0;
  const parity = s.length % 2;
  for (let i = 0; i < s.length; i++) {
    let d = s.charCodeAt(i) - 48;
    if (i % 2 === parity) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

/* ---------- 身份证校验（18 位 GB 11643-1999） ---------- */
const ID_W = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const ID_CODE = '10X98765432';

export function idcardCheck(id) {
  const s = String(id).trim().toUpperCase();
  if (!/^\d{17}[\dX]$/.test(s)) return { ok: false, msg: '长度或格式不正确（需 18 位，末位可为 X）' };
  const birth = s.slice(6, 14);
  const y = Number(birth.slice(0, 4)), m = Number(birth.slice(4, 6)), d = Number(birth.slice(6, 8));
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return { ok: false, msg: '出生日期无效' };
  }
  if (y < 1900 || y > new Date().getFullYear()) return { ok: false, msg: '出生年份超出合理范围' };
  let sum = 0;
  for (let i = 0; i < 17; i++) sum += Number(s[i]) * ID_W[i];
  const expect = ID_CODE[sum % 11];
  if (expect !== s[17]) return { ok: false, msg: `校验位应为 ${expect}，实际为 ${s[17]}` };
  const gender = Number(s[16]) % 2 === 1 ? '男' : '女';
  return {
    ok: true,
    birth: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    gender,
    age: Math.max(0, new Date().getFullYear() - y - (new Date().getMonth() + 1 < m || (new Date().getMonth() + 1 === m && new Date().getDate() < d) ? 1 : 0)),
  };
}

/* ---------- 罗马数字（1-3999） ---------- */
const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];

export function toRoman(n) {
  n = Number(n);
  if (!Number.isInteger(n) || n < 1 || n > 3999) throw new Error('仅支持 1-3999 的整数');
  let out = '';
  for (const [v, sym] of ROMAN) {
    while (n >= v) { out += sym; n -= v; }
  }
  return out;
}

export function fromRoman(s) {
  const str = String(s).trim().toUpperCase();
  if (!/^[IVXLCDM]+$/.test(str)) throw new Error('不是合法的罗马数字');
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    const cur = ROMAN.find(([, sym]) => sym === str[i]);
    const next = ROMAN.find(([, sym]) => sym === str[i + 1]);
    if (cur && next && cur[0] < next[0]) total -= cur[0];
    else if (cur) total += cur[0];
  }
  if (toRoman(total) !== str) throw new Error('不是规范的罗马数字写法');
  return total;
}

/* ---------- 人民币大写（整数部分 0-9999亿） ---------- */
const CN_N = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
const CN_U = ['', '拾', '佰', '仟'];

function groupToCn(n) {
  // 0-9999 → 中文（不含单位尾缀）
  if (n === 0) return '零';
  let out = '';
  const s = String(n);
  let zero = false;
  for (let i = 0; i < s.length; i++) {
    const digit = Number(s[i]);
    const pos = s.length - 1 - i;
    if (digit === 0) {
      zero = true;
    } else {
      if (zero && out) out += '零';
      out += CN_N[digit] + CN_U[pos];
      zero = false;
    }
  }
  return out;
}

export function rmbUpper(amount) {
  let v = Number(amount);
  if (!Number.isFinite(v) || v < 0 || v > 999999999999.99) throw new Error('超出支持范围（0 ~ 9999 亿）');
  const fen = Math.round(v * 100);
  const intPart = Math.floor(fen / 100);
  const jiao = Math.floor((fen % 100) / 10);
  const fenPart = fen % 10;

  if (intPart === 0 && jiao === 0 && fenPart === 0) return '零元整';
  let out = '';
  if (intPart > 0) {
    const yi = Math.floor(intPart / 100000000);
    const wan = Math.floor((intPart % 100000000) / 10000);
    const ge = intPart % 10000;
    if (yi) out += groupToCn(yi) + '亿';
    if (wan) {
      if (yi && wan < 1000) out += '零';
      out += groupToCn(wan) + '万';
    }
    if (ge) {
      if ((yi || wan) && ge < 1000) out += '零';
      out += groupToCn(ge) + '元';
    } else if (yi || wan) {
      out += '元';
    }
  }
  if (jiao === 0 && fenPart === 0) {
    out += '整';
  } else {
    if (intPart > 0 && jiao === 0) out += '零';
    if (jiao) out += CN_N[jiao] + '角';
    if (fenPart) out += CN_N[fenPart] + '分';
  }
  return out;
}

/* ---------- EAN-13 校验位 ---------- */
export function ean13CheckDigit(first12) {
  const s = String(first12).replace(/\D/g, '');
  if (s.length !== 12) throw new Error('请输入 12 位数字（不含校验位）');
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(s[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10;
}

/* ---------- 随机字符（crypto 安全） ---------- */
const RAND_SETS = {
  printable: Array.from({ length: 94 }, (_, i) => String.fromCharCode(33 + i)).join(''), // 33-126 可打印 ASCII
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  alnum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  hex: '0123456789abcdef',
  bytes: null,
};
export function randomChars(count = 16, type = 'printable') {
  count = Math.max(1, Math.min(10000, parseInt(count, 10) || 16));
  const set = RAND_SETS[type] ?? RAND_SETS.printable;
  if (type === 'bytes') {
    const buf = new Uint8Array(count);
    crypto.getRandomValues(buf);
    return [...buf].map((b) => b.toString(16).padStart(2, '0')).join(' ');
  }
  const arr = new Uint32Array(count);
  crypto.getRandomValues(arr);
  let out = '';
  for (let i = 0; i < count; i++) out += set[arr[i] % set.length];
  return out;
}
