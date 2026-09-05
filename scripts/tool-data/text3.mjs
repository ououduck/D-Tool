/* text 分类补强 3 —— 全部为真实可用的文本工具，手写说明与 FAQ */
export default [
  {
    slug: 'case-convert-all', name: '命名风格转换',
    desc: '命名风格转换：camelCase、PascalCase、snake_case、kebab-case、CONSTANT 一键互转。',
    keywords: '命名转换,驼峰命名,下划线命名,烤串命名,代码命名,case convert',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text3', actions: [
        { label: 'camelCase', fn: 'toCamelCase' },
        { label: 'PascalCase', fn: 'toPascalCase' },
        { label: 'snake_case', fn: 'toSnakeCase' },
        { label: 'kebab-case', fn: 'toKebabCase' },
        { label: 'CONSTANT', fn: 'toConstantCase' },
      ],
      placeholder: '输入变量名或短语，如：hello world foo_bar', outLabel: '转换结果',
    },
    usage: `<ol>
  <li>输入变量名/文件名（任意风格），点击目标风格按钮。</li>
  <li>同时支持多种输入风格自动识别。</li>
  <li>写代码时快速统一命名规范。</li>
</ol>`,
    faq: [
      { q: '哪种命名规范最好？', a: 'JS/TS 变量用 camelCase，组件/类用 PascalCase，文件名常用 kebab-case，Python 常用 snake_case。' },
      { q: '中文能转换吗？', a: '只处理英文字母数字，中文与符号会被当作分隔符移除。' },
    ],
  },
  {
    slug: 'url-breakdown', name: 'URL 结构解析',
    desc: 'URL 结构解析：协议、主机、端口、路径、查询、哈希逐项拆解。',
    keywords: 'url解析,url结构,url拆解,网址解析,url组成,链接分析',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'text3', actions: [{ label: '解析', fn: 'urlBreakdown' }],
      multi: true,
      placeholder: '输入完整 URL，如 https://example.com:8080/path?q=1#top', outLabel: '解析结果',
    },
    usage: `<ol>
  <li>粘贴完整 URL，点击“解析”。</li>
  <li>逐项输出协议、主机、端口、路径、查询参数与哈希。</li>
  <li>理解 URL 结构、排查跳转问题、接口调试常用。</li>
</ol>`,
    faq: [
      { q: '没有端口显示什么？', a: '按协议显示默认端口（http 80 / https 443）。' },
      { q: '支持相对路径吗？', a: '不支持，需要完整 URL（http/https 开头）。' },
    ],
  },
  {
    slug: 'quote-convert', name: '引号转换',
    desc: '引号转换：中文弯引号与英文直引号互转，排版规范工具。',
    keywords: '引号转换,弯引号,直引号,中文引号,英文引号,排版规范',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text3', actions: [
        { label: '转弯引号', fn: 'toCurlyQuotes' },
        { label: '转直引号', fn: 'toStraightQuotes' },
      ],
      placeholder: '输入含引号的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“转弯引号”：英文双引号转为中文“ ”‘ ’。</li>
  <li>“转直引号”：中文引号还原为英文 " '。</li>
  <li>中文排版规范、代码字符串还原常用。</li>
