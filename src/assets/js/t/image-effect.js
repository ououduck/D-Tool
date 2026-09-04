/* 共享运行时：图片效果处理（灰度/模糊/锐化/像素化/亮度/色相/圆角/边框/镜像/负片/棕褐/色调）
   每个工具页面的 <script type="application/json" id="ie-cfg"> 描述效果类型与参数控件。
   复用 main.js 的 setupDropzone/loadImage/canvasToBlob/downloadBlob。 */

const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage, canvasToBlob, downloadBlob } = window.DT;

const cfgEl = $('#ie-cfg');
if (!cfgEl) return;
const cfg = JSON.parse(cfgEl.textContent);

const drop = $('#ie-drop'), fileEl = $('#ie-file'), canvas = $('#ie-canvas');
const dlBtn = $('#ie-download'), metaEl = $('#ie-meta'), clearBtn = $('#ie-clear');
const params = (cfg.params || []).map((p, i) => ({ ...p, el: $(`#ie-p-${i}`), val: $(`#ie-p-${i}-v`) }));

let img = null, imgUrl = null;

function getParam(name) {
  const p = params.find((x) => x.name === name);
  if (!p || !p.el) return null;
  return p.type === 'range' ? Number(p.el.value) / 100 : Number(p.el.value);
}

/* 像素级效果（需要 ImageData） */
function pixelEffect(ctx, w, h, fn) {
  const data = ctx.getImageData(0, 0, w, h);
  fn(data.data);
  ctx.putImageData(data, 0, 0);
}

const EFFECTS = {
  grayscale(ctx, w, h) {
    pixelEffect(ctx, w, h, (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        d[i] = d[i + 1] = d[i + 2] = g;
      }
    });
  },
  sepia(ctx, w, h) {
    pixelEffect(ctx, w, h, (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        d[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
        d[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
        d[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
      }
    });
  },
  invert(ctx, w, h) {
    pixelEffect(ctx, w, h, (d) => { for (let i = 0; i < d.length; i += 4) { d[i] = 255 - d[i]; d[i + 1] = 255 - d[i + 1]; d[i + 2] = 255 - d[i + 2]; } });
  },
  brightness(ctx, w, h) {
    const v = getParam('amount') ?? 0;
    const f = 1 + v;
    pixelEffect(ctx, w, h, (d) => { for (let i = 0; i < d.length; i += 4) { d[i] *= f; d[i + 1] *= f; d[i + 2] *= f; } });
  },
  contrast(ctx, w, h) {
    const v = getParam('amount') ?? 0;
    const f = (259 * (1 + v) + 255) / (259 * (1 - v) + 255) || 1;
    pixelEffect(ctx, w, h, (d) => {
      for (let i = 0; i < d.length; i += 4) { d[i] = f * (d[i] - 128) + 128; d[i + 1] = f * (d[i + 1] - 128) + 128; d[i + 2] = f * (d[i + 2] - 128) + 128; }
    });
  },
  hue(ctx, w, h) {
    const v = getParam('amount') ?? 0;
    const angle = v * 360;
    const a = angle * Math.PI / 180;
    const cos = Math.cos(a), sin = Math.sin(a);
    pixelEffect(ctx, w, h, (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        d[i] = Math.min(255, (0.213 + cos * 0.787 - sin * 0.213) * r + (0.715 - cos * 0.715 - sin * 0.715) * g + (0.072 - cos * 0.072 + sin * 0.928) * b);
        d[i + 1] = Math.min(255, (0.213 - cos * 0.213 + sin * 0.143) * r + (0.715 + cos * 0.285 + sin * 0.140) * g + (0.072 - cos * 0.072 - sin * 0.283) * b);
        d[i + 2] = Math.min(255, (0.213 - cos * 0.213 - sin * 0.787) * r + (0.715 - cos * 0.715 + sin * 0.715) * g + (0.072 + cos * 0.928 + sin * 0.072) * b);
      }
    });
  },
  saturate(ctx, w, h) {
    const v = getParam('amount') ?? 0;
    const f = 1 + v;
    pixelEffect(ctx, w, h, (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        d[i] = gray + (r - gray) * f;
        d[i + 1] = gray + (g - gray) * f;
        d[i + 2] = gray + (b - gray) * f;
      }
    });
  },
  blur(ctx, w, h) {
    const v = getParam('amount') ?? 0.15;
    const radius = Math.max(1, Math.round(v * 40));
    const src = ctx.getImageData(0, 0, w, h);
    const dst = ctx.createImageData(w, h);
    const s = src.data, d = dst.data;
    // 简单盒式模糊（两遍）
    for (let pass = 0; pass < 2; pass++) {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let r = 0, g = 0, b = 0, a = 0, n = 0;
          for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
              const nx = x + dx, ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
              const idx = (ny * w + nx) * 4;
              r += s[idx]; g += s[idx + 1]; b += s[idx + 2]; a += s[idx + 3]; n++;
            }
          }
          const idx = (y * w + x) * 4;
          d[idx] = r / n; d[idx + 1] = g / n; d[idx + 2] = b / n; d[idx + 3] = a / n;
        }
      }
      if (pass === 0) { s.set(d); }
    }
    ctx.putImageData(d, 0, 0);
  },
  sharpen(ctx, w, h) {
    const v = getParam('amount') ?? 0.5;
    const src = ctx.getImageData(0, 0, w, h);
    const s = src.data;
    const d = new Uint8ClampedArray(s);
    const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        for (let c = 0; c < 3; c++) {
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) for (let kx = -1; kx <= 1; kx++) {
            sum += s[((y + ky) * w + x + kx) * 4 + c] * kernel[(ky + 1) * 3 + (kx + 1)];
          }
          const idx = (y * w + x) * 4 + c;
          d[idx] = s[idx] + (sum - s[idx]) * v;
        }
      }
    }
    ctx.putImageData(new ImageData(d, w, h), 0, 0);
  },
  pixelate(ctx, w, h) {
    const v = getParam('amount') ?? 0.3;
    const size = Math.max(2, Math.round(v * 40));
    const src = ctx.getImageData(0, 0, w, h);
    const s = src.data;
    for (let y = 0; y < h; y += size) {
      for (let x = 0; x < w; x += size) {
        let r = 0, g = 0, b = 0, a = 0, n = 0;
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const nx = Math.min(w - 1, x + dx), ny = Math.min(h - 1, y + dy);
            const idx = (ny * w + nx) * 4;
            r += s[idx]; g += s[idx + 1]; b += s[idx + 2]; a += s[idx + 3]; n++;
          }
        }
        r /= n; g /= n; b /= n; a /= n;
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const nx = Math.min(w - 1, x + dx), ny = Math.min(h - 1, y + dy);
            const idx = (ny * w + nx) * 4;
            s[idx] = r; s[idx + 1] = g; s[idx + 2] = b; s[idx + 3] = a;
          }
        }
      }
    }
    ctx.putImageData(src, 0, 0);
  },
  mirror(ctx, w, h) {
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0);
  },
  flip(ctx, w, h) {
    ctx.translate(0, h);
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0);
  },
};

