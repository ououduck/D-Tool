/* JWT 在线解析工具脚本 */
import { decodeJwt, prettyExp } from '../lib/jwt.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#jwt-in');

const fmt = (o) => JSON.stringify(o, null, 2).replace(/</g, '\\u003c');

$('#jwt-run').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先粘贴 JWT');
  try {
    const { header, payload, signature } = decodeJwt(v);
    $('#jwt-header').textContent = fmt(header);
    $('#jwt-payload').textContent = fmt(payload);

    const exp = prettyExp(payload.exp);
    const lines = [];
    if (exp) lines.push(`exp（过期时间）：${exp.text}`);
    if (exp) lines.push(`状态：${exp.status}`);
    if (payload.iat) lines.push(`iat（签发时间）：${new Date(payload.iat * 1000).toLocaleString('zh-CN', { hour12: false })}`);
    if (payload.iss) lines.push(`iss（签发者）：${payload.iss}`);
    if (payload.sub) lines.push(`sub（主题）：${payload.sub}`);
    lines.push(`签名部分：${signature ? '存在（未验证）' : '缺失（不是完整 JWT）'}`);
    $('#jwt-exp').textContent = lines.join('\n');
  } catch {
    toast('解析失败：不是有效的 JWT');
  }
});

$('#jwt-clear').addEventListener('click', () => {
  inEl.value = '';
  $('#jwt-header').textContent = '等待解析…';
  $('#jwt-payload').textContent = '等待解析…';
  $('#jwt-exp').textContent = '等待解析…';
  inEl.focus();
});
