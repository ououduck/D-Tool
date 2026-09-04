/* CSS 渐变生成器工具脚本 */
const $ = (s) => document.querySelector(s);

const typeEl = $('#gd-type'), angleEl = $('#gd-angle'), anglev = $('#gd-anglev');
const c1El = $('#gd-c1'), c2El = $('#gd-c2'), preview = $('#gd-preview'), cssEl = $('#gd-css');

function render() {
  const c1 = c1El.value, c2 = c2El.value;
  let css;
  if (typeEl.value === 'linear') {
    css = `background: linear-gradient(${angleEl.value}deg, ${c1}, ${c2});`;
  } else {
    css = `background: radial-gradient(circle, ${c1}, ${c2});`;
  }
  preview.style.background = css.replace('background: ', '');
  cssEl.value = css;
}

typeEl.addEventListener('change', render);
angleEl.addEventListener('input', () => { anglev.textContent = angleEl.value + '°'; render(); });
c1El.addEventListener('input', render);
c2El.addEventListener('input', render);
render();
