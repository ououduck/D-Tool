/* convert/math/date/dev/life 补强 3 —— 全部为真实可用的计算工具，手写说明与 FAQ */
export default [
  {
    slug: 'shoe-size', name: '鞋码换算',
    desc: '鞋码换算器：脚长厘米与欧码、中国码、美码、英码互算，买鞋参考。',
    keywords: '鞋码换算,鞋码对照,脚长换算,欧码美码,买鞋尺码,鞋码查询',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'shoeSizeCalc',
      inputs: [
        { label: '脚长（cm）', type: 'number', value: '25', step: '0.5' },
        { label: '输入方式', type: 'select', options: [['cm', '脚长厘米'], ['eu', '欧码']], value: 'cm' },
      ],
      hint: '输入脚长自动对照欧码/中国码/美码/英码；不同品牌有偏差。',
    },
    usage: `<ol>
  <li>测量脚长（脚跟到最长脚趾），输入厘米数，点击“计算”。</li>
  <li>一次得到欧码、中国码、男女美码与英码对照。</li>
  <li>海淘买鞋、代购尺码换算必备。</li>
</ol>`,
    faq: [
      { q: '怎么量脚长？', a: '赤脚踩纸，标记脚跟与最长脚趾，量两点距离；建议下午量（脚会微胀）。' },
      { q: '为什么同一码不同品牌差很多？', a: '鞋楦宽度、版型不同导致实际内长差异，运动鞋/皮鞋/高跟鞋各有偏码。' },
    ],
  },
  {
    slug: 'clothes-size', name: '衣服尺码推荐',
    desc: '衣服尺码推荐：输入身高体重与性别，估算 S-XXL 建议尺码。',
    keywords: '衣服尺码,尺码推荐,身高体重尺码,衣服码数,买衣服尺码,S M L XL',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'clothesSizeCalc',
      inputs: [
        { label: '身高（cm）', type: 'number', value: '175' },
        { label: '体重（kg）', type: 'number', value: '70' },
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
      ],
      hint: '按身高定基础码、BMI 修正；版型差异大，网购前看尺码表更准。',
    },
    usage: `<ol>
  <li>输入身高、体重与性别，点击“计算”。</li>
  <li>得到建议尺码（S-XXL）与对应 BMI。</li>
  <li>作为参考快速定位尺码区间，再对照商家尺码表确认。</li>
</ol>`,
    faq: [
      { q: '网上买衣服选什么码？', a: '先看商品页尺码表（胸围/肩宽/衣长），结合本工具估算后选最接近的。' },
      { q: '修身和宽松版怎么选？', a: '修身按估算码或小一码；宽松款可大一码；模特穿着效果仅供参考。' },
    ],
  },
  {
    slug: 'gold-karat', name: 'K 金纯度换算',
    desc: 'K 金纯度换算：24K/18K/14K 等含金量百分比换算，买金饰参考。',
    keywords: 'k金纯度,含金量,24k,18k金,黄金纯度,足金,金饰',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'goldKaratCalc',
      inputs: [{ label: 'K 数（1-24）', type: 'number', value: '18' }],
      hint: '纯度 = K数 ÷ 24 × 100%；24K 足金、18K 含金 75%。',
    },
    usage: `<ol>
  <li>输入 K 数（如 18、24、14），点击“计算”。</li>
  <li>得到含金量百分比、千分数与常见叫法。</li>
  <li>买金饰、回收估价时对照纯度。</li>
</ol>`,
    faq: [
      { q: '18K 和 24K 哪个好？', a: '24K 足金纯度高但软，易变形；18K（75%）硬度好，适合镶嵌与日常佩戴。' },
      { q: '千足金/万足金是什么？', a: '千足金=99.9%（已规范为“足金”），万足金≈99.99%；国标 2016 年后统一称足金。' },
    ],
  },
  {
    slug: 'aspect-ratio', name: '屏幕长宽比计算',
    desc: '屏幕长宽比计算：宽高像素求最简比例（16:9、4:3 等），设计切图常用。',
    keywords: '长宽比,宽高比,16比9,4比3,屏幕比例,图片比例,aspect ratio',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'aspectRatioCalc',
      inputs: [
        { label: '宽（像素）', type: 'number', value: '1920' },
        { label: '高（像素）', type: 'number', value: '1080' },
      ],
      hint: '如 1920×1080 → 16:9；支持任意宽高。',
    },
    usage: `<ol>
  <li>输入图片/屏幕的宽与高（像素），点击“计算”。</li>
  <li>得到最简整数比例与宽高比值。</li>
  <li>设计切图、视频制作、海报排版常用。</li>
</ol>`,
    faq: [
      { q: '1920×1080 为什么是 16:9？', a: '1920 和 1080 的最大公约数是 120，各除以 120 得 16 和 9。' },
      { q: '非整数比例怎么办？', a: '取整近似，如 1.414:1 显示为约 99:70；比值列给出精确小数。' },
    ],
  },
  {
    slug: 'quadratic', name: '一元二次方程',
    desc: '一元二次方程求解器：ax²+bx+c=0 的根、判别式与顶点坐标一键计算。',
    keywords: '二次方程,一元二次,方程求解,判别式,求根公式,数学求解',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'quadraticCalc',
      inputs: [
        { label: 'a（x² 系数）', type: 'number', value: '1' },
        { label: 'b（x 系数）', type: 'number', value: '-5' },
        { label: 'c（常数项）', type: 'number', value: '6' },
      ],
      hint: '求根公式：x = (-b ± √(b²-4ac)) / 2a；判别式 Δ=b²-4ac。',
    },
    usage: `<ol>
  <li>输入 a、b、c 三个系数，点击“计算”。</li>
  <li>输出判别式、两个根（或无实数根提示）、顶点坐标与开口方向。</li>
  <li>数学学习、物理抛物运动、工程计算常用。</li>
</ol>`,
    faq: [
      { q: 'Δ<0 怎么办？', a: '无实数根，方程在实数范围内无解；复数根需专业工具。' },
      { q: 'a=0 会怎样？', a: '退化为一次方程，本工具提示 a 不能为 0。' },
    ],
  },
  {
    slug: 'vector-calc', name: '向量计算器',
    desc: '二维向量计算：模长、点积、夹角、加减法一键计算。',
    keywords: '向量计算,向量模长,点积,向量夹角,向量加减,数学向量',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'vectorCalc',
      inputs: [
        { label: '向量 a 的 x', type: 'number', value: '3' },
        { label: '向量 a 的 y', type: 'number', value: '4' },
        { label: '向量 b 的 x', type: 'number', value: '1' },
        { label: '向量 b 的 y', type: 'number', value: '0' },
      ],
      hint: '输出两向量的模长、点积、夹角与加减结果。',
    },
    usage: `<ol>
  <li>输入两个二维向量的 x、y 分量，点击“计算”。</li>
  <li>得到模长、点积、夹角（度）与 a±b。</li>
  <li>物理力学分解、计算机图形学、数学学习常用。</li>
</ol>`,
    faq: [
      { q: '夹角公式是什么？', a: 'cosθ = (a·b) / (|a|×|b|)，θ 为两向量夹角（0-180°）。' },
      { q: '点积为 0 说明什么？', a: '两向量垂直（正交），这是判断垂直的常用方法。' },
    ],
  },
  {
    slug: 'spring-festival', name: '春节日期查询',
    desc: '春节（农历新年）日期查询：1990-2049 年春节公历日期与生肖。',
    keywords: '春节日期,春节查询,农历新年,大年初一,春节几号,过年时间',
    category: 'date', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'springFestivalCalc',
      inputs: [{ label: '年份', type: 'number', value: '2026' }],
      hint: '覆盖 1990-2049 年春节（正月初一）的公历日期。',
    },
    usage: `<ol>
  <li>输入年份，点击“计算”。</li>
  <li>得到春节公历日期、星期与当年生肖。</li>
  <li>安排春节假期、订票、排期常用。</li>
</ol>`,
    faq: [
      { q: '为什么春节日期每年不同？', a: '农历是阴阳合历，春节在公历 1 月 21 日-2 月 20 日之间浮动。' },
      { q: '能查其他农历节日吗？', a: '暂仅支持春节；元宵、中秋等需完整农历转换算法。' },
    ],
  },
  {
    slug: 'json-yaml', name: 'JSON 转 YAML',
    desc: 'JSON 转 YAML 配置：粘贴 JSON 一键生成 YAML 缩进格式。',
    keywords: 'json转yaml,yaml转换,配置转换,json格式化,yaml生成',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'convert3', actions: [{ label: '转换', fn: 'jsonToYaml' }],
      placeholder: '粘贴 JSON，如 {"name":"x","age":18}', outLabel: 'YAML',
    },
    usage: `<ol>
  <li>粘贴 JSON，点击“转换”。</li>
  <li>生成缩进格式的 YAML 配置。</li>
  <li>Docker Compose、CI 配置、K8s 清单转写常用。</li>
</ol>`,
    faq: [
      { q: '嵌套对象支持吗？', a: '支持，任意深度嵌套与数组都会转成 YAML 缩进结构。' },
      { q: '字符串什么时候加引号？', a: '含特殊字符（冒号空格、# 等）的字符串自动加引号，保证合法。' },
    ],
  },
  {
    slug: 'code-stats', name: '代码行数统计',
    desc: '代码行数统计：总行数、代码行、注释行、空行分类统计。',
    keywords: '代码行数,统计代码,loc,代码统计,注释统计,项目行数',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'convert3', actions: [{ label: '统计', fn: 'codeStats' }],
      multi: true,
      placeholder: '粘贴代码（支持 JS/Python/CSS 等常见注释）', outLabel: '统计结果',
    },
    usage: `<ol>
  <li>粘贴代码，点击“统计”。</li>
  <li>输出总行数、代码行、注释行与空行。</li>
  <li>汇报工作量、评估代码规模时快速统计。</li>
</ol>`,
    faq: [
      { q: '注释识别规则？', a: '识别 //、#、/* */、*、<!-- --> 开头的行；行内尾注释计入代码行。' },
      { q: '能统计整个项目吗？', a: '需手动合并文件内容后粘贴；超大数据建议分批。' },
    ],
  },
  {
    slug: 'bracket-check', name: '括号匹配检查',
    desc: '括号匹配检查：检测 ()、[]、{}、中文括号是否配对闭合。',
    keywords: '括号匹配,括号检查,括号校验,代码检查,括号配对,语法检查',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'convert3', actions: [{ label: '检查', fn: 'bracketCheck' }],
      placeholder: '粘贴含括号的代码或文本', outLabel: '检查结果',
    },
    usage: `<ol>
  <li>粘贴代码，点击“检查”。</li>
  <li>检测 () [] {} 及中文括号的配对与闭合。</li>
  <li>发现未闭合或错配时提示具体行号。</li>
</ol>`,
    faq: [
      { q: '能检查字符串里的括号吗？', a: '不区分字符串/注释，全部按括号字符检查；含括号字符串可能误报。' },
      { q: '中文括号也检查吗？', a: '检查《》「」『』等常见中文成对符号。' },
    ],
  },
  {
    slug: 'version-compare', name: '版本号比较',
    desc: '版本号比较：比较两个 semver 版本号大小（如 1.2.3 vs 1.10.0）。',
    keywords: '版本比较,版本号,版本对比,semver,版本大小,版本判断',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'versionCompare',
      inputs: [
        { label: '版本 A', type: 'text', value: '1.2.3' },
        { label: '版本 B', type: 'text', value: '1.10.0' },
      ],
      hint: '按主版本.次版本.修订号逐段比较，支持 v 前缀。',
    },
    usage: `<ol>
  <li>输入两个版本号（支持 v 前缀与多段数字），点击“计算”。</li>
  <li>输出 A > B / A < B / A = B。</li>
  <li>判断依赖版本、升级检查、接口兼容性常用。</li>
</ol>`,
    faq: [
      { q: '1.10.0 比 1.2.0 大吗？', a: '大。按段比较：1=1，然后 10>2，所以 1.10.0 > 1.2.0。' },
      { q: '支持预发布后缀吗？', a: '暂不支持 -alpha/-beta 后缀，只比较数字段。' },
    ],
  },
  {
    slug: 'income-tax', name: '个人所得税计算器',
    desc: '个人所得税计算器：综合所得年度汇算，含专项附加扣除估算。',
    keywords: '个税计算,个人所得税,个税计算器,工资个税,年度汇算,税率表',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'convert3', fn: 'incomeTaxCalc',
      inputs: [
        { label: '年收入（元）', type: 'number', value: '200000' },
        { label: '专项附加扣除（元/年）', type: 'number', value: '0' },
      ],
      hint: '按综合所得 7 级超额累进税率估算；五险一金未计入，实际以税务系统为准。',
    },
    usage: `<ol>
  <li>输入年收入与专项附加扣除（子女教育、房贷、赡养老人等合计），点击“计算”。</li>
  <li>得到应纳税所得额、税率、全年税额与月均税额。</li>
  <li>仅供参考，汇算清缴以个税 APP 为准。</li>
</ol>`,
    faq: [
      { q: '起征点是多少？', a: '每月 5000 元，即年 6 万元；超过部分按 3%-45% 七级累进。' },
      { q: '专项附加扣除有哪些？', a: '子女教育、继续教育、大病医疗、住房贷款利息、住房租金、赡养老人、3 岁以下婴幼儿照护。' },
    ],
  },
];
