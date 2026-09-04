/* text（文本处理）分类工具定义 —— 全部为真实可用的文本处理功能，手写说明与 FAQ */
export default [
  {
    slug: 'text-lines', name: '文本行处理',
    desc: '文本行操作工具：去重、排序、反转、加行号、去空行、去除首尾空格一键完成。',
    keywords: '文本行处理,行去重,行排序,加行号,去空行,行操作工具',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [
        { label: '去重', fn: 'dedupeLines' },
        { label: '去重+排序', fn: 'dedupeSortLines' },
        { label: '排序（升）', fn: 'sortLines' },
        { label: '排序（降）', fn: 'sortLinesDesc' },
        { label: '行反转', fn: 'reverseLines' },
        { label: '去空行', fn: 'stripEmptyLines' },
        { label: '每行去空格', fn: 'trimLines' },
        { label: '随机打乱', fn: 'shuffleLines' },
      ],
      placeholder: '每行一条内容', outLabel: '处理结果',
    },
    usage: `<ol>
  <li>粘贴文本（每行一条），选择要执行的操作。</li>
  <li>去重保留首次出现顺序；排序支持升/降序；随机打乱适合抽选分组。</li>
  <li>处理结果可直接复制使用。</li>
</ol>`,
    faq: [
      { q: '去重是精确匹配吗？', a: '是的，按整行精确去重（含空格差异），去重前可先执行“每行去空格”统一格式。' },
      { q: '空行算一行吗？', a: '“去空行”会删除空白行；其他操作保留空行不删，避免改变行号语义。' },
      { q: '能处理多大文本？', a: '几十 MB 文本在浏览器本地处理无压力，结果一次性渲染。' },
    ],
  },
  {
    slug: 'line-numbers', name: '文本加行号',
    desc: '给文本每行添加行号（可自定义起始值），代码展示、日志整理常用。',
    keywords: '加行号,行号工具,文本行号,代码行号,行号前缀',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '加行号', fn: 'numberLines' }],
      params: [{ name: 'start', label: '起始值', type: 'number', value: '1', min: '0' }],
      placeholder: '输入需要加行号的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本，设置起始行号（默认 1），点击“加行号”。</li>
  <li>行号以 4 位宽度右对齐前缀（如 0001），便于对齐阅读。</li>
  <li>粘贴代码、配置或日志片段后加行号，方便引用具体位置。</li>
