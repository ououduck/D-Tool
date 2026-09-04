/* Base64 编码/解码工具脚本 */
import { b64encode, b64decode, b64urlEncode, b64urlDecode } from '../lib/base64.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#b64-in'), outEl = $('#b64-out'), urlSafe = $('#b64-url');

const encode = () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  outEl.value = urlSafe.checked ? b64urlEncode(v) : b64encode(v);
};

const decode = () => {
  const v = inEl.value.trim();
  if (!v) return toast('请先输入内容');
  try {
    outEl.value = urlSafe.checked ? b64urlDecode(v) : b64decode(v);
  } catch {
    toast('解码失败：不是合法的 Base64 文本');
  }
};

$('#b64-encode').addEventListener('click', encode);
$('#b64-decode').addEventListener('click', decode);
$('#b64-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
