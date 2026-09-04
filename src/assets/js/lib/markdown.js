/* 安全 Markdown 渲染器（子集）
   安全策略：先整体 HTML 转义，再做块级/行内标记替换，原始 HTML 一律不可执行。
   支持：标题 / 围栏代码 / 引用 / 列表 / 表格 / 分割线 / 粗斜删除线 / 行内代码 / 链接 */

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function inline(s) {
  // 1. 行内代码占位（内容已转义，直接放入 <code>）
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  // 2. 链接：[文本](url)。URL 不含空白与括号，避免贪婪吞掉尾括号
  s = s.replace(/\[([^\]]+)\]\(([^\s()]+)\)/g, (m, t, url) => {
    if (/^(javascript|data|vbscript):/i.test(url)) return t; // 危险协议只留文本
    const ext = /^https?:/i.test(url) ? ' target="_blank" rel="noopener nofollow"' : '';
    return `<a href="${url}"${ext}>${t}</a>`;
  });
  // 3. 自动链接 <https://...>（全文已转义，此处匹配实体形态）
  s = s.replace(/&lt;((?:https?:\/\/)[^\s<>]+)&gt;/g, '<a href="$1" target="_blank" rel="noopener nofollow">$1</a>');
  // 4. 粗体、删除线、斜体
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  s = s.replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^_\w])_([^_\n]+)_/g, '$1<em>$2</em>');
  // 5. 还原行内代码
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
  return s;
}

function isTableSep(line) {
  return /^\s*\|?[\s:|-]+\|?\s*$/.test(line) && line.includes('-');
}

function parseTable(lines, start) {
  const header = lines[start].replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const out = ['<table><thead><tr>'];
  for (const h of header) out.push(`<th>${inline(h)}</th>`);
  out.push('</tr></thead><tbody>');
  let i = start + 2;
  while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].includes('|')) {
    const cells = lines[i].replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    out.push('<tr>');
    for (const c of cells) out.push(`<td>${inline(c)}</td>`);
    out.push('</tr>');
    i++;
  }
  out.push('</tbody></table>');
  return { html: out.join(''), next: i };
}

export function renderMarkdown(src) {
  const text = String(src).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = esc(text).split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 围栏代码
    const fence = line.match(/^(`{3,}|~{3,})\s*([\w+-]*)\s*$/);
    if (fence) {
      const lang = fence[2];
      const buf = [];
      i++;
      while (i < lines.length && !new RegExp(`^${fence[1][0]}{${fence[1].length},}\\s*$`).test(lines[i])) {
        buf.push(lines[i]); i++;
      }
      i++; // 跳过结束围栏
      out.push(`<pre><code${lang ? ` class="lang-${esc(lang)}"` : ''}>${buf.join('\n')}</code></pre>`);
      continue;
    }

    // 空行
    if (!line.trim()) { i++; continue; }

    // 标题
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      i++; continue;
    }

    // 分割线
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }

    // 表格（下一行是分隔行）
    if (line.includes('|') && isTableSep(lines[i + 1] || '')) {
      const { html, next } = parseTable(lines, i);
      out.push(html); i = next; continue;
    }

    // 引用：连续 > 行（全文已转义，此处为 &gt;）
    if (line.startsWith('&gt;')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('&gt;')) {
        buf.push(lines[i].replace(/^&gt;\s?/, '')); i++;
      }
      out.push(`<blockquote>${buf.map((l) => `<p>${inline(l)}</p>`).join('')}</blockquote>`);
      continue;
    }

    // 列表
    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]/.test(line);
      const buf = [];
      while (i < lines.length && (/^\s*[-*+]\s+/.test(lines[i]) || /^\s*\d+[.)]\s+/.test(lines[i]))) {
        buf.push(lines[i].replace(/^\s*[-*+]\s+/, '').replace(/^\s*\d+[.)]\s+/, ''));
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${buf.map((l) => `<li>${inline(l)}</li>`).join('')}</${tag}>`);
      continue;
    }

    // 段落：合并到下一个空行/块级起点
    const buf = [line];
    i++;
    while (
      i < lines.length && lines[i].trim() &&
      !/^(#{1,6})\s/.test(lines[i]) && !/^\s*[-*+]\s+/.test(lines[i]) &&
      !/^\s*\d+[.)]\s+/.test(lines[i]) && !lines[i].startsWith('&gt;') &&
      !/^(`{3,}|~{3,})/.test(lines[i]) && !/^(-{3,}|\*{3,}|_{3,})\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]); i++;
    }
    out.push(`<p>${buf.map((l) => inline(l)).join('<br>')}</p>`);
  }

  return out.join('\n');
}
