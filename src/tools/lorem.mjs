export default {
  slug: 'lorem',
  name: '假文生成器',
  desc: '在线占位文本生成器，支持中文假文与英文 Lorem Ipsum，自定义段落与句数，一键复制。',
  keywords: '假文生成,lorem ipsum,占位文本,中文假文,测试文本生成,乱文生成',
  category: 'text',
  body: `<div class="row">
  <div class="field">
    <label for="lo-type" class="field-label">语言</label>
    <select id="lo-type">
      <option value="cn">中文假文</option>
      <option value="en">英文 Lorem Ipsum</option>
    </select>
  </div>
  <div class="field">
    <label for="lo-para" class="field-label">段落数</label>
    <input type="number" id="lo-para" value="3" min="1" max="20" class="w-xs">
  </div>
  <div class="field">
    <label for="lo-sent" class="field-label">每段句数</label>
    <input type="number" id="lo-sent" value="5" min="1" max="30" class="w-xs">
  </div>
</div>
<div class="toolbar">
  <button id="lo-run" class="btn">生成</button>
  <span class="spacer"></span>
  <button data-copy-from="#lo-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="lo-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">占位文本</div>
  <textarea id="lo-out" class="mono" readonly placeholder="点击生成"></textarea>
</div>`,
  usage: `<ol>
  <li>选择中文或英文假文，设置段落数与每段句数，点击“生成”。</li>
  <li>中文假文由常见词汇随机组合，英文为经典 Lorem Ipsum 变体。</li>
  <li>适合排版预览、页面原型、测试数据填充。</li>
</ol>`,
  faq: [
    { q: 'Lorem Ipsum 是什么？', a: '印刷排版界的经典占位文本，源自西塞罗《论善恶》的乱序片段，自 16 世纪起用于测试排版效果。' },
    { q: '中文假文内容有意义吗？', a: '中文假文由高频词汇随机拼接，语法通顺但无实义，用于模拟真实文本的长度与密度。' },
    { q: '生成内容会被缓存吗？', a: '不会。每次点击“生成”都会随机产生新文本，仅在页面内存中展示。' },
  ],
};
