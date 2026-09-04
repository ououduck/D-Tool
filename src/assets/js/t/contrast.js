/* WCAG 对比度检查工具脚本 */
const $ = (s) => document.querySelector(s);

const fgEl = $('#ct-fg'), bgEl = $('#ct-bg'), swatch = $('#ct-swatch'), metaEl = $('#ct-meta');
const ratioEl = $('#ct-ratio'), aaEl = $('#ct-aa'), aaaEl = $('#ct-aaa');

const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const luminance = (rgb) => {
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
};

const mark = (pass) => (pass ? '通过' : '不通过');

function render() {
  const fg = hexToRgb(fgEl.value), bg = hexToRgb(bgEl.value);
  const L1 = luminance(fg), L2 = luminance(bg);
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  ratioEl.textContent = ratio.toFixed(2) + ':1';
  aaEl.textContent = mark(ratio >= 4.5);
  aaaEl.textContent = mark(ratio >= 7);
  swatch.style.background = `#${bgEl.value.slice(1)}`;
  swatch.style.color = `#${fgEl.value.slice(1)}`;
  swatch.textContent = 'Aa';
  swatch.style.display = 'flex';
  swatch.style.alignItems = 'center';
  swatch.style.justifyContent = 'center';
  swatch.style.fontSize = '22px';
  swatch.style.fontWeight = '700';
  metaEl.textContent = `前景 #${fgEl.value.slice(1)} ／ 背景 #${bgEl.value.slice(1)}`;
}

fgEl.addEventListener('input', render);
bgEl.addEventListener('input', render);
render();
