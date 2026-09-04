/* dev/web/life 补强 2 —— 全部为真实可用的工具，手写说明与 FAQ */
export default [
  {
    slug: 'sql-format', name: 'SQL 格式化',
    desc: 'SQL 格式化工具：关键字换行缩进，让 SQL 更易读。',
    keywords: 'sql格式化,sql美化,sql排版,sql整理,格式化sql,pretty sql',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev2', actions: [{ label: '格式化', fn: 'sqlFormat' }],
      placeholder: '粘贴 SQL 语句，如：select * from users where id=1',
      outLabel: '格式化结果',
    },
    usage: `<ol>
  <li>粘贴 SQL 语句，点击“格式化”。</li>
  <li>SELECT/FROM/WHERE/JOIN 等关键字自动换行并缩进。</li>
  <li>适合阅读长查询、代码评审、教学展示。</li>
</ol>`,
    faq: [
      { q: '支持哪些数据库？', a: '关键字为 SQL 通用标准，MySQL/PostgreSQL/SQLite 等通用语法均可。' },
      { q: '能格式化 INSERT 吗？', a: '能，VALUES 等关键字也会换行；复杂子查询缩进基本正确。' },
    ],
  },
  {
    slug: 'code-escape', name: '代码转义',
    desc: '代码转义工具：JS/HTML/URL 转义与反转义，注入防护与调试。',
    keywords: '代码转义,js转义,html转义,url转义,转义还原,特殊字符转义',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev2', actions: [
        { label: 'JS 转义', fn: 'escapeJs' },
        { label: 'JS 反转义', fn: 'unescapeJs' },
        { label: 'HTML 转义', fn: 'escapeHtmlStr' },
        { label: 'URL 转义', fn: 'escapeUrl' },
        { label: 'URL 反转义', fn: 'unescapeUrl' },
      ],
      placeholder: '输入需要转义的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>选择转义类型：JS 字符串、HTML 实体或 URL 编码。</li>
  <li>“转义”把特殊字符转为安全形式，“反转义”还原。</li>
  <li>XSS 防护、接口参数编码、日志排查常用。</li>
</ol>`,
    faq: [
      { q: 'HTML 转义防什么？', a: '把 < > & 等转为实体，防止用户输入被当作标签执行（XSS 基础防护）。' },
      { q: 'URL 转义和编码一样吗？', a: 'encodeURIComponent 编码所有特殊字符，适合参数值；整 URL 请用 encodeURI。' },
    ],
  },
  {
    slug: 'subnet-calc', name: '子网计算器',
    desc: '子网计算器（CIDR）：输入 IP 与掩码，算出网络地址、广播地址、可用主机数。',
    keywords: '子网计算,子网掩码,cidr,网络地址,广播地址,ip计算,网段计算',
    category: 'web', kind: 'calc',
    calc: {
      lib: 'dev2', fn: 'subnetCalc',
      inputs: [
        { label: 'IP 地址', type: 'text', value: '192.168.1.5' },
        { label: '前缀（/24）', type: 'number', value: '24' },
      ],
      hint: '支持输入 CIDR 形式（192.168.1.5/24）或分开填写。',
    },
    usage: `<ol>
  <li>输入 IP 与子网前缀（0-32），点击“计算”。</li>
  <li>输出网络地址、广播地址、掩码、可用主机数与地址范围。</li>
  <li>网络规划、防火墙规则、VLAN 划分必备。</li>
