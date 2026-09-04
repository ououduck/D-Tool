export default {
  slug: 'case-converter',
  name: '命名格式转换',
  desc: '驼峰、下划线、中划线命名互转工具，实时转换变量名与常量名格式。',
  keywords: '驼峰转换,下划线转驼峰,驼峰转下划线,命名转换,camelcase,snakecase,变量命名',
  category: 'text',
  body: `<div class="field">
  <label for="cc-in">输入名称</label>
  <input type="text" id="cc-in" class="mono" placeholder="如：user_login_name、userLoginName、User Login Name">
</div>
<div class="case-box mt-12" id="cc-out">
  <div class="empty">输入后实时转换</div>
</div>
<div class="note">自动拆分单词：支持 camelCase、PascalCase、snake_case、kebab-case、空格分隔及混合写法；中文等非字母数字字符作为分隔符处理。</div>`,
  usage: `<ol>
  <li>输入任意写法的名称（用户登录名、userLoginName、USER_LOGIN_NAME 等）。</li>
  <li>下方实时给出 camelCase、PascalCase、snake_case、UPPER_SNAKE、kebab-case、Title Case 六种写法，可分别复制。</li>
  <li>适合统一团队命名规范：把数据库字段（snake_case）转成 JS/TS 变量（camelCase）等场景。</li>
</ol>`,
  faq: [
    { q: '怎么拆分“HTTPServer”这类缩写？', a: '算法优先按大小写边界拆分：HTTPServer → HTTP + Server → http_server。连续大写会被识别为一个缩写词。' },
    { q: '中文名称能转吗？', a: '中文会被当作分隔符处理，转换结果只保留 ASCII 单词，如“用户_name”会转成 user_name 相关形式。' },
    { q: '哪种命名适合什么语言？', a: 'JS/TS 变量用 camelCase，类名用 PascalCase，Python/数据库用 snake_case，CSS 类与 URL 用 kebab-case，常量常用 UPPER_SNAKE。' },
  ],
};
