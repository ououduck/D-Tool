/* HTML 实体转义/反转义工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#he-in'), outEl = $('#he-out');
const escHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

$('#he-encode').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  outEl.value = escHtml(v);
});

$('#he-encode-all').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  outEl.value = [...v].map((ch) => '&#' + ch.codePointAt(0) + ';').join('');
});

$('#he-decode').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  try {
    // 用浏览器解析器解码实体；文档级文本节点不会被当作脚本执行
    const doc = new DOMParser().parseFromString(v, 'text/html');
    outEl.value = doc.body.textContent;
  } catch {
    toast('还原失败');
  }
});

$('#he-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