</ol>`,
    faq: [
      { q: '/24 是多少主机？', a: '/24 有 256 个地址，可用 254 个（去掉网络地址与广播地址）。' },
      { q: '/31 和 /32 呢？', a: '/31 用于点对点链路（2 地址全可用），/32 是单主机（常用于精确 ACL）。' },
    ],
  },
  {
    slug: 'ip-convert', name: 'IP 进制转换',
    desc: 'IPv4 与十进制/二进制/十六进制互转：点分十进制 ↔ 整数。',
    keywords: 'ip转换,ip进制,ipv4转十进制,ip转二进制,ip转整数,ip计算',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'dev2', actions: [{ label: '转换', fn: 'ipConvert' }],
      placeholder: '输入 IP（192.168.1.1）或十进制整数', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入点分 IP 或 0-4294967295 的十进制整数，点击“转换”。</li>
  <li>输出对应的十进制、32 位二进制与十六进制。</li>
  <li>理解 IP 存储、数据库存整数 IP、日志分析常用。</li>
</ol>`,
    faq: [
      { q: '为什么要转整数？', a: '数据库存整数 IP 比字符串省空间、查询快；很多日志/GeoIP 库用整数表示。' },
      { q: '支持 IPv6 吗？', a: '暂不支持；IPv6 为 128 位，需专门工具。' },
    ],
  },
  {
    slug: 'port-lookup', name: '端口服务查询',
    desc: '常用端口查询：输入端口号查看对应服务（MySQL 3306、Redis 6379 等）。',
    keywords: '端口查询,端口服务,常用端口,端口号,服务端口,端口速查',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'dev2', actions: [{ label: '查询', fn: 'portLookup' }],
      placeholder: '输入端口号，如 3306', outLabel: '查询结果',
    },
    usage: `<ol>
  <li>输入端口号（0-65535），点击“查询”。</li>
  <li>返回常用服务对应关系；未收录提示为动态/私有端口。</li>
  <li>排查端口占用、配置防火墙、联调服务常用。</li>
</ol>`,
    faq: [
      { q: '端口冲突怎么办？', a: 'netstat -ano 查看占用进程（Windows），lsof -i:端口 查看（Linux/Mac），改配置换端口。' },
      { q: '所有端口都有固定服务吗？', a: '0-1023 为知名端口（约定俗成），其余可自由使用；本表收录开发常用端口。' },
    ],
  },
  {
    slug: 'calorie-goal', name: '热量目标计算',
    desc: '每日热量目标：按体重、身高、年龄与活动量估算维持/减脂/增肌热量。',
    keywords: '热量目标,每日热量,减脂热量,增肌热量,tdee,热量计算',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'dev2', fn: 'calorieGoalCalc',
      inputs: [
        { label: '体重（kg）', type: 'number', value: '70' },
        { label: '身高（cm）', type: 'number', value: '175' },
        { label: '年龄', type: 'number', value: '30' },
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
        { label: '活动量', type: 'select', options: [['sedentary', '久坐'], ['light', '轻度'], ['moderate', '中度'], ['active', '高度'], ['very', '极高']], value: 'moderate' },
      ],
      hint: 'TDEE = BMR × 活动系数；减脂 -400 千卡、增肌 +300 千卡为参考值。',
    },
    usage: `<ol>
  <li>输入身体数据与活动量，点击“计算”。</li>
  <li>输出 BMR、维持热量与减脂/增肌建议热量。</li>
  <li>饮食计划与运动目标制定参考。</li>
</ol>`,
    faq: [
      { q: '和 BMR 计算器区别？', a: '本工具聚焦“吃多少”，直接给减脂/增肌热量目标；BMR 工具侧重代谢率本身。' },
      { q: '数字会随运动变化吗？', a: '活动量按日常整体评估；单日大运动量消耗另计，建议记录后微调。' },
    ],
  },
  {
    slug: 'waist-hip', name: '腰臀比计算',
    desc: '腰臀比（WHR）计算：腰围÷臀围，评估中心性肥胖风险。',
    keywords: '腰臀比,whr,腰围臀围,健康指标,肥胖风险,身材比例',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'dev2', fn: 'waistHipCalc',
      inputs: [
        { label: '腰围（cm）', type: 'number', value: '80' },
        { label: '臀围（cm）', type: 'number', value: '100' },
      ],
      hint: 'WHO 标准：男 <0.9、女 <0.85 为低风险。',
    },
    usage: `<ol>
  <li>测量腰围（肚脐水平）与臀围（最宽处），输入并计算。</li>
  <li>得到腰臀比与风险分级。</li>
  <li>腰臀比高（苹果型身材）与心血管风险相关。</li>
</ol>`,
    faq: [
      { q: '腰臀比和 BMI 什么关系？', a: 'BMI 看整体胖瘦，腰臀比看脂肪分布；两者结合评估更全面。' },
      { q: '怎么测腰围？', a: '自然站立、呼气末，绕肚脐水平一周测量；不要吸气收腹。' },
    ],
  },
  {
    slug: 'sleep-need', name: '睡眠需求查询',
    desc: '睡眠需求查询：按年龄查看建议睡眠时长（NSF 标准）。',
    keywords: '睡眠时长,睡眠需求,建议睡眠,最佳睡眠时间,睡眠标准,睡多久',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'dev2', fn: 'sleepNeedCalc',
      inputs: [{ label: '年龄', type: 'number', value: '30' }],
      hint: '基于美国国家睡眠基金会（NSF）年龄分层建议。',
    },
    usage: `<ol>
  <li>输入年龄，点击“计算”。</li>
  <li>查看对应年龄段的建议睡眠时长。</li>
  <li>结合“睡眠周期计算”工具规划入睡/起床时间。</li>
</ol>`,
    faq: [
      { q: '睡得越多越好吗？', a: '不是，过长睡眠（>9-10 小时）同样与健康风险相关；规律比时长更重要。' },
      { q: '孩子需要多久？', a: '婴幼儿 11-14 小时，学龄前 10-13 小时，青少年 8-10 小时，逐步减少。' },
    ],
  },
  {
    slug: 'ideal-waist', name: '理想腰围计算',
    desc: '理想腰围估算：按身高与性别给出健康腰围参考值。',
    keywords: '理想腰围,健康腰围,腰围标准,身高腰围,体型参考,腰围计算',
    category: 'life', kind: 'calc',
    calc: {
      lib: 'dev2', fn: 'idealWaistCalc',
      inputs: [
        { label: '身高（cm）', type: 'number', value: '175' },
        { label: '性别', type: 'select', options: [['male', '男'], ['female', '女']], value: 'male' },
      ],
      hint: '经验公式：男 身高×0.47，女 身高×0.42；健康腰围上限男 85cm、女 80cm。',
    },
    usage: `<ol>
  <li>输入身高与性别，点击“计算”。</li>
  <li>得到经验理想腰围与健康上限参考。</li>
  <li>健身目标设定、体型管理参考。</li>
</ol>`,
    faq: [
      { q: '公式准确吗？', a: '为经验估算，个体骨架差异大；健康核心标准是腰围不超过上限。' },
      { q: '腰围超标一定不健康吗？', a: '腰围只是风险指标之一，结合体脂率、血压血脂综合判断。' },
    ],
  },
];