function render() {
  if (!img) return;
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  if (cfg.effect === 'rounded') {
    const radius = Math.max(0, Math.round((getParam('radius') ?? 0.15) * Math.min(img.naturalWidth, img.naturalHeight)));
    ctx.beginPath();
    ctx.roundRect(0, 0, img.naturalWidth, img.naturalHeight, radius);
    ctx.clip();
    ctx.drawImage(img, 0, 0);
  } else if (cfg.effect === 'border') {
    const bw = Math.max(1, Math.round((getParam('width') ?? 0.05) * Math.min(img.naturalWidth, img.naturalHeight)));
    ctx.drawImage(img, 0, 0);
    ctx.strokeStyle = getParam('color') === 'white' ? '#fff' : getParam('color') === 'black' ? '#000' : '#888';
    ctx.lineWidth = bw;
    ctx.strokeRect(bw / 2, bw / 2, img.naturalWidth - bw, img.naturalHeight - bw);
  } else if (cfg.effect === 'resize') {
    const target = Math.max(16, Math.round((getParam('scale') ?? 1) * Math.min(img.naturalWidth, img.naturalHeight)));
    const ratio = Math.min(target / img.naturalWidth, target / img.naturalHeight);
    canvas.width = Math.max(1, Math.round(img.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * ratio));
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(img, 0, 0);
    if (EFFECTS[cfg.effect]) EFFECTS[cfg.effect](ctx, canvas.width, canvas.height);
  }
  dlBtn.disabled = false;
}

async function handleFile(file) {
  loadImage(file).then(({ img: i, url }) => {
    img = i; imgUrl = url;
    render();
    metaEl.textContent = `原图 ${i.naturalWidth} × ${i.naturalHeight}`;
  }).catch(() => toast('无法读取该图片'));
}

setupDropzone(drop, fileEl, handleFile);
params.forEach((p) => {
  if (!p.el) return;
  if (p.type === 'range') {
    p.el.addEventListener('input', () => { if (p.val) p.val.textContent = p.el.value + '%'; render(); });
    if (p.val) p.val.textContent = p.el.value + '%';
  } else {
    p.el.addEventListener('change', render);
  }
});

dlBtn.addEventListener('click', async () => {
  try {
    const blob = await canvasToBlob(canvas, 'image/png');
    downloadBlob(blob, `${cfg.effect}-${Date.now()}.png`);
  } catch { toast('导出失败'); }
});

if (clearBtn) clearBtn.addEventListener('click', () => {
  img = null; if (imgUrl) URL.revokeObjectURL(imgUrl); imgUrl = null;
  canvas.width = 0; canvas.height = 0; dlBtn.disabled = true; metaEl.textContent = '';
});
