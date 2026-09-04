/* Unicode 转义/转换工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#uc-in'), outEl = $('#uc-out'), verbose = $('#uc-verbose');

$('#uc-to').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  outEl.value = [...v]
    .map((ch) => {
      const cp = ch.codePointAt(0);
      return verbose.checked ? `\\u{${cp.toString(16)}}` : `\\u${cp.toString(16).padStart(4, '0')}`;
    })
    .join('');
});

$('#uc-from').addEventListener('click', () => {
  const v = inEl.value;
  if (!v) return toast('请先输入内容');
  const out = v
    .replace(/\\u\{([0-9a-fA-F]{1,6})\}/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCodePoint(parseInt(h, 16)));
  if (out === v && !/\\u/.test(v)) return toast('输入中没有可识别的转义序列');
  outEl.value = out;
});

$('#uc-clear').addEventListener('click', () => { inEl.value = ''; outEl.value = ''; inEl.focus(); });
