export default {
  slug: 'regex-cheatsheet',
  name: '常用正则速查',
  desc: '常用正则表达式速查表：邮箱、手机号、身份证、URL、IP 等 30+ 条高频正则，一键复制。',
  keywords: '正则表达式,常用正则,正则速查,正则大全,正则例子,邮箱正则,手机号正则',
  category: 'ref',
  body: `<div class="field">
  <label for="rc-search">搜索</label>
  <input type="search" id="rc-search" placeholder="如：邮箱、手机、日期…">
</div>
<div class="table-wrap">
  <table class="data" id="rc-table"></table>
</div>
<div class="note">正则表达式按场景整理，可直接复制使用。注意：不同语言的正则引擎略有差异（如 JS 不支持某些后行断言），使用前请先在本站<a href="/regex/">正则测试工具</a>中验证。</div>`,
  usage: `<ol>
  <li>按场景搜索或浏览常用正则，点击“复制”直接使用。</li>
  <li>每条附有简短说明与适用场景提示。</li>
  <li>复杂表达式建议配合<a href="/regex/">正则测试工具</a>验证边界情况。</li>
</ol>`,
  faq: [
    { q: '正则可以直接复制到后端用吗？', a: '大部分可以，但注意引擎差异：如 Python 的 re 不支持 \d 以外的部分简写（\d 支持），Go 不支持回溯引用。建议在目标语言中测试。' },
    { q: '邮箱正则是万能的吗？', a: '严格的邮箱验证需遵循 RFC 5322，表达式会非常长。速查表中的为实用版本，覆盖绝大多数真实邮箱。' },
    { q: '手机号正则包含新号段吗？', a: '表中使用开放号段写法（1[3-9]\\d{9}），自动覆盖未来新增号段，无需频繁更新。' },
  ],
};
