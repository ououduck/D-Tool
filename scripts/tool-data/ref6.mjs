/* ref（速查手册）分类补强 7 —— 全部为真实参考数据 */
export default [
  {
    slug: 'http-scenarios', name: 'HTTP 请求场景示例',
    desc: 'HTTP 请求场景速查：GET/POST/PUT/DELETE 等方法的典型接口示例。',
    keywords: 'http请求,接口示例,api示例,restful示例,请求场景,http方法示例',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '请求', mono: true }, { key: 1, label: '场景' }, { key: 2, label: '说明' }],
      search: '输入请求（GET）或场景（登录）过滤…', dense: true,
    },
    usage: `<ol><li>速查 REST API 典型请求场景与方法选择。</li><li>搜索支持按请求或场景过滤。</li><li>接口设计、学习 RESTful、联调参考。</li></ol>`,
    faq: [
      { q: 'PUT 和 POST 怎么选？', a: 'POST 创建新资源（非幂等），PUT 更新已知资源（幂等）；PUT 常要求客户端提供完整表示。' },
      { q: '分页接口怎么设计？', a: '常用 ?page=1&size=20 或 ?offset=0&limit=20；返回 total 字段便于前端分页。' },
    ],
  },
  {
    slug: 'data-units', name: '数据单位换算速查',
    desc: '数据存储单位速查：KB/MB/GB 与 KiB/MiB/GiB 的十进制二进制对照。',
    keywords: '数据单位,存储单位,kb mb gb,进制换算,kib mib,硬盘容量',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '单位', mono: true }, { key: 1, label: '换算' }, { key: 2, label: '说明' }],
      search: '输入单位（GB）或说明（进制）过滤…', dense: true,
    },
    usage: `<ol><li>速查数据存储单位与换算关系。</li><li>搜索支持按单位或说明过滤。</li><li>硬盘容量、文件大小、带宽换算时对照。</li></ol>`,
    faq: [
      { q: '为什么 1TB 硬盘只有 931GB？', a: '厂商按十进制（1TB=1000GB），系统按二进制（1TiB=1024GiB）显示，差约 7%。' },
      { q: 'KB 和 KiB 用哪个？', a: '行业标准：KB=1000，KiB=1024；Windows 仍用 KiB 标成 KB，macOS 已用十进制。' },
    ],
  },
  {
    slug: 'time-units', name: '时间单位换算速查',
    desc: '时间单位速查：秒分时天周月年的换算关系对照表。',
    keywords: '时间单位,时间换算,时分秒,天周月年,时间单位速查,单位换算',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '单位', mono: true }, { key: 1, label: '换算' }, { key: 2, label: '符号' }],
      search: '输入单位（年）或符号（h）过滤…', dense: true,
    },
    usage: `<ol><li>速查时间单位换算关系。</li><li>搜索支持按单位或符号过滤。</li><li>时长换算、排期、开发时间戳处理参考。</li></ol>`,
    faq: [
      { q: '一个月是多少天？', a: '平均 30.44 天（365.25/12）；具体月 28-31 天不等，精确计算按日历。' },
      { q: '光年是时间单位吗？', a: '不是，光年是距离单位（光走一年的距离）；表格列出仅供参考。' },
    ],
  },
  {
    slug: 'radix-prefix', name: '进制前缀速查',
    desc: '编程进制前缀速查：0b/0o/0x 等进制表示法与特殊数值。',
    keywords: '进制前缀,0x,0b,0o,二进制八进制十六进制,编程数值,数字字面量',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '前缀', mono: true }, { key: 1, label: '进制' }, { key: 2, label: '示例' }],
      search: '输入前缀（0x）或进制（二进制）过滤…', dense: true,
    },
    usage: `<ol><li>速查编程语言数值字面量前缀。</li><li>搜索支持按前缀或进制过滤。</li><li>写代码、看源码、进制转换参考。</li></ol>`,
    faq: [
      { q: 'JS 里怎么写大整数？', a: '数字后加 n：12345678901234567890n（BigInt），超出 2⁵³-1 必须用。' },
      { q: '数字分隔符是什么？', a: '1_000_000 表示一百万，ES2021 起支持，提升大数可读性。' },
    ],
  },
  {
    slug: 'html-colors', name: 'HTML 基础颜色速查',
    desc: 'HTML 基础颜色速查：20 个经典颜色的十六进制值与名称。',
    keywords: 'html颜色,基础颜色,颜色名称,十六进制颜色,网页颜色,color names',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '颜色名' }, { key: 1, label: '色值', swatch: true, mono: true }, { key: 2, label: '英文' }],
      search: '输入颜色名（红）或色值（FF0000）过滤…', dense: true,
    },
    usage: `<ol><li>速查 HTML 经典颜色与十六进制值，带色块预览。</li><li>搜索支持按名称或色值过滤。</li><li>快速取基础色；完整色表见“CSS 颜色名速查”。</li></ol>`,
    faq: [
      { q: '和 CSS 颜色名速查什么区别？', a: '本表为基础 20 色快速参考；CSS 速查含全部 140+ 颜色名。' },
      { q: '颜色名大小写敏感吗？', a: '不敏感，HTML/CSS 颜色名不区分大小写。' },
    ],
  },
];
