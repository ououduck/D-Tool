/* ref（速查手册）分类工具定义 —— 全部为真实参考数据，手写说明与 FAQ */
export default [
  {
    slug: 'ascii-table', name: 'ASCII 字符表',
    desc: '完整 ASCII 码表速查：0-127 全部字符的十进制、十六进制、二进制与中文含义。',
    keywords: 'ascii码表,ascii表,字符编码表,ascii对照表,ascii大全,控制字符',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 'code', label: '十进制' }, { key: 'hex', label: '十六进制' },
        { key: 'char', label: '字符' }, { key: 'bin', label: '二进制' }, { key: 'desc', label: '含义' },
      ],
      search: '输入码值（65）、十六进制（0x41）或字符过滤…', dense: true,
    },
    usage: `<ol>
  <li>表格列出 ASCII 0-127 全部字符：控制字符（0-31、127）给出标准名称，可打印字符直接显示。</li>
  <li>在搜索框输入十进制码值（如 65）、十六进制（0x41）、实际字符（如 A）或含义关键词即可过滤。</li>
  <li>适合调试字符编码问题、理解协议报文中的控制字符。</li>
</ol>`,
    faq: [
      { q: 'ASCII 只有 128 个字符吗？', a: '是的。标准 ASCII 是 0-127 共 128 个字符，其中 0-31 和 127 是控制字符（换行、回车、退格等），32-126 是可打印字符（空格、数字、字母、符号）。' },
      { q: '为什么二进制列是 8 位？', a: '标准 ASCII 只用 7 位（0-127），但存储时占一个字节，高位为 0，所以显示为 8 位便于对照字节值。' },
      { q: '中文用什么编码表示？', a: '中文不在 ASCII 范围内。UTF-8 中一个汉字占 3 个字节，码点远大于 127；需要转换可用本站“ASCII 与字符互转”工具。' },
    ],
  },
  {
    slug: 'html-entities', name: 'HTML 实体速查',
    desc: 'HTML 命名实体大全：常用符号、希腊字母、数学运算符的实体名与对应字符速查。',
    keywords: 'html实体,html转义字符,特殊符号代码,html符号大全,&amp;,字符实体表',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '实体名', mono: true }, { key: 1, label: '字符' }, { key: 2, label: '说明' },
      ],
      search: '输入实体名（amp）、符号（©）或说明关键词…',
    },
    usage: `<ol>
  <li>表格列出常用 HTML 命名实体：实体名、对应字符与中文说明。</li>
  <li>在 HTML 中写 &amp;实体名; 即可输出对应字符，如 &amp;copy; 显示为 ©。</li>
  <li>搜索支持按实体名、符号或说明过滤，方便快速查找。</li>
</ol>`,
    faq: [
      { q: '什么时候必须用实体而不是直接写字符？', a: '在 HTML 中，小于号 &lt; 和大于号 &gt; 会被当作标签解析，和号 &amp; 会被当作实体起始，所以这 5 个字符（&lt; &gt; &amp; &quot; &apos;）在正文中建议用实体表示。' },
      { q: '实体和数字字符引用有什么区别？', a: '命名实体（如 &amp;copy;）好记但覆盖有限；数字引用（如 &amp;#169;）可表示任意 Unicode 字符，二者在浏览器中显示效果相同。' },
      { q: '为什么有些实体显示为空？', a: '像 &amp;zwj;（零宽连接符）、&amp;lrm;（左右标记）这类是控制类字符，本身不可见，用于排版和文字方向控制，属正常现象。' },
    ],
  },
  {
    slug: 'unicode-blocks', name: 'Unicode 区块速查',
    desc: 'Unicode 区块大全：常用语系、符号、CJK 汉字、emoji 的码点范围速查表。',
    keywords: 'unicode区块,unicode编码范围,码点区间,cjk汉字范围,emoji编码,字符范围表',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '码点范围', mono: true }, { key: 1, label: '英文名' }, { key: 2, label: '中文说明' },
      ],
      search: '输入区块名、汉字范围或关键词…', dense: true,
    },
    usage: `<ol>
  <li>表格列出主要 Unicode 区块的码点范围（十六进制）与说明。</li>
  <li>按语系（如 CJK、希腊、西里尔）或符号类别（箭头、数学运算符、emoji）快速定位。</li>
  <li>开发正则表达式时可用范围判断字符类别，如中文常用 \\u4e00-\\u9fff。</li>
</ol>`,
    faq: [
      { q: '中文汉字在哪个区间？', a: '常用汉字在 CJK 统一表意文字区 U+4E00-U+9FFF（约 2 万汉字），扩展 A 区在 U+3400-U+4DBF（生僻字）。' },
      { q: 'emoji 是哪个区块？', a: 'emoji 分散在多个区块：U+1F300-U+1F5FF 杂项符号、U+1F600-U+1F64F 表情、U+1F680-U+1F6FF 交通符号等，还有大量来自其他区块的组合。' },
      { q: '私用区（PUA）是什么？', a: 'U+E000-U+F8FF 是私用区，供字体厂商和应用程序自行定义字符，没有统一标准含义，普通文本应避免使用。' },
    ],
  },
  {
    slug: 'si-units', name: 'SI 国际单位制',
    desc: 'SI 基本单位与导出单位速查：米、千克、秒等 7 个基本单位及常用导出单位定义。',
    keywords: 'si单位,国际单位制,基本单位,导出单位,物理单位,单位定义',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '中文名' }, { key: 1, label: '符号', mono: true },
        { key: 2, label: '量纲' }, { key: 3, label: '定义/换算' },
      ],
      search: '输入单位名（焦耳）、符号（J）或量纲…',
    },
    usage: `<ol>
  <li>表格列出 SI 的 7 个基本单位（米、千克、秒、安培、开尔文、摩尔、坎德拉）与常用导出单位。</li>
  <li>每一行给出单位符号、度量量纲与定义/换算关系。</li>
  <li>适合物理学习、工程计算时快速核对单位定义。</li>
</ol>`,
    faq: [
      { q: '基本单位和导出单位有什么区别？', a: '7 个基本单位由国际计量大会定义（如“米”定义为光在真空中 1/299792458 秒内走过的距离），导出单位由基本单位组合而来，如牛顿 = kg·m/s²。' },
      { q: '千克还有实物基准吗？', a: '没有了。2019 年起“千克”改为基于普朗克常数定义，不再依赖巴黎的铂铱千克原器，所有 SI 单位都有自然常数基准。' },
      { q: '摄氏度和开尔文怎么换算？', a: '摄氏度是开尔文的导出单位：t°C = T(K) - 273.15，即 0°C = 273.15K，二者温差刻度相同。' },
    ],
  },
  {
    slug: 'si-prefixes', name: 'SI 词头速查',
    desc: 'SI 十进制词头大全：从亏科托（10⁻³⁰）到夸脱（10³⁰）的符号与数值对照。',
    keywords: 'si词头,单位前缀,千兆吉太,毫微纳皮,数量级,10的幂',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '中文' }, { key: 1, label: '符号', mono: true },
        { key: 2, label: '幂', mono: true }, { key: 3, label: '数值' },
      ],
      search: '输入词头（兆）、符号（k）或数值…', dense: true,
    },
    usage: `<ol>
  <li>表格列出全部 SI 十进制词头：中文名、符号、10 的幂次与完整数值。</li>
  <li>如 1 千米 = 10³ 米、1 纳秒 = 10⁻⁹ 秒、1 拍字节 = 10¹⁵ 字节。</li>
  <li>注意计算机领域二进制与十进制的差异（见 FAQ）。</li>
</ol>`,
    faq: [
      { q: '1KB 到底是 1000 还是 1024 字节？', a: 'SI 定义 KB = 1000 字节；但历史上硬盘、内存常用 1024。为避免混淆，IEC 规定 KiB = 1024 字节、KB = 1000 字节，现代操作系统逐渐采用 IEC 标准。' },
      { q: '为什么兆是 10⁶ 不是 10⁹？', a: '中文“兆”在不同语境含义不同：SI 中兆（M）= 10⁶；但汉语传统中“兆”可指 10¹²（万亿）。本表以 SI 标准为准。' },
      { q: '最大的词头是什么？', a: '目前最大是夸脱（Q，10³⁰），最小是亏科托（q，10⁻³⁰），均为 2022 年新增；日常几乎用不到，主要用于前沿物理。' },
    ],
  },
  {
    slug: 'html-tags', name: 'HTML 标签速查',
    desc: 'HTML 常用标签速查表：标签名、用途与说明，覆盖结构、文本、表单、多媒体等。',
    keywords: 'html标签大全,html标签速查,html元素,标签列表,html教程参考',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '标签', mono: true }, { key: 1, label: '名称' }, { key: 2, label: '说明' },
      ],
      search: '输入标签名（form）、用途（表格）或说明…', dense: true,
    },
    usage: `<ol>
  <li>表格列出常用 HTML 标签及其用途说明。</li>
  <li>按语义分组：结构（header/nav/main）、文本（p/strong/em）、表单（form/input）、媒体（img/video）等。</li>
  <li>写页面时优先使用语义化标签，对 SEO 和无障碍友好。</li>
</ol>`,
    faq: [
      { q: 'div 和语义标签怎么选？', a: '能表达含义时优先用语义标签（nav、article、aside 等），它们对搜索引擎和无障碍工具更友好；div/span 只是通用容器，留给没有合适语义的场景。' },
      { q: 'details/summary 需要 JS 吗？', a: '不需要，它们是原生的折叠交互元素，浏览器内置展开/收起行为，还能配合 CSS 定制样式，非常适合 FAQ 场景。' },
      { q: 'dialog 元素兼容性如何？', a: '现代浏览器均已支持原生 dialog（模态框），配合 showModal() 可替代自建弹窗，自带焦点管理和 Esc 关闭，无需额外 JS 库。' },
    ],
  },
  {
    slug: 'css-colors', name: 'CSS 颜色名速查',
    desc: 'CSS 颜色关键字大全：全部 140+ 颜色名称、十六进制值与中文名，带色块预览。',
    keywords: 'css颜色,颜色名称,色值对照,颜色大全,十六进制颜色,颜色表',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '颜色名', mono: true }, { key: 1, label: '色值', swatch: true, mono: true }, { key: 2, label: '中文名' },
      ],
      search: '输入颜色名（tomato）、色值（#FF6347）或中文名…',
    },
    usage: `<ol>
  <li>表格列出 CSS 全部颜色关键字及对应十六进制值，带色块预览。</li>
  <li>搜索支持按颜色名、色值或中文名过滤，方便挑色。</li>
  <li>在 CSS 中可直接使用颜色名（如 color: tomato）或色值（#FF6347）。</li>
</ol>`,
    faq: [
      { q: '颜色名和十六进制值完全等价吗？', a: '是的，每个颜色关键字都有对应的标准 RGB 值，本表展示的十六进制即其精确值，两种写法渲染结果完全一致。' },
      { q: '为什么不同系统显示颜色有差异？', a: '显示器色域、系统色彩管理都会影响观感。颜色名/色值是标准数据，但最终显示取决于设备和环境光。' },
      { q: '还有别的颜色写法吗？', a: '还有 rgb()/rgba()、hsl()/hsla()、以及 CSS 颜色 4 级的 hwb()、lab()、oklch() 等，色域更广，可表示超出 sRGB 的颜色。' },
    ],
  },
  {
    slug: 'currencies', name: '货币符号速查',
    desc: '世界各国货币速查：ISO 代码、货币符号、中文名称与所属国家或地区。',
    keywords: '货币符号,货币代码,iso货币,各国货币,人民币符号,美元符号,欧元符号',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '代码', mono: true }, { key: 1, label: '符号' },
        { key: 2, label: '货币名' }, { key: 3, label: '国家/地区' },
      ],
      search: '输入代码（CNY）、符号（¥）或国家名…',
    },
    usage: `<ol>
  <li>表格列出主要国家/地区的 ISO 4217 货币代码、常用符号与名称。</li>
  <li>开发支付、汇率、国际化（i18n）功能时可快速核对货币代码。</li>
  <li>注意同一符号可能对应多种货币（如 $ 也用于加元、澳元），需结合代码区分。</li>
</ol>`,
    faq: [
      { q: '为什么日元也用 ¥ 符号？', a: '人民币（CNY）和日元（JPY）都使用 ¥ 符号，但 Unicode 码点不同（人民币 U+00A5，日元 U+FFE5），且货币代码不同，处理时要以代码为准。' },
      { q: '货币代码有什么规律？', a: 'ISO 4217 代码前两位通常是国家/地区代码（如 CN、US、JP），最后一位是货币首字母（Y 元、D 元/dollar、E 欧元），如 CNY、USD、JPY。' },
      { q: '有些符号是文字不是符号，正常吗？', a: '正常。部分货币没有专用符号（如越南盾常用 ₫，但也有用 “đ”），一些中东货币直接用阿拉伯文缩写，本表按当地习惯收录。' },
    ],
  },
  {
    slug: 'http-methods', name: 'HTTP 方法速查',
    desc: 'HTTP 请求方法速查：GET/POST/PUT/PATCH/DELETE 等方法的用途、安全性与幂等性。',
    keywords: 'http方法,请求方法,get post,put patch,http协议,restful方法',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 0, label: '方法', mono: true }, { key: 1, label: '用途' },
        { key: 2, label: '安全/幂等' }, { key: 3, label: '典型场景' },
      ],
      search: '输入方法名（POST）、属性（幂等）或场景…',
    },
    usage: `<ol>
  <li>表格列出标准 HTTP 方法及扩展方法：用途、是否安全、是否幂等与典型场景。</li>
  <li>“安全”指不会改变服务器状态（GET/HEAD/OPTIONS）；“幂等”指多次执行结果一致（PUT/DELETE）。</li>
  <li>设计 REST API 时按语义选择方法，能获得更好的缓存与重试行为。</li>
</ol>`,
    faq: [
      { q: 'PUT 和 PATCH 有什么区别？', a: 'PUT 是整体替换资源（客户端提交完整表示），幂等；PATCH 是部分更新（只提交要改的字段），不保证幂等。' },
      { q: '浏览器只支持 GET/POST，怎么办？', a: 'HTML 表单只支持 GET 和 POST，但可在 POST 中携带 _method 字段由服务端解释为 PUT/DELETE，或直接用 fetch/XHR 发送任意方法。' },
      { q: 'OPTIONS 预检请求是什么？', a: '跨域请求若触发 CORS 预检，浏览器会先发 OPTIONS 询问服务器允许哪些方法/头，服务器响应 Access-Control-Allow-* 头后才会发真实请求。' },
    ],
  },
  {
    slug: 'elements', name: '化学元素周期表',
    desc: '化学元素速查：全部 118 种元素的符号、中文名、英文名、原子序数与原子量。',
    keywords: '化学元素,元素周期表,元素符号,原子序数,原子量,化学元素表',
    category: 'ref', kind: 'table',
    table: {
      columns: [
        { key: 4, label: '序数', mono: true }, { key: 0, label: '符号', mono: true },
        { key: 1, label: '中文名' }, { key: 2, label: '英文名' }, { key: 3, label: '原子量', mono: true },
      ],
      search: '输入元素名（铁）、符号（Fe）或序数（26）…',
    },
    usage: `<ol>
  <li>表格列出全部 118 种化学元素：原子序数、符号、中英文名与标准原子量。</li>
  <li>搜索支持按中文名、英文名、符号或序数过滤。</li>
  <li>适合化学学习、材料命名、化合物书写时快速查元素数据。</li>
</ol>`,
    faq: [
      { q: '原子量为什么不是整数？', a: '标准原子量是各天然同位素按丰度加权的平均值（如氯 35.45），而单一同位素的质量数是整数（如 Cl-35、Cl-37）。' },
      { q: '118 号之后的元素存在吗？', a: '目前确认到 118 号（鿫 Og），更重的元素理论上存在但极不稳定，尚未被合成确认；119 号以后仍在理论探索中。' },
      { q: '为什么有些元素有两个中文名？', a: '部分超重元素的简体中文名是近年由全国科技名词委定名的新造字（如𬬻、𬭊），早期资料中可能使用音译名，均指同一元素。' },
    ],
  },
{
  slug: 'ua-list', name: 'User-Agent 列表',
  desc: '常见浏览器与爬虫 User-Agent 速查：Chrome、Edge、百度、Googlebot 等可直接复制。',
  keywords: 'user-agent,ua列表,ua大全,浏览器ua,爬虫ua,ua复制',
  category: 'ref', kind: 'table',
  table: {
    columns: [
      { key: 0, label: '名称' }, { key: 1, label: 'User-Agent', mono: true },
    ],
    search: '输入浏览器名（Chrome）或设备（iPhone）过滤…',
  },
  usage: `<ol>
<li>表格列出常用浏览器与爬虫的 User-Agent 字符串。</li>
<li>点击复制按钮直接获取完整 UA。</li>
<li>开发爬虫伪装、测试 UA 识别、配置反爬规则时常用。</li>
</ol>`,
  faq: [
    { q: 'UA 可以伪造吗？', a: '可以。UA 是客户端自报信息，服务端只能“信任”它；分析时需结合 IP、行为等综合判断。' },
    { q: '为什么同一浏览器 UA 不一样？', a: 'UA 含操作系统、内核版本、设备型号，不同环境自然不同；表格提供常见版本示例。' },
  ],
},
{
  slug: 'http-headers-ref', name: 'HTTP 请求头速查',
  desc: '常用 HTTP 请求头与响应头速查表：用途、示例值一览。',
  keywords: 'http头速查,请求头大全,响应头,header列表,http头含义',
  category: 'ref', kind: 'table',
  table: {
    columns: [
      { key: 0, label: '头名称', mono: true }, { key: 1, label: '类型' }, { key: 2, label: '用途' },
    ],
    search: '输入头名（Cache-Control）或用途（缓存）…',
  },
  usage: `<ol>
<li>速查常用 HTTP 请求/响应头的名称与用途。</li>
<li>搜索支持按头名或用途关键词过滤。</li>
<li>调试缓存、跨域、安全头配置时快速参考。</li>
</ol>`,
  faq: [
    { q: '请求头和响应头怎么区分？', a: '表格“类型”列标注：请求头（Req）/响应头（Res）/通用头（Both）。' },
    { q: '自定义头用什么前缀？', a: '约定 X- 前缀（如 X-Request-Id）；现代规范建议直接用业务名，避免 X- 滥用。' },
  ],
},
{
  slug: 'status-code-ref', name: 'HTTP 状态码速查',
  desc: 'HTTP 状态码大全速查：1xx-5xx 全部状态码含义（复用权威数据）。',
  keywords: '状态码速查,http状态码,状态码大全,错误码查询,http错误',
  category: 'ref', kind: 'table',
  table: {
    columns: [
      { key: 0, label: '状态码', mono: true }, { key: 1, label: '英文名' }, { key: 2, label: '中文说明' },
    ],
    search: '输入状态码（404）或关键词（重定向）…',
  },
  usage: `<ol>
<li>速查 1xx-5xx 状态码的含义与标准名称。</li>
<li>与本站“HTTP 状态码查询”工具数据同源，此处为静态速查表。</li>
</ol>`,
  faq: [
    { q: '和“HTTP 状态码查询”有什么区别？', a: '功能一致（同为查询），本页为速查手册分类下的静态表，方便对照浏览。' },
    { q: '状态码会更新吗？', a: '覆盖 IANA 注册的常见状态码；新增状态码随数据更新同步。' },
  ],
},
  {
    slug: 'git-commands', name: 'Git 命令速查',
    desc: 'Git 常用命令速查表：初始化、提交、分支、合并、回滚等 40 条高频命令。',
    keywords: 'git命令,git速查,git常用命令,git教程,git命令大全,git cheat sheet',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '命令', mono: true }, { key: 1, label: '说明' }],
      search: '输入命令（commit）或用途（分支）过滤…', dense: true,
    },
    usage: '<ol><li>速查 Git 高频命令：提交、分支、合并、回滚、远端操作。</li><li>搜索支持按命令名或用途过滤。</li><li>开发日常记不住的命令在这里查。</li></ol>',
    faq: [
      { q: 'reset 和 revert 有什么区别？', a: 'reset 回退历史（改历史，慎用于已推送）；revert 生成反向提交（安全，保留历史）。' },
      { q: '怎么撤销已推送的提交？', a: '优先 git revert（不重写历史）；本地未推送可用 reset --hard。' },
    ],
  },
  {
    slug: 'linux-commands', name: 'Linux 命令速查',
    desc: 'Linux 常用命令速查表：文件、进程、权限、压缩、系统管理 40 条。',
    keywords: 'linux命令,linux速查,shell命令,服务器命令,linux命令大全,运维命令',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '命令', mono: true }, { key: 1, label: '说明' }],
      search: '输入命令（grep）或用途（压缩）过滤…', dense: true,
    },
    usage: '<ol><li>速查 Linux 常用命令：文件操作、进程、权限、压缩、系统。</li><li>搜索支持按命令或用途过滤。</li><li>服务器运维、开发环境管理常用。</li></ol>',
    faq: [
      { q: 'rm -rf 为什么危险？', a: '递归强制删除不可恢复，误删整个目录的经典事故；执行前再三确认路径。' },
      { q: '怎么实时看日志？', a: 'tail -f 文件名 实时跟踪；配合 grep 过滤关键词。' },
    ],
  },
  {
    slug: 'docker-commands', name: 'Docker 命令速查',
    desc: 'Docker 常用命令速查表：镜像、容器、编排、日志与清理操作。',
    keywords: 'docker命令,docker速查,容器命令,docker教程,docker命令大全,devops',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '命令', mono: true }, { key: 1, label: '说明' }],
      search: '输入命令（run）或用途（镜像）过滤…', dense: true,
    },
    usage: '<ol><li>速查 Docker 高频命令：镜像、容器、compose、清理。</li><li>搜索支持按命令或用途过滤。</li><li>容器化开发、部署排障时快速参考。</li></ol>',
    faq: [
      { q: 'docker run 和 start 什么区别？', a: 'run 创建并启动新容器；start 启动已存在的容器（含停止的）。' },
      { q: '容器太多占空间怎么办？', a: 'docker system prune 清理停止容器、悬空镜像与缓存；-a 全量清理。' },
    ],
  },
  {
    slug: 'npm-commands', name: 'npm 命令速查',
    desc: 'npm 常用命令速查表：安装、脚本、发布、审计等 20 条高频命令。',
    keywords: 'npm命令,npm速查,node命令,包管理,npm教程,npm命令大全',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '命令', mono: true }, { key: 1, label: '说明' }],
      search: '输入命令（install）或用途（发布）过滤…', dense: true,
    },
    usage: '<ol><li>速查 npm 高频命令：安装、脚本、发布、安全审计。</li><li>搜索支持按命令或用途过滤。</li><li>Node.js 项目日常开发必备。</li></ol>',
    faq: [
      { q: 'npm install 和 npm ci 什么区别？', a: 'ci 严格按 package-lock.json 安装（CI 环境推荐，更快更可复现）；install 可能更新 lock。' },
      { q: '依赖有漏洞怎么办？', a: 'npm audit 查看，npm audit fix 自动修复；修复后跑一遍测试确认无回归。' },
    ],
  },
  {
    slug: 'sql-syntax', name: 'SQL 语法速查',
    desc: 'SQL 常用语法速查表：查询、连接、增删改、建表与事务。',
    keywords: 'sql语法,sql速查,sql语句,数据库查询,sql教程,mysql语法',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '语法', mono: true }, { key: 1, label: '说明' }],
      search: '输入语法（JOIN）或用途（排序）过滤…', dense: true,
    },
    usage: '<ol><li>速查 SQL 核心语法：SELECT/JOIN/增删改/建表/事务。</li><li>搜索支持按语法或用途过滤。</li><li>写查询时对照语法格式，注意各数据库方言差异。</li></ol>',
    faq: [
      { q: '各数据库语法通用吗？', a: '核心 SQL 通用；分页（LIMIT/TOP）、自增、日期函数有方言差异，按库查询。' },
      { q: 'JOIN 类型怎么选？', a: '内连接取交集；LEFT JOIN 保留左表全部；RIGHT/FULL 同理；先用 LEFT 足够覆盖多数场景。' },
    ],
  },
  {
    slug: 'vim-shortcuts', name: 'Vim 快捷键速查',
    desc: 'Vim 常用快捷键速查表：移动、编辑、搜索、保存退出。',
    keywords: 'vim快捷键,vim速查,vi命令,vim教程,vim操作,linux编辑器',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '快捷键', mono: true }, { key: 1, label: '说明' }],
      search: '输入快捷键（dd）或用途（复制）过滤…', dense: true,
    },
    usage: '<ol><li>速查 Vim 高频操作：模式切换、移动、编辑、搜索、保存。</li><li>搜索支持按快捷键或用途过滤。</li><li>服务器上编辑文件的必备技能。</li></ol>',
    faq: [
      { q: 'Vim 怎么退出？', a: '按 Esc 后输入 :q 退出；未保存改动用 :q! 强制退出；:wq 保存退出。' },
      { q: '不小心删了内容怎么办？', a: '按 u 撤销（可多次）；Ctrl+r 重做。' },
    ],
  },
  {
    slug: 'vscode-shortcuts', name: 'VS Code 快捷键速查',
    desc: 'VS Code 常用快捷键速查表：编辑、多光标、终端、调试 20 条。',
    keywords: 'vscode快捷键,vs code速查,编辑器快捷键,代码快捷键,编辑器技巧',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '快捷键', mono: true }, { key: 1, label: '说明' }],
      search: '输入快捷键（Ctrl+P）或用途（终端）过滤…', dense: true,
    },
    usage: '<ol><li>速查 VS Code 高频快捷键：多光标、行操作、终端、调试。</li><li>搜索支持按快捷键或用途过滤。</li><li>Windows/Linux 键位；macOS 将 Ctrl 换为 Cmd。</li></ol>',
    faq: [
      { q: '多光标怎么用？', a: 'Alt+单击加光标；Ctrl+D 逐个选中相同词；Ctrl+Shift+L 一次选全部。' },
      { q: 'macOS 键位一样吗？', a: '大部分 Ctrl 换 Cmd（如 Cmd+P、Cmd+Shift+P），Alt 换 Option。' },
    ],
  },
  {
    slug: 'math-symbols', name: '数学符号速查',
    desc: '常用数学符号速查表：运算符、集合、逻辑、几何符号与含义，可复制使用。',
    keywords: '数学符号,数学符号大全,运算符符号,集合符号,逻辑符号,公式符号',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '符号', mono: true }, { key: 1, label: '含义' }],
      search: '输入符号（∑）或名称（积分）过滤…', dense: true,
    },
    usage: '<ol><li>速查数学符号含义，符号列可直接复制使用。</li><li>搜索支持按符号或名称过滤。</li><li>写公式、LaTeX、文档时快速取符号。</li></ol>',
    faq: [
      { q: '符号能直接复制吗？', a: '可以，点击复制按钮或选中符号复制，Unicode 字符在文档中通用。' },
      { q: 'LaTeX 里怎么写这些符号？', a: '多数有对应命令，如 sum、int、in、orall；本站另有 LaTeX 符号速查可参考。' },
    ],
  },
  {
    slug: 'file-extensions', name: '文件扩展名速查',
    desc: '常用文件扩展名速查表：开发、文档、图片、音频视频、压缩包格式。',
    keywords: '文件扩展名,文件格式,扩展名大全,文件类型,格式速查,常见后缀',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '扩展名', mono: true }, { key: 1, label: '类型' }],
      search: '输入扩展名（pdf）或类型（视频）过滤…', dense: true,
    },
    usage: '<ol><li>速查常见文件扩展名与用途分类。</li><li>搜索支持按扩展名或类型过滤。</li><li>开发、上传、格式转换时快速识别文件类型。</li></ol>',
    faq: [
      { q: '同一扩展名有多种格式吗？', a: '有，如 .dat、.bin 是通用二进制；识别真实格式建议看文件头（魔数），可结合十六进制工具。' },
      { q: '需要给文件改扩展名吗？', a: '扩展名只是标识，真实格式由内容决定；乱改可能导致打不开，转换请用格式转换工具。' },
    ],
  },
];
