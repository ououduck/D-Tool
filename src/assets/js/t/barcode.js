/* EAN-13 条形码生成工具脚本 */
import { ean13CheckDigit } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast, downloadBlob } = window.DT;

const inEl = $('#bc-in'), heightEl = $('#bc-height'), widthEl = $('#bc-width');
const canvas = $('#bc-canvas'), runBtn = $('#bc-run'), dlBtn = $('#bc-download'), metaEl = $('#bc-meta');

// EAN-13 编码表：L 码（左 6 位）、R 码（右 6 位，R = L 取反）
const L = [
  '0001101', '0011001', '0010011', '0111101', '0100011',
  '0110001', '0101111', '0111011', '0110111', '0001011',
];
const R = L.map((s) => [...s].map((c) => (c === '0' ? '1' : '0')).join(''));
// 首位数字决定左 6 位使用 L/G 的排列
const FIRST = [
  'LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG',
  'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL',
];
const G = L.map((s) => [...s].map((c) => (c === '0' ? '1' : '0')).join(''));

function draw(code13) {
  const scale = Math.min(6, Math.max(1, Math.round(Number(widthEl.value) || 2)));
  const h = Math.min(300, Math.max(40, Math.round(Number(heightEl.value) || 80)));
  const guard = '101', center = '01010';
  // 编码序列：起始符 + 左6位(按FIRST排列) + 中心 + 右6位(R) + 终止符
  let bits = guard;
  const first = Number(code13[0]);
  const leftPattern = FIRST[first];
  for (let i = 0; i < 6; i++) {
    const d = Number(code13[i + 1]);
    bits += leftPattern[i] === 'L' ? L[d] : G[d];
  }
  bits += center;
  for (let i = 0; i < 6; i++) bits += R[Number(code13[i + 7])];
  bits += guard;

  const unit = 2 * scale; // 每个模块 2px × 倍数
  const w = bits.length * unit;
  canvas.width = w;
  canvas.height = h + 30;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, canvas.height);
  ctx.fillStyle = '#18181b';
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === '1') ctx.fillRect(i * unit, 0, unit, h);
  }
  // 数字
  ctx.font = `600 ${12 * scale}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(code13[0], 10 * scale, h + 18 * scale);
  for (let i = 0; i < 6; i++) ctx.fillText(code13[i + 1], (14 + i * 7) * unit + 3 * scale, h + 18 * scale);
  for (let i = 0; i < 6; i++) ctx.fillText(code13[i + 7], (50 + i * 7) * unit + 3 * scale, h + 18 * scale);
  return w;
}

$('#bc-run').addEventListener('click', () => {
  const v = inEl.value.replace(/\D/g, '');
  if (v.length !== 12) return toast('请输入 12 位数字');
  const check = ean13CheckDigit(v);
  const code13 = v + check;
  const w = draw(code13);
  dlBtn.disabled = false;
  dlBtn.onclick = () => {
    canvas.toBlob((b) => b && downloadBlob(b, `barcode-${code13}.png`), 'image/png');
  };
  metaEl.textContent = `EAN-13：${code13}（校验位 ${check}）· 输出 ${w} × ${canvas.height}px`;
});

$('#bc-clear').addEventListener('click', () => {
  inEl.value = ''; canvas.width = 0; canvas.height = 0;
  dlBtn.disabled = true; metaEl.textContent = '';
});
