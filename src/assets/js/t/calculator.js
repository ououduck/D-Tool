/* 在线计算器工具脚本（四则运算 + % + 正负号） */
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const display = $('#ca-display');
let expr = '', lastOp = null, lastNum = null, justEvaluated = false;

const fmt = (n) => {
  if (!Number.isFinite(n)) return '错误';
  const s = parseFloat(n.toPrecision(12)).toString();
  return s.length > 20 ? n.toExponential(6) : s;
};

function render() { display.value = expr || '0'; }

function inputKey(k) {
  if (justEvaluated && /^\d$/.test(k)) { expr = ''; justEvaluated = false; }
  if (/^\d$/.test(k)) {
    if (expr === '0') expr = k; else expr += k;
  } else if (k === '.') {
    const seg = expr.split(/[+\-×÷]/).pop();
    if (!seg.includes('.')) expr += expr === '' ? '0.' : '.';
  } else if (k === '±') {
    if (expr && expr !== '0') {
      expr = expr.startsWith('-') ? expr.slice(1) : '-' + expr;
    }
  } else if (k === 'C') {
    expr = ''; lastOp = null; lastNum = null; justEvaluated = false;
  } else if (k === '⌫') {
    expr = expr.slice(0, -1);
  } else if (k === '=') {
    evaluate();
  } else if (['+', '-', '×', '÷'].includes(k)) {
    if (expr !== '' && /[+\-×÷]$/.test(expr)) expr = expr.slice(0, -1);
    expr += k;
  } else if (k === '%') {
    evaluate();
    if (display.value !== '错误') expr = fmt(parseFloat(display.value) / 100);
  }
  justEvaluated = false;
  render();
}

function evaluate() {
  if (!expr) return;
  try {
    // 转义为 JS 表达式后计算（仅含数字与四则符号，无注入风险）
    const js = expr.replace(/×/g, '*').replace(/÷/g, '/');
    if (!/^[0-9+\-*/.()% ]*$/.test(js)) throw new Error();
    const val = Function(`"use strict"; return (${js});`)();
    expr = fmt(val);
    justEvaluated = true;
  } catch {
    expr = '错误';
    justEvaluated = true;
  }
  render();
}

$$('.calc-key').forEach((btn) => btn.addEventListener('click', () => inputKey(btn.dataset.k)));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); inputKey('='); }
  else if (e.key === 'Backspace') { e.preventDefault(); inputKey('⌫'); }
  else if (e.key === 'Escape') { inputKey('C'); }
  else if (/^[0-9+\-*/.%]$/.test(e.key)) {
    const map = { '*': '×', '/': '÷' };
    inputKey(map[e.key] || e.key);
  }
});

render();
