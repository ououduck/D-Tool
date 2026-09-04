/* ref（速查手册）分类补强 —— 第二批 18 款，全部为真实参考数据 */
export default [
  {
    slug: 'css-properties', name: 'CSS 属性速查',
    desc: 'CSS 常用属性速查表：布局、字体、颜色、动画等 57 个高频属性及用途。',
    keywords: 'css属性,样式属性,css速查,样式表属性,布局属性,字体属性',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '属性', mono: true }, { key: 1, label: '用途' }],
      search: '输入属性（flex）或用途（对齐）过滤…', dense: true,
    },
    usage: `<ol><li>速查 CSS 高频属性：布局、字体、背景、动画。</li><li>搜索支持按属性名或用途过滤。</li><li>写样式时对照属性名与作用。</li></ol>`,
    faq: [
      { q: '简写属性和分写有什么区别？', a: '如 background 是简写（一次设多个），分写（background-color 等）更精确；简写会重置未写的项。' },
      { q: 'flex 和 grid 怎么选？', a: '一维布局（行/列）用 flex；二维布局（行列网格）用 grid；现代布局两者结合使用。' },
    ],
  },
  {
    slug: 'html-attributes', name: 'HTML 属性速查',
    desc: 'HTML 常用属性速查表：全局属性、表单属性、媒体属性 50+。',
    keywords: 'html属性,标签属性,属性速查,html属性大全,表单属性,全局属性',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '属性', mono: true }, { key: 1, label: '用途' }],
      search: '输入属性（required）或用途（校验）过滤…', dense: true,
    },
    usage: `<ol><li>速查 HTML 高频属性：全局、表单、媒体、链接。</li><li>搜索支持按属性名或用途过滤。</li><li>写页面时对照属性作用。</li></ol>`,
    faq: [
      { q: 'data-* 属性是干嘛的？', a: '自定义数据属性，可在 JS 中通过 dataset 读取，用于存储与元素相关的业务数据。' },
      { q: 'autocomplete 什么时候关？', a: '验证码、一次性密码等敏感输入建议关闭，避免浏览器自动填充干扰。' },
    ],
  },
  {
    slug: 'js-array-methods', name: 'JS 数组方法速查',
    desc: 'JavaScript 数组方法速查表：增删、查找、遍历、归约 30 个高频方法。',
    keywords: 'js数组,数组方法,array方法,javascript数组,map filter reduce,前端面试',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '方法', mono: true }, { key: 1, label: '说明' }],
      search: '输入方法（map）或用途（查找）过滤…', dense: true,
    },
    usage: `<ol><li>速查 JS 数组方法：增删、查找、遍历、归约。</li><li>搜索支持按方法名或用途过滤。</li><li>注意区分是否修改原数组。</li></ol>`,
    faq: [
      { q: 'map 和 forEach 什么区别？', a: 'map 返回新数组（可链式），forEach 仅遍历不返回；需要转换结果用 map。' },
      { q: '哪些方法会修改原数组？', a: 'push/pop/shift/unshift/splice/sort/reverse/fill 会修改；map/filter/slice/concat 不修改。' },
    ],
  },
  {
    slug: 'js-string-methods', name: 'JS 字符串方法速查',
    desc: 'JavaScript 字符串方法速查表：查找、截取、替换、填充 30 个高频方法。',
    keywords: 'js字符串,字符串方法,string方法,javascript字符串,字符串操作',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '方法', mono: true }, { key: 1, label: '说明' }],
      search: '输入方法（split）或用途（截取）过滤…', dense: true,
    },
    usage: `<ol><li>速查 JS 字符串方法：查找、截取、替换、填充。</li><li>搜索支持按方法名或用途过滤。</li><li>字符串方法不修改原字符串（不可变）。</li></ol>`,
    faq: [
      { q: 'slice 和 substring 什么区别？', a: 'slice 支持负数索引（从尾部数），substring 把负数当 0 处理；日常推荐 slice。' },
      { q: 'replace 只替换第一个怎么办？', a: '用 replaceAll 或正则加 g 标志：str.replaceAll(\'a\', \'b\') 或 replace(/a/g, \'b\')。' },
    ],
  },
  {
    slug: 'python-builtins', name: 'Python 内置函数速查',
    desc: 'Python 内置函数速查表：类型转换、容器操作、函数式编程 40 个高频函数。',
    keywords: 'python内置函数,python函数,builtins,python速查,类型转换,函数式编程',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '函数', mono: true }, { key: 1, label: '说明' }],
      search: '输入函数（sorted）或用途（排序）过滤…', dense: true,
    },
    usage: `<ol><li>速查 Python 内置函数：类型转换、容器、函数式工具。</li><li>搜索支持按函数名或用途过滤。</li><li>写 Python 时对照函数签名与作用。</li></ol>`,
    faq: [
      { q: 'map 和列表推导式怎么选？', a: '列表推导式 [f(x) for x in xs] 更 Pythonic 且可读；map 适合传已有函数。' },
      { q: 'eval 为什么慎用？', a: 'eval 执行任意代码，输入不可信时存在严重安全风险；用 ast.literal_eval 做安全解析。' },
    ],
  },
  {
    slug: 'latex-symbols', name: 'LaTeX 符号速查',
    desc: 'LaTeX 常用符号速查表：数学公式、希腊字母、矩阵、箭头等 35 个命令。',
    keywords: 'latex符号,latex公式,数学公式,latex命令,latex速查,公式排版',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: 'LaTeX', mono: true }, { key: 1, label: '含义' }],
      search: '输入命令（\\sum）或含义（积分）过滤…', dense: true,
    },
    usage: `<ol><li>速查 LaTeX 常用命令：分式、根号、求和、希腊字母。</li><li>搜索支持按命令或含义过滤。</li><li>学术论文、Markdown 数学公式、Obsidian/Notion 写作常用。</li></ol>`,
    faq: [
      { q: '在哪里用 LaTeX？', a: 'LaTeX 文档、Markdown 的 $...$ 行内公式、$$...$$ 块级公式（如 GitHub、Typora）。' },
      { q: '希腊字母大小写怎么写？', a: '小写 \\alpha、\\beta…；大写 \\Alpha 等首字母大写（部分大写希腊字母与英文相同则无命令）。' },
    ],
  },
  {
    slug: 'emoji-list', name: 'Emoji 大全',
    desc: '常用 emoji 列表：表情、手势、爱心、动植物、食物、符号，点击即可复制。',
    keywords: 'emoji大全,emoji列表,表情符号,emoji复制,颜文字,符号大全',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: 'Emoji' }, { key: 1, label: '含义' }],
      search: '输入 emoji 或含义（爱心）过滤…', dense: true,
    },
    usage: `<ol><li>浏览常用 emoji 与含义。</li><li>点击复制按钮直接复制 emoji 字符。</li><li>社交文案、文档标注、聊天表情常用。</li></ol>`,
    faq: [
      { q: '为什么同一 emoji 显示不同？', a: 'emoji 外观由操作系统/平台决定（Apple/Google/微软风格不同），字符本身一致。' },
      { q: '能组合 emoji 吗？', a: '部分可用 ZWJ 连接符组合（如 ❤️‍🔥），兼容性因平台而异。' },
    ],
  },
  {
    slug: 'special-symbols', name: '特殊符号大全',
    desc: '特殊符号合集：星形、箭头、几何、数字圈、货币、标点，可复制使用。',
    keywords: '特殊符号,符号大全,符号复制,特殊字符,花纹符号,字体符号',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '符号', mono: true }, { key: 1, label: '名称' }],
      search: '输入符号（★）或名称（箭头）过滤…', dense: true,
    },
    usage: `<ol><li>浏览特殊符号分类与写法。</li><li>点击复制按钮直接获取符号。</li><li>昵称装饰、文档排版、海报文案常用。</li></ol>`,
    faq: [
      { q: '符号在手机上显示正常吗？', a: '多数 Unicode 符号跨平台显示正常；个别冷门符号可能显示为方框。' },
      { q: '带圈数字最大到几？', a: '常用 ①-⑳（U+2460-U+2473）；更大的圈数字需用其他编码。' },
    ],
  },
  {
    slug: 'country-codes', name: '国家区号速查',
    desc: '世界各国国际电话区号速查表：+86 中国、+1 美国等 64 个国家/地区。',
    keywords: '国际区号,国家区号,电话区号,国际电话,拨打国际,country code',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '区号', mono: true }, { key: 1, label: '国家/地区' }],
      search: '输入区号（+86）或国家名（日本）过滤…', dense: true,
    },
    usage: `<ol><li>速查国际电话区号。</li><li>搜索支持按区号或国家名过滤。</li><li>国际通话、表单国家选择、地址信息处理常用。</li></ol>`,
    faq: [
      { q: '国际拨打格式？', a: '中国打美国：00 或 + 开头，即 +1 电话号码（去掉本地 0 前缀）。' },
      { q: '+1 为什么包含加拿大？', a: '北美号码计划（NANP）让美加共用 +1 区号，按前三位区号区分。' },
    ],
  },
  {
    slug: 'solar-terms', name: '二十四节气表',
    desc: '二十四节气速查：节气名称、公历日期与含义，传统文化参考。',
    keywords: '二十四节气,节气表,节气查询,节气日期,24节气,农历节气',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '节气' }, { key: 1, label: '公历日期', mono: true }, { key: 2, label: '含义' }],
      search: '输入节气名（立春）或月份过滤…', dense: true,
    },
    usage: `<ol><li>速查二十四节气的公历日期与含义。</li><li>搜索支持按节气名或关键词过滤。</li><li>农事安排、养生参考、传统文化学习常用。</li></ol>`,
    faq: [
      { q: '节气日期每年一样吗？', a: '基于太阳黄经计算，公历日期前后浮动 1-2 天；如立春在 2 月 3-5 日。' },
      { q: '节气是农历还是公历？', a: '节气按太阳位置确定（黄经），与公历对应稳定，是农历的阳历成分。' },
    ],
  },
  {
    slug: 'paper-sizes', name: '纸张尺寸速查',
    desc: '纸张尺寸速查：A/B/C 系列、开本、照片尺寸毫米对照表。',
    keywords: '纸张尺寸,a4尺寸,纸张大小,a4纸,开本尺寸,打印尺寸',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '规格' }, { key: 1, label: '尺寸(mm)', mono: true }, { key: 2, label: '用途' }],
      search: '输入规格（A4）或用途（打印）过滤…', dense: true,
    },
    usage: `<ol><li>速查纸张与照片尺寸（毫米）。</li><li>搜索支持按规格或用途过滤。</li><li>打印设置、设计排版、证件照尺寸常用。</li></ol>`,
    faq: [
      { q: 'A 系列纸张的规律？', a: 'A 系列长宽比 √2:1，对半裁切后仍是同比例；每大一号面积翻倍。' },
      { q: '正度/大度开本什么区别？', a: '正度（787×1092）与大度（889×1194）是印刷用纸规格，开本尺寸略有差异。' },
    ],
  },
  {
    slug: 'chinese-dynasties', name: '中国朝代年表',
    desc: '中国历史朝代顺序与时间年表：夏商周到民国，历史学习速查。',
    keywords: '朝代年表,中国朝代,历史朝代,朝代顺序,历史年表,中国历史',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '朝代' }, { key: 1, label: '时间', mono: true }, { key: 2, label: '备注' }],
      search: '输入朝代（唐）或时间过滤…', dense: true,
    },
    usage: `<ol><li>速查中国历代王朝时间与要点。</li><li>搜索支持按朝代名过滤。</li><li>历史学习、年代换算、文化常识速查。</li></ol>`,
    faq: [
      { q: '为什么有些年代重叠？', a: '三国、五代十国等分裂时期多个政权并存，年代有重叠属正常。' },
      { q: '公元前年代怎么算距今？', a: '公元前 221 年距今 = 当前年份 + 221；注意没有公元 0 年。' },
    ],
  },
  {
    slug: 'magic-numbers', name: '文件魔数识别',
    desc: '文件头魔数速查：PNG/JPEG/PDF/ZIP 等 30+ 格式的十六进制文件头。',
    keywords: '文件魔数,文件头,文件签名,十六进制文件头,文件格式识别,file signature',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '魔数(hex)', mono: true }, { key: 1, label: '格式' }],
      search: '输入魔数（8950）或格式（PDF）过滤…', dense: true,
    },
    usage: `<ol><li>速查常见文件格式的十六进制文件头（魔数）。</li><li>搜索支持按魔数或格式名过滤。</li><li>配合十六进制查看工具识别无扩展名文件的真实格式。</li></ol>`,
    faq: [
      { q: '什么是魔数？', a: '文件开头固定的几个字节，用于标识文件类型（如 PNG 固定 89 50 4E 47）。' },
      { q: '怎么用魔数识别文件？', a: '用十六进制工具查看文件头，对照本表即可判断真实格式，与扩展名无关。' },
    ],
  },
  {
    slug: 'regex-patterns', name: '常用正则表达式',
    desc: '常用正则表达式大全：邮箱、手机号、身份证、URL、IP 等 20 个可直接复制。',
    keywords: '正则表达式,常用正则,正则大全,regex,邮箱正则,手机号正则,身份证正则',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '正则', mono: true }, { key: 1, label: '用途' }],
      search: '输入正则或用途（邮箱）过滤…', dense: true,
    },
    usage: `<ol><li>速查常用正则表达式，点击复制直接使用。</li><li>搜索支持按正则或用途过滤。</li><li>表单校验、文本提取、数据清洗常用。</li></ol>`,
    faq: [
      { q: '正则一定准确吗？', a: '不同场景标准不同（如邮箱正则有多版）；建议按业务场景调整后充分测试。' },
      { q: '怎么测试正则？', a: '复制到本站“正则测试”工具，输入样例文本实时验证。' },
    ],
  },
  {
    slug: 'css-units', name: 'CSS 单位速查',
    desc: 'CSS 单位速查表：长度、视口、角度、时间、分辨率 24 种单位。',
    keywords: 'css单位,px rem em,视口单位,单位换算,长度单位,前端单位',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '单位', mono: true }, { key: 1, label: '说明' }],
      search: '输入单位（rem）或用途（视口）过滤…', dense: true,
    },
    usage: `<ol><li>速查 CSS 单位：长度、视口、角度、时间。</li><li>搜索支持按单位或用途过滤。</li><li>响应式布局、动画、打印样式常用。</li></ol>`,
    faq: [
      { q: 'px 和 rem 怎么选？', a: '固定尺寸用 px；需随根字号缩放的用 rem；组件内部相对缩放用 em。' },
      { q: 'vw/vh 和百分比什么区别？', a: 'vw/vh 相对视口（不受父级影响），% 相对父元素；全屏布局用 vh 更方便。' },
    ],
  },
  {
    slug: 'css-selectors', name: 'CSS 选择器速查',
    desc: 'CSS 选择器速查表：基础、属性、伪类、伪元素 37 种选择器。',
    keywords: 'css选择器,选择器速查,伪类,伪元素,选择器优先级,样式选择',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '选择器', mono: true }, { key: 1, label: '说明' }],
      search: '输入选择器（:hover）或用途（伪类）过滤…', dense: true,
    },
    usage: `<ol><li>速查 CSS 选择器：基础、属性、伪类、伪元素。</li><li>搜索支持按选择器或说明过滤。</li><li>精准定位元素、避免样式覆盖问题常用。</li></ol>`,
    faq: [
      { q: '选择器优先级怎么算？', a: 'id(100) > 类/属性/伪类(10) > 标签/伪元素(1)；!important 最高但慎用。' },
      { q: ':has() 有什么用？', a: '父选择器：选择“包含某子元素”的父元素，如 li:has(> a.active)，现代浏览器已支持。' },
    ],
  },
  {
    slug: 'geometry-formulas', name: '几何公式速查',
    desc: '数学几何公式速查：面积、体积、周长、三角定理 25 个常用公式。',
    keywords: '几何公式,面积公式,体积公式,数学公式,勾股定理,三角函数',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '名称' }, { key: 1, label: '公式', mono: true }],
      search: '输入名称（圆）或公式（πr）过滤…', dense: true,
    },
    usage: `<ol><li>速查几何公式：面积、体积、三角定理。</li><li>搜索支持按名称或公式过滤。</li><li>学习、工程计算、考试复习常用。</li></ol>`,
    faq: [
      { q: 'π 取多少？', a: '日常计算取 3.14 或 3.14159；精度要求高用 3.14159265358979。' },
      { q: '勾股定理适用条件？', a: '仅直角三角形：a²+b²=c²（c 为斜边）；非直角三角形用余弦定理。' },
    ],
  },
  {
    slug: 'food-calories', name: '食物热量速查',
    desc: '常见食物热量表：主食、肉类、水果、零食每 100 克热量参考。',
    keywords: '食物热量,卡路里表,食物卡路里,热量查询,减肥食物,热量表',
    category: 'ref', kind: 'table',
    table: {
      columns: [{ key: 0, label: '食物' }, { key: 1, label: '千卡/100g', mono: true }, { key: 2, label: '分类' }],
      search: '输入食物（米饭）或分类（水果）过滤…', dense: true,
    },
    usage: `<ol><li>速查常见食物每 100 克热量。</li><li>搜索支持按食物名或分类过滤。</li><li>减脂期记录饮食、营养参考常用。</li></ol>`,
    faq: [
      { q: '热量准确吗？', a: '为常见品种平均值，烹饪方式（油炸/清蒸）差异大；精确数值以包装营养表为准。' },
      { q: '100 克是多少？', a: '约一小碗米饭、一个中等苹果、一掌鸡胸肉的量级。' },
    ],
  },
];
