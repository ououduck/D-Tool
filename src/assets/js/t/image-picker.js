/* 图片取色工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, escapeHtml } = window.DT;

const drop = $('#pk-drop'), fileEl = $('#pk-file'), canvas = $('#pk-canvas');
const swatch = $('#pk-swatch'), metaEl = $('#pk-meta'), valuesEl = $('#pk-values'), hintEl = $('#pk-hint');

let img = null, imgUrl = null;

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}
function rgbToHsl(r, g, b) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function handleFile(file) {
  loadImage(file).then(({ img: i, url }) => {
    img = i; imgUrl = url;
    const scale = Math.min(1, 720 / i.naturalWidth);
    canvas.width = Math.round(i.naturalWidth * scale);
    canvas.height = Math.round(i.naturalHeight * scale);
    canvas.getContext('2d').drawImage(i, 0, 0, canvas.width, canvas.height);
    hintEl.textContent = '点击图片任意位置取色';
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);

canvas.addEventListener('click', (e) => {
  if (!img) return toast('请先上传图片');
  const rect = canvas.getBoundingClientRect();
  const x = Math.round(((e.clientX - rect.left) / rect.width) * canvas.width);
  const y = Math.round(((e.clientY - rect.top) / rect.height) * canvas.height);
  const [r, g, b] = canvas.getContext('2d').getImageData(Math.max(0, x), Math.max(0, y), 1, 1).data;
  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  swatch.style.background = hex;
  metaEl.textContent = `像素坐标 (${x}, ${y})`;
  valuesEl.innerHTML = [['HEX', hex], ['RGB', rgb], ['HSL', hsl]]
    .map(([name, val]) => `<div class="case-row"><span class="cname">${name}</span><code>${escapeHtml(val)}</code><span class="spacer"></span><button class="btn btn-ghost btn-sm" data-copy="${escapeHtml(val)}">复制</button></div>`)
    .join('');
});

$('#pk-clear').addEventListener('click', () => {
  img = null; imgUrl && URL.revokeObjectURL(imgUrl); imgUrl = null;
  canvas.width = 0; canvas.height = 0;
  swatch.style.background = '#fff'; metaEl.textContent = ''; valuesEl.innerHTML = '';
  hintEl.textContent = '上传图片后点击任意像素取色';
});