</ol>`,
    faq: [
      { q: '起始值可以是 0 吗？', a: '可以，设为 0 即可从 0 开始编号；设为负数也会从 0 截断为 0。' },
      { q: '行号会和代码一起复制吗？', a: '会，结果就是“行号 + 内容”的纯文本，适合粘贴到文档中。' },
      { q: '空行也编号吗？', a: '是的，所有行（含空行）都会编号，保证与原文行数一致。' },
    ],
  },
  {
    slug: 'text-wrap', name: '文本换行/合并',
    desc: '按指定宽度折行、移除换行、按分隔符合并多行，文本排版整理工具。',
    keywords: '文本换行,折行工具,合并行,按分隔符合并,文本整理',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [
        { label: '按宽度折行', fn: 'wrapLines' },
        { label: '合并为一行', fn: 'removeLineBreaks' },
        { label: '逗号合并', fn: 'joinLinesComma' },
        { label: '顿号合并', fn: 'joinLinesDun' },
        { label: '按空格拆行', fn: 'splitBySpace' },
      ],
      params: [{ name: 'width', label: '折行宽度', type: 'number', value: '80', min: '1' }],
      placeholder: '输入需要整理的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“按宽度折行”在指定列处截断（默认 80 列）；“合并为一行”删除所有换行。</li>
  <li>“逗号/顿号合并”把每行用符号连接成一行；“按空格拆行”把空格分隔内容转多行。</li>
  <li>适合整理关键词列表、长文本排版。</li>
</ol>`,
    faq: [
      { q: '折行会按单词断行吗？', a: '不会，纯按字符宽度截断（硬折行），中英文都一样，适合固定宽度场景。' },
      { q: '合并行时行内空格保留吗？', a: '保留。需要同时清理空格可先用“文本处理/统计”里的去空格功能。' },
      { q: '逗号合并适合什么场景？', a: '把每行一个的关键词列表转成 CSV 或 SQL IN 子句的逗号串。' },
    ],
  },
  {
    slug: 'url-extract', name: 'URL 提取',
    desc: '从文本中提取全部网址链接，去重后逐行列出，爬虫与文本分析常用。',
    keywords: '提取网址,url提取,链接提取,提取链接,url抓取,网址筛选',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '提取 URL', fn: 'extractUrls' }],
      placeholder: '粘贴含链接的文本（日志、HTML、聊天记录…）', outLabel: '提取结果',
    },
    usage: `<ol>
  <li>粘贴任意文本，点击“提取 URL”，自动找出所有 http/https 链接。</li>
  <li>结果逐行列出，复制后去重排序可用“文本行处理”工具。</li>
  <li>适合从日志、爬虫页面中批量收集网址。</li>
</ol>`,
    faq: [
      { q: '能提取相对路径吗？', a: '只能提取完整 http/https 链接；相对路径没有协议头无法识别。' },
      { q: '链接带中文或特殊字符怎么办？', a: '按空白与尖括号边界截取，中文链接会保留；被截断的链接建议手工补全。' },
      { q: '结果会去重吗？', a: '按出现顺序原样列出（不去重）；需要去重用“文本行处理”。' },
    ],
  },
  {
    slug: 'email-extract', name: '邮箱提取',
    desc: '从文本中提取全部邮箱地址，识别标准邮箱格式并逐行列出。',
    keywords: '提取邮箱,邮箱提取,email提取,批量提取邮箱,邮箱筛选',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '提取邮箱', fn: 'extractEmails' }],
      placeholder: '粘贴含邮箱的文本', outLabel: '提取结果',
    },
    usage: `<ol>
  <li>粘贴文本，点击“提取邮箱”，识别标准格式邮箱（本地部分@域名.顶级域）。</li>
  <li>结果逐行列出，可复制后用“文本行处理”去重。</li>
</ol>`,
    faq: [
      { q: '会误识别吗？', a: '偶尔。如 123@456 这种缺少顶级域的不会匹配；带 .con 等拼写错误的也匹配不上，属正常。' },
      { q: '支持中文域名邮箱吗？', a: '支持域名中的 IDN 有一定限制，常见英文域名邮箱均可正确提取。' },
    ],
  },
  {
    slug: 'phone-extract', name: '手机号提取',
    desc: '从文本中提取手机号与固话号码，支持 86 前缀，去重后列出。',
    keywords: '提取手机号,手机号提取,电话号码提取,号码筛选,批量提取手机号',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '提取号码', fn: 'extractPhones' }],
      placeholder: '粘贴含电话号码的文本', outLabel: '提取结果',
    },
    usage: `<ol>
  <li>粘贴文本，点击“提取号码”。</li>
  <li>支持 1[3-9] 开头的 11 位手机号（可带 +86/086 前缀与连字符）及 0 开头的固话。</li>
  <li>适合从报名表、聊天记录中批量收集联系电话。</li>
</ol>`,
    faq: [
      { q: '为什么有些号码没提取到？', a: '号段必须符合 1[3-9] 规则；虚拟号段、被空格或符号分隔的号码可能漏检。' },
      { q: '隐私合规要注意什么？', a: '批量处理他人手机号需确保已获得授权并遵守个人信息保护法；本站工具纯本地运行。' },
    ],
  },
  {
    slug: 'ip-extract', name: 'IP 地址提取',
    desc: '从文本中提取全部 IPv4 地址，校验合法范围后逐行列出。',
    keywords: '提取ip,ip提取,ipv4提取,ip地址筛选,日志ip,批量提取ip',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '提取 IPv4', fn: 'extractIpv4' }],
      placeholder: '粘贴日志或文本（含 IP 地址）', outLabel: '提取结果',
    },
    usage: `<ol>
  <li>粘贴文本点击“提取 IPv4”，识别 0.0.0.0-255.255.255.255 范围的合法地址。</li>
  <li>结果逐行列出；如需统计出现次数可复制到文本统计工具按词频查看。</li>
  <li>适合分析访问日志、防火墙规则中的 IP。</li>
</ol>`,
    faq: [
      { q: '支持 IPv6 吗？', a: '目前仅提取 IPv4；IPv6 地址格式复杂（含 :: 缩写），后续版本考虑支持。' },
      { q: '192.168.1.999 会提取吗？', a: '不会，超过 255 的段不符合 IPv4 规则会被忽略。' },
      { q: '端口号会一起提取吗？', a: '只提取 IP 本身（如 1.2.3.4），:8080 端口号不会包含。' },
    ],
  },
  {
    slug: 'number-extract', name: '数字提取',
    desc: '从文本中提取全部数字（整数或含小数），逐行列出，统计汇总方便。',
    keywords: '提取数字,数字提取,提取整数,提取小数,数值筛选,数字抽取',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [
        { label: '提取整数', fn: 'extractNumbers' },
        { label: '含小数', fn: 'extractNumbersDecimal' },
      ],
      placeholder: '粘贴含数字的文本', outLabel: '提取结果',
    },
    usage: `<ol>
  <li>粘贴文本，点击“提取整数”或“含小数”。</li>
  <li>负号会保留（-5），小数模式匹配 -3.14 格式；科学计数法暂不支持。</li>
  <li>提取后可复制到计算工具做求和、平均值。</li>
</ol>`,
    faq: [
      { q: '支持千分位逗号吗？', a: '不支持，1,234 会提取出 1 和 234 两个数；建议先去除逗号再提取。' },
      { q: '能排除版本号吗？', a: '不能自动区分语义；若只想取纯数值，可先删除版本号文本。' },
    ],
  },
  {
    slug: 'chinese-extract', name: '中文提取',
    desc: '从文本中提取全部中文字符（含成语、词组），过滤掉字母数字与符号。',
    keywords: '提取中文,中文提取,汉字提取,筛选汉字,文字过滤',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '提取中文', fn: 'extractChinese' }],
      placeholder: '粘贴混合文本', outLabel: '提取结果',
    },
    usage: `<ol>
  <li>粘贴含中英混排的文本，点击“提取中文”。</li>
  <li>保留全部汉字（CJK 统一表意文字），去掉字母、数字、标点与空格。</li>
  <li>适合统计纯汉字内容、生成中文语料。</li>
</ol>`,
    faq: [
      { q: '标点会保留吗？', a: '不会，只保留汉字字符；需要保留中文标点请使用字符频率工具统计后自行处理。' },
      { q: '生僻字能提取吗？', a: '可以，CJK 扩展区的汉字也在正则范围内（\\u4e00-\\u9fff 为主）。' },
    ],
  },
  {
    slug: 'phone-mask', name: '手机号脱敏',
    desc: '手机号、身份证、邮箱、姓名、银行卡一键脱敏，分享数据时保护隐私。',
    keywords: '手机号脱敏,脱敏工具,数据脱敏,隐私保护,掩码,打码工具',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [
        { label: '手机号', fn: 'maskPhone' },
        { label: '身份证', fn: 'maskIdCard' },
        { label: '邮箱', fn: 'maskEmail' },
        { label: '中文姓名', fn: 'maskName' },
        { label: '银行卡', fn: 'maskBankCard' },
        { label: '全部打码', fn: 'maskAll' },
      ],
      placeholder: '粘贴需要脱敏的文本', outLabel: '脱敏结果',
    },
    usage: `<ol>
  <li>粘贴文本，选择脱敏类型（可多次执行叠加不同规则）。</li>
  <li>手机号：138****1234；身份证：前 6 后 4；邮箱：a***@；姓名：张*；银行卡：6222 **** **** 1234。</li>
  <li>适合开发测试数据、日志上报前的隐私处理。</li>
</ol>`,
    faq: [
      { q: '脱敏能逆推吗？', a: '不能。本工具用 * 直接替换中间位，原数据不保留、不加密存储，无法还原。' },
      { q: '姓名脱敏规则？', a: '保留姓（首字），其余汉字用 * 替代；两个字的姓名如“张伟”变“张*”。' },
      { q: '能识别所有格式吗？', a: '按常见格式匹配：11 位手机号、18 位身份证、标准邮箱、12-19 位银行卡。特殊格式可能漏配。' },
    ],
  },
  {
    slug: 'case-convert-extra', name: '大小写转换',
    desc: '大写、小写、标题式、句首大写一键转换，含全角/半角互转。',
    keywords: '大小写转换,大写转换,小写转换,标题大写,句首大写,全角半角',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [
        { label: '全部大写', fn: 'toUpperCase' },
        { label: '全部小写', fn: 'toLowerCase' },
        { label: '标题式', fn: 'toTitleCase' },
        { label: '句首大写', fn: 'toSentenceCase' },
        { label: '转全角', fn: 'toFullWidth' },
        { label: '转半角', fn: 'toHalfWidth' },
      ],
      placeholder: '输入需要转换的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本，选择目标形式。</li>
  <li>标题式：每个单词首字母大写；句首大写：每句首个字母大写。</li>
  <li>全角/半角互转适合中日韩排版与代码字符串场景。</li>
</ol>`,
    faq: [
      { q: '标题式和句首大写什么区别？', a: '标题式对每个词都大写首字母（Hello World）；句首大写只对句首字母大写（Hello world. Nice day.）。' },
      { q: '全角转半角包括中文标点吗？', a: '包括常用全角符号与空格（U+3000），中文标点如，。会保留（它们没有标准半角对应）。' },
    ],
  },
  {
    slug: 'text-reverse', name: '文本反转',
    desc: '逐字反转、逐行反转、逐词反转三种方式，趣味与调试兼用。',
    keywords: '文本反转,倒序,字符串反转,文字倒过来,反向文本',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [
        { label: '逐字反转', fn: 'reverseText' },
        { label: '逐行反转', fn: 'reverseLines' },
        { label: '逐词反转', fn: 'reverseWords' },
      ],
      placeholder: '输入需要反转的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>逐字反转：abc 变 cba（按 Unicode 码点，emoji 不乱码）；逐行反转：最后一行变第一行；逐词反转：单词顺序倒置。</li>
  <li>适合回文检查、文本游戏与简单数据倒序。</li>
</ol>`,
    faq: [
      { q: 'emoji 反转会坏吗？', a: '不会。按 Unicode 码点（code point）反转，代理对组成的 emoji 会被整体搬运。' },
      { q: '反转后怎么还原？', a: '再执行一次同样的反转即还原。' },
    ],
  },
  {
    slug: 'text-indent', name: '文本缩进/去除',
    desc: '整体添加空格缩进、去除首尾空格、删除全部空白字符。',
    keywords: '文本缩进,加缩进,去除空格,删除空白,缩进工具',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [
        { label: '加缩进', fn: 'indentText' },
        { label: '去首尾空格', fn: 'trimLines' },
        { label: '删除全部空白', fn: 'removeSpaces' },
      ],
      params: [{ name: 'spaces', label: '缩进空格数', type: 'number', value: '2', min: '0' }],
      placeholder: '输入文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“加缩进”给每行行首加 N 个空格（默认 2）；“去首尾空格”去除每行两端空白；“删除全部空白”连中间空格、换行一起去掉。</li>
  <li>适合粘贴代码进 Markdown 代码块、清理复制来的文本格式。</li>
</ol>`,
    faq: [
      { q: '删除全部空白会删中文之间的空格吗？', a: '会，包括空格、Tab、换行，全部移除；请确认这是你想要的再操作。' },
      { q: '缩进支持 Tab 吗？', a: '当前只加空格；需要 Tab 可把结果里的前导空格替换为 \\t。' },
    ],
  },
  {
    slug: 'html-strip', name: 'HTML 转纯文本',
    desc: '去除 HTML 标签与实体，保留文字内容，网页内容清洗工具。',
    keywords: 'html转文本,去除html标签,标签剥离,html清洗,纯文本提取',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '去除 HTML', fn: 'stripHtml' }],
      placeholder: '粘贴 HTML 源码', outLabel: '纯文本',
    },
    usage: `<ol>
  <li>粘贴 HTML 代码，点击“去除 HTML”。</li>
  <li>剥离所有标签（<...>），还原 &amp;nbsp; &amp;lt; 等常见实体，压缩多余空行。</li>
  <li>适合抓取网页内容、邮件正文转纯文本。</li>
</ol>`,
    faq: [
      { q: 'script/style 里的内容会保留吗？', a: '标签会被剥离，但 script/style 标签内部的 JS/CSS 文本仍会保留；需先手动删除。' },
      { q: '图片 alt 文字会提取吗？', a: '不会，只保留标签外的文本节点；需要 alt 建议用 DOM 解析器处理。' },
      { q: '会保留段落换行吗？', a: '会尽力保留：块级标签之间的换行会压缩为单个空行，方便阅读。' },
    ],
  },
  {
    slug: 'markdown-strip', name: 'Markdown 转纯文本',
    desc: '去除 Markdown 语法符号保留文字：标题、加粗、链接、代码块、列表。',
    keywords: 'markdown转文本,去除markdown,md转纯文本,markdown清洗,markdown预览',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '去除 Markdown', fn: 'stripMarkdown' }],
      placeholder: '粘贴 Markdown 内容', outLabel: '纯文本',
    },
    usage: `<ol>
  <li>粘贴 Markdown 文本，点击“去除 Markdown”。</li>
  <li>去掉 # 标题符、**加粗**、*斜体*、[文字](链接) 语法等，保留可读文字。</li>
  <li>适合把文档转换成纯文本做字数统计或进一步处理。</li>
</ol>`,
    faq: [
      { q: '代码块怎么处理？', a: '代码块围栏（```）被移除，代码内容保留；行内代码 `x` 转为 x。' },
      { q: '链接保留文字还是 URL？', a: '保留链接文字并移除 URL：[文字](url) 变“文字”。' },
      { q: '表格会被转换吗？', a: '表格的分隔符会被剥离但管道符 | 保留；如需表格转 CSV 请用 CSV 工具。' },
    ],
  },
  {
    slug: 'emoji-remove', name: 'Emoji 去除',
    desc: '删除文本中的 emoji 与特殊符号，保留文字内容，数据清洗常用。',
    keywords: '去emoji,emoji去除,表情符号删除,emoji过滤,符号清理',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '去除 Emoji', fn: 'removeEmoji' }],
      placeholder: '粘贴含 emoji 的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>粘贴文本点击“去除 Emoji”，删除表情符号（含肤色修饰符与 ZWJ 组合）。</li>
  <li>适合把社交媒体文本清理后做分析、入库。</li>
