export default {
  slug: 'random-draw',
  name: '随机抽奖',
  desc: '在线随机抽奖工具，粘贴名单即可抽取中奖者，支持一次抽多人、去重抽取。',
  keywords: '随机抽奖,抽奖工具,随机选人,点名器,抽奖,随机抽取,名单抽取',
  category: 'gen',
  body: `<div class="field">
  <label for="rd-list">名单（每行一个）</label>
  <textarea id="rd-list" rows="8" placeholder="张三&#10;李四&#10;王五&#10;赵六"></textarea>
</div>
<div class="row">
  <div class="field">
    <label for="rd-count" class="field-label">抽取人数</label>
    <input type="number" id="rd-count" value="1" min="1" max="100" class="w-xs">
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="rd-unique" checked>每人最多中一次</label>
  </div>
</div>
<div class="toolbar">
  <button id="rd-run" class="btn">抽奖</button>
  <span class="spacer"></span>
  <button id="rd-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">中奖名单</div>
  <pre id="rd-out">等待抽奖…</pre>
</div>
<div id="rd-note" class="note hidden"></div>`,
  usage: `<ol>
  <li>粘贴名单（每行一个名字或编号），设置抽取人数。</li>
  <li>勾选“每人最多中一次”可排除重复中奖（多次点击时会从剩余名单中抽取）。</li>
  <li>点击“抽奖”随机产生结果，全部在本地完成。</li>
</ol>`,
  faq: [
    { q: '随机性可靠吗？', a: '使用 crypto.getRandomValues 加密级随机源，每次抽取独立均匀，可放心用于公平抽奖。' },
    { q: '支持轮次抽奖吗？', a: '支持。勾选去重后，每抽一轮都会从剩余名单中抽取，直到抽完为止。' },
    { q: '名单会保存吗？', a: '不会。名单仅存在于当前页面，刷新后需要重新粘贴。' },
  ],
};
