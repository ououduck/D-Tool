/* URL 解析器工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast, escapeHtml } = window.DT;

const inEl = $('#ua-in'), outEl = $('#ua-out');

$('#ua-run').addEventListener('click', () => {
  let raw = inEl.value.trim();
  if (!raw) return toast('请输入 URL');
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) raw = 'https://' + raw;
  let u;
  try { u = new URL(raw); } catch { return toast('URL 格式无效'); }

  const params = [];
  u.searchParams.forEach((v, k) => {
    let decoded = v;
    try { decoded = decodeURIComponent(v); } catch {}
    params.push(`${k} = ${decoded}`);
  });

  const lines = [
    `协议：${u.protocol.replace(':', '')}`,
    `域名：${u.hostname}`,
    u.port ? `端口：${u.port}` : '端口：默认',
    `路径：${u.pathname || '/'}`,
    `查询参数（${u.searchParams.size} 个）：`,
    ...(params.length ? params : ['  （无）']),
    `锚点：${u.hash ? u.hash.slice(1) : '（无）'}`,
    `完整 URL：${u.href}`,
  ];
  outEl.textContent = lines.join('\n');
});

$('#ua-encode').addEventListener('click', () => {
  if (!inEl.value) return toast('请输入内容');
  outEl.textContent = encodeURIComponent(inEl.value);
});

$('#ua-decode').addEventListener('click', () => {
  if (!inEl.value) return toast('请输入内容');
  try { outEl.textContent = decodeURIComponent(inEl.value); }
  catch { toast('解码失败：存在非法转义序列'); }
});

$('#ua-clear').addEventListener('click', () => { inEl.value = ''; outEl.textContent = '等待解析…'; inEl.focus(); });
