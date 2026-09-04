/* 图片格式转换工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, canvasToBlob, downloadBlob } = window.DT;

const drop = $('#fm-drop'), fileEl = $('#fm-file'), formatEl = $('#fm-format'), qualityEl = $('#fm-quality');
const qval = $('#fm-qval'), widthEl = $('#fm-width'), runBtn = $('#fm-run'), dlBtn = $('#fm-download');
const beforeImg = $('#fm-before'), afterImg = $('#fm-after'), metaEl = $('#fm-meta');

let img = null, imgUrl = null, resultBlob = null, resultName = '';

function handleFile(file) {
  loadImage(file).then(({ img: i, url }) => {
    img = i; imgUrl = url;
    beforeImg.src = url;
    afterImg.removeAttribute('src');
    dlBtn.disabled = true; runBtn.disabled = false;
    metaEl.textContent = `原图 ${i.naturalWidth} × ${i.naturalHeight}，${(file.size / 1024).toFixed(1)} KB`;
    convert();
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);

async function convert() {
  if (!img) return;
  const maxW = Math.round(Number(widthEl.value) || 0);
  const scale = maxW > 0 ? Math.min(1, maxW / img.naturalWidth) : 1;
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  try {
    resultBlob = await canvasToBlob(canvas, formatEl.value, Number(qualityEl.value));
    const ext = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[formatEl.value];
    resultName = `converted-${Date.now()}.${ext}`;
    afterImg.src = URL.createObjectURL(resultBlob);
    dlBtn.disabled = false;
    dlBtn.onclick = () => downloadBlob(resultBlob, resultName);
    metaEl.textContent = `原图 ${img.naturalWidth} × ${img.naturalHeight}（${(imgUrl ? img.src.length : 0) > 0 ? (beforeImg.src.startsWith('blob') ? '' : '') : ''}）→ ${w} × ${h} · ${(resultBlob.size / 1024).toFixed(1)} KB`;
  } catch { toast('转换失败'); }
}

runBtn.addEventListener('click', convert);
formatEl.addEventListener('change', convert);
qualityEl.addEventListener('input', () => { qval.textContent = qualityEl.value; convert(); });
widthEl.addEventListener('input', convert);

$('#fm-clear').addEventListener('click', () => {
  img = null; imgUrl && URL.revokeObjectURL(imgUrl); imgUrl = null;
  beforeImg.removeAttribute('src'); afterImg.removeAttribute('src');
  dlBtn.disabled = true; runBtn.disabled = true; metaEl.textContent = '';
});
