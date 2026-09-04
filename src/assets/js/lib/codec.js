/* D-Tool 编解码算法库（纯函数，Node 可测）
   覆盖：Base58/85/91、ROT13/47、Atbash、维吉尼亚、栅栏、培根、仿射、XOR、CRC16/32、Adler32、HMAC、PBKDF2、Quoted-Printable、哈希识别 */

/* ---------- 通用工具 ---------- */
const te = new TextEncoder();
const td = new TextDecoder();
const utf8 = (s) => te.encode(s);
const bytesToHex = (b) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
const hexToBytes = (hex) => {
  hex = hex.replace(/\s+/g, '').toLowerCase();
  if (!/^[0-9a-f]*$/.test(hex) || hex.length % 2) throw new Error('非法十六进制串');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
};

/* ---------- Base58（比特币字母表，无 0OIl） ---------- */
const B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
export function base58Encode(input) {
  const bytes = utf8(input);
  let n = 0n;
  for (const b of bytes) n = n * 256n + BigInt(b);
  let out = '';
  while (n > 0n) { out = B58[Number(n % 58n)] + out; n /= 58n; }
  for (const b of bytes) { if (b !== 0) break; out = '1' + out; }
  return out || '1';
}
export function base58Decode(s) {
  if (!s) throw new Error('输入为空');
  let n = 0n;
  for (const ch of s) {
    const i = B58.indexOf(ch);
    if (i < 0) throw new Error(`非法 Base58 字符：${ch}`);
    n = n * 58n + BigInt(i);
  }
  const bytes = [];
  while (n > 0n) { bytes.unshift(Number(n % 256n)); n /= 256n; }
  for (const ch of s) { if (ch !== '1') break; bytes.unshift(0); }
  return td.decode(new Uint8Array(bytes));
}

/* ---------- Base85（RFC 1924，与 Python base64.b85 完全兼容） ----------
   编码：4 字节大端整数 → 5 字符；末尾不足 4 字节补零后取前 len%4+1 个字符。
   解码：5 字符 → 4 字节；末尾不足 5 字符用 '~' 补齐后丢弃末尾对应字节。 */
const B85 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~";
export function base85Encode(input) {
  const bytes = utf8(input);
  const padding = (4 - (bytes.length % 4)) % 4;
  const padded = new Uint8Array(bytes.length + padding);
  padded.set(bytes);
  let out = '';
  for (let i = 0; i < padded.length; i += 4) {
    let n = 0n;
    for (let k = 0; k < 4; k++) n = n * 256n + BigInt(padded[i + k]);
    const chars = [];
    for (let k = 0; k < 5; k++) { chars.unshift(B85[Number(n % 85n)]); n /= 85n; }
    out += chars.join('');
  }
  return padding ? out.slice(0, out.length - padding) : out;
}
export function base85Decode(s) {
  const clean = s.replace(/\s+/g, '');
  if (!clean) return '';
  const padding = (5 - (clean.length % 5)) % 5;
  const padded = clean + '~'.repeat(padding);
  const out = [];
  for (let i = 0; i < padded.length; i += 5) {
    let n = 0n;
    for (const ch of padded.slice(i, i + 5)) {
      const d = B85.indexOf(ch);
      if (d < 0) throw new Error(`非法 Base85 字符：${ch}`);
      n = n * 85n + BigInt(d);
    }
    // 5 字符 → 4 字节（大端）
    out.push(Number(n / 16777216n % 256n), Number(n / 65536n % 256n), Number(n / 256n % 256n), Number(n % 256n));
  }
  if (padding) out.length -= padding; // '~' 补齐的字符在低位，删末尾对应字节
  return td.decode(new Uint8Array(out));
}

/* ---------- Base91 ---------- */
const B91 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\"";
export function base91Encode(input) {
  const bytes = utf8(input);
  let b = 0, n = 0, out = '';
  for (const byte of bytes) {
    b |= byte << n;
    n += 8;
    if (n > 13) {
      let v = b & 8191;
      if (v > 88) { b >>= 13; n -= 13; } else { v = b & 16383; b >>= 14; n -= 14; }
      out += B91[v % 91] + B91[Math.floor(v / 91)];
    }
  }
  if (n) {
    out += B91[b % 91];
    if (n > 7 || b > 90) out += B91[Math.floor(b / 91)];
  }
  return out;
}
export function base91Decode(s) {
  let v = -1, b = 0, n = 0, out = [];
  for (const ch of s) {
    const c = B91.indexOf(ch);
    if (c < 0) continue;
    if (v < 0) { v = c; continue; }
    v += c * 91;
    b |= v << n;
    n += (v & 8191) > 88 ? 13 : 14;
    do {
      out.push(b & 255);
      b >>= 8;
      n -= 8;
    } while (n > 7);
    v = -1;
  }
  if (v > -1) out.push((b | v << n) & 255);
  return td.decode(new Uint8Array(out));
}

