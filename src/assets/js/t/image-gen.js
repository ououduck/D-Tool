/* 共享运行时：图片生成工具（验证码/头像/占位图）
   页面 <script type="application/json" id="ig-cfg"> 描述类型与参数。
   复用 main.js 的 downloadBlob。 */

const $ = (s) => document.querySelector(s);
const { toast, downloadBlob } = window.DT;

const cfgEl = $('#ig-cfg');
if (!cfgEl) return;
const cfg = JSON.parse(cfgEl.textContent);

const canvas = $('#ig-canvas');
const runBtn = $('#ig-run');
const dlBtn = $('#ig-download');
const params = (cfg.params || []).map((p, i) => ({ ...p, el: $(`#ig-p-${i}`), val: $(`#ig-p-${i}-v`) }));

function getParam(name, fallback) {
  const p = params.find((x) => x.name === name);
  if (!p || !p.el) return fallback;
  return p.type === 'range' ? Number(p.el.value) / 100 : p.el.value;
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* 随机验证码 */
function drawCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const len = Math.max(4, Math.min(8, parseInt(getParam('length', '4'), 10) || 4));
  const noise = getParam('noise', '0.3');
  let text = '';
  for (let i = 0; i < len; i++) text += pick(chars);
  canvas.width = len * 32 + 20;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f4f4f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 干扰线
  for (let i = 0; i < Math.round(noise * 20); i++) {
    ctx.strokeStyle = `rgba(${Math.random() * 200 | 0},${Math.random() * 200 | 0},${Math.random() * 200 | 0},0.4)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }
  // 字符
  ctx.font = 'bold 34px system-ui, sans-serif';
  for (let i = 0; i < len; i++) {
    ctx.fillStyle = `hsl(${Math.random() * 360 | 0}, 60%, 35%)`;
    ctx.save();
    ctx.translate(20 + i * 32, 44);
    ctx.rotate((Math.random() - 0.5) * 0.5);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
  return text;
}

/* 字母头像（首字母 + 背景色） */
function drawAvatar() {
  const name = String(getParam('name', 'D') || 'D');
  const first = [...name][0].toUpperCase();
  const hue = Math.abs([...name].reduce((s, c) => s + c.codePointAt(0), 0)) % 360;
  const size = Math.max(64, Math.min(512, parseInt(getParam('size', '256'), 10) || 256));
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, size, size);
  g.addColorStop(0, `hsl(${hue}, 65%, 45%)`);
  g.addColorStop(1, `hsl(${(hue + 40) % 360}, 65%, 35%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = `bold ${Math.round(size * 0.55)}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(first, size / 2, size / 2 + size * 0.02);
}

/* 占位图 */
function drawPlaceholder() {
  const w = Math.max(32, Math.min(1600, parseInt(getParam('width', '400'), 10) || 400));
  const h = Math.max(32, Math.min(1600, parseInt(getParam('height', '300'), 10) || 300));
  const text = getParam('text', `${w} × ${h}`);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e4e4e7';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#d4d4d8';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, w - 4, h - 4);
  ctx.fillStyle = '#71717a';
  ctx.font = `${Math.max(14, Math.min(28, Math.round(w / 14)))}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, w / 2, h / 2);
}

const DRAWERS = { captcha: drawCaptcha, avatar: drawAvatar, placeholder: drawPlaceholder };

function run() {
  const drawer = DRAWERS[cfg.type];
  if (!drawer) return toast('未知类型');
  const result = drawer();
  dlBtn.disabled = false;
  if (cfg.type === 'captcha' && result) toast(`验证码：${result}`);
}

if (runBtn) runBtn.addEventListener('click', run);
params.forEach((p) => {
  if (!p.el) return;
  if (p.type === 'range') {
    p.el.addEventListener('input', () => { if (p.val) p.val.textContent = p.el.value + '%'; });
    if (p.val) p.val.textContent = p.el.value + '%';
  }
});
if (dlBtn) dlBtn.addEventListener('click', async () => {
  try {
    const blob = await new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('导出失败'))), 'image/png'));
    downloadBlob(blob, `${cfg.type}-${Date.now()}.png`);
  } catch { toast('导出失败'); }
});
run();
