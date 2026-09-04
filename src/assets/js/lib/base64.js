/* Base64 编解码（UTF-8 安全，兼容浏览器与 Node） */

export function b64encode(text) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export function b64decode(b64) {
  const bin = atob(String(b64).replace(/\s+/g, ''));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/* URL-safe 变体（RFC 4648 §5，去掉填充） */
export function b64urlEncode(text) {
  return b64encode(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function b64urlDecode(s) {
  s = String(s).replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return b64decode(s);
}

/* 校验是否为合法 Base64 文本 */
export function isValidB64(s) {
  return typeof s === 'string' && /^[A-Za-z0-9+/]*={0,2}$/.test(s.trim()) && s.trim().length % 4 === 0;
}
