/* 九宫格切图工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, canvasToBlob, downloadBlob } = window.DT;

const drop = $('#gr-drop'), fileEl = $('#gr-file'), rowsEl = $('#gr-rows'), colsEl = $('#gr-cols');
const squareEl = $('#gr-square'), runBtn = $('#gr-run'), dlBtn = $('#gr-download');
const previewEl = $('#gr-preview'), metaEl = $('#gr-meta');

let img = null, imgUrl = null, slices = [];

const fmtName = (r, c, ext) => `grid-${r}-${c}.${ext}`;

function handleFile(file) {
  loadImage(file).then(({ img: i, url }) => {
    img = i; imgUrl = url;
    metaEl.textContent = `原图 ${i.naturalWidth} × ${i.naturalHeight}`;
    runBtn.disabled = false;
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);

runBtn.addEventListener('click', async () => {
  if (!img) return toast('请先上传图片');
  const rows = Math.min(9, Math.max(1, Math.round(Number(rowsEl.value) || 3)));
  const cols = Math.min(9, Math.max(1, Math.round(Number(colsEl.value) || 3)));
  let src = img, sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
  if (squareEl.checked) {
    const side = Math.min(sw, sh);
    sx = (sw - side) / 2; sy = (sh - side) / 2; sw = side; sh = side;
  }
  const cellW = sw / cols, cellH = sh / rows;
  slices = [];
  previewEl.innerHTML = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(cellW); canvas.height = Math.round(cellH);
      canvas.getContext('2d').drawImage(img, sx + c * cellW, sy + r * cellH, cellW, cellH, 0, 0, canvas.width, canvas.height);
      try {
        const blob = await canvasToBlob(canvas, 'image/png');
        slices.push({ blob, name: fmtName(r + 1, c + 1, 'png') });
        const box = document.createElement('div');
        box.style.cssText = 'border:1px solid var(--border);border-radius:6px;overflow:hidden;width:96px;height:96px;flex:0 0 auto';
        const imgEl = document.createElement('img');
        imgEl.src = URL.createObjectURL(blob);
        imgEl.style.cssText = 'width:100%;height:100%;object-fit:cover';
        box.appendChild(imgEl);
        previewEl.appendChild(box);
      } catch { toast('切图失败'); return; }
    }
  }
  dlBtn.disabled = false;
  metaEl.textContent = `已切为 ${rows} × ${cols} = ${slices.length} 块，每块 ${Math.round(cellW)} × ${Math.round(cellH)}px`;
});

dlBtn.addEventListener('click', () => {
  if (!slices.length) return;
  slices.forEach((s, i) => setTimeout(() => downloadBlob(s.blob, s.name), i * 200));
  toast('开始下载切片（浏览器可能询问允许下载多个文件）');
});

$('#gr-clear').addEventListener('click', () => {
  img = null; imgUrl && URL.revokeObjectURL(imgUrl); imgUrl = null;
  slices = []; previewEl.innerHTML = ''; dlBtn.disabled = true; runBtn.disabled = true; metaEl.textContent = '';
});