</ol>`,
    faq: [
      { q: '会误删普通符号吗？', a: '只删 emoji 区段（U+1F300 起、杂项符号、修饰符等），普通标点不受影响。' },
      { q: '多人组合 emoji 能删干净吗？', a: '能，ZWJ 序列（如家庭 emoji）通过连接符匹配整体删除。' },
    ],
  },
  {
    slug: 'keyword-count', name: '关键词计数',
    desc: '统计指定关键词在文本中出现的次数，支持长词与多关键词（逗号分隔）。',
    keywords: '关键词统计,关键词计数,词频统计,关键词出现次数,文本计数',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '统计次数', fn: 'countKeywords' }],
      params: [{ name: 'keyword', label: '关键词（逗号分隔多个）', type: 'text', value: '' }],
      placeholder: '粘贴待统计的文本', outLabel: '统计结果',
    },
    usage: `<ol>
  <li>填写关键词（多个用逗号分隔），粘贴文本。</li>
  <li>点击“统计次数”，输出每个关键词及其出现次数。</li>
  <li>适合检查文案关键词密度、统计日志中的错误码出现次数。</li>
</ol>`,
    faq: [
      { q: '关键词是精确匹配吗？', a: '是的，按字符串精确匹配（区分大小写），重叠部分各计一次。' },
      { q: '能统计全部词频吗？', a: '单关键词计数适合固定词；全文词频请使用“字符频率统计”工具。' },
    ],
  },
  {
    slug: 'char-frequency', name: '字符频率统计',
    desc: '统计文本中各字符出现次数并降序排列，词频分析基础工具。',
    keywords: '字符频率,词频统计,字符统计,频率分析,字母频率',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '统计频率', fn: 'charFrequency' }],
      multi: true,
      placeholder: '粘贴文本', outLabel: '频率排名',
    },
    usage: `<ol>
  <li>粘贴文本，点击“统计频率”。</li>
  <li>忽略空白后按字符统计并降序排列，输出“字符 → 次数”。</li>
  <li>可用于古典密码频率分析、内容去重判断。</li>
