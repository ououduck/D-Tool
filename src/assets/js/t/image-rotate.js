/* 图片旋转/翻转工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, canvasToBlob, downloadBlob } = window.DT;

const drop = $('#rt-drop'), fileEl = $('#rt-file'), canvas = $('#rt-canvas');
const dlBtn = $('#rt-download'), metaEl = $('#rt-meta');

let img = null, imgUrl = null, rot = 0, flipH = false, flipV = false;

function render() {
  if (!img) return;
  const swap = rot % 180 !== 0;
  const w = swap ? img.naturalHeight : img.naturalWidth;
  const h = swap ? img.naturalWidth : img.naturalHeight;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.translate(w / 2, h / 2);
  ctx.rotate((rot * Math.PI) / 180);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
  dlBtn.disabled = false;
}

async function handleFile(file) {
  loadImage(file).then(async ({ img: i, url }) => {
    img = i; imgUrl = url; rot = 0; flipH = false; flipV = false;
    render();
    metaEl.textContent = `原图 ${i.naturalWidth} × ${i.naturalHeight}`;
    // 预生成下载
    try {
      const blob = await canvasToBlob(canvas, 'image/png');
      dlBtn.onclick = () => downloadBlob(blob, `rotated-${Date.now()}.png`);
    } catch {}
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);

$('#rt-left').addEventListener('click', async () => { rot = (rot - 90 + 360) % 360; render(); await refreshDl(); });
$('#rt-right').addEventListener('click', async () => { rot = (rot + 90) % 360; render(); await refreshDl(); });
$('#rt-flip-h').addEventListener('click', async () => { flipH = !flipH; render(); await refreshDl(); });
$('#rt-flip-v').addEventListener('click', async () => { flipV = !flipV; render(); await refreshDl(); });

async function refreshDl() {
  try {
    const blob = await canvasToBlob(canvas, 'image/png');
    dlBtn.onclick = () => downloadBlob(blob, `rotated-${Date.now()}.png`);
  } catch {}
}

$('#rt-clear').addEventListener('click', () => {
  img = null; imgUrl && URL.revokeObjectURL(imgUrl); imgUrl = null;
  canvas.width = 0; canvas.height = 0; dlBtn.disabled = true; metaEl.textContent = '';
});
