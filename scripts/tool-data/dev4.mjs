/* dev/web/text 分类补强 4 —— 全部为真实可用的工具 */
export default [
  {
    slug: 'regex-tester-extra', name: '正则表达式测试',
    desc: '正则测试器：输入正则与文本，输出匹配数量与结果。',
    keywords: '正则测试,正则验证,正则匹配,regex测试,正则调试,正则工具',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev4', actions: [{ label: '测试', fn: 'regexTest' }],
      params: [
        { name: 'pattern', label: '正则表达式', type: 'text', value: '\\d+' },
        { name: 'flags', label: '标志（g/i/m/s）', type: 'text', value: 'g' },
      ],
      placeholder: '输入要匹配的文本', outLabel: '测试结果',
    },
    usage: `<ol><li>填写正则表达式与标志，输入文本，点击“测试”。</li><li>输出匹配数量与内容（去重前 20 条）。</li><li>调试正则、验证规则、提取数据常用。</li></ol>`,
    faq: [
      { q: '和现有正则工具重复吗？', a: '本站另有“正则测试”工具（表格展示），本工具聚焦数量统计与快速验证。' },
      { q: '支持哪些标志？', a: 'g 全局、i 忽略大小写、m 多行、s 点号匹配换行。' },
    ],
  },
  {
    slug: 'css-beautify', name: 'CSS 美化格式化',
    desc: 'CSS 美化：压缩的 CSS 展开为缩进清晰的格式，便于阅读。',
    keywords: 'css美化,css格式化,css排版,css整理,pretty css,样式美化',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev4', actions: [{ label: '美化', fn: 'cssBeautify' }],
      placeholder: '粘贴压缩的 CSS，如 a{color:red;margin:0}', outLabel: '美化结果',
    },
    usage: `<ol><li>粘贴 CSS（压缩或混乱格式），点击“美化”。</li><li>输出带缩进与换行的清晰格式。</li><li>阅读压缩后的样式、代码评审常用。</li></ol>`,
    faq: [
      { q: '会改样式效果吗？', a: '不会，只调整空白与换行；与压缩互为逆操作。' },
      { q: '支持嵌套吗？', a: '纯 CSS 美化；Less/Sass 嵌套需先编译。' },
    ],
  },
  {
    slug: 'jwt-decode-extra', name: 'JWT 在线解析',
    desc: 'JWT 解析：解码 Header、Payload 与 Signature，无需签名验证。',
    keywords: 'jwt解析,jwt解码,jwt payload,token解析,鉴权token,jwt工具',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev4', actions: [{ label: '解析', fn: 'jwtPayload' }],
      multi: true,
      placeholder: '粘贴 JWT Token（eyJhbGciOi...）', outLabel: '解析结果',
    },
    usage: `<ol><li>粘贴 JWT Token，点击“解析”。</li><li>输出 Header、Payload（JSON 格式化）与签名。</li><li>调试登录态、查看 token 内容常用。</li></ol>`,
    faq: [
      { q: '能验证签名吗？', a: '不能，签名验证需要密钥；本工具只解码内容（Base64url）。' },
      { q: '安全吗？', a: '解码在本地完成，token 不离开浏览器；但请勿在公共设备粘贴敏感 token。' },
    ],
  },
  {
    slug: 'time-diff', name: '时间差计算',
    desc: '时间差计算：指定时间与当前时间的差值（未来/过去）。',
    keywords: '时间差,当前时间对比,倒计时计算,时间距离,还剩多久',
    category: 'date', kind: 'calc',
    calc: {
      lib: 'dev4', fn: 'timeDiffCalc',
      inputs: [{ label: '目标时间', type: 'datetime-local', value: '' }],
      hint: '选择日期时间，计算与现在的差值。',
    },
    usage: `<ol><li>选择目标日期时间，点击“计算”。</li><li>输出方向（未来/过去）与天时分秒差值。</li><li>活动倒计时、任务截止提醒常用。</li></ol>`,
    faq: [
      { q: '支持秒级吗？', a: '支持，datetime-local 精度到分钟；秒级差异也会显示。' },
      { q: '和日期差工具区别？', a: '本工具对比“当前时刻”，日期差对比两个指定日期。' },
    ],
  },
  {
    slug: 'array-tools', name: '数组处理工具',
    desc: '数组处理：去重、排序、反转、频次统计，逗号/空格分隔输入。',
    keywords: '数组去重,数组排序,数组工具,列表处理,元素统计,array tools',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'dev4', actions: [
        { label: '去重', fn: 'arrayToolsUnique' },
        { label: '排序', fn: 'arrayToolsSort' },
        { label: '反转', fn: 'arrayToolsReverse' },
        { label: '频次统计', fn: 'arrayToolsCount' },
      ],
      placeholder: '输入元素，空格/逗号/分号分隔，如：a b c a b', outLabel: '结果',
    },
    usage: `<ol><li>输入数组元素（空格/逗号/分号分隔），选择操作。</li><li>去重保留首次顺序；排序按中文/数字自然序；频次按“元素: 次数”输出。</li><li>标签去重、列表整理、数据清洗常用。</li></ol>`,
    faq: [
      { q: '排序规则？', a: '按 Unicode/中文拼音自然排序（数字按数值）。' },
      { q: '能处理数字吗？', a: '能，元素按字符串处理；纯数字也会正确排序。' },
    ],
  },
  {
    slug: 'contact-validate', name: '手机号/邮箱校验',
    desc: '手机号与邮箱格式校验：输入即判断是否合法。',
    keywords: '手机号校验,邮箱校验,格式验证,手机号验证,email验证,格式检查',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'dev4', actions: [{ label: '校验', fn: 'validateContact' }],
      params: [
        { name: 'type', label: '类型', type: 'select', options: [['phone', '手机号'], ['email', '邮箱']], value: 'phone' },
      ],
      placeholder: '输入手机号或邮箱', outLabel: '校验结果',
    },
    usage: `<ol><li>选择类型，输入内容，点击“校验”。</li><li>返回格式是否合法及原因。</li><li>表单验证、数据清洗、接口测试常用。</li></ol>`,
    faq: [
      { q: '手机号校验严格吗？', a: '按 1[3-9] 开头 11 位规则；不验证号码是否真实在用。' },
      { q: '邮箱支持中文域名吗？', a: '支持标准格式；IDN 域名邮箱需先转 punycode。' },
    ],
  },
  {
    slug: 'word-count-extra', name: '英文单词统计',
    desc: '英文文本统计：单词数、字符数、句子数与平均词长。',
    keywords: '英文统计,单词统计,词数统计,字符统计,句子统计,文本分析',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'dev4', actions: [{ label: '统计', fn: 'wordCount' }],
      multi: true,
      placeholder: '输入英文文本', outLabel: '统计结果',
    },
    usage: `<ol><li>输入英文文本，点击“统计”。</li><li>输出单词数、字符数、句子数与平均词长。</li><li>英文写作、翻译计价、内容长度评估常用。</li></ol>`,
    faq: [
      { q: '连字符词怎么算？', a: '如 well-known 按一个词计；数字不计入单词。' },
      { q: '中文文本能用吗？', a: '中文建议用“文本统计”工具；本工具针对英文。' },
    ],
  },
];
