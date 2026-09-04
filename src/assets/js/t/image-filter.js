/* 图片滤镜工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, canvasToBlob, downloadBlob } = window.DT;

const drop = $('#fl-drop'), fileEl = $('#fl-file'), presetEl = $('#fl-preset'), amountEl = $('#fl-amount');
const amtLabel = $('#fl-amt'), canvas = $('#fl-canvas'), dlBtn = $('#fl-download'), metaEl = $('#fl-meta');

let img = null, imgUrl = null;

const FILTERS = {
  none: 'none', grayscale: 'grayscale(1)', sepia: 'sepia(1)', invert: 'invert(1)',
  blur: 'blur(6px)', brightness: 'brightness(1.4)', contrast: 'contrast(1.5)',
  saturate: 'saturate(2)', cool: 'hue-rotate(180deg) saturate(1.2)', warm: 'sepia(0.5) saturate(1.6) hue-rotate(-20deg)',
};

function render() {
  if (!img) return;
  const preset = presetEl.value;
  const amt = Number(amountEl.value) / 100;
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.filter = preset === 'none' ? 'none' : FILTERS[preset].replace(/([a-z-]+)\(([^)]*)\)/g, (m, f, v) => {
    if (f === 'blur') return `blur(${parseFloat(v) * amt}px)`;
    return `${f}(${parseFloat(v) * amt})`;
  });
  ctx.drawImage(img, 0, 0);
  dlBtn.disabled = false;
}

async function handleFile(file) {
  loadImage(file).then(async ({ img: i, url }) => {
    img = i; imgUrl = url;
    render();
    metaEl.textContent = `原图 ${i.naturalWidth} × ${i.naturalHeight}`;
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);
presetEl.addEventListener('change', render);
amountEl.addEventListener('input', () => { amtLabel.textContent = amountEl.value + '%'; render(); });

dlBtn.addEventListener('click', async () => {
  try {
    const blob = await canvasToBlob(canvas, 'image/png');
    downloadBlob(blob, `filtered-${Date.now()}.png`);
  } catch { toast('导出失败'); }
});

$('#fl-clear').addEventListener('click', () => {
  img = null; imgUrl && URL.revokeObjectURL(imgUrl); imgUrl = null;
  canvas.width = 0; canvas.height = 0; dlBtn.disabled = true; metaEl.textContent = '';
});
