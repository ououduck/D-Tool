/* SHA 系列哈希 —— 基于 Web Crypto（浏览器 / Node 18+ 全局可用） */

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

function bufToHex(buf) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function shaHex(algo, text) {
  const data = new TextEncoder().encode(String(text));
  const buf = await crypto.subtle.digest(algo, data);
  return bufToHex(buf);
}

export async function shaHexBuffer(algo, buffer) {
  const buf = await crypto.subtle.digest(algo, buffer);
  return bufToHex(buf);
}

/* 文本 + 可选文件，返回 { sha1, sha256, sha384, sha512 } */
export async function hashAll(text, fileBuffer = null) {
  const out = {};
  const data = fileBuffer ?? new TextEncoder().encode(String(text));
  for (const algo of ALGOS) {
    out[algo.toLowerCase().replace('-', '')] = await shaHexBuffer(algo, data);
  }
  return out;
}

export { ALGOS };
