/* life/convert 分类补强 3 —— 全部为真实可用的健康与换算工具 */
export default [
  {
    slug: 'body-fat', name: '体脂率估算',
    desc: '体脂率估算（海军公式）：输入围度估算体脂率与评级。',
    keywords: '体脂率,体脂计算,海军公式,体脂估算,围度计算,健康指标',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'bodyFatCalc',
      inputs: [
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
        { label: '腰围（cm）', type: 'number', value: '80' },
        { label: '颈围（cm）', type: 'number', value: '38' },
        { label: '身高（cm）', type: 'number', value: '175' },
        { label: '臀围（cm，女性填）', type: 'number', value: '95' },
      ],
      hint: '海军体脂公式，误差 ±3%；男性不需臀围。',
    },
    usage: `<ol><li>测量并输入腰围、颈围、身高（女性加臀围）。</li><li>点击“计算”得到体脂率估算与评级。</li><li>健身监测、减脂进度评估参考。</li></ol>`,
    faq: [
      { q: '怎么量腰围？', a: '自然站立，呼气末绕肚脐水平一周；皮尺贴皮肤不勒紧。' },
      { q: '体脂率多少正常？', a: '男性健康 14-17%，女性 21-24%；运动员更低属正常。' },
    ],
  },
  {
    slug: 'standard-weight', name: '标准体重计算',
    desc: '标准体重计算：BMI 健康范围 + Broca/Devine 公式多维度参考。',
    keywords: '标准体重,理想体重,健康体重,bmi范围,体重计算,体重标准',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'standardWeightCalc',
      inputs: [
        { label: '身高（cm）', type: 'number', value: '175' },
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
      ],
      hint: '健康范围按中国标准 BMI 18.5-23.9 计算。',
    },
    usage: `<ol><li>输入身高与性别，点击“计算”。</li><li>得到 BMI 健康体重范围与多种公式参考值。</li><li>健身目标设定、体检对照常用。</li></ol>`,
    faq: [
      { q: '为什么不同公式结果不同？', a: '各公式假设不同（骨架、肌肉量），范围比单点更有参考价值。' },
      { q: '肌肉多体重超标正常吗？', a: '正常，BMI 不区分肌肉脂肪；结合体脂率综合判断。' },
    ],
  },
  {
    slug: 'body-measure', name: '三围比例参考',
    desc: '三围比例参考：按身高与性别估算美学比例（胸腰臀）。',
    keywords: '三围比例,标准三围,胸围腰围臀围,身材比例,形体参考',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'bodyMeasureCalc',
      inputs: [
        { label: '性别', type: 'select', options: [['female', '女'], ['male', '男']], value: 'female' },
        { label: '身高（cm）', type: 'number', value: '165' },
      ],
      hint: '为大众审美比例参考，健康第一。',
    },
    usage: `<ol><li>输入性别与身高，点击“计算”。</li><li>得到参考胸围、腰围、臀围。</li><li>健身塑形、服装定制参考。</li></ol>`,
    faq: [
      { q: '这是标准吗？', a: '不是硬标准，仅为常见美学比例；个体差异极大，无需强求。' },
      { q: '腰臀比更健康？', a: '健康维度看腰臀比（男<0.9 女<0.85），比三围绝对值更重要。' },
    ],
  },
  {
    slug: 'daily-calorie', name: '每日热量计算',
    desc: '每日热量需求：BMR + 活动系数估算维持/减脂/增肌热量。',
    keywords: '每日热量,热量需求,基础代谢,bmr,减脂热量,增肌热量',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'dailyCalorie',
      inputs: [
        { label: '体重（kg）', type: 'number', value: '70' },
        { label: '身高（cm）', type: 'number', value: '175' },
        { label: '年龄', type: 'number', value: '30' },
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
        { label: '活动量', type: 'select', options: [['1', '久坐'], ['2', '轻度'], ['3', '中度'], ['4', '高度'], ['5', '极高']], value: '3' },
      ],
      hint: 'Mifflin-St Jeor 公式；减脂建议 -300 千卡。',
    },
    usage: `<ol><li>输入身体数据与活动量，点击“计算”。</li><li>得到 BMR 与维持/减脂/增肌热量。</li><li>饮食计划、健身目标设定基础。</li></ol>`,
    faq: [
      { q: '减脂热量越低越好？', a: '不是，低于 BMR 会掉代谢；建议 TDEE-300 并保证蛋白质。' },
      { q: '和热量目标工具区别？', a: '功能相近，本工具更精简；两者可交叉验证。' },
    ],
  },
  {
    slug: 'pace-table', name: '跑步配速对照',
    desc: '跑步配速对照：距离+用时 → 配速、速度与马拉松预估。',
    keywords: '跑步配速,马拉松预估,配速对照,半马全马,跑步计算,比赛配速',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'paceTable',
      inputs: [
        { label: '距离（km）', type: 'number', value: '10', step: '0.1' },
        { label: '用时（时:分:秒）', type: 'text', value: '1:00:00' },
      ],
      hint: '时间格式：1:30:00（时分秒）或 30:00（分秒）。',
    },
    usage: `<ol><li>输入跑步距离与用时，点击“计算”。</li><li>得到配速、速度与半马/全马完赛预估。</li><li>制定训练目标、比赛配速策略常用。</li></ol>`,
    faq: [
      { q: '全马 3 小时配速多少？', a: '42.195km ÷ 3h ≈ 4分15秒/公里；用本工具可反推。' },
      { q: '能输入英里吗？', a: '当前按公里；英里×1.609 换算后输入。' },
    ],
  },
  {
    slug: 'quick-convert', name: '常用单位速换算',
    desc: '常用单位速换算：厘米英寸、公斤磅、公里英里、温度等一键互转。',
    keywords: '单位速算,厘米英寸,公斤磅,公里英里,摄氏华氏,单位转换',
    category: 'convert', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'quickConvert',
      inputs: [
        { label: '数值', type: 'number', value: '10', step: 'any' },
        { label: '从', type: 'select', options: [['cm', '厘米'], ['inch', '英寸'], ['kg', '千克'], ['lb', '磅'], ['km', '公里'], ['mile', '英里'], ['c', '摄氏度'], ['f', '华氏度'], ['m', '米'], ['ft', '英尺'], ['l', '升'], ['gal', '加仑'], ['hectare', '公顷'], ['acre', '英亩']], value: 'cm' },
        { label: '到', type: 'select', options: [['inch', '英寸'], ['cm', '厘米'], ['lb', '磅'], ['kg', '千克'], ['mile', '英里'], ['km', '公里'], ['f', '华氏度'], ['c', '摄氏度'], ['ft', '英尺'], ['m', '米'], ['gal', '加仑'], ['l', '升'], ['acre', '英亩'], ['hectare', '公顷']], value: 'inch' },
      ],
      hint: '覆盖长度/重量/距离/温度/体积/面积常用对。',
    },
    usage: `<ol><li>输入数值，选择源单位与目标单位，点击“计算”。</li><li>立即得到换算结果。</li><li>买鞋、看美标食谱、跑步换算等日常场景。</li></ol>`,
    faq: [
      { q: '支持所有组合吗？', a: '支持表内 14 个单位的常用组合（约 20 对）；其余用“单位换算”全量工具。' },
      { q: '温度怎么换算？', a: '选摄氏→华氏或反向即可，自动用公式换算。' },
    ],
  },
  {
    slug: 'weekday-calc', name: '日期星期查询',
    desc: '日期星期查询：输入日期得星期、年中第几天、第几周。',
    keywords: '星期查询,日期星期,第几周,年中第几天,星期几,日历计算',
    category: 'date', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'weekdayCalc',
      inputs: [{ label: '日期', type: 'date', value: '2026-09-05' }],
      hint: '输出星期、一年中第几天、第几周与闰年信息。',
    },
    usage: `<ol><li>选择日期，点击“计算”。</li><li>得到星期、年中天数、周数与闰年判断。</li><li>排期规划、纪念日查询、日期分析常用。</li></ol>`,
    faq: [
      { q: '和日期计算器重复吗？', a: '本工具聚焦“星期/周数”信息；日期差与加减用“日期计算器”。' },
      { q: '周数按什么标准？', a: '按自然周（第 N 周 = 天数÷7 向上取整），非 ISO 周。' },
    ],
  },
  {
    slug: 'zodiac-age', name: '生肖年龄速查',
    desc: '生肖年龄速查：输入出生年份得生肖、周岁与虚岁。',
    keywords: '生肖年龄,年龄生肖,周岁虚岁,属相查询,年龄计算,属相年龄',
    category: 'date', kind: 'calc',
    calc: {
      lib: 'life2', fn: 'zodiacAgeCalc',
      inputs: [
        { label: '出生年份', type: 'number', value: '1995' },
        { label: '参考年份', type: 'number', value: '2026' },
      ],
      hint: '默认参考今年；生肖按农历年份简化对应。',
    },
    usage: `<ol><li>输入出生年份（与参考年份），点击“计算”。</li><li>得到生肖、周岁与虚岁。</li><li>填写资料、传统文化交流常用。</li></ol>`,
    faq: [
      { q: '周岁虚岁怎么算？', a: '周岁=参考年-出生年；虚岁=周岁+1（传统出生算 1 岁）。' },
      { q: '春节前出生生肖？', a: '本工具按公历年份简化；精确生肖以农历正月初一划分。' },
    ],
  },
];
