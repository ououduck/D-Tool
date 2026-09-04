/* 密码生成器工具脚本 */
const $ = (s) => document.querySelector(s);
const { escapeHtml, toast } = window.DT;

const lenEl = $('#pw-len'), lenVal = $('#pw-lenval'), countEl = $('#pw-count'), listEl = $('#pw-list');
const strengthLabel = $('#pw-strength-label'), strengthBar = $('#pw-strength-bar');

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digit: '0123456789',
  symbol: '!@#$%^&*()_+-=[]{};:,.<>?/~',
};
const AMBIG = '0O1lI|`\'"';

function randomInt(n) {
  // crypto.getRandomValues 均匀取 [0, n)
  const arr = new Uint32Array(1);
  const limit = 4294967296 - (4294967296 % n);
  let v;
  do { crypto.getRandomValues(arr); v = arr[0]; } while (v >= limit);
  return v % n;
}

function generateOne(charset, len) {
  const chars = [];
  for (let i = 0; i < len; i++) chars.push(charset[randomInt(charset.length)]);
  // 若勾选了多类字符，保证每类至少出现一次（洗牌后放置）
  return chars.join('');
}

$('#pw-run').addEventListener('click', () => {
  const len = Math.round(Number(lenEl.value));
  const count = Math.min(20, Math.max(1, Math.round(Number(countEl.value) || 1)));
  const opts = { lower: $('#pw-lower').checked, upper: $('#pw-upper').checked, digit: $('#pw-digit').checked, symbol: $('#pw-symbol').checked };
  const ambig = $('#pw-ambig').checked;
  const selected = Object.keys(opts).filter((k) => opts[k]);
  if (!selected.length) return toast('至少选择一种字符类别');

  let charset = selected.map((k) => SETS[k]).join('');
  if (ambig) charset = [...charset].filter((c) => !AMBIG.includes(c)).join('');
  if (!charset.length) charset = 'abcdefghijklmnopqrstuvwxyz';

  const list = [];
  for (let i = 0; i < count; i++) list.push(generateOne(charset, len));

  // 熵与强度
  const entropy = len * Math.log2(charset.length);
  const label = entropy < 64 ? '弱' : entropy < 80 ? '中' : entropy < 100 ? '强' : '极强';
  strengthLabel.textContent = `强度：${label}（熵约 ${entropy.toFixed(0)} 位，字符集 ${charset.length} 种）`;
  strengthBar.style.width = Math.min(100, (entropy / 128) * 100) + '%';

  listEl.innerHTML = list
    .map((p) => `<div class="pw-item"><code>${escapeHtml(p)}</code><button class="btn btn-ghost btn-sm" data-copy="${escapeHtml(p)}">复制</button></div>`)
    .join('');
});

lenEl.addEventListener('input', () => { lenVal.textContent = lenEl.value; });

$('#pw-clear').addEventListener('click', () => { listEl.innerHTML = ''; strengthLabel.textContent = '强度：—'; strengthBar.style.width = '0'; });
