/* 图片裁切工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, canvasToBlob, downloadBlob } = window.DT;

const drop = $('#cr-drop'), fileEl = $('#cr-file'), ratioEl = $('#cr-ratio'), sizeEl = $('#cr-size');
const stage = $('#cr-stage'), canvas = $('#cr-canvas'), box = $('#cr-box');
const runBtn = $('#cr-run'), dlBtn = $('#cr-download'), preview = $('#cr-preview'), metaEl = $('#cr-meta');

let img = null, imgUrl = null;
let boxState = null; // {x, y, w, h} 相对显示尺寸

/* ---------- 裁剪框拖拽交互：移动 / 四角缩放 / 新建 ---------- */
function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

const HANDLES = [0, 1, 2, 3].map((i) => {
  const el = document.createElement('div');
  el.className = 'crop-handle crop-handle-' + i;
  box.appendChild(el);
  return el;
});

let drag = null; // {mode:'new'|'move'|'resize', handle, startX, startY, orig}

function startDrag(e) {
  e.preventDefault();
  const rect = stage.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;

  // 命中缩放手柄？
  for (let i = 0; i < HANDLES.length; i++) {
    if (e.target === HANDLES[i] && boxState && boxState.mode === 'none') {
      drag = { mode: 'resize', handle: i, startX: x, startY: y, orig: { ...boxState } };
      return;
    }
  }
  // 命中裁剪框内部 → 移动
  if (boxState && boxState.mode === 'none' && x >= boxState.x && x <= boxState.x + boxState.w && y >= boxState.y && y <= boxState.y + boxState.h) {
    drag = { mode: 'move', startX: x, startY: y, orig: { ...boxState } };
    return;
  }
  // 空白处 → 新建
  const ratio = ratioEl.value;
  boxState = { x, y, w: 0, h: 0, ratio: ratio === 'free' ? null : ratio.split(':').map(Number), mode: 'new' };
  drag = { mode: 'new', startX: x, startY: y, orig: null };
  renderBox();
}

function moveDrag(e) {
  if (!drag) return;
  const rect = stage.getBoundingClientRect();
  const x = clamp(e.clientX - rect.left, 0, rect.width);
  const y = clamp(e.clientY - rect.top, 0, rect.height);
  const dx = x - drag.startX, dy = y - drag.startY;

  if (drag.mode === 'move') {
    boxState.x = clamp(drag.orig.x + dx, 0, rect.width - boxState.w);
    boxState.y = clamp(drag.orig.y + dy, 0, rect.height - boxState.h);
    boxState.mode = 'none';
    renderBox();
    return;
  }
  if (drag.mode === 'resize') {
    let { x: ox, y: oy, w: ow, h: oh } = drag.orig;
    const hd = drag.handle; // 0 左上 1 右上 2 左下 3 右下
    let nx = ox, ny = oy, nw = ow, nh = oh;
    if (hd === 0 || hd === 2) { nw = clamp(ow - dx, 10, rect.width); nx = ox + (ow - nw); }
    else { nw = clamp(ow + dx, 10, rect.width); }
    if (hd === 0 || hd === 1) { nh = clamp(oh - dy, 10, rect.height); ny = oy + (oh - nh); }
    else { nh = clamp(oh + dy, 10, rect.height); }
    if (boxState.ratio) {
      const [rw, rh] = boxState.ratio;
      const byW = nw / (rw / rh) >= nh;
      if (byW) nh = nw * (rh / rw); else nw = nh * (rw / rh);
      if (hd === 0 || hd === 2) nx = ox + (ow - nw);
      if (hd === 0 || hd === 1) ny = oy + (oh - nh);
    }
    boxState = { x: nx, y: ny, w: nw, h: nh, ratio: boxState.ratio, mode: 'none' };
    renderBox();
    return;
  }
  // 新建
  let w = x - drag.startX, h = y - drag.startY;
  if (boxState.ratio) {
    const [rw, rh] = boxState.ratio;
    w = Math.max(w, h * (rw / rh));
    h = w * (rh / rw);
  }
  boxState.w = Math.abs(w); boxState.h = Math.abs(h);
  if (w < 0) boxState.x = drag.startX - boxState.w;
  if (h < 0) boxState.y = drag.startY - boxState.h;
  boxState.x = clamp(boxState.x, 0, rect.width - boxState.w);
  boxState.y = clamp(boxState.y, 0, rect.height - boxState.h);
  renderBox();
}

function endDrag() {
  if (!drag) return;
  if (drag.mode === 'new' && (boxState.w < 8 || boxState.h < 8)) {
    boxState = null;
    box.style.display = 'none';
  } else if (boxState) {
    boxState.mode = 'none';
  }
  drag = null;
}

function renderBox() {
  if (!boxState) return;
  box.style.display = 'block';
  box.style.left = boxState.x + 'px';
  box.style.top = boxState.y + 'px';
  box.style.width = boxState.w + 'px';
  box.style.height = boxState.h + 'px';
}

stage.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', moveDrag);
window.addEventListener('mouseup', endDrag);

/* ---------- 加载图片 ---------- */
function drawImage() {
  const cw = Math.min(img.naturalWidth, stage.clientWidth);
  const ch = cw * (img.naturalHeight / img.naturalWidth);
  canvas.width = cw; canvas.height = ch;
  canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, cw, ch);
  stage.style.height = ch + 'px';
}

function handleFile(file) {
  loadImage(file).then(({ img: i, url }) => {
    img = i; imgUrl = url;
    drawImage();
    runBtn.disabled = false;
    metaEl.textContent = `原图 ${i.naturalWidth} × ${i.naturalHeight}`;
    preview.removeAttribute('src');
    dlBtn.disabled = true;
    // 默认选中中心区域
    const rect = stage.getBoundingClientRect();
    boxState = { x: rect.width * 0.2, y: rect.height * 0.2, w: rect.width * 0.6, h: rect.height * 0.6, mode: 'none' };
    renderBox();
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);

/* ---------- 裁剪执行 ---------- */
runBtn.addEventListener('click', async () => {
  if (!img) return toast('请先上传图片');
  const rect = stage.getBoundingClientRect();
  const scale = img.naturalWidth / rect.width;
  const sx = (boxState ? boxState.x : 0) * scale;
  const sy = (boxState ? boxState.y : 0) * scale;
  const sw = (boxState ? boxState.w : rect.width) * scale;
  const sh = (boxState ? boxState.h : rect.height) * scale;
  const outW = Math.max(16, Math.round(Number(sizeEl.value) || 800));
  const outH = Math.round(outW * (sh / sw));
  const out = document.createElement('canvas');
  out.width = outW; out.height = outH;
  out.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
  try {
    const blob = await canvasToBlob(out, 'image/png');
    preview.src = URL.createObjectURL(blob);
    dlBtn.disabled = false;
    dlBtn.dataset.blob = '';
    dlBtn.onclick = () => downloadBlob(blob, `cropped-${Date.now()}.png`);
    metaEl.textContent = `裁切区域 ${Math.round(sw)} × ${Math.round(sh)}px → 输出 ${outW} × ${outH}px`;
  } catch { toast('裁剪失败'); }
});

$('#cr-clear').addEventListener('click', () => {
  img = null; imgUrl && URL.revokeObjectURL(imgUrl); imgUrl = null;
  box.style.display = 'none'; boxState = null;
  canvas.width = 0; canvas.height = 0;
  preview.removeAttribute('src'); dlBtn.disabled = true; runBtn.disabled = true;
  metaEl.textContent = '';
});
