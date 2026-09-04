/* text（文本处理）分类补强 2 —— 全部为真实可用的文本工具，手写说明与 FAQ */
export default [
  {
    slug: 'text-truncate', name: '文本截断',
    desc: '文本截断工具：按字符数截断并标注原文长度，标题与摘要处理常用。',
    keywords: '文本截断,截断文本,限长截断,字符截断,摘要截取',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [{ label: '截断', fn: 'truncateText' }],
      params: [{ name: 'maxLen', label: '最大字符数', type: 'number', value: '100', min: '1' }],
      placeholder: '输入长文本', outLabel: '截断结果',
    },
    usage: `<ol>
  <li>输入文本与最大字符数，点击“截断”。</li>
  <li>超出部分省略并标注原文总长度。</li>
  <li>生成文章摘要、列表标题、消息预览常用。</li>
</ol>`,
    faq: [
      { q: '按字符还是字节算？', a: '按 Unicode 字符计算，中文按 1 字符计；需要字节限制可先用“文本信息”查看字节数。' },
      { q: '会保留换行吗？', a: '原样保留；截断位置可能在换行中间，属正常。' },
    ],
  },
  {
    slug: 'first-lines', name: '取前 N 行',
    desc: '取文本前 N 行 / 跳过前 N 行：日志、配置文件的快速预览与裁剪。',
    keywords: '取前几行,跳过行数,行裁剪,head,文本预览,截取行',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '取前 N 行', fn: 'extractFirstLines' },
        { label: '跳过前 N 行', fn: 'removeFirstLines' },
      ],
      params: [{ name: 'count', label: '行数 N', type: 'number', value: '10', min: '1' }],
      placeholder: '输入多行文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本与行数 N，点击“取前 N 行”或“跳过前 N 行”。</li>
  <li>前者保留开头 N 行；后者删除开头 N 行保留剩余。</li>
  <li>预览大日志、去掉配置文件头部注释常用。</li>
</ol>`,
    faq: [
      { q: 'N 大于总行数会怎样？', a: '取前 N 行返回全部；跳过前 N 行返回空。' },
      { q: '空行算行吗？', a: '算，按真实换行符分行。' },
    ],
  },
  {
    slug: 'extract-between', name: '提取标记间内容',
    desc: '提取两个标记之间的全部内容：日志解析、报文提取常用。',
    keywords: '提取内容,标记提取,区间提取,日志解析,报文提取,截取片段',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [{ label: '提取', fn: 'extractBetween' }],
      params: [
        { name: 'start', label: '起始标记', type: 'text', value: '<title>' },
        { name: 'end', label: '结束标记', type: 'text', value: '</title>' },
      ],
      placeholder: '输入文本（支持多次匹配，逐行输出）', outLabel: '提取结果',
    },
    usage: `<ol>
  <li>填写起始与结束标记，粘贴文本。</li>
  <li>提取所有“起始标记…结束标记”之间的内容，每段一行。</li>
  <li>从 HTML/日志/报文中批量抽取字段常用。</li>
</ol>`,
    faq: [
      { q: '能匹配多次吗？', a: '能，循环提取所有匹配段并逐行输出。' },
      { q: '标记含正则字符会怎样？', a: '按纯文本查找（非正则），<> 等符号直接使用即可。' },
    ],
  },
  {
    slug: 'align-columns', name: '文本分列对齐',
    desc: '文本分列对齐：按分隔符拆列并空格对齐，整理表格数据。',
    keywords: '分列对齐,文本对齐,列对齐,制表符分列,表格整理,对齐工具',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [{ label: '对齐', fn: 'splitColumns' }],
      params: [{ name: 'sep', label: '分隔符', type: 'select', options: [['\t', '制表符 Tab'], [',', '逗号 ,'], [' ', '空格'], ['|', '竖线 |']], value: '\t' }],
      placeholder: '输入表格数据（每行一条记录）', outLabel: '对齐结果',
    },
    usage: `<ol>
  <li>选择分隔符（Tab/逗号/空格/竖线），粘贴多行数据。</li>
  <li>每列按最大宽度补空格对齐，输出整齐的表格文本。</li>
  <li>从终端或日志中整理字段常用。</li>
</ol>`,
    faq: [
      { q: '中文宽度对齐吗？', a: '按字符数对齐（非显示宽度）；中英文混排时视觉可能略不齐，属正常。' },
      { q: '空列怎么处理？', a: '缺失列以空串补齐，保持每行列数一致。' },
    ],
  },
  {
    slug: 'csv-markdown', name: 'CSV/表格转 Markdown',
    desc: 'CSV 或 TSV 转 Markdown 表格：粘贴数据一键生成文档表格。',
    keywords: 'csv转markdown,表格转markdown,生成markdown表格,tsv转换,文档表格',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: 'CSV→Markdown', fn: 'csvToMarkdown' },
        { label: 'TSV→Markdown', fn: 'tsvToMarkdown' },
        { label: 'Markdown→CSV', fn: 'markdownTableToCsv' },
      ],
      placeholder: '粘贴 CSV（逗号分隔）或 Markdown 表格', outLabel: '转换结果',
    },
    usage: `<ol>
  <li>粘贴 CSV（每行一条、逗号分隔）点击“CSV→Markdown”。</li>
  <li>生成标准 Markdown 表格（表头 + 分隔线 + 数据行）。</li>
  <li>反向操作可从 Markdown 表格还原 CSV。</li>
