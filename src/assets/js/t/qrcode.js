/* 二维码生成工具脚本 */
import qrcode from '../lib/qr.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#qr-in'), sizeEl = $('#qr-size'), eccEl = $('#qr-ecc');
const canvas = $('#qr-canvas'), downloadBtn = $('#qr-download');

let lastDataUrl = '';

function generate() {
  const text = inEl.value.trim();
  if (!text) { toast('请输入内容'); return; }
  try {
    const qr = qrcode(0, eccEl.value);
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    const size = Number(sizeEl.value);
    const cell = Math.floor(size / (count + 8)); // 4 模块白边
    const px = cell * (count + 8);
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, px, px);
    ctx.fillStyle = '#18181b';
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) ctx.fillRect((c + 4) * cell, (r + 4) * cell, cell, cell);
      }
    }
    lastDataUrl = canvas.toDataURL('image/png');
    downloadBtn.disabled = false;
  } catch {
    toast('内容过长，无法生成二维码（可降低容错级别或缩短内容）');
    downloadBtn.disabled = true;
  }
}

inEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); } });
$('#qr-run').addEventListener('click', generate);
sizeEl.addEventListener('change', () => { if (inEl.value.trim()) generate(); });
eccEl.addEventListener('change', () => { if (inEl.value.trim()) generate(); });

downloadBtn.addEventListener('click', () => {
  if (!lastDataUrl) return;
  const a = document.createElement('a');
  a.href = lastDataUrl;
  a.download = `qrcode-${Date.now()}.png`;
  a.click();
});

$('#qr-clear').addEventListener('click', () => { inEl.value = ''; downloadBtn.disabled = true; lastDataUrl = ''; inEl.focus(); });
