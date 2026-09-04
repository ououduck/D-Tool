/* 图片水印工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, canvasToBlob, downloadBlob } = window.DT;

const drop = $('#wm-drop'), fileEl = $('#wm-file'), textEl = $('#wm-text'), sizeEl = $('#wm-size');
const opacityEl = $('#wm-opacity'), posEl = $('#wm-pos'), tileEl = $('#wm-tile');
const canvas = $('#wm-canvas'), runBtn = $('#wm-run'), dlBtn = $('#wm-download'), metaEl = $('#wm-meta');

let img = null, imgUrl = null;

const POS = {
  tl: [0.02, 0.04], tr: [0.98, 0.04], bl: [0.02, 0.96], br: [0.98, 0.96], cc: [0.5, 0.5],
};

function handleFile(file) {
  loadImage(file).then(({ img: i, url }) => {
    img = i; imgUrl = url;
    canvas.width = i.naturalWidth; canvas.height = i.naturalHeight;
    canvas.getContext('2d').drawImage(i, 0, 0);
    metaEl.textContent = `原图 ${i.naturalWidth} × ${i.naturalHeight}`;
    runBtn.disabled = false;
    render();
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);

function render() {
  if (!img) return;
  const w = img.naturalWidth, h = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0);
  const text = textEl.value || '© watermark';
  const size = Math.max(8, Math.round(Number(sizeEl.value) || 48));
  const alpha = (Math.min(100, Math.max(5, Number(opacityEl.value) || 60))) / 100;

  if (tileEl.checked) {
    ctx.save();
    ctx.globalAlpha = alpha * 0.5;
    ctx.font = `bold ${size}px var(--font-sans)`;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = Math.max(1, size / 16);
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 6);
    const step = size * 4.5;
    for (let x = -w; x < w; x += step) {
      for (let y = -h; y < h; y += step) {
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
      }
    }
    ctx.restore();
  } else {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `bold ${size}px var(--font-sans)`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const [px, py] = POS[posEl.value] || POS.br;
    const x = w * px, y = h * py;
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = Math.max(1, size / 16);
    ctx.strokeText(text, x, y);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, x, y);
    ctx.restore();
  }
  dlBtn.disabled = false;
}

runBtn.addEventListener('click', render);
textEl.addEventListener('input', render);
sizeEl.addEventListener('input', render);
opacityEl.addEventListener('input', render);
posEl.addEventListener('change', render);
tileEl.addEventListener('change', render);

dlBtn.addEventListener('click', async () => {
  try {
    const blob = await canvasToBlob(canvas, 'image/png');
    downloadBlob(blob, `watermarked-${Date.now()}.png`);
  } catch { toast('导出失败'); }
});

$('#wm-clear').addEventListener('click', () => {
  img = null; imgUrl && URL.revokeObjectURL(imgUrl); imgUrl = null;
  canvas.width = 0; canvas.height = 0; dlBtn.disabled = true; runBtn.disabled = true; metaEl.textContent = '';
});