</ol>`,
    faq: [
      { q: '表格里有逗号怎么办？', a: 'CSV 标准用引号包裹含逗号的字段；本工具按简单切分，复杂 CSV 请先转义。' },
      { q: '表头识别吗？', a: '第一行作为表头；无表头数据也按第一行当表头处理。' },
    ],
  },
  {
    slug: 'pad-lines', name: '文本填充对齐',
    desc: '文本填充工具：左/右/居中对齐并按宽度补空格，排版整理。',
    keywords: '文本填充,对齐填充,左对齐,右对齐,居中,补空格',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [{ label: '左对齐', fn: 'padLinesLeft' }, { label: '右对齐', fn: 'padLinesRight' }, { label: '居中', fn: 'padLinesCenter' }],
      params: [{ name: 'width', label: '宽度', type: 'number', value: '20', min: '1' }],
      placeholder: '输入多行文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本与目标宽度，选择对齐方式。</li>
  <li>每行按宽度补空格：左对齐（右补）、右对齐（左补）、居中。</li>
  <li>终端输出、ASCII 排版、注释对齐常用。</li>
</ol>`,
    faq: [
      { q: '行超宽怎么办？', a: '超过宽度的行保持原样不裁剪。' },
      { q: '中文对齐效果如何？', a: '按字符数补空格；中文与英文混排时视觉宽度不同，建议按列处理。' },
    ],
  },
  {
    slug: 'add-prefix-suffix', name: '行首行尾添加',
    desc: '每行添加前缀/后缀：代码注释、引号包裹、批量加标记。',
    keywords: '加前缀,加后缀,行首添加,行尾添加,批量加标记,引号包裹',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '加前缀', fn: 'addPrefix' },
        { label: '加后缀', fn: 'addSuffix' },
        { label: '加引号', fn: 'quoteLines' },
      ],
      params: [
        { name: 'prefix', label: '前缀', type: 'text', value: '' },
        { name: 'suffix', label: '后缀', type: 'text', value: '' },
      ],
      placeholder: '输入多行文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>填写前缀/后缀（可留空），点击对应按钮。</li>
  <li>每行前/后追加内容；“加引号”用引号包裹整行。</li>
  <li>批量加注释符号、SQL 拼接、代码生成常用。</li>
</ol>`,
    faq: [
      { q: '前缀后缀能同时加吗？', a: '分两步：先加前缀再复制结果加后缀。' },
      { q: '空行也会处理吗？', a: '会，所有行（含空行）统一处理。' },
    ],
  },
  {
    slug: 'char-code-info', name: '字符码点查看',
    desc: '字符码点查看器：逐字符显示 Unicode 码点与十进制值。',
    keywords: '字符码点,unicode码点,字符编码查看,码点查询,字符值',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [{ label: '查看', fn: 'charCodeInfo' }],
      multi: true,
      placeholder: '输入字符（支持中文与 emoji）', outLabel: '码点信息',
    },
    usage: `<ol>
  <li>输入任意字符（可多字符），点击“查看”。</li>
  <li>每个字符输出 Unicode 码点（U+XXXX）与十进制。</li>
  <li>理解编码、调试特殊字符时常用。</li>
</ol>`,
    faq: [
      { q: 'emoji 是几个码点？', a: 'emoji 可能是单个码点（如 😀 U+1F600）或组合序列；本工具按码点逐个显示。' },
      { q: '和 UTF-8 字节什么区别？', a: '码点是字符编号（U+4F60），UTF-8 字节是存储编码（E4 BD A0），两者不同。' },
    ],
  },
  {
    slug: 'unicode-escape', name: 'Unicode 转义/反转义',
    desc: 'Unicode 转义转换：文本转 \\uXXXX 转义序列，反向还原。',
    keywords: 'unicode转义,转义序列,\\u编码,json转义,反转义,编码转换',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '转义', fn: 'unicodeEscape' },
        { label: '反转义', fn: 'unicodeUnescape' },
      ],
      placeholder: '输入文本或 \\u 转义序列', outLabel: '结果',
    },
    usage: `<ol>
  <li>“转义”：中文/特殊字符转为 \\uXXXX 形式。</li>
  <li>“反转义”：粘贴 \\u4F60 等序列还原为文本。</li>
  <li>JSON 字符串、日志调试、代码硬编码常用。</li>
