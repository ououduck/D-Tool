/* 身份证校验工具脚本 */
import { idcardCheck } from '../lib/misc.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#id-in'), validEl = $('#id-valid'), birthEl = $('#id-birth'), genderEl = $('#id-gender'), ageEl = $('#id-age');

$('#id-run').addEventListener('click', () => {
  const v = inEl.value.trim();
  if (!v) return toast('请输入身份证号码');
  const r = idcardCheck(v);
  validEl.textContent = r.ok ? '通过' : '不通过';
  birthEl.textContent = r.birth || '—';
  genderEl.textContent = r.gender || '—';
  ageEl.textContent = r.age ?? '—';
  if (!r.ok) toast(r.msg);
});

$('#id-clear').addEventListener('click', () => {
  inEl.value = '';
  validEl.textContent = '—'; birthEl.textContent = '—'; genderEl.textContent = '—'; ageEl.textContent = '—';
  inEl.focus();
});