/* ---------- ROT13 / ROT47 ---------- */
export function rot13(s) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}
export function rot47(s) {
  return s.replace(/[\x21-\x7E]/g, (c) => String.fromCharCode(33 + ((c.charCodeAt(0) - 33 + 47) % 94)));
}

/* ---------- Atbash ---------- */
export function atbash(s) {
  return s.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(base + 25 - (c.charCodeAt(0) - base));
  });
}

/* ---------- 维吉尼亚密码 ---------- */
export function vigenere(text, key, decode = false) {
  if (!key) throw new Error('请填写密钥');
  const k = key.replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (!k) throw new Error('密钥需包含字母');
  let i = 0;
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    const shift = k.charCodeAt(i++ % k.length) - 97;
    const d = decode ? (c.charCodeAt(0) - base - shift + 26) % 26 : (c.charCodeAt(0) - base + shift) % 26;
    return String.fromCharCode(base + d);
  });
}

/* ---------- 栅栏密码（n 轨） ---------- */
export function railFence(text, rails, decode = false) {
  rails = Math.max(2, Math.min(20, rails | 0));
  if (!decode) {
    const fence = Array.from({ length: rails }, () => []);
    let row = 0, down = true;
    for (const ch of text) {
      fence[row].push(ch);
      if (down) { if (row === rails - 1) down = false; else row++; }
      else { if (row === 0) down = true; else row--; }
    }
    let out = '';
    for (let r = 0; r < rails; r++) out += fence[r].join('');
    return out;
  }
  const lens = Array.from({ length: rails }, () => 0);
  let row = 0, down = true;
  for (let i = 0; i < text.length; i++) {
    lens[row]++;
    if (down) { if (row === rails - 1) down = false; else row++; }
    else { if (row === 0) down = true; else row--; }
  }
  const parts = [];
  let idx = 0;
  for (let r = 0; r < rails; r++) { parts.push(text.slice(idx, idx + lens[r])); idx += lens[r]; }
  const cursors = parts.map((p) => 0);
  let out = '';
  row = 0; down = true;
  for (let i = 0; i < text.length; i++) {
    out += parts[row][cursors[row]++];
    if (down) { if (row === rails - 1) down = false; else row++; }
    else { if (row === 0) down = true; else row--; }
  }
  return out;
}

/* ---------- 培根密码（A/B 五比特） ---------- */
const BACON = { A: 'aaaaa', B: 'aaaab', C: 'aaaba', D: 'aaabb', E: 'aabaa', F: 'aabab', G: 'aabba', H: 'aabbb', I: 'abaaa', J: 'abaaa', K: 'abaab', L: 'ababa', M: 'ababb', N: 'abbaa', O: 'abbab', P: 'abbba', Q: 'abbbb', R: 'baaaa', S: 'baaab', T: 'baaba', U: 'baabb', V: 'baabb', W: 'babaa', X: 'babab', Y: 'babba', Z: 'babbb' };
const BACON_REV = {};
for (const [k, v] of Object.entries(BACON)) BACON_REV[v] = k;
export function baconEncode(text) {
  return [...text.toUpperCase().replace(/[^A-Z]/g, '')].map((c) => BACON[c] || '?????').join(' ');
}
export function baconDecode(s) {
  const bits = s.replace(/\s+/g, '').toLowerCase().replace(/[^ab]/g, '');
  if (bits.length % 5) throw new Error('A/B 比特数需为 5 的倍数');
  let out = '';
  for (let i = 0; i < bits.length; i += 5) out += BACON_REV[bits.slice(i, i + 5)] || '?';
  return out;
}

/* ---------- 仿射密码（y = ax + b mod 26，a 与 26 互质） ---------- */
const COPRIME = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
export function affineCipher(text, a, b, decode = false) {
  a = ((a | 0) % 26 + 26) % 26;
  b = ((b | 0) % 26 + 26) % 26;
  if (!decode && !COPRIME.includes(a)) throw new Error('a 需与 26 互质（可选：1,3,5,7,9,11,15,17,19,21,23,25）');
  const inv = decode ? COPRIME.find((x) => (x * a) % 26 === 1) : null;
  if (decode && inv == null) throw new Error('a 与 26 不互质，无法解密');
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    const x = c.charCodeAt(0) - base;
    const y = decode ? ((inv * (x - b + 26)) % 26) : ((a * x + b) % 26);
    return String.fromCharCode(base + y);
  });
}

