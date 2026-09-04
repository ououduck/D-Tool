/* 进制转换工具脚本（BigInt） */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#rx-in'), baseEl = $('#rx-base'), customWrap = $('#rx-custom-wrap'), customEl = $('#rx-custom'), outEl = $('#rx-out');

baseEl.addEventListener('change', () => customWrap.classList.toggle('hidden', baseEl.value !== '-1'));

const DIGITS = '0123456789abcdefghijklmnopqrstuvwxyz';

function parseBigInt(str, base) {
  const neg = str.startsWith('-');
  if (neg) str = str.slice(1);
  const s = str.toLowerCase();
  if (!s) return null;
  let n = 0n;
  for (const ch of s) {
    const d = DIGITS.indexOf(ch);
    if (d < 0 || d >= base) return null;
    n = n * BigInt(base) + BigInt(d);
  }
  return neg ? -n : n;
}

$('#rx-run').addEventListener('click', () => {
  const raw = inEl.value.trim();
  if (!raw) return toast('请输入数值');

  let src = raw, base = Number(baseEl.value);
  if (base === 0) {
    if (/^-0x/i.test(raw)) { src = raw.slice(3); base = 16; }
    else if (/^-0b/i.test(raw)) { src = raw.slice(3); base = 2; }
    else if (/^-0o/i.test(raw)) { src = raw.slice(3); base = 8; }
    else if (/^0x/i.test(raw)) { src = raw.slice(2); base = 16; }
    else if (/^0b/i.test(raw)) { src = raw.slice(2); base = 2; }
    else if (/^0o/i.test(raw)) { src = raw.slice(2); base = 8; }
    else base = 10;
  }
  if (base === -1) base = Math.round(Number(customEl.value));
  if (base < 2 || base > 36) return toast('进制需在 2-36 之间');

  const n = parseBigInt(src, base);
  if (n === null) return toast(`输入不是合法的 ${base} 进制数`);

  const show = (b) => n.toString(b).padStart(1, '0');
  const rows = [
    `二进制 (2)      : ${show(2)}`,
    `八进制 (8)      : ${show(8)}`,
    `十进制 (10)     : ${show(10)}`,
    `十六进制 (16)   : ${show(16)}`,
    `三十二进制 (32) : ${show(32)}`,
    `三十六进制 (36) : ${show(36)}`,
  ];
  if (base !== 2 && base !== 8 && base !== 10 && base !== 16 && base !== 32 && base !== 36) {
    rows.push(`自定义 ${base} 进制 : ${show(base)}`);
  }
  outEl.textContent = rows.join('\n');
});

$('#rx-clear').addEventListener('click', () => { inEl.value = ''; outEl.textContent = '等待输入…'; inEl.focus(); });
