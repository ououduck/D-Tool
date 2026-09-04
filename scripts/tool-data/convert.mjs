/* convert（转换计算）分类工具定义 —— 全部为真实可用的换算工具，手写说明与 FAQ */
export default [
  {
    slug: 'percent-calc', name: '百分比计算器',
    desc: '百分比计算：求一个数的百分比、占比、变化率，一键出结果。',
    keywords: '百分比计算器,百分比计算,占比计算,变化率,百分之几,百分数',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'percentOf',
      inputs: [
        { label: '数值', value: '200' },
        { label: '百分比（%）', value: '15' },
      ],
      hint: '如 200 的 15% = 30；求占比（部分÷总数）可用“占比计算”功能。',
    },
    usage: `<ol>
  <li>输入数值与百分比，点击“计算”。</li>
  <li>结果即“数值 × 百分比 ÷ 100”，如 200 的 15% = 30。</li>
  <li>求“某数是总数的百分之几”请用占比计算工具。</li>
</ol>`,
    faq: [
      { q: '怎么求一个数占总数的百分比？', a: '用本工具的“占比”模式：部分 ÷ 总数 × 100%，如 30/200 = 15%。' },
      { q: '支持小数吗？', a: '支持，输入 12.5% 这样的小数百分比也能正确计算。' },
    ],
  },
  {
    slug: 'percent-change', name: '百分比变化率',
    desc: '计算两个数值之间的变化量与变化率（涨跌幅），投资与数据分析常用。',
    keywords: '百分比变化,变化率计算,涨跌幅,环比,同比,增长率',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'percentChange',
      inputs: [
        { label: '原值', value: '100' },
        { label: '新值', value: '120' },
      ],
      hint: '输出变化量（新值-原值）与变化率（变化量÷原值×100%）。',
    },
    usage: `<ol>
  <li>输入原值（基准值）与新值，点击“计算”。</li>
  <li>得到绝对变化量与相对变化率，如 100→120 变化率 +20%。</li>
  <li>计算涨跌幅、业绩环比、价格波动率都适用。</li>
</ol>`,
    faq: [
      { q: '原值可以为 0 吗？', a: '不能。原值为 0 时变化率无定义（任何数÷0 都是无穷大），工具会提示“原值不能为 0”。' },
      { q: '负值怎么处理？', a: '原值或新值为负时按公式正常计算，变化率会给出带正负号的结果。' },
    ],
  },
  {
    slug: 'discount-calc', name: '折扣计算器',
    desc: '折扣计算：输入原价与折扣，一键得出折后价、节省金额与比例。',
    keywords: '折扣计算器,打折计算,优惠计算,折后价,省钱计算,折扣工具',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'discountCalc',
      inputs: [
        { label: '原价（元）', value: '199' },
        { label: '折扣（%，如 8 折=80）', value: '80' },
      ],
      hint: '折扣填 0-100：80 表示八折（付 80%）、50 表示五折。',
    },
    usage: `<ol>
  <li>输入商品原价与折扣（8 折填 80），点击“计算”。</li>
  <li>输出折后价、节省金额与节省比例。</li>
  <li>促销比价、凑单决策时快速算清实际支出。</li>
</ol>`,
    faq: [
      { q: '“8 折”应该填 80 还是 0.8？', a: '填 80（百分比）。工具按 原价 × 折扣% 计算，8 折 = 原价 × 80%。' },
      { q: '折扣能超过 100 吗？', a: '不能，范围 0-100；超过 100 相当于加价，工具会提示。' },
    ],
  },
  {
    slug: 'ratio-calc', name: '比例计算器',
    desc: '比例计算：a:b = c:x 求未知项，配方、缩放、汇率折算都能用。',
    keywords: '比例计算,比例求解,等比计算,未知项,a:b=c:d,配方比例',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'ratioCalc',
      inputs: [
        { label: 'a', value: '2' },
        { label: 'b', value: '6' },
        { label: 'c', value: '3' },
      ],
      hint: '解 a:b = c:x，即 x = b × c ÷ a。',
    },
    usage: `<ol>
  <li>输入比例 a:b = c:x 中的 a、b、c，点击“计算”。</li>
  <li>工具按 x = b × c ÷ a 求出未知项 x。</li>
  <li>适合配方缩放、图片等比缩放、汇率折算等场景。</li>
</ol>`,
    faq: [
      { q: '公式原理是什么？', a: '比例性质：a:b = c:x 等价于 a×x = b×c，所以 x = b×c÷a。' },
      { q: 'a 或 c 为 0 怎么办？', a: '0 会使比例失去意义，工具会提示；请检查输入。' },
    ],
  },
  {
    slug: 'scientific-notation', name: '科学计数法',
    desc: '数字与科学计数法互转：显示科学计数法、工程计数法、指数形式。',
    keywords: '科学计数法,科学记数法,工程计数法,指数形式,大数转换,科学技术法',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'scientificNotation',
      inputs: [{ label: '数字', value: '123456789' }],
      hint: '支持超大数（如 1e30）与极小小数（如 0.0000001）。',
    },
    usage: `<ol>
  <li>输入一个数字（可含小数、科学计数法形式），点击“计算”。</li>
  <li>输出科学计数法（1.234568 × 10^8）、工程计数法（123.4568 × 10^6）与指数形式。</li>
  <li>适合天文、物理、金融大数场景的数值表达。</li>
</ol>`,
    faq: [
      { q: '工程计数法和科学计数法什么区别？', a: '科学计数法指数任意整数；工程计数法指数是 3 的倍数（方便加单位词头 k/M/G），日常读数字更友好。' },
      { q: '能输入 1e30 吗？', a: '可以，JS 支持指数形式输入，会自动解析。' },
    ],
  },
  {
    slug: 'fraction-decimal', name: '分数小数互转',
    desc: '分数与小数互转：分数化小数/百分数/最简分数，小数化分数。',
    keywords: '分数转小数,小数转分数,分数计算器,最简分数,百分数转换,分数化简',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'fractionToDecimal',
      inputs: [
        { label: '分子', value: '1' },
        { label: '分母', value: '4' },
      ],
      hint: '输出小数、百分数、最简分数与带分数；用“小数→分数”模式反向转换。',
    },
    usage: `<ol>
  <li>输入分子与分母，点击“计算”，得到小数、百分数、最简分数。</li>
  <li>负数与假分数（如 7/4）也能正确处理，输出带分数。</li>
  <li>教学、配方换算、工程计算常用。</li>
</ol>`,
    faq: [
      { q: '1/4 和 0.25 完全等价吗？', a: '数学上等价；本工具同时给出小数、百分数（25%）与最简分数（1/4）。' },
      { q: '分母能为 0 吗？', a: '不能，除零无意义，工具会提示“分母不能为 0”。' },
    ],
  },
  {
    slug: 'decimal-fraction', name: '小数转分数',
    desc: '小数化分数：把有限小数转换为最简分数，自动约分。',
    keywords: '小数转分数,小数化分数,分数转换,最简分数,0.75转分数',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'decimalToFraction',
      inputs: [{ label: '小数', value: '0.75' }],
      hint: '支持负数；0.75 → 3/4。',
    },
    usage: `<ol>
  <li>输入有限小数（如 0.75、-2.5），点击“计算”。</li>
  <li>输出最简分数形式，自动约分。</li>
  <li>适合食谱配方、工程尺寸标注等分数场景。</li>
</ol>`,
    faq: [
      { q: '无限循环小数能转吗？', a: '不能精确转。输入按有限小数处理（如 0.333 转 333/1000）；循环小数需要代数方法，本工具不支持。' },
      { q: '整数输入会怎样？', a: '整数直接提示“本身就是整数”，不需要转换。' },
    ],
  },
  {
    slug: 'significant-figures', name: '有效数字',
    desc: '按指定位数保留有效数字，科学计算与实验数据处理常用。',
    keywords: '有效数字,有效位数,保留位数,科学计数法保留,精度控制',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'significantFigures',
      inputs: [
        { label: '数字', value: '12345.6789' },
        { label: '有效位数', value: '3' },
      ],
      hint: '有效数字从第一个非零数字开始计，如 0.001234 保留 2 位 = 0.0012。',
    },
    usage: `<ol>
  <li>输入数字与要保留的有效位数（1-15），点击“计算”。</li>
  <li>输出四舍五入后的数值与科学计数法形式。</li>
  <li>物理、化学实验记录测量结果时规范表达精度。</li>
</ol>`,
    faq: [
      { q: '有效数字和保留小数位有什么区别？', a: '有效数字从第一个非零位算起（12345 保留 3 位 = 12300），保留小数位固定在小数点后（12345.679 保留 3 位小数）。两者在不同场景各有用途。' },
      { q: '0 开头的小数怎么算？', a: '前导零不算有效数字：0.001234 的有效数字从 1 开始。' },
    ],
  },
  {
    slug: 'px-rem-convert', name: 'px/rem/em 换算',
    desc: '像素单位换算：px 与 rem、em、pt、vw 互转，前端开发常用。',
    keywords: 'px转rem,rem换算,px em换算,字体单位换算,前端单位转换,px转vw',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'pxConvert',
      inputs: [
        { label: 'px 值', value: '16' },
        { label: '根字号（px，默认 16）', value: '16' },
      ],
      hint: 'rem 基于根字号（html），em 基于父级字号（按 16px 估算）。',
    },
    usage: `<ol>
  <li>输入像素值与根字号（一般 16px），点击“计算”。</li>
  <li>输出 rem（除以根字号）、em（除以 16）、pt 与 1920 视口的 vw 值。</li>
  <li>写响应式 CSS、设计稿转代码时快速换算。</li>
</ol>`,
    faq: [
      { q: 'rem 和 em 的区别？', a: 'rem 始终相对根元素（html）字号；em 相对父元素字号，会随嵌套累加。本工具 em 按父级 16px 估算。' },
      { q: 'vw 按什么视口算？', a: '默认按 1920px 宽度计算（1vw = 视口宽 1%）；实际值取决于用户屏幕，需自行调整。' },
    ],
  },
  {
    slug: 'ppi-calc', name: 'PPI 像素密度计算',
    desc: '屏幕 PPI 计算：由分辨率与对角线尺寸算出像素密度与物理尺寸。',
    keywords: 'ppi计算,像素密度,屏幕密度,分辨率计算,视网膜屏,retina',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'ppiCalc',
      inputs: [
        { label: '宽（像素）', value: '1920' },
        { label: '高（像素）', value: '1080' },
        { label: '对角线（英寸）', value: '24' },
      ],
      hint: 'PPI = √(宽²+高²) ÷ 对角线英寸数。',
    },
    usage: `<ol>
  <li>输入屏幕分辨率（宽×高像素）与对角线尺寸（英寸），点击“计算”。</li>
  <li>输出 PPI、物理宽高尺寸。</li>
  <li>挑选显示器、对比手机清晰度时判断细腻程度。</li>
</ol>`,
    faq: [
      { q: 'PPI 多少算清晰？', a: '一般 200+ 可接受，300+（Retina 级别）肉眼难辨像素；同样 PPI 下观看距离越远越显清晰。' },
      { q: '2K/4K 显示器的 PPI 怎么算？', a: '2K（2560×1440）27 英寸约 109 PPI，4K（3840×2160）27 英寸约 163 PPI；填入对应数值即可。' },
    ],
  },
  {
    slug: 'screen-size', name: '屏幕尺寸计算',
    desc: '由对角线尺寸与长宽比计算屏幕宽高与面积，选购显示器时参考。',
    keywords: '屏幕尺寸,显示器尺寸,长宽比,16比9,屏幕宽高,显示器计算',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'screenSizeCalc',
      inputs: [
        { label: '对角线（英寸）', value: '27' },
        { label: '长宽比（宽）', value: '16' },
        { label: '长宽比（高）', value: '9' },
      ],
      hint: '常见长宽比：16:9、16:10、4:3、21:9。',
    },
    usage: `<ol>
  <li>输入显示器对角线英寸数与长宽比，点击“计算”。</li>
  <li>输出实际宽、高（英寸）与可视面积。</li>
  <li>比较不同尺寸与比例显示器的大小差异。</li>
</ol>`,
    faq: [
      { q: '27 寸 16:9 和 24 寸 16:10 哪个大？', a: '输入两组参数分别计算面积即可对比；同对角线 16:10 高度更大但宽度更小。' },
      { q: '宽高怎么算出来的？', a: '由勾股定理：宽 = 对角线 × 比例宽 ÷ √(宽²+高²)，高同理。' },
    ],
  },
  {
    slug: 'bill-split', name: 'AA 账单分摊',
    desc: '聚餐 AA 分摊计算：总金额、人数、小费比例 → 人均应付。',
    keywords: 'aa分摊,账单分摊,AA制,人均消费,小费计算,聚餐计算器',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'billSplit',
      inputs: [
        { label: '总金额（元）', value: '456' },
        { label: '人数', value: '4' },
        { label: '小费/服务费（%）', value: '0' },
      ],
      hint: '小费填 0-100，如服务费 10% 填 10。',
    },
    usage: `<ol>
  <li>输入账单总金额、分摊人数与可选的小费比例，点击“计算”。</li>
  <li>输出小费金额、总支付额与人均应付。</li>
  <li>聚餐、旅行拼房、团购分摊都适用。</li>
</ol>`,
    faq: [
      { q: '怎么处理某人不吃某些菜？', a: '本工具按平均分摊；有差异时建议先减去对应金额再输入总数。' },
      { q: '小费比例含税吗？', a: '小费按总金额 × 比例计算，不含税；含税场景请先输入含税总额。' },
    ],
  },
  {
    slug: 'percent-error', name: '百分比误差',
    desc: '计算测量值与真实值的相对误差百分比，实验数据评估常用。',
    keywords: '百分比误差,相对误差,误差计算,测量误差,实验误差',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'percentError',
      inputs: [
        { label: '测量值', value: '98' },
        { label: '真实值', value: '100' },
      ],
      hint: '误差 = |测量值-真实值| ÷ |真实值| × 100%。',
    },
    usage: `<ol>
  <li>输入测量值与真实值（理论值），点击“计算”。</li>
  <li>输出相对误差百分比。</li>
  <li>物理实验、仪器校准、生产质量评估常用。</li>
</ol>`,
    faq: [
      { q: '误差和偏差一样吗？', a: '相对误差是误差与真实值的比值；偏差通常指与平均值的差，概念不同。' },
      { q: '真实值为 0 怎么办？', a: '真实值为 0 时相对误差无定义，工具会提示；此时应使用绝对误差。' },
    ],
  },
  {
    slug: 'fuel-convert', name: '油耗换算',
    desc: '百公里油耗与 mpg 油耗单位互转：L/100km、mpg、km/L 一键换算。',
    keywords: '油耗换算,百公里油耗,mpg换算,升每百公里,油耗计算,英里加仑',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'fuelConvert',
      inputs: [
        { label: '数值', value: '8' },
        { label: '输入单位', type: 'select', options: [['l100', '升/100公里'], ['mpg', '英里/加仑(美)']], value: 'l100' },
      ],
      hint: 'L/100km 与 mpg 是倒数关系：8 L/100km ≈ 29.4 mpg(美)。',
    },
    usage: `<ol>
  <li>输入油耗数值并选择单位（L/100km 或 mpg），点击“计算”。</li>
  <li>输出三种油耗单位对照。</li>
  <li>看海外评测（mpg）或国内标称（L/100km）时快速换算。</li>
</ol>`,
    faq: [
      { q: '为什么 mpg 越大越省油？', a: 'mpg = 每加仑英里数，数值越大说明一加仑油跑得越远，越省油；而 L/100km 数值越小越省油，两者方向相反。' },
      { q: '美制与英制加仑一样吗？', a: '不一样（美制 3.785L、英制 4.546L）；本工具默认美制 mpg，与主流汽车媒体一致。' },
    ],
  },
  {
    slug: 'number-english', name: '数字转英文',
    desc: '整数与小数的英文读法（含分数部分），支票、发票、英文文书场景。',
    keywords: '数字转英文,英文数字,英文读法,支票大写,number to english,英文金额',
    category: 'convert', kind: 'transform',
    transform: {
      lib: 'convert-extra', actions: [{ label: '转换', fn: 'numberToEnglish' }],
      placeholder: '输入数字，如 1234.56', outLabel: '英文读法',
    },
    usage: `<ol>
  <li>输入数字（支持负数与两位小数），点击“转换”。</li>
  <li>整数部分用英文读法（thousand/million…），小数部分以分数形式输出。</li>
  <li>填写英文支票、发票、合同金额时规范表达。</li>
</ol>`,
    faq: [
      { q: '小数部分怎么读？', a: '按百分比分数读：1234.56 → one thousand two hundred thirty-four and 56/100，符合英文支票写法。' },
      { q: '最大支持多大数字？', a: '支持到 quadrillion（10¹⁵）量级，更大数值请用科学计数法工具。' },
    ],
  },
  {
    slug: 'temp-quick', name: '摄氏度换算',
    desc: '摄氏度与华氏度、开尔文快速换算，温度单位三向对照。',
    keywords: '摄氏度华氏度,温度换算,摄氏转华氏,开尔文,温度转换,℃℉',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'tempConvert',
      inputs: [{ label: '摄氏度（℃）', value: '100' }],
      hint: '更多温度单位（含华氏/开尔文输入）见“单位换算”工具。',
    },
    usage: `<ol>
  <li>输入摄氏度数值，点击“计算”。</li>
  <li>输出华氏度（F = C×9/5+32）与开尔文（K = C+273.15）。</li>
  <li>烹饪、天气、科学实验场景快速对照。</li>
</ol>`,
    faq: [
      { q: '华氏度怎么读？', a: 'F = C × 9/5 + 32，如 100°C = 212°F（水的沸点）。' },
      { q: '0K 是什么概念？', a: '0K（绝对零度）是理论上最低温度，等于 -273.15°C，此时分子热运动停止。' },
    ],
  },
  {
    slug: 'km-miles', name: '公里英里换算',
    desc: '公里与英里、千米与海里快速互转，跑步与自驾换算常用。',
    keywords: '公里英里,km英里,英里换算,千米海里,跑步距离换算,英里公里',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'convert-extra', fn: 'kmMiles',
      inputs: [
        { label: '数值', value: '5' },
        { label: '输入单位', type: 'select', options: [['km', '公里'], ['mi', '英里']], value: 'km' },
      ],
      hint: '1 英里 = 1.609344 公里；更多长度单位见“单位换算”。',
    },
    usage: `<ol>
  <li>输入数值，选择输入单位（公里或英里），点击“计算”。</li>
  <li>输出对应公里/英里对照。</li>
  <li>海外跑步配速、自驾里程估算、地图距离换算常用。</li>
</ol>`,
    faq: [
      { q: '马拉松 42.195 公里是几英里？', a: '约 26.22 英里，对应英文 marathon 的 26.2 英里说法。' },
      { q: '海里和英里一样吗？', a: '不一样：1 海里 = 1.852 公里（用于航海/航空），1 英里 = 1.609 公里。' },
    ],
  },
];