</ol>`,
    faq: [
      { q: '中文字符统计准确吗？', a: '准确，按 Unicode 字符统计，标点与汉字分别计数。' },
      { q: '结果能导出吗？', a: '每行“字符 次数”格式，直接复制即可。' },
    ],
  },
  {
    slug: 'pinyin-first', name: '汉字拼音首字母',
    desc: '提取汉字的拼音首字母（覆盖约 3000 常用字），用于姓名缩写、索引生成。',
    keywords: '拼音首字母,汉字转拼音,首字母提取,姓名缩写,拼音索引',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '提取首字母', fn: 'cjkToPinyinFirst' }],
      placeholder: '输入中文（如：张三 → ZS）', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入中文文本，点击“提取首字母”。</li>
  <li>每个汉字输出拼音首字母（大写），如“中国”→“ZG”；非汉字原样保留。</li>
  <li>适合姓名缩写、通讯录索引、编码简写。</li>
</ol>`,
    faq: [
      { q: '生僻字能转换吗？', a: '内置约 3000 个一级常用字；生僻字、多音字无法识别时原样保留该字。' },
      { q: '多音字怎么办？', a: '按常用读音取首字母（如“行”默认 H），如需精确多音字需专用词典。' },
    ],
  },
  {
    slug: 'vertical-text', name: '竖排文字',
    desc: '文本竖排转换：逐字换行生成竖排效果，海报、横幅排版常用。',
    keywords: '竖排文字,竖排转换,文字竖排,竖排生成,纵向文字',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text', actions: [{ label: '竖排', fn: 'verticalText' }],
      placeholder: '输入文字（每行视为一列）', outLabel: '竖排结果',
    },
    usage: `<ol>
  <li>输入文本（多行时每行成为一列），点击“竖排”。</li>
  <li>输出逐字换行的纵向文本，适合生成竖排海报文案的底稿。</li>
</ol>`,
    faq: [
      { q: '多行输入怎么处理？', a: '每一行独立竖排，行与行之间以空行分隔，形成多列效果。' },
      { q: '标点符号会竖排吗？', a: '会逐字竖排；中文标点按常规竖排习惯保留在字后。' },
    ],
  },
  {
    slug: 'random-char', name: '随机字符生成',
    desc: '生成随机 ASCII 字符、可打印字符或随机字节序列（十六进制显示）。',
    keywords: '随机字符,随机字符串,随机字节,随机ascii,测试数据生成',
    category: 'text', kind: 'gen',
    gen: {
      lib: 'misc', fn: 'randomChars',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '16', min: '1' },
        { name: 'type', label: '类型', type: 'select', options: [['printable', '可打印 ASCII'], ['alpha', '字母'], ['alnum', '字母数字'], ['hex', '十六进制'], ['bytes', '随机字节(hex)']], value: 'printable' },
      ],
      hint: '使用 crypto.getRandomValues 生成，适合测试输入、模糊测试数据。',
    },
    usage: `<ol>
  <li>选择字符类型与数量，点击“生成”。</li>
  <li>可打印 ASCII：33-126；字母/字母数字/十六进制：对应字符集；随机字节输出十六进制。</li>
  <li>生成结果可一键复制，用于测试与调试。</li>
</ol>`,
    faq: [
      { q: '随机性可靠吗？', a: '使用浏览器 crypto 加密级随机源，适合一般测试场景。' },
      { q: '能生成中文吗？', a: '本工具只生成 ASCII 范围；中文随机内容请用“Lorem 假文”或“假数据生成”。' },
    ],
  },
];
