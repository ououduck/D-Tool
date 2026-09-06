/* Base64 编码/解码工具脚本 */
import { b64encode, b64decode, b64urlEncode, b64urlDecode } from '../lib/base64.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#b64-in'), outEl = $('#b64-out'), urlSafe = $('#b64-url');

/* 记录最后动作方向：输入变化与 URL-safe 切换时按该方向实时重算（所见即所得） */
let last = 'encode';
const convert = () => { last === 'encode' ? encode() : decode(); };

const encode = () => {
  const v = inEl.value;
  if (!v) { outEl.value = ''; return; }
  outEl.value = urlSafe.checked ? b64urlEncode(v) : b64encode(v);
  last = 'encode';
};

const decode = () => {
  const v = inEl.value.trim();
  if (!v) { outEl.value = ''; return; }
  try {
    outEl.value = urlSafe.checked ? b64urlDecode(v) : b64decode(v);
    last = 'decode';
  } catch {
    toast('解码失败：不是合法的 Base64 文本');
  }
};

$('#b64-encode').addEventListener('click', encode);
$('#b64-decode').addEventListener('click', decode);
inEl.addEventListener('input', convert);
urlSafe.addEventListener('change', convert);
$('#b64-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
