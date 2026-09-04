export default {
  slug: 'text-diff',
  name: '文本对比',
  desc: '在线文本差异对比工具，逐行高亮新增与删除内容，适合代码、配置与文案比对。',
  keywords: '文本对比,文本diff,在线对比,代码对比,文本比较,diff工具,文件对比',
  category: 'text',
  body: `<div class="row">
  <div class="field grow">
    <label for="td-a">原文本</label>
    <textarea id="td-a" class="mono" rows="9" placeholder="粘贴原文本"></textarea>
  </div>
  <div class="field grow">
    <label for="td-b">新文本</label>
    <textarea id="td-b" class="mono" rows="9" placeholder="粘贴新文本"></textarea>
  </div>
</div>
<div class="toolbar">
  <button id="td-run" class="btn">开始对比</button>
  <button id="td-swap" class="btn btn-ghost">交换两侧</button>
  <span class="spacer"></span>
  <button id="td-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">对比结果</div>
  <div id="td-stats" class="diff-stats"></div>
  <div id="td-out" class="diff"></div>
</div>
<div class="note">按行对比（LCS 算法）：<del>删除线</del>为原文本独有、<strong>加粗</strong>为新文本新增。单侧超过 3000 行会提示无法处理。</div>`,
  usage: `<ol>
  <li>左侧粘贴原文本、右侧粘贴新文本（适合代码、配置、日志、文案对比）。</li>
  <li>点击“开始对比”，逐行展示：保留行、删除行（删除线）、新增行（加粗+左竖线）。</li>
  <li>上方统计显示新增/删除/不变的行数；“交换两侧”可快速互换输入。</li>
</ol>`,
  faq: [
    { q: '对比的单位是什么？', a: '按行对比（换行符分隔）。大段单行文本会显示为整行差异，如需更细粒度可先按标点或空格分行。' },
    { q: '最多支持多少行？', a: '单侧最多 3000 行，超出会提示。实际差异计算的耗时与两侧行数乘积相关，文件很大时可先截取片段。' },
    { q: '中文对比准确吗？', a: '按字符串精确匹配，中文逐字一致才算相同行；行内单个字不同会整行标为差异（未做字符级 diff）。' },
  ],
};
