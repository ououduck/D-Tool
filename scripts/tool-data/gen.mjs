/* gen（生成工具）分类工具定义 —— 全部为真实可用的生成器，手写说明与 FAQ */
export default [
  {
    slug: 'name-generator', name: '中文姓名生成器',
    desc: '随机中文姓名生成器：百家姓 + 常用名库，支持性别选择与批量生成。',
    keywords: '姓名生成,随机姓名,中文名字,取名,百家姓,名字生成器',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomChineseName',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '5', min: '1' },
        { name: 'gender', label: '性别', type: 'select', options: [['any', '随机'], ['male', '男'], ['female', '女']], value: 'any' },
      ],
      hint: '姓名由百家姓 + 常用名字组成，30% 概率生成双字名，男女风格可选。',
    },
    usage: `<ol>
  <li>选择性别（随机/男/女）与数量，点击“生成”。</li>
  <li>输出一批中文姓名，每行一个，可一键复制。</li>
  <li>测试数据、游戏角色、小说起名都能用。</li>
</ol>`,
    faq: [
      { q: '会生成生僻字吗？', a: '不会，全部使用常用姓氏与常用字，避免生僻字导致的显示与输入问题。' },
      { q: '能指定姓氏吗？', a: '暂不支持指定；需要固定姓氏可把结果中的姓替换后使用。' },
    ],
  },
  {
    slug: 'phone-generator', name: '手机号生成器',
    desc: '随机手机号生成器：真实号段前缀（13x-19x）+ 随机尾号，批量生成。',
    keywords: '手机号生成,随机手机号,号码生成器,虚拟手机号,测试手机号',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomPhone',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '使用 13/15/16/17/18/19 真实号段前缀 + 8 位随机尾号，仅供测试使用。',
    },
    usage: `<ol>
  <li>设置生成数量，点击“生成”。</li>
  <li>输出 11 位手机号，格式符合国内号段规则。</li>
  <li>适合接口测试、表单测试数据；请勿用于骚扰或违法用途。</li>
</ol>`,
    faq: [
      { q: '生成的号码能打通吗？', a: '不能，尾号是随机组合，大多数不是真实在用号码；仅作格式合法的测试数据。' },
      { q: '号段有哪些？', a: '覆盖 130-139、150-159、160-169、170-179、180-189、190-199 等主流号段。' },
    ],
  },
  {
    slug: 'email-generator', name: '邮箱生成器',
    desc: '随机邮箱地址生成器：常用邮箱域名 + 随机用户名，批量生成测试邮箱。',
    keywords: '邮箱生成,随机邮箱,测试邮箱,email生成,批量邮箱,虚拟邮箱',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomEmail',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '域名覆盖 qq/163/gmail/outlook 等常用邮箱，用户名随机生成。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出格式合法的随机邮箱地址。</li>
  <li>适合注册流程测试、数据填充；邮箱不一定真实存在。</li>
</ol>`,
    faq: [
      { q: '邮箱能收到邮件吗？', a: '不能保证，域名真实但用户名随机，多数不存在；需要收信请用临时邮箱服务。' },
      { q: '能自定义域名吗？', a: '暂不支持；需要特定域名可复制结果批量替换 @ 后部分。' },
    ],
  },
  {
    slug: 'address-generator', name: '地址生成器',
    desc: '随机中国地址生成器：城市 + 区县 + 路名 + 门牌号，批量生成测试地址。',
    keywords: '地址生成,随机地址,中国地址,测试地址,收货地址,假地址',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomAddress',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '覆盖全国主要城市与常见路名，自动拼接门牌号与楼层。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出“城市 + 区 + 路 + 门牌号”结构的随机地址。</li>
  <li>适合表单测试、地图功能调试、物流系统测试数据。</li>
</ol>`,
    faq: [
      { q: '地址是真实存在的吗？', a: '城市与区县真实，但路名、门牌号随机组合，多数不存在对应实体，仅作格式测试。' },
      { q: '能按省份生成吗？', a: '暂不支持指定省份，城市库覆盖全国 20 个主要城市。' },
    ],
  },
  {
    slug: 'company-generator', name: '公司名生成器',
    desc: '随机公司名称生成器：姓氏 + 行业词 + 企业后缀，批量生成测试公司名。',
    keywords: '公司名生成,随机公司,企业名称,公司名称,测试公司,工商名称',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomCompany',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '名称 = 姓 + 行业词 ×2 + 企业类型（有限公司/集团等）。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出形如“张科技云有限公司”的随机公司名。</li>
  <li>适合 CRM 测试、发票测试、企业数据演示。</li>
</ol>`,
    faq: [
      { q: '公司名能注册吗？', a: '仅为随机组合，实际注册需查重；请勿用它冒充真实企业。' },
      { q: '行业词有哪些？', a: '科技、网络、信息、数据、智能、传媒、贸易、咨询、软件、金融等 20 个行业词。' },
    ],
  },
  {
    slug: 'job-generator', name: '职位生成器',
    desc: '随机职位名称生成器：工程师、设计师、产品经理等常用职位批量生成。',
    keywords: '职位生成,随机职位,岗位名称,职业生成,测试职位',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomJob',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '从 20 个常见职位中随机抽取。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机职位名称，每行一个。</li>
  <li>适合简历测试、HR 系统演示数据。</li>
</ol>`,
    faq: [
      { q: '职位库有哪些？', a: '工程师、设计师、产品经理、运营专员、财务主管、律师、医生、教师等 20 个常用职位。' },
      { q: '能按部门生成吗？', a: '暂不支持，需要固定职位可从结果中选择。' },
    ],
  },
  {
    slug: 'nickname-generator', name: '昵称生成器',
    desc: '随机昵称生成器：形容词 + 名词 + 数字组合，批量生成个性网名。',
    keywords: '昵称生成,随机昵称,网名生成,游戏昵称,个性签名,用户名',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomNickname',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '形如“快乐小猫”“阳光星辰123”的组合，50% 概率带数字后缀。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出一批可爱/个性昵称。</li>
  <li>注册账号、游戏起名、社交媒体用户名都能用。</li>
</ol>`,
    faq: [
      { q: '昵称会重复吗？', a: '随机组合重复率低，但带数字后缀的少量场景可能重复，可多生成几次挑选。' },
      { q: '适合英文昵称吗？', a: '当前生成中文昵称；英文昵称可用“随机字符生成”或取拼音。' },
    ],
  },
  {
    slug: 'bankcard-generator', name: '银行卡号生成器',
    desc: '随机银行卡号生成器：真实发卡行 BIN + Luhn 校验位，生成合规测试卡号。',
    keywords: '银行卡号生成,卡号生成,银行卡测试,luhn卡号,虚拟银行卡',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomBankCard',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '使用工商/建行/农行等真实 BIN 前缀 + Luhn 校验位，卡号格式合法。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出 19 位银行卡号（16-19 位），通过 Luhn 校验。</li>
  <li>适合支付系统测试、卡号格式校验开发；无法用于真实交易。</li>
</ol>`,
    faq: [
      { q: '生成的卡号能付款吗？', a: '不能。卡号仅通过格式与 Luhn 校验，无真实账户绑定，任何交易都会失败。' },
      { q: 'BIN 是什么？', a: '银行卡号前 6 位是发卡行标识（BIN），本工具使用工行 622202、建行 621700 等真实 BIN 前缀。' },
    ],
  },
  {
    slug: 'plate-generator', name: '车牌号生成器',
    desc: '随机车牌号生成器：全国省份简称 + 字母数字组合，新能源/普通牌随机。',
    keywords: '车牌号生成,随机车牌,车牌生成器,测试车牌,新能源车牌',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomPlate',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '格式：省份简称 + 发牌机关字母 + 5 位字符；避免 O/I 易混淆字符。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出各省份随机车牌号（含部分新能源 6 位格式）。</li>
  <li>适合停车场系统测试、交通类应用演示数据。</li>
</ol>`,
    faq: [
      { q: '新能源车牌格式？', a: '新能源车为 6 位（省份+字母+6 位），本工具部分生成 6 位格式模拟；普通车 5 位。' },
      { q: '车牌是真实在用的吗？', a: '随机组合，与真实号牌无关；请勿用于违法冒用。' },
    ],
  },
  {
    slug: 'wechat-generator', name: '微信号生成器',
    desc: '随机微信号生成器：6-16 位字母数字组合，批量生成测试微信号。',
    keywords: '微信号生成,随机微信号,微信id,测试微信号,账号生成',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomWechat',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '微信号规则：6-20 位字母开头，可含数字、下划线。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出符合微信号规则的随机 ID（字母开头 + 数字）。</li>
  <li>适合社交应用测试、通讯录演示数据。</li>
</ol>`,
    faq: [
      { q: '微信号有什么规则？', a: '6-20 个字符，字母开头，可含数字、下划线、减号；本工具生成字母+数字组合。' },
      { q: '能搜到这些微信号吗？', a: '不能，均为随机组合，非真实账号。' },
    ],
  },
  {
    slug: 'qq-generator', name: 'QQ 号生成器',
    desc: '随机 QQ 号生成器：5-11 位数字，批量生成测试 QQ 号。',
    keywords: 'qq号生成,随机qq,qq号码,测试qq,账号生成器',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomQQ',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: 'QQ 号规则：5-11 位数字，首位不为 0。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出 5-11 位随机数字 QQ 号。</li>
  <li>适合账号体系测试、导入数据演示。</li>
</ol>`,
    faq: [
      { q: 'QQ 号能加好友吗？', a: '不能，随机数字不代表真实账号；腾讯账号需官方注册。' },
      { q: '最短几位？', a: '按规则 5-11 位随机，模拟不同长度的历史账号。' },
    ],
  },
  {
    slug: 'color-generator', name: '随机颜色生成器',
    desc: '随机十六进制颜色生成器：批量生成色值，附色彩灵感。',
    keywords: '颜色生成,随机颜色,色值生成,十六进制颜色,配色灵感,hex颜色',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomColor',
      params: [{ name: 'count', label: '数量', type: 'number', value: '6', min: '1' }],
      hint: '生成 #RRGGBB 格式随机色值，可直接用于 CSS。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出一批随机十六进制色值。</li>
  <li>设计配色、数据可视化、测试样式时快速取色。</li>
</ol>`,
    faq: [
      { q: '能生成指定色系吗？', a: '暂不支持色系过滤；需要特定色系可参考本站“颜色转换/调色板”工具。' },
      { q: '色值格式？', a: '#RRGGBB 六位十六进制，浏览器/设计工具可直接使用。' },
    ],
  },
  {
    slug: 'date-generator', name: '随机日期生成器',
    desc: '随机日期生成器：1970-2025 年随机日期，批量生成测试日期。',
    keywords: '日期生成,随机日期,测试日期,日期数据,批量日期',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomDate',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '输出 YYYY-MM-DD 格式，范围 1970-2025 年。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出一批随机日期（YYYY-MM-DD）。</li>
  <li>数据库测试、表单填充、图表演示常用。</li>
</ol>`,
    faq: [
      { q: '日期范围是多少？', a: '1970-2025 年，月份 1-12，日期 1-28（避免非法日期）。' },
      { q: '能指定年份区间吗？', a: '暂不支持区间指定；需要特定年份可生成后筛选。' },
    ],
  },
  {
    slug: 'sentence-generator', name: '句子生成器',
    desc: '随机中文句子生成器：主语 + 谓语 + 宾语组合，批量生成测试文案。',
    keywords: '句子生成,随机句子,文案生成,测试文案,中文句子,语录生成',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomSentence',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '从 20 主语 × 20 谓语 × 20 宾语词库组合，生成积极向句子。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出通顺的随机中文句子。</li>
  <li>文案灵感、占位文本、内容填充都能用。</li>
</ol>`,
    faq: [
      { q: '句子语义一定通顺吗？', a: '采用固定语法模板（主+谓+宾），语义基本通顺，偶有抽象组合属正常。' },
      { q: '能生成英文句子吗？', a: '暂不支持，英文占位文本可用“Lorem 假文”工具。' },
    ],
  },
  {
    slug: 'idcard-generator', name: '身份证号生成器',
    desc: '随机身份证号生成器：真实地区码 + 生日 + 校验位，生成合规测试身份证号。',
    keywords: '身份证生成,身份证号,测试身份证,号码生成,18位身份证',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomIdCard',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '18 位结构：6 位地区码 + 8 位生日 + 3 位顺序码 + 1 位校验位，通过校验。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出 18 位身份证号，格式与校验位正确。</li>
  <li>适合系统开发测试；请勿用于冒用身份等违法用途。</li>
</ol>`,
    faq: [
      { q: '生成的身份证号能办业务吗？', a: '不能。号码是随机组合，无对应真实公民身份；任何实名业务都会校验失败。' },
      { q: '校验位是什么？', a: '第 18 位由前 17 位按 GB 11643 加权计算（模 11），本工具保证校验位正确。' },
    ],
  },
  {
    slug: 'ip-generator', name: 'IP 地址生成器',
    desc: '随机 IPv4 地址生成器：批量生成测试 IP，支持私有网段过滤选项。',
    keywords: 'ip生成,随机ip,ipv4生成,测试ip,ip地址生成器',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomIpv4',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '生成 1.0.0.0-223.255.255.255 范围的随机公网/私有地址。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机 IPv4 地址。</li>
  <li>防火墙规则测试、日志模拟、网络工具演示常用。</li>
</ol>`,
    faq: [
      { q: '会生成私有地址吗？', a: '会（10.x/172.16-31.x/192.168.x 随机出现）；需要公网地址可多次生成筛选。' },
      { q: '支持 IPv6 吗？', a: '暂不支持，后续版本考虑增加 IPv6 生成。' },
    ],
  },
  {
    slug: 'mac-generator', name: 'MAC 地址生成器',
    desc: '随机 MAC 地址生成器：冒号分隔的 6 组十六进制，批量生成测试 MAC。',
    keywords: 'mac生成,随机mac,mac地址,测试mac,物理地址生成',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomMac',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '格式 AA:BB:CC:DD:EE:FF，每段两位十六进制。',
    },
    usage: `<ol>
  <li>设置数量，点击“生成”。</li>
  <li>输出随机 MAC 地址。</li>
  <li>网络设备模拟、测试数据、系统演示常用。</li>
</ol>`,
    faq: [
      { q: 'MAC 地址能改吗？', a: '设备实际 MAC 由硬件决定，部分网卡支持软件修改；本工具仅供测试数据。' },
      { q: '支持其他分隔符吗？', a: '当前输出冒号分隔；连字符/点分格式可复制后自行替换。' },
    ],
  },
  {
    slug: 'coupon-generator', name: '优惠码生成器',
    desc: '随机优惠码生成器：排除易混淆字符的券码批量生成，营销系统常用。',
    keywords: '优惠码生成,优惠券码,券码生成,兑换码,激活码,随机券码',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomCoupon',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '5', min: '1' },
        { name: 'length', label: '长度', type: 'number', value: '10', min: '4' },
      ],
      hint: '字符集排除 0/O/I/l/1 等易混淆字符，适合打印与人工输入。',
    },
    usage: `<ol>
  <li>设置数量与长度（4-20），点击“生成”。</li>
  <li>输出一批大写字母+数字优惠码。</li>
  <li>电商发券、活动兑换码、软件激活码生成常用。</li>
</ol>`,
    faq: [
      { q: '为什么不含 0/O/1/I？', a: '这些字符在打印与手输时易混淆（0 和 O、1 和 I），排除后体验更好。' },
      { q: '生成的码会重复吗？', a: '26+24 字符集下重复率极低；大批量生成建议服务端做唯一性校验。' },
    ],
  },
  {
    slug: 'mock-data', name: 'Mock 数据生成器',
    desc: '假数据生成器：姓名/手机/邮箱/城市/公司等字段的 JSON 测试数据一键生成。',
    keywords: 'mock数据,假数据,测试数据生成,json假数据,模拟数据,接口测试数据',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomMockData',
      params: [{ name: 'count', label: '数量（1-50）', type: 'number', value: '5', min: '1' }],
      hint: '输出含 id/name/phone/email/age/city/company/score 等字段的 JSON 数组。',
    },
    usage: `<ol>
  <li>设置数据条数（1-50），点击“生成”。</li>
  <li>输出格式化的 JSON 数组，字段含姓名、手机号、邮箱、年龄、城市等。</li>
  <li>前端联调、接口 mock、表格演示数据直接复制使用。</li>
</ol>`,
    faq: [
      { q: '能自定义字段吗？', a: '暂不支持自定义结构；需要特定字段可复制结果后用文本工具修改。' },
      { q: '输出格式？', a: 'JSON 数组（格式化缩进），前端可直接 JSON.parse 使用。' },
    ],
  },
  {
    slug: 'password-generator-extra', name: '强密码生成器',
    desc: '强密码生成器：大小写+数字+符号四类字符，保证至少各含一个，批量生成。',
    keywords: '强密码生成,密码生成器,复杂密码,安全密码,随机密码,批量密码',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen-extra', fn: 'randomPassword',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '3', min: '1' },
        { name: 'length', label: '长度（6-64）', type: 'number', value: '16', min: '6' },
      ],
      hint: '保证包含大写、小写、数字、符号各至少 1 个；如需自定义字符集见“随机字符生成”。',
    },
    usage: `<ol>
  <li>设置数量与长度，点击“生成”。</li>
  <li>输出符合强度要求的随机密码（四类字符齐全）。</li>
  <li>账号注册、密钥初始化、测试凭据生成常用。</li>
</ol>`,
    faq: [
      { q: '密码安全吗？', a: '使用 crypto 加密级随机源，四类字符随机排列；16 位以上强度足够。' },
      { q: '和现有“密码生成器”有什么区别？', a: '本站另有可自定义字符集/排除易混淆字符的密码生成器，两者互补。' },
    ],
  },
];
