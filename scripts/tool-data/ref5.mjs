/* ref（速查手册）分类补强 6 —— 全部为真实参考数据 */
export default [
  {
    slug: 'programming-langs', name: '编程语言速查',
    desc: '主流编程语言速查：20 种语言的定位、生态与适用场景。',
    keywords: '编程语言,语言对比,编程语言大全,javascript python,java go rust',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '语言' }, { key: 1, label: '领域' }, { key: 2, label: '说明' }],
      search: '输入语言（Python）或领域（前端）过滤…', dense: true,
    },
    usage: `<ol><li>速查主流编程语言定位与生态。</li><li>搜索支持按语言名或领域过滤。</li><li>选型学习、职业规划、项目技术栈参考。</li></ol>`,
    faq: [
      { q: '新手学什么语言？', a: '兴趣导向：前端学 JS/TS，数据学 Python，后端可 Go/Java；先精通一门再扩展。' },
      { q: '语言越多越好吗？', a: '不是，深度比广度重要；建议主攻一门 + 了解 2-3 门。' },
    ],
  },
  {
    slug: 'frameworks', name: '前端框架速查',
    desc: '前端框架与库速查：React/Vue/Angular 等 20 个框架的定位与生态。',
    keywords: '前端框架,框架对比,react vue angular,next nuxt,技术选型',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '框架' }, { key: 1, label: '维护方' }, { key: 2, label: '说明' }],
      search: '输入框架（React）或定位（全栈）过滤…', dense: true,
    },
    usage: `<ol><li>速查主流前端框架与生态。</li><li>搜索支持按框架名或定位过滤。</li><li>项目技术选型、学习路线参考。</li></ol>`,
    faq: [
      { q: 'React 和 Vue 怎么选？', a: '两者都优秀：React 生态大、职位多；Vue 上手平缓、中文文档好。' },
      { q: 'Next.js 是什么？', a: 'React 的全栈框架（SSR/SSG），当前前端主流选择之一。' },
    ],
  },
  {
    slug: 'browser-engines', name: '浏览器内核速查',
    desc: '浏览器渲染引擎与 JS 引擎速查：Blink/WebKit/Gecko/V8 等。',
    keywords: '浏览器内核,渲染引擎,js引擎,blink webkit,gecko v8,浏览器原理',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '引擎' }, { key: 1, label: '使用方' }, { key: 2, label: '说明' }],
      search: '输入引擎（Blink）或浏览器（Chrome）过滤…', dense: true,
    },
    usage: `<ol><li>速查浏览器渲染引擎与 JS 引擎。</li><li>搜索支持按引擎或浏览器过滤。</li><li>理解浏览器兼容性差异的基础。</li></ol>`,
    faq: [
      { q: '为什么 Chrome 和 Edge 一样？', a: 'Edge 已迁移到 Chromium（Blink 内核），与 Chrome 渲染一致。' },
      { q: '内核和引擎什么关系？', a: '渲染引擎负责页面布局绘制（Blink/WebKit），JS 引擎负责脚本执行（V8）。' },
    ],
  },
  {
    slug: 'design-patterns', name: '设计模式速查',
    desc: 'GoF 设计模式速查：23 种经典模式的分类与用途。',
    keywords: '设计模式,gof,单例,工厂,观察者,策略模式,软件设计',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '模式', mono: true }, { key: 1, label: '类型' }, { key: 2, label: '用途' }],
      search: '输入模式（单例）或类型（行为型）过滤…', dense: true,
    },
    usage: `<ol><li>速查 23 种 GoF 设计模式。</li><li>搜索支持按模式名或分类过滤。</li><li>系统设计、代码重构、面试复习常用。</li></ol>`,
    faq: [
      { q: '设计模式必须用吗？', a: '不是，模式是解决问题的模板；过度设计比不用更糟，按需使用。' },
      { q: '先学哪几个？', a: '单例、工厂、观察者、策略、装饰器最常用，先掌握这五个。' },
    ],
  },
  {
    slug: 'regex-syntax', name: '正则语法速查',
    desc: '正则表达式语法速查：字符类、量词、分组、预查等 30+ 语法。',
    keywords: '正则语法,正则表达式,正则教程,正则元字符,regex语法,正则符号',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '语法', mono: true }, { key: 1, label: '说明' }],
      search: '输入语法（\\d）或说明（分组）过滤…', dense: true,
    },
    usage: `<ol><li>速查正则表达式核心语法。</li><li>搜索支持按语法或说明过滤。</li><li>配合“正则测试”工具实战练习。</li></ol>`,
    faq: [
      { q: '贪婪和懒惰匹配？', a: '默认贪婪（尽量多匹配）；量词后加 ? 变懒惰（尽量少匹配）。' },
      { q: '预查有什么用？', a: '(?=x) 匹配后跟 x 的位置但不消费字符，用于断言场景。' },
    ],
  },
  {
    slug: 'css-animation', name: 'CSS 动画速查',
    desc: 'CSS 动画属性速查：animation、transition、transform 系列属性。',
    keywords: 'css动画,动画属性,transition,transform,keyframes,动画速查',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '属性', mono: true }, { key: 1, label: '说明' }],
      search: '输入属性（animation）或说明（过渡）过滤…', dense: true,
    },
    usage: `<ol><li>速查 CSS 动画与过渡属性。</li><li>搜索支持按属性或说明过滤。</li><li>实现交互动效、页面动画时对照参考。</li></ol>`,
    faq: [
      { q: 'transition 和 animation 区别？', a: 'transition 需触发（hover 等），animation 自动播放（@keyframes）。' },
      { q: '哪些属性适合动画？', a: 'transform 和 opacity 性能最好（GPU 合成），避免动画 width/height。' },
    ],
  },
  {
    slug: 'html5-features', name: 'HTML5 新特性速查',
    desc: 'HTML5 新特性速查：语义标签、存储、WebSocket、Worker 等 20 项。',
    keywords: 'html5,html5新特性,localstorage,websocket,canvas,前端技术',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '特性' }, { key: 1, label: '说明' }],
      search: '输入特性（WebSocket）或说明（存储）过滤…', dense: true,
    },
    usage: `<ol><li>速查 HTML5 主要新特性。</li><li>搜索支持按特性名或说明过滤。</li><li>技术选型、面试复习、前端学习参考。</li></ol>`,
    faq: [
      { q: 'localStorage 和 cookie 区别？', a: 'localStorage 容量大（5MB）且不随请求发送；cookie 小（4KB）自动随请求携带。' },
      { q: 'Service Worker 做什么？', a: '拦截网络请求实现离线缓存、后台同步，是 PWA 的核心。' },
    ],
  },
  {
    slug: 'css-layout', name: 'CSS 布局技巧速查',
    desc: 'CSS 布局技巧速查：居中、两栏三栏、响应式等 20 个实用方案。',
    keywords: 'css布局,布局技巧,水平垂直居中,flex布局,grid布局,响应式',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '场景' }, { key: 1, label: '方案', mono: true }],
      search: '输入场景（居中）或方案（flex）过滤…', dense: true,
    },
    usage: `<ol><li>速查常见布局问题的最佳实践。</li><li>搜索支持按场景或方案过滤。</li><li>写页面布局时快速参考，避免踩坑。</li></ol>`,
    faq: [
      { q: '居中用 flex 还是 grid？', a: '单元素居中两者皆可；现代推荐 grid 的 place-items:center 更简洁。' },
      { q: '为什么 vertical-align 不生效？', a: 'vertical-align 只对行内元素生效；块级元素垂直居中用 flex/grid。' },
    ],
  },
];
