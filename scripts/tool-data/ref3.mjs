/* ref（速查手册）分类补强 4 —— 全部为真实参考数据 */
export default [
  {
    slug: 'provinces', name: '中国省份速查',
    desc: '中国 34 个省级行政区速查：简称与省会城市对照表。',
    keywords: '省份速查,省级行政区,省份简称,省会城市,中国地图,行政区划',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '省份' }, { key: 1, label: '简称', mono: true }, { key: 2, label: '省会/首府' }],
      search: '输入省份（广东）或简称（粤）过滤…', dense: true,
    },
    usage: `<ol><li>速查 34 个省级行政区、简称与省会。</li><li>搜索支持按省名或简称过滤。</li><li>车牌简称、地址填写、数据统计常用。</li></ol>`,
    faq: [
      { q: '为什么河北简称冀？', a: '简称多取自古代州名（冀州）、河流（湘江）或历史名称，约定俗成沿用至今。' },
      { q: '包括港澳台吗？', a: '包括，台湾、香港、澳门均列入省级行政区速查。' },
    ],
  },
  {
    slug: 'world-timezones', name: '世界时区城市',
    desc: '世界主要时区与城市对照表：UTC 偏移与代表城市速查。',
    keywords: '世界时区,时区城市,utc对照,全球时间,时差查询,城市时区',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '时区', mono: true }, { key: 1, label: '代表城市' }],
      search: '输入时区（UTC+8）或城市（东京）过滤…', dense: true,
    },
    usage: `<ol><li>速查各时区（UTC 偏移）的代表城市。</li><li>搜索支持按时区或城市过滤。</li><li>会议排期、跨时区协作、世界时钟参考。</li></ol>`,
    faq: [
      { q: '为什么有的时区是半小时？', a: '印度（+5:30）、尼泊尔（+5:45）等按国界与历史习惯采用非整小时偏移。' },
      { q: '夏令时怎么办？', a: '本表为冬令时标准偏移；实施夏令时的地区夏季会 +1 小时。' },
    ],
  },
  {
    slug: 'win-shortcuts', name: 'Windows 快捷键速查',
    desc: 'Windows 系统快捷键速查：Win 键组合、截图、窗口管理等 30 条。',
    keywords: 'windows快捷键,win快捷键,系统快捷键,快捷键大全,电脑快捷键',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '快捷键', mono: true }, { key: 1, label: '功能' }],
      search: '输入快捷键（Win+D）或功能（截图）过滤…', dense: true,
    },
    usage: `<ol><li>速查 Windows 高频快捷键。</li><li>搜索支持按快捷键或功能过滤。</li><li>提升日常操作效率，Win10/Win11 通用。</li></ol>`,
    faq: [
      { q: 'Win+V 剪贴板历史怎么开？', a: '首次按 Win+V 会提示开启；开启后可查看并固定多条剪贴记录。' },
      { q: '截图有哪些方式？', a: 'Win+Shift+S 区域截图、Win+PrintScreen 全屏保存、Win+Shift+R 录屏（Win+G 游戏栏）。' },
    ],
  },
  {
    slug: 'mac-shortcuts', name: 'macOS 快捷键速查',
    desc: 'macOS 快捷键速查：Cmd 组合、截图、切换、强制退出等 27 条。',
    keywords: 'mac快捷键,macos快捷键,苹果快捷键,cmd快捷键,截图快捷键',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '快捷键', mono: true }, { key: 1, label: '功能' }],
      search: '输入快捷键（Cmd+Space）或功能（截图）过滤…', dense: true,
    },
    usage: `<ol><li>速查 macOS 高频快捷键。</li><li>搜索支持按快捷键或功能过滤。</li><li>Mac 新手与日常效率提升必备。</li></ol>`,
    faq: [
      { q: '截图存在哪里？', a: 'Cmd+Shift+3/4 默认保存到桌面；按住 Ctrl 同时截图则复制到剪贴板。' },
      { q: '强制退出怎么按？', a: 'Option+Cmd+Esc 打开强制退出窗口，选择应用退出（等于 Windows 的 Ctrl+Alt+Del）。' },
    ],
  },
  {
    slug: 'screen-resolutions', name: '屏幕分辨率速查',
    desc: '常见屏幕分辨率速查：HD/2K/4K/8K 与 16:9/16:10/21:9 比例对照。',
    keywords: '屏幕分辨率,分辨率速查,2k 4k,1080p,显示器分辨率,比例对照',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '分辨率', mono: true }, { key: 1, label: '名称/用途' }, { key: 2, label: '比例' }],
      search: '输入分辨率（1920）或名称（4K）过滤…', dense: true,
    },
    usage: `<ol><li>速查常见分辨率与商用名称。</li><li>搜索支持按分辨率或名称过滤。</li><li>选显示器、做设计稿、适配测试常用。</li></ol>`,
    faq: [
      { q: '2K 和 4K 具体多少像素？', a: '2K 常见 2560×1440，4K 为 3840×2160（约 830 万像素）。' },
      { q: 'Retina 屏和分辨率什么关系？', a: 'Retina 是苹果的营销术语，指 PPI 高到肉眼难辨像素；实际分辨率仍按本表数值。' },
    ],
  },
  {
    slug: 'ganzhi-table', name: '六十甲子表',
    desc: '六十甲子速查：1984-2043 年天干地支与生肖对照表。',
    keywords: '六十甲子,天干地支表,干支表,生肖对照,甲子年,干支纪年',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '干支', mono: true }, { key: 1, label: '生肖' }, { key: 2, label: '年份', mono: true }],
      search: '输入干支（甲子）或年份（2024）过滤…', dense: true,
    },
    usage: `<ol><li>速查 1984-2043 年干支与生肖。</li><li>搜索支持按干支或年份过滤。</li><li>传统纪年换算、命理参考、文化学习常用。</li></ol>`,
    faq: [
      { q: '为什么 60 年一轮回？', a: '天干 10 个 × 地支 12 个的最小公倍数为 60，形成六十甲子循环。' },
      { q: '1984 年为什么是甲子？', a: '以 1984 甲子年为基准表（历史上甲子年多次轮回），向前每 60 年一个甲子。' },
    ],
  },
  {
    slug: 'surnames', name: '百家姓速查',
    desc: '百家姓前 100 位速查：常见姓氏与排名，起名参考。',
    keywords: '百家姓,姓氏排名,常见姓氏,姓氏速查,起名参考,中华姓氏',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '姓氏' }, { key: 1, label: '排名', mono: true }],
      search: '输入姓氏（王）或排名（10）过滤…', dense: true,
    },
    usage: `<ol><li>速查百家姓前 100 位。</li><li>搜索支持按姓氏或排名过滤。</li><li>起名、家族文化、数据模拟常用。</li></ol>`,
    faq: [
      { q: '百家姓顺序是按人口吗？', a: '《百家姓》成书于北宋，顺序按韵脚与政治地位编排；现代人口排名王、李、张居前。' },
      { q: '为什么有些少见姓没收录？', a: '只收录前 100 位常见姓；《百家姓》全本含 504 姓。' },
    ],
  },
  {
    slug: 'punctuation', name: '中文标点速查',
    desc: '中文标点符号大全：用法与写法速查，可复制使用。',
    keywords: '中文标点,标点符号,标点大全,标点用法,标点复制,写作标点',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '符号', mono: true }, { key: 1, label: '名称' }],
      search: '输入符号（，）或名称（逗号）过滤…', dense: true,
    },
    usage: `<ol><li>速查中文标点符号与名称。</li><li>搜索支持按符号或名称过滤，符号可直接复制。</li><li>写作规范、排版输入、文档校对常用。</li></ol>`,
    faq: [
      { q: '省略号是几个点？', a: '中文规范为六个点“……”，占两格；三个点“…”是英文用法。' },
      { q: '破折号和连接号区别？', a: '破折号“——”表示转折/注释，连接号“—”连接数字范围或复合词。' },
    ],
  },
];
