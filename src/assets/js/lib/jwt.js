/* JWT 解码（仅解析，不验签） */
import { b64urlDecode } from './base64.js';

export function decodeJwt(token) {
  const parts = String(token).trim().split('.');
  if (parts.length < 2) throw new Error('不是有效的 JWT：应包含至少两个由 . 分隔的分段');
  if (parts.length > 3) throw new Error('不是有效的 JWT：分段数量异常');
  const header = JSON.parse(b64urlDecode(parts[0]));
  const payload = JSON.parse(b64urlDecode(parts[1]));
  return { header, payload, signature: parts[2] || null };
}

export function prettyExp(exp) {
  if (!Number.isFinite(exp)) return null;
  const d = new Date(exp * 1000);
  if (Number.isNaN(d.getTime())) return null;
  const now = Date.now();
  const diff = exp * 1000 - now;
  return {
    text: d.toLocaleString('zh-CN', { hour12: false }),
    status: diff > 0 ? '未过期' : '已过期',
    diff,
  };
}
