/* 时间戳转换工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const nowS = $('#ts-now-s'), nowMs = $('#ts-now-ms'), inEl = $('#ts-in'), dateEl = $('#ts-date'), outEl = $('#ts-out');

const tick = () => {
  const ms = Date.now();
  nowS.textContent = Math.floor(ms / 1000);
  nowMs.textContent = ms;
};
tick();
setInterval(tick, 1000);

const pad = (n) => String(n).padStart(2, '0');
const fmtLocal = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
const fmtUtc = (d) =>
  `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
const fmtIso = (d) => d.toISOString();
const fmtRelative = (ms) => {
  const diff = ms - Date.now();
  const abs = Math.abs(diff);
  const s = Math.floor(abs / 1000);
  if (s < 60) return `${s} 秒${diff < 0 ? '前' : '后'}`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} 分钟${diff < 0 ? '前' : '后'}`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} 小时${diff < 0 ? '前' : '后'}`;
  const d = Math.floor(h / 24);
  return `${d} 天${diff < 0 ? '前' : '后'}`;
};

const show = (lines) => { outEl.textContent = lines.join('\n'); };

inEl.addEventListener('input', () => {
  const v = inEl.value.trim();
  if (!v) { outEl.textContent = '输入时间戳或日期后自动转换'; return; }
  if (!/^-?\d+$/.test(v)) { outEl.textContent = '时间戳应为整数（可含负号），如 1700000000'; return; }
  const num = BigInt(v);
  const isMs = v.length >= 13;
  const ms = Number(isMs ? num : num * 1000n);
  if (!Number.isFinite(ms) || ms < -8640000000000000 || ms > 8640000000000000) {
    outEl.textContent = '超出 Date 可表示范围';
    return;
  }
  const d = new Date(ms);
  show([
    `本地时间：${fmtLocal(d)}`,
    `UTC 时间：${fmtUtc(d)}`,
    `ISO 8601：${fmtIso(d)}`,
    `相对时间：${fmtRelative(ms)}`,
    `毫秒形式：${ms}`,
  ]);
});

dateEl.addEventListener('change', () => {
  if (!dateEl.value) { outEl.textContent = '输入时间戳或日期后自动转换'; return; }
  const ms = new Date(dateEl.value).getTime();
  if (Number.isNaN(ms)) { outEl.textContent = '日期无效'; return; }
  show([
    `秒（10 位）：${Math.floor(ms / 1000)}`,
    `毫秒（13 位）：${ms}`,
    `UTC：${fmtUtc(new Date(ms))}`,
  ]);
});

$('#ts-fill').addEventListener('click', () => { inEl.value = String(Math.floor(Date.now() / 1000)); inEl.dispatchEvent(new Event('input')); });
$('#ts-clear').addEventListener('click', () => { inEl.value = ''; dateEl.value = ''; outEl.textContent = '输入时间戳或日期后自动转换'; inEl.focus(); });