/* ---------- XOR 加密（密钥循环，输出 Base64） ---------- */
export function xorEncrypt(text, key) {
  if (!key) throw new Error('请填写密钥');
  const kb = utf8(key);
  const tb = utf8(text);
  const out = new Uint8Array(tb.length);
  for (let i = 0; i < tb.length; i++) out[i] = tb[i] ^ kb[i % kb.length];
  return btoa(String.fromCharCode(...out));
}
export function xorDecrypt(b64, key) {
  if (!key) throw new Error('请填写密钥');
  const kb = utf8(key);
  const raw = atob(b64.replace(/\s+/g, ''));
  const tb = Uint8Array.from(raw, (c) => c.charCodeAt(0));
  const out = new Uint8Array(tb.length);
  for (let i = 0; i < tb.length; i++) out[i] = tb[i] ^ kb[i % kb.length];
  return td.decode(out);
}

/* ---------- CRC 系列 ---------- */
function crcTable(poly, width, msb = true) {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = msb ? (c & 1 ? poly ^ (c >>> 1) : c >>> 1) : (c & 0x80 ? (c << 1) ^ poly : c << 1);
    table[n] = msb ? c : (c & 0xff);
  }
  return table;
}
const CRC32_T = crcTable(0xedb88320, 32);
export function crc32(input) {
  let c = 0xffffffff;
  for (const b of utf8(input)) c = CRC32_T[(c ^ b) & 0xff] ^ (c >>> 8);
  return ((c ^ 0xffffffff) >>> 0).toString(16).padStart(8, '0');
}
/* CRC-16/CCITT-FALSE：poly 0x1021，初值 0xffff，非反射 */
const CRC16_T = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n << 8;
    for (let k = 0; k < 8; k++) c = c & 0x8000 ? ((c << 1) ^ 0x1021) & 0xffff : (c << 1) & 0xffff;
    t[n] = c;
  }
  return t;
})();
export function crc16(input) {
  let c = 0xffff;
  for (const b of utf8(input)) c = ((c << 8) & 0xffff) ^ CRC16_T[((c >>> 8) ^ b) & 0xff];
  return c.toString(16).padStart(4, '0');
}
export function adler32(input) {
  let a = 1, b = 0;
  for (const byte of utf8(input)) { a = (a + byte) % 65521; b = (b + a) % 65521; }
  return ((b << 16) | a).toString(16).padStart(8, '0');
}

/* ---------- HMAC（WebCrypto，异步） ---------- */
export async function hmac(algorithm, key, text) {
  const algMap = { 'MD5': 'MD5', 'SHA-1': 'SHA-1', 'SHA-256': 'SHA-256', 'SHA-384': 'SHA-384', 'SHA-512': 'SHA-512' };
  const alg = algMap[algorithm];
  if (!alg) throw new Error('不支持的算法');
  const cryptoKey = await crypto.subtle.importKey('raw', utf8(key), { name: 'HMAC', hash: alg }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, utf8(text));
  return bytesToHex(new Uint8Array(sig));
}

/* ---------- PBKDF2（WebCrypto，异步） ---------- */
export async function pbkdf2(password, salt, iterations = 10000, length = 32) {
  const baseKey = await crypto.subtle.importKey('raw', utf8(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: utf8(salt), iterations: Math.max(1, iterations | 0) },
    baseKey, Math.max(1, length | 0) * 8,
  );
  return bytesToHex(new Uint8Array(bits));
}

/* ---------- Quoted-Printable（RFC 2045，邮件用） ---------- */
export function qpEncode(input) {
  const bytes = utf8(input);
  let out = '', line = 0;
  const push = (s) => {
    if (line + s.length > 73) { out += '=\r\n'; line = 0; }
    out += s; line += s.length;
  };
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i];
    const isEnd = i === bytes.length - 1;
    if (b === 32 && !isEnd) { push(' '); continue; }
    if (b === 9) { push('\t'); continue; }
    if ((b >= 33 && b <= 60) || (b >= 62 && b <= 126)) push(String.fromCharCode(b));
    else push('=' + b.toString(16).toUpperCase().padStart(2, '0'));
  }
  return out;
}
export function qpDecode(input) {
  const clean = input.replace(/=\r?\n/g, '');
  const out = [];
  for (let i = 0; i < clean.length; i++) {
    if (clean[i] === '=') {
      const hex = clean.slice(i + 1, i + 3);
      if (/^[0-9A-Fa-f]{2}$/.test(hex)) { out.push(parseInt(hex, 16)); i += 2; }
      else out.push(clean.charCodeAt(i));
    } else out.push(clean.charCodeAt(i));
  }
  return td.decode(new Uint8Array(out));
}

