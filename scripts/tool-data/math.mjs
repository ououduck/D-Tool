/* math（数学计算）分类工具定义 —— 全部为真实可用的计算工具，手写说明与 FAQ */
export default [
  {
    slug: 'prime-check', name: '质数判断',
    desc: '质数判断与质因数分解：输入整数即得是否质数、因数列表与分解式。',
    keywords: '质数判断,质数,素数,质因数分解,因数,素数检测',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'primeCheck',
      inputs: [{ label: '整数（≥2）', type: 'number', value: '97' }],
      hint: '输出是否为质数、质因数分解式、因数个数与全部因数。',
    },
    usage: `<ol>
  <li>输入一个 ≥2 的整数，点击“计算”。</li>
  <li>得到是否为质数、质因数分解（如 84 = 2×2×3×7）与完整因数列表。</li>
  <li>密码学、数论学习、分数约分时常用。</li>
</ol>`,
    faq: [
      { q: '1 是质数吗？', a: '不是。质数定义为“大于 1 且只有 1 和自身两个因数”的自然数，1 只有 1 个因数。' },
      { q: '大数判断快吗？', a: '使用试除法（到 √n），万级以下瞬间完成；超大数（10¹⁸ 以上）建议用专业工具。' },
    ],
  },
  {
    slug: 'gcd-lcm', name: '最大公约数/最小公倍数',
    desc: 'GCD/LCM 计算：两数的最大公约数与最小公倍数一键算出。',
    keywords: '最大公约数,最小公倍数,gcd,lcm,公约数,公倍数,约分',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'gcdLcmCalc',
      inputs: [
        { label: '数字 A', type: 'number', value: '12' },
        { label: '数字 B', type: 'number', value: '18' },
      ],
      hint: 'GCD(12,18)=6，LCM(12,18)=36；两数相乘 = GCD × LCM。',
    },
    usage: `<ol>
  <li>输入两个正整数，点击“计算”。</li>
  <li>输出最大公约数（GCD）与最小公倍数（LCM）。</li>
  <li>分数约分、齿轮比、排班周期、工程协调常用。</li>
</ol>`,
    faq: [
      { q: '互质数的 GCD 是多少？', a: '互质（如 8 和 15）时 GCD=1，LCM=两数乘积 120。' },
      { q: '支持 0 吗？', a: '不支持，请输入正整数；0 与任何数的 GCD 定义特殊，容易误解。' },
    ],
  },
  {
    slug: 'factorial', name: '阶乘计算',
    desc: '阶乘计算器：n! 精确计算（BigInt 支持超大数），附科学计数法。',
    keywords: '阶乘,阶乘计算,factorial,n!,排列,大数阶乘',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'factorialCalc',
      inputs: [{ label: 'n（0-170）', type: 'number', value: '10' }],
      hint: 'BigInt 精确计算，10! = 3628800；超过 170 位自动截断显示并附科学计数法。',
    },
    usage: `<ol>
  <li>输入整数 n（0-170），点击“计算”。</li>
  <li>输出 n! 的精确值（超长数字截断显示）与科学计数法。</li>
  <li>排列组合、概率统计、级数计算常用。</li>
</ol>`,
    faq: [
      { q: '0! 等于多少？', a: '0! = 1（数学定义，保证组合公式 C(n,0)=1 成立）。' },
      { q: '为什么限制 170？', a: '170! 约 7.26×10³⁰⁶，已超出常规数值范围；BigInt 虽能算更大，但显示与后续运算不便。' },
    ],
  },
  {
    slug: 'perm-comb', name: '排列组合计算',
    desc: '排列 P(n,r) 与组合 C(n,r) 计算器，精确大数运算。',
    keywords: '排列组合,排列计算,组合计算,p(n,r),c(n,r),概率计算,阶乘组合',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'permCombCalc',
      inputs: [
        { label: '总数 n', type: 'number', value: '10' },
        { label: '选取 r', type: 'number', value: '3' },
      ],
      hint: 'P 考虑顺序（排列），C 不考虑顺序（组合）；需 0 ≤ r ≤ n。',
    },
    usage: `<ol>
  <li>输入总数 n 与选取数 r（0≤r≤n），点击“计算”。</li>
  <li>输出排列数 P(n,r)（有顺序）与组合数 C(n,r)（无顺序）。</li>
  <li>彩票概率、抽奖方案、密码组合数计算常用。</li>
</ol>`,
    faq: [
      { q: 'P 和 C 什么区别？', a: 'P(10,3)=720（选出 3 个并排序），C(10,3)=120（只选不排）；C = P ÷ r!。' },
      { q: 'n 能多大？', a: '上限 170（与阶乘一致），结果用 BigInt 精确输出，可能很长。' },
    ],
  },
  {
    slug: 'stats-calc', name: '统计分析计算',
    desc: '统计分析：均值、中位数、众数、方差、标准差、极差一键计算。',
    keywords: '统计分析,平均值,中位数,众数,方差,标准差,数据统计',
    category: 'math', kind: 'transform',
    transform: {
      lib: 'math-extra', actions: [{ label: '统计分析', fn: 'statsCalc' }],
      multi: true,
      placeholder: '输入数字，空格/逗号/换行分隔，如：1 2 3 4 5',
      outLabel: '统计结果',
    },
    usage: `<ol>
  <li>粘贴数字列表（空格、逗号或换行分隔），点击“统计分析”。</li>
  <li>输出数量、总和、均值、中位数、众数、极值、方差与标准差。</li>
  <li>成绩统计、测试数据、日常数据分析常用。</li>
</ol>`,
    faq: [
      { q: '中位数怎么算？', a: '排序后取中间值：奇数个取正中，偶数个取中间两数平均。' },
      { q: '众数有多个怎么办？', a: '并列最高频的数值全部列出，用逗号分隔。' },
    ],
  },
  {
    slug: 'round-calc', name: '数字舍入',
    desc: '数字舍入工具：四舍五入、向上/向下取整、截断到指定小数位。',
    keywords: '数字舍入,四舍五入,向上取整,向下取整,截断小数,round',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'roundCalc',
      inputs: [
        { label: '数字', type: 'number', value: '3.14159', step: 'any' },
        { label: '小数位', type: 'number', value: '2' },
      ],
      hint: '同时输出四种舍入方式到指定小数位。',
    },
    usage: `<ol>
  <li>输入任意数字（可带小数）与目标小数位，点击“计算”。</li>
  <li>对比四舍五入、向上取整、向下取整与直接截断四种结果。</li>
  <li>金额计算、测量数据处理、结果输出规范常用。</li>
</ol>`,
    faq: [
      { q: '向上取整和四舍五入什么区别？', a: '向上取整无论下一位多少都进位（3.01→3.1@1位）；四舍五入看下一位是否 ≥5。' },
      { q: '负数怎么处理？', a: '按数学定义处理：-3.141 向上取整到 2 位是 -3.14（向正方向），截断是 -3.14。' },
    ],
  },
  {
    slug: 'power-root', name: '幂与根计算',
    desc: '幂、平方根、立方根、倒数计算器，指数与开方快速求解。',
    keywords: '幂计算,平方根,立方根,倒数,指数运算,开方计算器',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'powerRootCalc',
      inputs: [
        { label: '底数', type: 'number', value: '16', step: 'any' },
        { label: '指数', type: 'number', value: '2', step: 'any' },
      ],
      hint: '支持小数指数，如 2^0.5 = √2。',
    },
    usage: `<ol>
  <li>输入底数与指数（可为小数），点击“计算”。</li>
  <li>输出幂、平方根、立方根与倒数。</li>
  <li>物理公式计算、利率折算（开根号）、几何计算常用。</li>
</ol>`,
    faq: [
      { q: '负底数开根号会怎样？', a: 'JS 对负数开偶次根返回 NaN（数学上为虚数），工具会显示“—”，请改用正数或复数工具。' },
      { q: '指数可以是分数吗？', a: '可以，如 8^(1/3) 直接输入 0.333 会近似；建议输入精确小数如 0.5。' },
    ],
  },
  {
    slug: 'log-calc', name: '对数计算',
    desc: '对数计算器：任意底对数、自然对数、常用对数与以 2 为底对数。',
    keywords: '对数计算,log,自然对数,常用对数,log2,对数求解',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'logCalc',
      inputs: [
        { label: '真数（>0）', type: 'number', value: '1000' },
        { label: '底数（>0 且 ≠1）', type: 'number', value: '10' },
      ],
      hint: '默认底数 10：log10(1000)=3。',
    },
    usage: `<ol>
  <li>输入真数与底数（默认 10），点击“计算”。</li>
  <li>输出任意底对数、ln、log10 与 log2 四种结果。</li>
  <li>信息论（log2）、酸碱度（pH=-log10）、复杂度分析常用。</li>
</ol>`,
    faq: [
      { q: '底数为什么不能是 1？', a: 'log₁(x) = x÷log(1) 分母为 0，数学上 1 的任何次幂都是 1，无法表示其他数。' },
      { q: '真数能为 0 或负数吗？', a: '不能，实数范围内对数只在正数上有定义，工具会提示。' },
    ],
  },
  {
    slug: 'trig-calc', name: '三角函数计算',
    desc: '三角函数：sin/cos/tan 与弧度换算，角度制输入。',
    keywords: '三角函数,sin,cos,tan,角度弧度,三角计算,正弦余弦',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'trigCalc',
      inputs: [{ label: '角度（度）', type: 'number', value: '30', step: 'any' }],
      hint: '30° 的 sin=0.5、cos≈0.866、tan≈0.577，弧度 π/6。',
    },
    usage: `<ol>
  <li>输入角度（度），点击“计算”。</li>
  <li>输出 sin、cos、tan 值与对应弧度。</li>
  <li>几何计算、信号处理、物理力学分解常用。</li>
</ol>`,
    faq: [
      { q: 'tan(90°) 为什么显示—？', a: '90° 的余弦为 0，tan = sin/cos 分母为 0 无定义，属数学正常现象。' },
      { q: '支持弧度输入吗？', a: '当前按角度输入；需要弧度可先用“角度换算”工具转成度。' },
    ],
  },
  {
    slug: 'compound-interest', name: '复利计算器',
    desc: '复利计算：本金、年利率、年限、计息频率 → 本息合计与利息。',
    keywords: '复利计算,复利计算器,利滚利,年化收益,投资回报,compound interest',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'compoundInterestCalc',
      inputs: [
        { label: '本金（元）', type: 'number', value: '10000' },
        { label: '年利率（%）', type: 'number', value: '5', step: 'any' },
        { label: '年限', type: 'number', value: '10' },
        { label: '每年计息次数', type: 'select', options: [['1', '每年 1 次'], ['4', '每季度'], ['12', '每月'], ['365', '每日']], value: '12' },
      ],
      hint: '复利 = 本金 × (1 + 年利率/次数)^(次数×年限)；附 72 法则翻倍年数。',
    },
    usage: `<ol>
  <li>输入本金、年利率、年限与计息频率，点击“计算”。</li>
  <li>输出本息合计、总利息与 72 法则估算的翻倍年数。</li>
  <li>理财规划、贷款比较、投资回报测算常用。</li>
</ol>`,
    faq: [
      { q: '复利和单利差多少？', a: '复利把每期利息计入本金再计息（利滚利）；年限越长差异越大，10 年 5% 复利约比单利多 23%。' },
      { q: '72 法则是什么？', a: '翻倍年数 ≈ 72 ÷ 年利率。如年化 6%，约 72/6 = 12 年翻倍（粗略估算）。' },
    ],
  },
  {
    slug: 'simple-interest', name: '单利计算器',
    desc: '单利计算：本金 × 利率 × 年限，银行定期、借款利息常用。',
    keywords: '单利计算,单利,利息计算,定期利息,借款利息,年利率',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'simpleInterestCalc',
      inputs: [
        { label: '本金（元）', type: 'number', value: '10000' },
        { label: '年利率（%）', type: 'number', value: '3', step: 'any' },
        { label: '年限', type: 'number', value: '3' },
      ],
      hint: '利息 = 本金 × 年利率 × 年限；每年利息不参与再计息。',
    },
    usage: `<ol>
  <li>输入本金、年利率与年限，点击“计算”。</li>
  <li>输出总利息与本息合计。</li>
  <li>银行定期存款、简单借贷、债券票息计算常用。</li>
</ol>`,
    faq: [
      { q: '定期存款用单利还是复利？', a: '多数银行定期存款到期一次性付息（单利）；自动转存后本金+利息重新起存相当于复利。' },
      { q: '月利率怎么填？', a: '本工具按年利率计算；月利率 × 12 = 年利率，如月 0.25% 填 3。' },
    ],
  },
  {
    slug: 'electricity-cost', name: '电器电费计算',
    desc: '电器耗电与电费计算：功率 × 时长 → 度数与电费（按天/月）。',
    keywords: '电费计算,电器耗电,千瓦时,功率计算,电费查询,一度电',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'electricityCalc',
      inputs: [
        { label: '功率（瓦 W）', type: 'number', value: '1000' },
        { label: '每天使用（小时）', type: 'number', value: '3', step: 'any' },
        { label: '电费单价（元/度）', type: 'number', value: '0.6', step: 'any' },
      ],
      hint: '1 度电 = 1 千瓦时；如 1000W 电器用 3 小时 = 3 度电。',
    },
    usage: `<ol>
  <li>输入电器功率（W）、每天使用时长与电费单价，点击“计算”。</li>
  <li>输出每天耗电量（度）、每天电费与每月（30 天）电费。</li>
  <li>比较不同电器能耗、预估家庭电费常用。</li>
</ol>`,
    faq: [
      { q: '怎么查电费单价？', a: '各地居民电价约 0.5-0.9 元/度（含阶梯价）；查看电费单或当地发改委公告。' },
      { q: '空调/冰箱是恒功率吗？', a: '不是，压缩机启停导致实际功耗波动；本工具按标称功率估算，实际以电表为准。' },
    ],
  },
  {
    slug: 'fuel-cost', name: '油费计算',
    desc: '自驾油费计算：里程、油耗、油价 → 耗油量与总油费。',
    keywords: '油费计算,自驾费用,油耗成本,加油费用,出行成本,每公里油费',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'fuelCostCalc',
      inputs: [
        { label: '里程（公里）', type: 'number', value: '300' },
        { label: '百公里油耗（L/100km）', type: 'number', value: '8', step: 'any' },
        { label: '油价（元/升）', type: 'number', value: '7.5', step: 'any' },
      ],
      hint: '耗油量 = 里程 ÷ 100 × 百公里油耗；附每公里成本。',
    },
    usage: `<ol>
  <li>输入里程、车辆百公里油耗与当前油价，点击“计算”。</li>
  <li>输出耗油量、总油费与每公里成本。</li>
  <li>自驾出行预算、网约车成本核算、油耗对比常用。</li>
</ol>`,
    faq: [
      { q: '怎么知道自己的百公里油耗？', a: '加满油后记录里程，下次加满看加油量：油量 ÷ 行驶里程 × 100。' },
      { q: '电车怎么算？', a: '电车按“度/百公里”同理：耗电量 ÷ 100 × 电价，可套用本工具的数值逻辑。' },
    ],
  },
  {
    slug: 'pace-calc', name: '跑步配速计算',
    desc: '跑步配速计算：距离与用时 → 配速（分/公里）与速度。',
    keywords: '跑步配速,配速计算,马拉松配速,跑步速度,配速表,pacing',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'paceCalc',
      inputs: [
        { label: '距离（公里）', type: 'number', value: '5', step: 'any' },
        { label: '时（小时）', type: 'number', value: '0' },
        { label: '分', type: 'number', value: '30' },
        { label: '秒', type: 'number', value: '0' },
      ],
      hint: '如 5 公里用时 30 分钟 → 配速 6分00秒 /公里。',
    },
    usage: `<ol>
  <li>输入跑步距离与用时（时/分/秒），点击“计算”。</li>
  <li>输出配速（每公里用时）与平均速度。</li>
  <li>训练计划、比赛目标设定、跑量记录常用。</li>
</ol>`,
    faq: [
      { q: '马拉松 3 小时完赛配速多少？', a: '42.195 公里 ÷ 3 小时 ≈ 4分15秒 /公里，速度约 14 公里/小时。' },
      { q: '配速单位能换成每英里吗？', a: '当前输出每公里配速；换算英里需 × 1.609。' },
    ],
  },
  {
    slug: 'ideal-weight', name: '理想体重计算',
    desc: '理想体重范围：由身高与性别算出健康体重区间（BMI 18.5-23.9）。',
    keywords: '理想体重,标准体重,健康体重,bmi范围,体重区间,身高体重',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'idealWeightCalc',
      inputs: [
        { label: '身高（厘米）', type: 'number', value: '170' },
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
      ],
      hint: '健康体重 = 身高² × BMI（18.5-23.9），附 Devine 公式理想体重。',
    },
    usage: `<ol>
  <li>输入身高与性别，点击“计算”。</li>
  <li>输出健康体重范围（BMI 18.5-23.9）与 Devine 公式理想体重。</li>
  <li>健康管理、体检对照、健身目标设定常用。</li>
</ol>`,
    faq: [
      { q: 'BMI 适合所有人吗？', a: '不完美：肌肉量大的人 BMI 偏高但健康；老人与儿童参考标准不同。请结合体脂率综合判断。' },
      { q: '亚洲标准更严格吗？', a: '中国标准 18.5-23.9 为正常，24-27.9 超重，≥28 肥胖；比 WHO 标准略严。' },
    ],
  },
  {
    slug: 'bmr-calc', name: 'BMR 基础代谢计算',
    desc: '基础代谢率（BMR）与每日热量需求计算，健身减脂增肌参考。',
    keywords: '基础代谢,bmr,热量需求,每日热量,减脂热量,增肌热量,tdee',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'bmrCalc',
      inputs: [
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
        { label: '体重（公斤）', type: 'number', value: '65', step: 'any' },
        { label: '身高（厘米）', type: 'number', value: '170' },
        { label: '年龄', type: 'number', value: '30' },
      ],
      hint: 'Mifflin-St Jeor 公式：男 10×kg+6.25×cm-5×age+5，女 -161。',
    },
    usage: `<ol>
  <li>输入性别、体重、身高与年龄，点击“计算”。</li>
  <li>输出 BMR（静息热量消耗）与 5 档活动水平下的每日维持热量。</li>
  <li>减脂（-300~500 千卡）、增肌（+200~300 千卡）以此为基准调整。</li>
</ol>`,
    faq: [
      { q: 'BMR 和 TDEE 什么区别？', a: 'BMR 是躺着不动的基础消耗；TDEE = BMR × 活动系数（久坐 1.2 到极高 1.9），才是每日总消耗。' },
      { q: '减脂每天吃多少？', a: '建议 TDEE - 300~500 千卡并保证蛋白质充足；低于 BMR 长期执行会掉代谢，需谨慎。' },
    ],
  },
  {
    slug: 'random-number', name: '随机数生成',
    desc: '随机数生成器：指定范围与数量，加密级随机，可重复多次生成。',
    keywords: '随机数生成,随机数,随机数字,随机整数,抽奖数字,加密随机',
    category: 'math', kind: 'calc',
    calc: {
      lib: 'math-extra', fn: 'randomNumberCalc',
      inputs: [
        { label: '最小值', type: 'number', value: '1' },
        { label: '最大值', type: 'number', value: '100' },
        { label: '数量（1-100）', type: 'number', value: '5' },
      ],
      hint: '使用 crypto.getRandomValues 加密级随机源，可含重复值；抽奖去重用“随机抽签”。',
    },
    usage: `<ol>
  <li>设置范围（最小-最大）与生成数量，点击“计算”。</li>
  <li>输出 N 个随机整数，每行一个。</li>
  <li>测试数据、随机分组、抽号（允许重复）常用。</li>
</ol>`,
    faq: [
      { q: '随机性可靠吗？', a: '基于浏览器 crypto 加密级随机源，优于 Math.random，适合抽奖等场景。' },
      { q: '会重复吗？', a: '可能重复（独立抽取）；需要不重复的抽签请用“随机抽签”工具。' },
    ],
  },
];
