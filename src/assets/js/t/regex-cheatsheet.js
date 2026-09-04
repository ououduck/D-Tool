/* 常用正则速查表工具脚本（静态数据 + 搜索 + 复制） */
const $ = (s) => document.querySelector(s);
const { escapeHtml } = window.DT;

const RULES = [
  ['邮箱', String.raw`^[\w.+-]+@[\w-]+(\.[\w-]+)+$`, '通用邮箱'],
  ['手机号（中国）', String.raw`^1[3-9]\d{9}$`, '大陆手机号'],
  ['身份证（18 位）', String.raw`^\d{17}[\dXx]$`, '18 位身份证'],
  ['URL', String.raw`^https?://[\w-]+(\.[\w-]+)+[/\w?=&.%#-]*$`, 'http/https 链接'],
  ['IPv4', String.raw`^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$`, 'IP 地址'],
  ['IPv6', String.raw`^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1|::)$`, 'IPv6 简化版'],
  ['日期（YYYY-MM-DD）', String.raw`^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`, 'ISO 日期'],
  ['时间（HH:MM:SS）', String.raw`^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$`, '24 小时制'],
  ['中文字符', String.raw`^[\u4e00-\u9fa5]+$`, '纯中文'],
  ['中文（含标点）', String.raw`^[\u4e00-\u9fa5，。！？、；：""''（）【】《》]+$`, '中文与常用标点'],
  ['英文字母', String.raw`^[a-zA-Z]+$`, '纯英文'],
  ['数字', String.raw`^\d+$`, '非负整数'],
  ['整数（含负数）', String.raw`^-?\d+$`, '正负整数'],
  ['小数', String.raw`^-?\d+(\.\d+)?$`, '小数或整数'],
  ['金额（两位小数）', String.raw`^\d+(\.\d{1,2})?$`, '人民币金额'],
  ['邮政编码（中国）', String.raw`^\d{6}$`, '6 位邮编'],
  ['QQ 号', String.raw`^[1-9]\d{4,11}$`, '5-12 位'],
  ['微信号', String.raw`^[a-zA-Z][\w-]{5,19}$`, '字母开头，6-20 位'],
  ['车牌号（中国）', String.raw`^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$`, '大陆车牌'],
  ['银行卡号', String.raw`^\d{16,19}$`, '16-19 位数字'],
  ['用户名（字母数字下划线）', String.raw`^[a-zA-Z0-9_]{3,16}$`, '3-16 位'],
  ['密码强度（8-20 位含大小写数字）', String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$`, '复杂密码'],
  ['HTML 标签', String.raw`<\/?[a-z][^>]*>`, '匹配标签'],
  ['Markdown 链接', String.raw`\[([^\]]+)\]\(([^)]+)\)`, '提取文本与 URL'],
  ['颜色（HEX）', String.raw`^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$`, '十六进制颜色'],
  ['版本号', String.raw`^\d+(\.\d+){1,3}$`, '如 1.2.3'],
  ['时间戳（10 位）', String.raw`^\d{10}$`, 'Unix 秒'],
  ['毫秒时间戳', String.raw`^\d{13}$`, 'Unix 毫秒'],
  ['连续重复词', String.raw`\b(\w+)\s+\1\b`, '英文重复词'],
  ['空白行', String.raw`^\s*$`, '匹配空行'],
];

function render(list) {
  const rows = list
    .map(([name, regex, note]) => `<tr>
  <td style="width:140px"><strong>${escapeHtml(name)}</strong><br><span class="text-3" style="font-size:12.5px">${escapeHtml(note)}</span></td>
  <td><code>${escapeHtml(regex)}</code></td>
  <td style="width:70px"><button class="btn btn-ghost btn-sm" data-copy="${escapeHtml(regex)}">复制</button></td>
</tr>`)
    .join('');
  $('#rc-table').innerHTML = `<tbody>${rows}</tbody>`;
}

render(RULES);

$('#rc-search').addEventListener('input', () => {
  const q = $('#rc-search').value.trim().toLowerCase();
  render(q ? RULES.filter(([n, r, t]) => n.includes(q) || r.includes(q) || t.includes(q)) : RULES);
});
