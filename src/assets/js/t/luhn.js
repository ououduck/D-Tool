/* 银行卡号校验工具脚本 */
import { luhnCheck } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#lu-in'), validEl = $('#lu-valid'), brandEl = $('#lu-brand'), lenEl = $('#lu-len');

function detectBrand(s) {
  if (/^4/.test(s)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(s)) return 'MasterCard';
  if (/^62/.test(s)) return '银联';
  if (/^(34|37)/.test(s)) return 'American Express';
  if (/^(6011|65)/.test(s)) return 'Discover';
  if (/^(30|36|38)/.test(s)) return 'Diners Club';
  if (/^9/.test(s)) return '其他（可能为本地卡）';
  return '未知';
}

$('#lu-run').addEventListener('click', () => {
  const raw = inEl.value.trim();
  if (!raw) return toast('请输入卡号');
  const digits = raw.replace(/[\s-]/g, '');
  if (!/^\d+$/.test(digits)) return toast('卡号只能包含数字与空格');
  validEl.textContent = luhnCheck(digits) ? '通过' : '不通过';
  brandEl.textContent = detectBrand(digits);
  lenEl.textContent = digits.length;
});

$('#lu-clear').addEventListener('click', () => {
  inEl.value = '';
  validEl.textContent = '—'; brandEl.textContent = '—'; lenEl.textContent = '—';
  inEl.focus();
});
