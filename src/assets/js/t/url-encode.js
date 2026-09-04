/* URL 编码/解码工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#ue-in'), outEl = $('#ue-out'), partial = $('#ue-partial');

$('#ue-encode').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  try { outEl.value = partial.checked ? encodeURI(v) : encodeURIComponent(v); }
  catch { toast('编码失败：输入包含无法处理的字符'); }
});

$('#ue-decode').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  try { outEl.value = partial.checked ? decodeURI(v) : decodeURIComponent(v); }
  catch { toast('解码失败：存在非法的 % 转义序列'); }
});

$('#ue-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