</ol>`,
    faq: [
      { q: '为什么中文排版用弯引号？', a: '国标规定中文文本使用全角弯引号“”，与汉字视觉协调。' },
      { q: '转换会误伤代码吗？', a: '会处理所有引号；代码字符串请先分离再转换。' },
    ],
  },
  {
    slug: 'add-numbering', name: '列表编号/项目符号',
    desc: '列表编号工具：每行添加序号或项目符号，整理清单。',
    keywords: '列表编号,添加序号,项目符号,自动编号,列表整理,清单工具',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'text3', actions: [
        { label: '数字编号', fn: 'addNumbering' },
        { label: '项目符号', fn: 'addBullets' },
      ],
      params: [
        { name: 'fmt', label: '编号格式（# 为序号）', type: 'text', value: '1.' },
        { name: 'bullet', label: '项目符号', type: 'text', value: '-' },
      ],
      placeholder: '每行一条内容', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入内容（每行一条），选择编号或符号模式。</li>
  <li>编号格式支持自定义（# 替换为序号，如 “第 # 条”）。</li>
  <li>整理清单、生成 Markdown 列表、待办事项常用。</li>
</ol>`,
    faq: [
      { q: '空行会编号吗？', a: '空行跳过编号保持空白，便于分组。' },
      { q: '编号从几开始？', a: '从 1 开始；需要指定起始值可手动调整。' },
    ],
  },
  {
    slug: 'number-format', name: '数字格式化',
    desc: '数字格式化：千分位、小数位、百分比格式化工具。',
    keywords: '数字格式化,千分位,小数位,百分比格式,数字显示,格式化数字',
    category: 'text', kind: 'calc',
    calc: {
      lib: 'text3', fn: 'formatNumberWith',
      inputs: [
        { label: '数字', type: 'number', value: '1234567.891', step: 'any' },
        { label: '小数位', type: 'number', value: '2' },
      ],
      hint: '输出千分位分隔的格式化数字（zh-CN 格式）。',
    },
    usage: `<ol>
  <li>输入数字与小数位，点击“计算”。</li>
  <li>输出千分位分隔的格式化结果。</li>
  <li>金额展示、数据报表、图表标签常用。</li>
</ol>`,
    faq: [
      { q: '能转百分比吗？', a: '百分比格式见“百分比格式化”工具（需先把数字除以 100）。' },
      { q: '支持负数吗？', a: '支持，负号保留。' },
    ],
  },
  {
    slug: 'percent-format', name: '百分比格式化',
    desc: '百分比格式化：小数转百分比并控制小数位（0.156 → 15.60%）。',
    keywords: '百分比格式,小数转百分比,百分比显示,比例格式化,格式化工具',
    category: 'text', kind: 'calc',
    calc: {
      lib: 'text3', fn: 'formatPercent',
      inputs: [
        { label: '小数（0-1）', type: 'number', value: '0.156', step: 'any' },
        { label: '小数位', type: 'number', value: '2' },
      ],
      hint: '0.156 → 15.60%；输入 1 表示 100%。',
    },
    usage: `<ol>
  <li>输入小数（0-1）与小数位，点击“计算”。</li>
  <li>输出带 % 的格式化结果。</li>
  <li>统计占比、数据可视化、报告排版常用。</li>
</ol>`,
    faq: [
      { q: '大于 1 会怎样？', a: '按比例输出，如 1.5 → 150.00%。' },
      { q: '和百分比计算器区别？', a: '计算器算“某数的百分之几”，本工具只做显示格式化。' },
    ],
  },
  {
    slug: 'passphrase', name: '密码短语生成',
    desc: '密码短语生成：可读单词组合（correct-horse-battery 风格），易记且安全。',
    keywords: '密码短语,口令生成,易记密码,单词密码,passphrase,安全口令',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'text3', fn: 'passphrase',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '3', min: '1' },
        { name: 'words', label: '单词数', type: 'number', value: '4', min: '2' },
      ],
      hint: '形容词+名词组合加数字后缀，如 Bright-Moon-Star-Cloud42。',
    },
    usage: `<ol>
  <li>设置数量与单词数，点击“生成”。</li>
  <li>输出易读的密码短语。</li>
  <li>比随机字符好记，安全性取决于单词数（建议 4+）。</li>
</ol>`,
    faq: [
      { q: '密码短语安全吗？', a: '4 个随机单词组合约有数十亿种可能；配合特殊字符替换更安全。' },
      { q: '单词库有多大？', a: '内置 16 名词 + 10 形容词，组合空间有限；重要账号建议用随机密码生成器。' },
    ],
  },
  {
    slug: 'shift-code', name: '字符位移加密',
    desc: '字符位移加密：所有字符码点整体位移 N 位，简单文本混淆。',
    keywords: '字符位移,码点位移,简单加密,文本混淆,位移加密,自定义加密',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'text3', actions: [
        { label: '加密（+N）', fn: 'shiftCode' },
        { label: '解密（-N）', fn: 'unshiftCode' },
      ],
      params: [{ name: 'shift', label: '位移量', type: 'number', value: '3' }],
      placeholder: '输入文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本与位移量，点击“加密”或“解密”。</li>
  <li>每个字符的 Unicode 码点整体加/减 N。</li>
  <li>简单文本混淆（如防止聊天内容被搜索），非安全加密。</li>
</ol>`,
    faq: [
      { q: '安全吗？', a: '不安全，已知位移量可立即还原；仅用于轻度混淆。' },
      { q: '支持中文吗？', a: '支持，所有 Unicode 字符均可位移。' },
    ],
  },
  {
    slug: 'repeat-text', name: '文本重复生成',
    desc: '文本重复生成：指定次数重复文本，测试数据与占位常用。',
    keywords: '重复文本,文本重复,批量复制,重复生成,占位文本,测试文本',
    category: 'text', kind: 'gen',
    gen: {
      lib: 'text3', fn: 'repeatText',
      params: [
        { name: 'count', label: '重复次数', type: 'number', value: '3', min: '1' },
      ],
      hint: '每行重复一次，适合生成多行测试数据。',
    },
    usage: `<ol>
  <li>填写要重复的内容与次数，点击“生成”。</li>
  <li>输出重复多行的文本。</li>
  <li>测试用例、批量占位、数据填充常用。</li>
</ol>`,
    faq: [
      { q: '最大重复次数？', a: '上限 1000 行，防止浏览器卡顿。' },
      { q: '内容能带换行吗？', a: '建议单行内容；多行内容会整体重复。' },
    ],
  },
  {
    slug: 'lorem-cn', name: '中文占位文本',
    desc: '中文占位文本生成：随机中文句子，排版预览与设计稿占位。',
    keywords: '中文占位,假文生成,占位文本,中文lorem,排版预览,内容占位',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'text3', fn: 'loremCn',
      params: [
        { name: 'sentences', label: '句子数', type: 'number', value: '3', min: '1' },
      ],
      hint: '生成通顺的中文占位句（我们/生活/梦想…组合）。',
    },
    usage: `<ol>
  <li>设置句子数量，点击“生成”。</li>
  <li>输出随机中文占位文本。</li>
  <li>设计稿、页面排版预览、内容占位常用。</li>
</ol>`,
    faq: [
      { q: '和 Lorem ipsum 什么区别？', a: 'Lorem 是拉丁文占位，本工具生成可读中文，更贴近中文排版观感。' },
      { q: '句子通顺吗？', a: '模板化组合基本通顺，偶有抽象组合属正常。' },
    ],
  },
];