/* ---------- 哈希类型识别 ---------- */
export function identifyHash(hash) {
  const h = hash.replace(/\s+/g, '').toLowerCase();
  const patterns = [
    ['MD5', /^[0-9a-f]{32}$/, '32 位十六进制'],
    ['SHA-1', /^[0-9a-f]{40}$/, '40 位十六进制'],
    ['SHA-256', /^[0-9a-f]{64}$/, '64 位十六进制'],
    ['SHA-384', /^[0-9a-f]{96}$/, '96 位十六进制'],
    ['SHA-512', /^[0-9a-f]{128}$/, '128 位十六进制'],
    ['SHA3-256', /^[0-9a-f]{64}$/, '64 位十六进制（与 SHA-256 同长）'],
    ['CRC32', /^[0-9a-f]{8}$/, '8 位十六进制'],
    ['Adler-32', /^[0-9a-f]{8}$/, '8 位十六进制'],
    ['NTLM', /^[0-9a-f]{32}$/, '32 位十六进制（与 MD5 同长）'],
    ['MySQL5', /^\*[0-9A-F]{40}$/, '40 位十六进制，* 开头'],
    ['bcrypt', /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/, '以 $2a/$2b/$2y 开头'],
    ['crypt-SHA512', /^\$6\$[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{86}$/, '以 $6$ 开头'],
    ['crypt-SHA256', /^\$5\$[./A-Za-z0-9]{1,16}\$[./A-Za-z0-9]{43}$/, '以 $5$ 开头'],
    ['Base64 (64+)', /^[A-Za-z0-9+/]{64,}={0,2}$/, 'Base64 字符集，长度 64 以上'],
  ];
  return patterns.filter(([, re]) => re.test(h)).map(([name, , len]) => ({ name, len }));
}

/* ---------- 文本 ↔ 二进制 / 十六进制 / 八进制 ---------- */
export function textToBinary(input) {
  return [...utf8(input)].map((b) => b.toString(2).padStart(8, '0')).join(' ');
}
export function binaryToText(s) {
  const bits = s.replace(/\s+/g, '');
  if (!bits) throw new Error('输入为空');
  if (bits.length % 8) throw new Error('二进制位数需为 8 的倍数');
  if (!/^[01]+$/.test(bits)) throw new Error('只接受 0 和 1');
  const bytes = [];
  for (let i = 0; i < bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return td.decode(new Uint8Array(bytes));
}
export function textToHex(input) {
  return [...utf8(input)].map((b) => b.toString(16).padStart(2, '0')).join(' ');
}
export function hexToText(s) {
  const hex = s.replace(/0x/gi, '').replace(/\s+/g, '');
  if (!hex) throw new Error('输入为空');
  if (hex.length % 2) throw new Error('十六进制长度需为偶数');
  if (!/^[0-9a-f]+$/i.test(hex)) throw new Error('包含非十六进制字符');
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.slice(i, i + 2), 16));
  return td.decode(new Uint8Array(bytes));
}
export function textToOctal(input) {
  return [...utf8(input)].map((b) => b.toString(8).padStart(3, '0')).join(' ');
}
export function octalToText(s) {
  const oct = s.replace(/\\/g, '').replace(/\s+/g, '');
  if (!oct) throw new Error('输入为空');
  if (oct.length % 3) throw new Error('八进制位数需为 3 的倍数');
  if (!/^[0-7]+$/.test(oct)) throw new Error('只接受 0-7 的数字');
  const bytes = [];
  for (let i = 0; i < oct.length; i += 3) bytes.push(parseInt(oct.slice(i, i + 3), 8));
  return td.decode(new Uint8Array(bytes));
}

/* ---------- 密码变体包装（供工具定义 actions 使用） ---------- */
export const vigenereDecode = (text, key) => vigenere(text, key, true);
export const railFenceDecode = (text, rails) => railFence(text, rails, true);
export const affineDecode = (text, a, b) => affineCipher(text, a, b, true);
