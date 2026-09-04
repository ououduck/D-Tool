/* 颜色转换工具脚本 */
import { parseColor, rgbToHex, rgbToHsl, rgbToHsv, luminance, readableOn } from '../lib/color.js';

const $ = (s) => document.querySelector(s);
const { escapeHtml } = window.DT;

const inEl = $('#cl-in'), picker = $('#cl-picker'), swatch = $('#cl-swatch'), metaEl = $('#cl-meta'), valuesEl = $('#cl-values');

const round = (n, d = 0) => { const f = 10 ** d; return Math.round(n * f) / f; };

function render(rgb) {
  const hex = rgbToHex(rgb);
  swatch.style.background = hex;
  const lum = luminance(rgb);
  const text = readableOn(lum);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);

  const rows = [
    ['HEX', rgb.a < 1 ? hex : rgbToHex({ ...rgb, a: 1 }), true],
    ['RGB', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}${rgb.a < 1 ? `, ${rgb.a}` : ''})`, true],
    ['HSL', `hsl(${round(hsl.h, 1)}, ${round(hsl.s, 1)}%, ${round(hsl.l, 1)}%)`, true],
    ['HSV', `hsv(${round(hsv.h, 1)}, ${round(hsv.s, 1)}%, ${round(hsv.v, 1)}%)`, false],
    ['相对亮度', round(lum, 3).toFixed(3), false],
  ];
  metaEl.textContent = `亮度 ${round(lum, 3)}，建议文本色 ${text}`;
  metaEl.style.color = text;
  valuesEl.innerHTML = rows
    .map(([name, val, copy]) => {
      const btn = copy ? `<button class="btn btn-ghost btn-sm" data-copy="${escapeHtml(val)}">复制</button>` : '';
      return `<div class="case-row"><span class="cname">${name}</span><code>${escapeHtml(val)}</code><span class="spacer"></span>${btn}</div>`;
    })
    .join('');
}

function update() {
  const rgb = parseColor(inEl.value);
  if (!rgb) {
    swatch.style.background = '#ffffff';
    metaEl.textContent = '无法识别，支持 #hex、rgb()、hsl()、英文色名';
    valuesEl.innerHTML = '';
    return;
  }
  render(rgb);
}

inEl.addEventListener('input', update);
picker.addEventListener('input', () => { inEl.value = picker.value; update(); });

update();
