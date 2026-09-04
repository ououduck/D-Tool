/* 数字转中文大写工具脚本 */
import { rmbUpper } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#nc-in'), rmbEl = $('#nc-rmb'), lowerEl = $('#nc-lower');

const CN_L = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function toLowerCn(n) {
  const neg = n < 0;
  const v = Math.abs(n);
  const intPart = Math.floor(v);
  const frac = Math.round((v - intPart) * 100);
  let s = String(intPart);
  let out = '';
  const units = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];
  for (let i = 0; i < s.length; i++) {
    const d = Number(s[i]);
    const pos = s.length - 1 - i;
    if (d === 0) {
      if (out && !out.endsWith('零') && pos % 4 !== 3 && pos > 0) out += '零';
    } else {
      out += CN_L[d] + units[pos];
    }
  }
  out = out.replace(/零+/g, '零').replace(/零$/g, '') || '零';
  // 十位开头的“一十”简化为“十”
  if (out.startsWith('一十')) out = out.slice(1);
  if (frac > 0) {
    const jiao = Math.floor(frac / 10), fen = frac % 10;
    out += '点';
    if (jiao) out += CN_L[jiao];
    if (fen) out += CN_L[fen];
  }
  return (neg ? '负' : '') + out;
}

$('#nc-run').addEventListener('click', () => {
  const v = parseFloat(inEl.value);
  if (!Number.isFinite(v)) return toast('请输入有效数字');
  try {
    rmbEl.textContent = rmbUpper(v);
  } catch (e) {
    rmbEl.textContent = e.message;
  }
  lowerEl.textContent = toLowerCn(v);
});

$('#nc-clear').addEventListener('click', () => { inEl.value = ''; rmbEl.textContent = '等待输入…'; lowerEl.textContent = '等待输入…'; inEl.focus(); });
