/* CSS 阴影生成器工具脚本 */
const $ = (s) => document.querySelector(s);

const xEl = $('#sh-x'), yEl = $('#sh-y'), blurEl = $('#sh-blur'), spreadEl = $('#sh-spread');
const colorEl = $('#sh-color'), opacityEl = $('#sh-opacity'), insetEl = $('#sh-inset');
const target = $('#sh-target'), cssEl = $('#sh-css');
const lbls = { x: $('#sh-xv'), y: $('#sh-yv'), b: $('#sh-bv'), s: $('#sh-sv'), o: $('#sh-ov') };

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function render() {
  const x = Number(xEl.value), y = Number(yEl.value);
  const blur = Number(blurEl.value), spread = Number(spreadEl.value);
  const color = hexToRgba(colorEl.value, (Number(opacityEl.value) / 100).toFixed(2));
  const inset = insetEl.checked ? 'inset ' : '';
  const css = `box-shadow: ${inset}${x}px ${y}px ${blur}px ${spread}px ${color};`;
  target.style.boxShadow = css.replace('box-shadow: ', '');
  cssEl.value = css;
  lbls.x.textContent = x; lbls.y.textContent = y;
  lbls.b.textContent = blur; lbls.s.textContent = spread;
  lbls.o.textContent = opacityEl.value + '%';
}

[xEl, yEl, blurEl, spreadEl, colorEl, opacityEl, insetEl].forEach((el) =>
  el.addEventListener('input', render)
);
render();
