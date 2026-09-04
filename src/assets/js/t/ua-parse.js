/* User-Agent 解析工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#up-in'), outEl = $('#up-out');

function parseUA(ua) {
  const s = ua;
  const res = { 浏览器: '未知', 版本: '—', 内核: '—', 操作系统: '未知', 设备: '桌面', '64 位': '—' };

  // 浏览器
  let m;
  if ((m = s.match(/Edg\/([\d.]+)/))) { res.浏览器 = 'Edge'; res.版本 = m[1]; res.内核 = 'Chromium'; }
  else if ((m = s.match(/OPR\/([\d.]+)/))) { res.浏览器 = 'Opera'; res.版本 = m[1]; res.内核 = 'Chromium'; }
  else if ((m = s.match(/Chrome\/([\d.]+)/)) && !/CriOS/.test(s)) { res.浏览器 = 'Chrome'; res.版本 = m[1]; res.内核 = 'Chromium'; }
  else if ((m = s.match(/Firefox\/([\d.]+)/))) { res.浏览器 = 'Firefox'; res.版本 = m[1]; res.内核 = 'Gecko'; }
  else if ((m = s.match(/Version\/([\d.]+).*Safari/))) { res.浏览器 = 'Safari'; res.版本 = m[1]; res.内核 = 'WebKit'; }
  else if ((m = s.match(/CriOS\/([\d.]+)/))) { res.浏览器 = 'Chrome (iOS)'; res.版本 = m[1]; res.内核 = 'WebKit'; }
  else if ((m = s.match(/MSIE ([\d.]+)/)) || (m = s.match(/Trident\/.*rv:([\d.]+)/))) { res.浏览器 = 'IE'; res.版本 = m[1]; res.内核 = 'Trident'; }

  // 操作系统
  if (/Windows NT 10/.test(s)) res.操作系统 = 'Windows 10/11';
  else if (/Windows NT 6\.3/.test(s)) res.操作系统 = 'Windows 8.1';
  else if (/Windows NT 6\.1/.test(s)) res.操作系统 = 'Windows 7';
  else if (/Windows/.test(s)) res.操作系统 = 'Windows';
  else if (/iPhone|iPad|iPod/.test(s)) { res.操作系统 = /iPad/.test(s) ? 'iPadOS' : 'iOS'; res.设备 = '移动端'; }
  else if (/Android/.test(s)) { res.操作系统 = 'Android'; res.设备 = /Mobile/.test(s) ? '移动端' : '平板'; }
  else if (/Mac OS X/.test(s)) res.操作系统 = 'macOS';
  else if (/Linux/.test(s)) res.操作系统 = 'Linux';
  else if (/X11/.test(s)) res.操作系统 = 'Unix';

  if (/Mobile|iPhone|Android.*Mobile/.test(s) && res.设备 === '桌面') res.设备 = '移动端';
  if (/WOW64|x64|Win64/.test(s)) res['64 位'] = '是';
  return res;
}

$('#up-run').addEventListener('click', () => {
  const ua = inEl.value.trim();
  if (!ua) return toast('请先输入 UA');
  const r = parseUA(ua);
  outEl.textContent = Object.entries(r).map(([k, v]) => `${k}：${v}`).join('\n');
});

$('#up-now').addEventListener('click', () => {
  inEl.value = navigator.userAgent;
  outEl.textContent = Object.entries(parseUA(navigator.userAgent)).map(([k, v]) => `${k}：${v}`).join('\n');
});
