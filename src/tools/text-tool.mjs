export default {
  slug: 'text-tool',
  name: '文本处理/统计',
  desc: '在线文本统计与处理：字数、字符、行数统计，去重、排序、去除空行一键完成。',
  keywords: '字数统计,文本去重,文本排序,字符统计,在线字数,行数统计,文本处理工具',
  category: 'text',
  body: `<div class="stat-grid" id="tt-stats">
  <div class="stat"><div class="num" id="tt-c1">0</div><div class="lbl">字符（含空格）</div></div>
  <div class="stat"><div class="num" id="tt-c2">0</div><div class="lbl">字符（不含空格）</div></div>
  <div class="stat"><div class="num" id="tt-words">0</div><div class="lbl">字数（中英文混合）</div></div>
  <div class="stat"><div class="num" id="tt-lines">0</div><div class="lbl">行数</div></div>
  <div class="stat"><div class="num" id="tt-bytes">0</div><div class="lbl">UTF-8 字节</div></div>
</div>
<div class="field">
  <label for="tt-in">输入文本</label>
  <textarea id="tt-in" class="mono" rows="10" placeholder="粘贴文本，统计实时更新；下方按钮可直接处理"></textarea>
</div>
<div class="toolbar">
  <button id="tt-dedup" class="btn btn-ghost">去重（保留顺序）</button>
  <button id="tt-dedup-sort" class="btn btn-ghost">去重并排序</button>
  <button id="tt-sort" class="btn btn-ghost">排序（升序）</button>
  <button id="tt-sort-d" class="btn btn-ghost">排序（降序）</button>
  <button id="tt-reverse" class="btn btn-ghost">行序反转</button>
  <button id="tt-clear-lines" class="btn btn-ghost">去除空行</button>
  <button id="tt-trim" class="btn btn-ghost">去除每行首尾空格</button>
  <span class="spacer"></span>
  <button id="tt-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="note">字数统计规则：连续英文/数字按一个单词计，每个中文、日文、标点独立计 1 字，中文按“字”统计时不把空格计入。</div>`,
  usage: `<ol>
  <li>粘贴文本后，字符、字数、行数、UTF-8 字节数实时统计。</li>
  <li>工具栏操作会就地处理文本区内容：去重（保留或排序）、排序、反转行序、去空行、去首尾空格。</li>
  <li>处理结果可直接复制，处理过程全部在本地完成。</li>
</ol>`,
  faq: [
    { q: '字数统计和 Word 一样吗？', a: '中文场景下按“汉字+单词”计数，与 Word 的“字数”接近但可能略有差异（Word 对数字、标点的统计口径不同）。' },
    { q: '去重是按行吗？', a: '是的，按整行精确去重（重复空行也会被合并）。需要按词去重请先把文本每词一行再操作。' },
    { q: '能处理超大文本吗？', a: '可以。统计与处理都在本地执行，几十 MB 文本也能流畅处理，但页面渲染会占用相应内存。' },
  ],
};