</ol>`,
    faq: [
      { q: 'JSON 里能用吗？', a: '能，JSON 字符串支持 \\uXXXX；本工具转义结果可直接放入 JSON。' },
      { q: '支持 \\u{...} 扩展格式吗？', a: '支持（ES6 语法），大于 BMP 的字符用 \\u{1F600} 形式。' },
    ],
  },
  {
    slug: 'shuffle-text', name: '随机打乱',
    desc: '字符随机打乱 / 单词随机打乱：洗牌式文本变换，趣味与测试用。',
    keywords: '随机打乱,字符打乱,单词打乱,洗牌,shuffle,乱序',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '打乱字符', fn: 'shuffleChars' },
        { label: '打乱单词', fn: 'shuffleWords' },
      ],
      placeholder: '输入文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“打乱字符”：逐字符随机重排（emoji 不拆散）。</li>
  <li>“打乱单词”：按空白分词后随机重排。</li>
  <li>测试数据处理、趣味变换、回文检查辅助常用。</li>
</ol>`,
    faq: [
      { q: '结果可预测吗？', a: '不可预测，使用随机数；同一输入每次结果不同。' },
      { q: '能还原吗？', a: '不能，打乱不可逆；需要保留原文请先复制。' },
    ],
  },
  {
    slug: 'unique-words', name: '单词去重',
    desc: '英文单词去重与词频统计：按空格分词去重或统计 Top N 高频词。',
    keywords: '单词去重,词频统计,高频词,英文分词,去重工具,top词',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '单词去重', fn: 'uniqueWords' },
        { label: '词频 Top N', fn: 'wordFrequencyTop' },
      ],
      multi: true,
      params: [{ name: 'count', label: 'Top N', type: 'number', value: '20', min: '1' }],
      placeholder: '输入英文文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“单词去重”：按空白分词去重，每词一行。</li>
  <li>“词频 Top N”：统计出现最多的 N 个单词及次数。</li>
  <li>文章关键词分析、停止词过滤、词云准备常用。</li>
</ol>`,
    faq: [
      { q: '大小写会合并吗？', a: '词频统计统一转小写合并；去重保留原样（区分大小写）。' },
      { q: '标点会处理吗？', a: '词频统计只匹配字母数字，标点自动忽略；去重按空白切分含标点。' },
    ],
  },
  {
    slug: 'text-replace', name: '文本批量替换',
    desc: '文本批量替换：普通替换与正则替换两种模式，一键处理。',
    keywords: '批量替换,文本替换,正则替换,查找替换,replace,字符串替换',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '普通替换', fn: 'replaceAll' },
        { label: '正则替换', fn: 'replaceRegex' },
      ],
      params: [
        { name: 'find', label: '查找（正则模式支持语法）', type: 'text', value: '' },
        { name: 'replace', label: '替换为', type: 'text', value: '' },
      ],
      placeholder: '输入原文', outLabel: '替换结果',
    },
    usage: `<ol>
  <li>填写“查找”与“替换为”文本，选择替换模式。</li>
  <li>普通替换：全部替换（区分大小写）；正则替换：支持 \\d、[a-z] 等。</li>
  <li>批量清洗数据、统一格式常用。</li>
</ol>`,
    faq: [
      { q: '正则怎么替换？', a: '用 JavaScript 正则语法，如 \\d+ 匹配数字；替换串支持 $1 引用分组。' },
      { q: '替换所有还是第一个？', a: '全部替换；需要只替换第一个请用正则的取消 g 模式（暂不支持）。' },
    ],
  },
  {
    slug: 'text-bytes', name: '文本字节查看',
    desc: '文本字节查看：UTF-8 字节序列与文本信息统计（字符/字节/行数）。',
    keywords: '字节查看,utf8字节,字节序列,文本信息,字符统计,字节统计',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '查看字节', fn: 'textToBytes' },
        { label: '文本信息', fn: 'textLengthInfo' },
      ],
      multi: true,
      placeholder: '输入文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“查看字节”：每个 UTF-8 字节输出十进制值，空格分隔。</li>
  <li>“文本信息”：字符数、字节数、行数、汉字数、英文单词数。</li>
  <li>调试编码、估算存储、内容统计常用。</li>
</ol>`,
    faq: [
      { q: '字节和字符什么区别？', a: '一个汉字 UTF-8 占 3 字节但只算 1 字符；emoji 占 4 字节。' },
      { q: '字节数能转十六进制吗？', a: '需要十六进制请用“文本十六进制互转”工具。' },
    ],
  },
  {
    slug: 'text-extract-mixed', name: '混合内容提取',
    desc: '中文/英文批量提取：从混排文本中分别提取纯中文或纯英文内容。',
    keywords: '中文提取,英文提取,混排提取,文字筛选,语言分离,文本过滤',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text2', actions: [
        { label: '提取中文', fn: 'extractChineseChars' },
        { label: '提取英文', fn: 'extractEnglishWords' },
      ],
      placeholder: '输入中英混排文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“提取中文”：保留全部汉字（去字母数字标点）。</li>
  <li>“提取英文”：按单词提取英文（每词一行）。</li>
  <li>语言分离、语料清洗、关键词抽取常用。</li>
</ol>`,
    faq: [
      { q: '中文标点保留吗？', a: '不保留，只取汉字字符；需要标点可结合字符频率工具。' },
      { q: '英文提取保留大小写吗？', a: '保留原样；需要小写可复制到大小写转换工具。' },
    ],
  },
];
