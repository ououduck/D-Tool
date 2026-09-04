/* gen（生成工具）分类补强 2 —— 全部为真实可用的生成器，手写说明与 FAQ */
export default [
  {
    slug: 'poem-generator', name: '古诗名句生成',
    desc: '随机古诗名句生成器：唐诗宋词经典名句随机抽取，文案灵感来源。',
    keywords: '古诗生成,名句生成,唐诗宋词,诗句大全,经典诗句,文案灵感',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomPoem',
      params: [{ name: 'count', label: '数量', type: 'number', value: '1', min: '1' }],
      hint: '从 40+ 首经典诗句库随机抽取（李白/杜甫/苏轼等）。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出经典诗句（如“床前明月光，疑是地上霜”）。</li>
  <li>文案灵感、签名、学习背诵素材常用。</li>
</ol>`,
    faq: [
      { q: '诗句是原创吗？', a: '不是，为历代经典名句，可直接引用；引用时建议标注作者。' },
      { q: '能按诗人筛选吗？', a: '暂不支持，随机抽取；需要指定诗人请自行挑选。' },
    ],
  },
  {
    slug: 'idiom-generator', name: '成语生成器',
    desc: '随机成语生成器：常见成语随机抽取，写作与学习素材。',
    keywords: '成语生成,随机成语,成语大全,成语学习,四字成语,写作素材',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomIdiom',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '从 80+ 常用成语库随机抽取（含典故成语）。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机成语，每行一个。</li>
  <li>写作素材、成语接龙、学习测试常用。</li>
</ol>`,
    faq: [
      { q: '成语会重复吗？', a: '独立随机可能重复；数量较多时多生成几次挑选。' },
      { q: '有释义吗？', a: '暂不附释义；需要解释可自行搜索或配合词典。' },
    ],
  },
  {
    slug: 'english-name', name: '英文名生成器',
    desc: '随机英文名生成器：经典英文名 + 姓氏组合，支持性别选择。',
    keywords: '英文名生成,英文名字,取英文名,英文姓名,英文昵称,name generator',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomEnglishName',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '5', min: '1' },
        { name: 'gender', label: '性别', type: 'select', options: [['any', '随机'], ['male', '男'], ['female', '女']], value: 'any' },
      ],
      hint: '英美常见名库：James/Mary 等 + 常见姓氏。',
    },
    usage: `<ol>
  <li>选择性别与数量，点击“生成”。</li>
  <li>输出“名 + 姓”格式的英文姓名。</li>
  <li>注册海外账号、取英文名、测试数据常用。</li>
</ol>`,
    faq: [
      { q: '名字地道吗？', a: '使用英美常用名库（Top 20 名 + Top 30 姓），组合自然。' },
      { q: '能生成中文名拼音吗？', a: '英文名生成器产出英文姓名；中文拼音可用“姓名生成器”。' },
    ],
  },
  {
    slug: 'word-generator', name: '英文单词生成器',
    desc: '随机英文单词生成器：常见英语单词批量生成，学习与测试用。',
    keywords: '单词生成,随机单词,英语单词,背单词,词汇测试,单词列表',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomWord',
      params: [{ name: 'count', label: '数量', type: 'number', value: '10', min: '1' }],
      hint: '从 50 个常用单词库随机抽取，适合词汇练习。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机英文单词，每行一个。</li>
  <li>词汇测试、拼写练习、占位文本常用。</li>
</ol>`,
    faq: [
      { q: '单词难度如何？', a: '以基础常见词为主（apple/book/moon 等），适合初阶学习者。' },
      { q: '能生成更多单词吗？', a: '当前内置 50 词；需要专业词库请使用“Lorem 假文”或随机字符。' },
    ],
  },
  {
    slug: 'random-time', name: '随机时间生成',
    desc: '随机时间生成器：生成 HH:MM:SS 格式随机时间，测试数据常用。',
    keywords: '随机时间,时间生成,测试时间,随机时刻,时间数据',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomTime',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '生成 00:00:00-23:59:59 的随机时刻。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机时间（HH:MM:SS）。</li>
  <li>日程系统测试、数据填充常用。</li>
</ol>`,
    faq: [
      { q: '时间格式固定吗？', a: '固定 HH:MM:SS 24 小时制，补零对齐。' },
      { q: '能生成日期+时间吗？', a: '日期可用“随机日期生成器”，两者可自行拼接。' },
    ],
  },
  {
    slug: 'code-generator', name: '验证码生成',
    desc: '数字验证码生成器：指定位数与数量的随机验证码，测试用。',
    keywords: '验证码生成,短信验证码,随机验证码,测试验证码,验证码工具',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomCode',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '5', min: '1' },
        { name: 'digits', label: '位数', type: 'number', value: '6', min: '4' },
      ],
      hint: '生成 4-10 位纯数字验证码，含前导零。',
    },
    usage: `<ol>
  <li>设置数量与位数，点击“生成”。</li>
  <li>输出随机数字验证码。</li>
  <li>短信验证码联调、表单测试常用。</li>
</ol>`,
    faq: [
      { q: '含前导零吗？', a: '含，如 001234 是合法输出（短信验证码常见）。' },
      { q: '能生成字母验证码吗？', a: '纯数字；字母数字混合可用“优惠码生成器”。' },
    ],
  },
  {
    slug: 'kaomoji-generator', name: '颜文字生成',
    desc: '随机颜文字生成器：日式表情符号随机抽取，聊天趣味工具。',
    keywords: '颜文字,表情符号,日式颜文字,kaomoji,聊天表情,符号表情',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomKaomoji',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '从 20 个经典颜文字库随机抽取，如 (●\'◡\'●)。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机颜文字，可一键复制。</li>
  <li>聊天、文案、评论互动常用。</li>
</ol>`,
    faq: [
      { q: '颜文字和 emoji 区别？', a: '颜文字由符号组合（如 ^_^），emoji 是 Unicode 字符；两者可混用。' },
      { q: '显示会乱吗？', a: '颜文字为纯文本符号，任何平台都正常显示。' },
    ],
  },
  {
    slug: 'emoji-generator', name: 'Emoji 生成器',
    desc: '随机 Emoji 生成器：随机抽取表情符号，聊天与文案装饰。',
    keywords: 'emoji生成,随机emoji,表情生成,表情符号,emoji随机',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen2', fn: 'randomEmoji',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '从 30 个常用 emoji 随机抽取，空格分隔。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机 emoji 序列。</li>
  <li>文案点缀、聊天装饰、占位符号常用。</li>
</ol>`,
    faq: [
      { q: '能指定类别吗？', a: '暂不支持；完整列表见“Emoji 大全”速查工具。' },
      { q: '表情会重复吗？', a: '独立随机可能重复；数量少时基本不重复。' },
    ],
  },
];
