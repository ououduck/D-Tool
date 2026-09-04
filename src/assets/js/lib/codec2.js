/* D-Tool 编码算法库 2（纯函数，Node 可测）
   覆盖：Base62/Base36、ROT5、NATO 音标、猪圈密码、键盘移位、单表替换、AES 加解密 */

const te = new TextEncoder();
const td = new TextDecoder();
const bytesToHex = (b) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
const hexToBytes = (hex) => {
  hex = hex.replace(/\s+/g, '').toLowerCase();
  if (!/^[0-9a-f]*$/.test(hex) || hex.length % 2) throw new Error('非法十六进制串');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
};

/* ---------- Base62（0-9a-zA-Z，短链/邀请码常用） ---------- */
const B62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
export function base62Encode(input) {
  const bytes = utf8Bytes(input);
  let n = 0n;
  for (const b of bytes) n = n * 256n + BigInt(b);
  if (n === 0n) return '0';
  let out = '';
  while (n > 0n) { out = B62[Number(n % 62n)] + out; n /= 62n; }
  return out;
}
export function base62Decode(s) {
  const clean = String(s).trim();
  if (!clean) throw new Error('输入为空');
  let n = 0n;
  for (const ch of clean) {
    const d = B62.indexOf(ch);
    if (d < 0) throw new Error(`非法 Base62 字符：${ch}`);
    n = n * 62n + BigInt(d);
  }
  return bytesToText(bigintToBytes(n));
}
/* ---------- Base36（0-9a-z） ---------- */
export function base36Encode(input) {
  const bytes = utf8Bytes(input);
  let n = 0n;
  for (const b of bytes) n = n * 256n + BigInt(b);
  if (n === 0n) return '0';
  let out = '';
  while (n > 0n) { const r = Number(n % 36n); out = (r < 10 ? String(r) : String.fromCharCode(87 + r)) + out; n /= 36n; }
  return out;
}
export function base36Decode(s) {
  const clean = String(s).trim().toLowerCase();
  if (!clean) throw new Error('输入为空');
  let n = 0n;
  for (const ch of clean) {
    const d = ch >= '0' && ch <= '9' ? ch.charCodeAt(0) - 48 : ch >= 'a' && ch <= 'z' ? ch.charCodeAt(0) - 87 : -1;
    if (d < 0) throw new Error(`非法 Base36 字符：${ch}`);
    n = n * 36n + BigInt(d);
  }
  return bytesToText(bigintToBytes(n));
}
function utf8Bytes(s) { return te.encode(s); }
function bytesToText(b) { return td.decode(new Uint8Array(b)); }
function bigintToBytes(n) {
  if (n === 0n) return [0];
  const out = [];
  while (n > 0n) { out.unshift(Number(n % 256n)); n /= 256n; }
  return out;
}

/* ---------- ROT5（数字旋转 5 位） ---------- */
export function rot5(s) {
  return s.replace(/[0-9]/g, (c) => String((Number(c) + 5) % 10));
}
/* ---------- ROT18 = ROT13 + ROT5 ---------- */
export function rot18(s) {
  return rot5(rot13impl(s));
}
function rot13impl(s) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

/* ---------- NATO 音标字母 ---------- */
const NATO = {
  A: 'Alfa', B: 'Bravo', C: 'Charlie', D: 'Delta', E: 'Echo', F: 'Foxtrot', G: 'Golf',
  H: 'Hotel', I: 'India', J: 'Juliett', K: 'Kilo', L: 'Lima', M: 'Mike', N: 'November',
  O: 'Oscar', P: 'Papa', Q: 'Quebec', R: 'Romeo', S: 'Sierra', T: 'Tango', U: 'Uniform',
  V: 'Victor', W: 'Whiskey', X: 'X-ray', Y: 'Yankee', Z: 'Zulu',
};
export function natoEncode(input) {
  return [...input.toUpperCase()].map((ch) => {
    if (NATO[ch]) return `${ch} = ${NATO[ch]}`;
    if (ch === ' ') return '';
    if (/[0-9]/.test(ch)) return `${ch} = 数字 ${ch}`;
    return `${ch} = ${ch}`;
  }).filter(Boolean).join('\n');
}
export function natoDecode(input) {
  const lines = String(input).split(/\n/);
  const out = [];
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9])\s*=/);
    if (m) out.push(m[1]);
  }
  return out.join('');
}

