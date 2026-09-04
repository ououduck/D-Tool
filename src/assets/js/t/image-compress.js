/* 图片压缩工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const drop = $('#ic-drop'), fileEl = $('#ic-file'), qualityEl = $('#ic-quality'), qval = $('#ic-qval');
const widthEl = $('#ic-width'), formatEl = $('#ic-format'), runBtn = $('#ic-run'), downloadBtn = $('#ic-download');
const metaEl = $('#ic-meta'), beforeImg = $('#ic-before'), afterImg = $('#ic-after');

let source = null; // { img, file }

const fmtSize = (n) => (n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(2)} MB`);

function loadFile(file) {
  if (!file || !file.type.startsWith('image/')) return toast('请选择图片文件');
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    source = { img, file };
    beforeImg.src = url;
    compress();
  };
  img.onerror = () => toast('无法读取该图片');
  img.src = url;
}

async function compress() {
  if (!source) return;
  const { img } = source;
  const maxW = Math.max(16, Math.round(Number(widthEl.value) || 1920));
  const scale = Math.min(1, maxW / img.naturalWidth);
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  const q = Number(qualityEl.value);
  const type = formatEl.value;
  runBtn.disabled = true;
  runBtn.textContent = '压缩中…';
  try {
    const blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej()), type, q));
    const url = URL.createObjectURL(blob);
    afterImg.src = url;
    downloadBtn.disabled = false;
    downloadBtn.dataset.url = url;
    downloadBtn.dataset.name = `compressed-${Date.now()}.${type === 'image/jpeg' ? 'jpg' : 'webp'}`;
    const ratio = (1 - blob.size / source.file.size) * 100;
    metaEl.textContent = `原图 ${img.naturalWidth}×${img.naturalHeight} · ${fmtSize(source.file.size)} → 压缩后 ${w}×${h} · ${fmtSize(blob.size)}（${ratio >= 0 ? '减少' : '增加'} ${Math.abs(ratio).toFixed(1)}%）`;
  } catch {
    toast('压缩失败');
  } finally {
    runBtn.disabled = false;
    runBtn.textContent = '压缩';
  }
}

drop.addEventListener('click', () => fileEl.click());
drop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileEl.click(); } });
drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('drag'); });
drop.addEventListener('dragleave', () => drop.classList.remove('drag'));
drop.addEventListener('drop', (e) => { e.preventDefault(); drop.classList.remove('drag'); loadFile(e.dataTransfer.files[0]); });
fileEl.addEventListener('change', () => { loadFile(fileEl.files[0]); fileEl.value = ''; });

runBtn.addEventListener('click', compress);
qualityEl.addEventListener('input', () => { qval.textContent = qualityEl.value; compress(); });
widthEl.addEventListener('input', compress);
formatEl.addEventListener('change', compress);

downloadBtn.addEventListener('click', () => {
  const url = downloadBtn.dataset.url;
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.download = downloadBtn.dataset.name || 'compressed.jpg';
  a.click();
});

$('#ic-clear').addEventListener('click', () => {
  source = null; downloadBtn.disabled = true;
  beforeImg.removeAttribute('src'); afterImg.removeAttribute('src');
  metaEl.textContent = '';
});