/* ---------- 猪圈密码（Pigpen，经典 26 字母） ---------- */
/* 编码为可读符号：使用占位网格标记 [1A] [2B] 等（字母→网格坐标），解码反向 */
const PIGPEN_GRID = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // 26 字母（I/J 合并）
export function pigpenEncode(input) {
  return [...input.toUpperCase().replace(/J/g, 'I')].map((ch) => {
    const idx = PIGPEN_GRID.indexOf(ch);
    if (idx < 0) return ch;
    const grid = Math.floor(idx / 9); // 0: 无点 1: 点 2: 叉
    const pos = idx % 9;
    const row = Math.floor(pos / 3) + 1;
    const col = (pos % 3) + 1;
    const dot = grid === 1 ? '•' : grid === 2 ? '×' : '';
    return `[${dot}${row}${col}]`;
  }).join(' ');
}
export function pigpenDecode(input) {
  let out = '';
  const re = /\[([•×]?)([123])([123])\]/g;
  let m;
  let last = 0;
  while ((m = re.exec(input)) !== null) {
    out += input.slice(last, m.index).replace(/\s+/g, ''); // 忽略 token 间空白
    const dot = m[1] === '•' ? 1 : m[1] === '×' ? 2 : 0;
    const row = Number(m[2]) - 1;
    const col = Number(m[3]) - 1;
    const idx = dot * 9 + row * 3 + col;
    out += PIGPEN_GRID[idx] || '?';
    last = m.index + m[0].length;
  }
  out += input.slice(last).replace(/\s+/g, '');
  return out;
}

/* ---------- 键盘移位密码（QWERTY 同行左右移） ---------- */
const KB_ROWS_LOWER = ['`1234567890-=', 'qwertyuiop[]\\', 'asdfghjkl;\'', 'zxcvbnm,./'];
const KB_ROWS_UPPER = ['~!@#$%^&*()_+', 'QWERTYUIOP{}|', 'ASDFGHJKL:"', 'ZXCVBNM<>?'];
export function keyboardShift(input, dir = 'right') {
  const shift = dir === 'left' ? -1 : 1;
  return [...input].map((ch) => {
    for (let r = 0; r < 4; r++) {
      let idx = KB_ROWS_LOWER[r].indexOf(ch);
      if (idx >= 0) {
        return KB_ROWS_LOWER[r][(idx + shift + KB_ROWS_LOWER[r].length) % KB_ROWS_LOWER[r].length];
      }
      idx = KB_ROWS_UPPER[r].indexOf(ch);
      if (idx >= 0) {
        return KB_ROWS_UPPER[r][(idx + shift + KB_ROWS_UPPER[r].length) % KB_ROWS_UPPER[r].length];
      }
    }
    return ch;
  }).join('');
}
export const keyboardShiftRight = (input) => keyboardShift(input, 'right');
export const keyboardShiftLeft = (input) => keyboardShift(input, 'left');

/* ---------- 单表替换密码（密钥字母表） ---------- */
export function substitutionEncode(input, key = '') {
  const clean = key.toUpperCase().replace(/[^A-Z]/g, '');
  let alphabet = '';
  for (const ch of clean + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') if (!alphabet.includes(ch)) alphabet += ch;
  const map = {};
  for (let i = 0; i < 26; i++) map[String.fromCharCode(65 + i)] = alphabet[i];
  return [...input].map((ch) => {
    const u = ch.toUpperCase();
    if (/[A-Z]/.test(u)) return ch === u ? map[u] : map[u].toLowerCase();
    return ch;
  }).join('');
}
export function substitutionDecode(input, key = '') {
  const clean = key.toUpperCase().replace(/[^A-Z]/g, '');
  let alphabet = '';
  for (const ch of clean + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') if (!alphabet.includes(ch)) alphabet += ch;
  const map = {};
  for (let i = 0; i < 26; i++) map[alphabet[i]] = String.fromCharCode(65 + i);
  return [...input].map((ch) => {
    const u = ch.toUpperCase();
    if (/[A-Z]/.test(u) && map[u]) return ch === u ? map[u] : map[u].toLowerCase();
    return ch;
  }).join('');
}

/* ---------- AES-GCM 加解密（WebCrypto，输出 Base64） ---------- */
function bufToB64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64ToBuf(b64) {
  const bin = atob(b64.replace(/\s+/g, ''));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}
function sha256Bytes(text) {
  return crypto.subtle.digest('SHA-256', te.encode(text));
}
export async function aesEncrypt(input, password) {
  if (!password) throw new Error('请填写密码');
  const keyMaterial = await crypto.subtle.importKey('raw', await sha256Bytes(password), 'PBKDF2', false, ['deriveKey']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: te.encode('d-tool-aes'), iterations: 10000, hash: 'SHA-256' },
    keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt'],
  );
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, te.encode(input));
  const combined = new Uint8Array(12 + ct.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ct), 12);
  return bufToB64(combined.buffer);
}
export async function aesDecrypt(input, password) {
  if (!password) throw new Error('请填写密码');
  const data = new Uint8Array(b64ToBuf(input));
  if (data.length < 13) throw new Error('密文格式不正确');
  const iv = data.slice(0, 12);
  const ct = data.slice(12);
  const keyMaterial = await crypto.subtle.importKey('raw', await sha256Bytes(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: te.encode('d-tool-aes'), iterations: 10000, hash: 'SHA-256' },
    keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
  );
  try {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
    return td.decode(new Uint8Array(pt));
  } catch {
    throw new Error('解密失败：密码错误或密文已损坏');
  }
}
