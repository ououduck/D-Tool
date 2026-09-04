/* dev（开发辅助）分类工具定义 —— 全部为真实可用的开发工具，手写说明与 FAQ */
export default [
  {
    slug: 'json-diff', name: 'JSON 对比',
    desc: '两个 JSON 差异对比：逐路径输出新增、删除与修改，接口联调神器。',
    keywords: 'json对比,json diff,json差异,接口对比,json比较工具',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '对比', fn: 'jsonDiff' }],
      placeholder: '输入第一个 JSON', outLabel: '差异结果',
    },
    usage: `<ol>
  <li>依次粘贴两个 JSON（先旧后新），点击“对比”。</li>
  <li>按路径列出差异：- 删除/修改前，+ 新增/修改后。</li>
  <li>完全一致时提示“两个 JSON 完全一致”。</li>
</ol>`,
    faq: [
      { q: '支持数组对比吗？', a: '支持，数组按下标逐项比较（a[0]、a[1]…），并输出增删项。' },
      { q: '键顺序不同算差异吗？', a: '不算。JSON 对象键无序，工具按键名对比，顺序不影响结果。' },
    ],
  },
  {
    slug: 'json-to-ts', name: 'JSON 转 TypeScript 接口',
    desc: 'JSON 转 TypeScript 接口定义：一键生成 interface，前后端类型对齐。',
    keywords: 'json转ts,json转typescript,ts接口生成,type生成,类型定义',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '转换', fn: 'jsonToTs' }],
      placeholder: '粘贴 JSON，如 {"name":"张三","age":18}', outLabel: 'TS 接口',
    },
    usage: `<ol>
  <li>粘贴接口返回的 JSON 示例，点击“转换”。</li>
  <li>生成嵌套 interface Data，字段类型按值推断（string/number/boolean/数组）。</li>
  <li>直接复制进 .ts 文件使用。</li>
</ol>`,
    faq: [
      { q: '嵌套对象怎么处理？', a: '内嵌对象会生成扁平化的 interface 结构（内部展开），字段层级完整保留。' },
      { q: '数组元素类型怎么推断？', a: '取数组第一个元素的类型作为元素类型；空数组生成 any[]。' },
    ],
  },
  {
    slug: 'json-to-go', name: 'JSON 转 Go 结构体',
    desc: 'JSON 转 Go struct：字段名自动转驼峰，附 json tag，Go 开发必备。',
    keywords: 'json转go,go结构体,struct生成,go类型,json tag',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '转换', fn: 'jsonToGo' }],
      placeholder: '粘贴 JSON，如 {"user_name":"x","age":18}', outLabel: 'Go 结构体',
    },
    usage: `<ol>
  <li>粘贴 JSON，点击“转换”。</li>
  <li>生成 Go struct：字段名转驼峰（user_name→UserName），整数转 int64、小数转 float64。</li>
  <li>带 json:"原名" tag，可直接粘贴使用。</li>
</ol>`,
    faq: [
      { q: '时间字段怎么处理？', a: '当前按字符串处理；需要 time.Time 请手动修改字段类型。' },
      { q: '嵌套结构体呢？', a: '当前只生成顶层结构体，嵌套对象内联展开；复杂结构建议逐层转换。' },
    ],
  },
  {
    slug: 'json-path', name: 'JSON 路径提取',
    desc: 'JSON 路径列表：列出全部叶子节点的路径与值，调试解析逻辑。',
    keywords: 'json路径,jsonpath,字段路径,json结构分析,key路径',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '提取路径', fn: 'jsonPaths' }],
      multi: true,
      placeholder: '粘贴 JSON', outLabel: '路径列表',
    },
    usage: `<ol>
  <li>粘贴 JSON，点击“提取路径”。</li>
  <li>输出每个叶子字段的完整路径（a.b.c）与值类型。</li>
  <li>写 JSONPath 查询、理解接口结构时快速参考。</li>
</ol>`,
    faq: [
      { q: '路径格式是什么？', a: '点号分隔：{"a":{"b":1}} 的叶子路径为 a.b，值 1 (number)。' },
      { q: '数组元素怎么表示？', a: '数组元素按下标并入路径：list.0.name。' },
    ],
  },
  {
    slug: 'html-minify', name: 'HTML 压缩',
    desc: 'HTML 压缩/去注释：去除注释与多余空白，减少页面体积。',
    keywords: 'html压缩,html精简,去除注释,html优化,页面减肥',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '压缩', fn: 'minifyHtml' }],
      placeholder: '粘贴 HTML 源码', outLabel: '压缩结果',
    },
    usage: `<ol>
  <li>粘贴 HTML，点击“压缩”。</li>
  <li>删除注释、标签间空白与多余空格，压缩为单行紧凑格式。</li>
  <li>注意：压缩会改变代码可读性，生产构建时使用。</li>
</ol>`,
    faq: [
      { q: '会破坏 script 内容吗？', a: '标签间的空白压缩不影响 script 内部字符串，但 <pre>/<textarea> 内的空白可能变化，谨慎使用。' },
      { q: '能还原吗？', a: '不能，压缩不可逆；请保留原文件。' },
    ],
  },
  {
    slug: 'css-minify', name: 'CSS 压缩',
    desc: 'CSS 压缩：去注释、去空格、合并选择器空白，减小样式体积。',
    keywords: 'css压缩,css精简,去除注释,css优化,样式减肥',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '压缩', fn: 'minifyCss' }],
      placeholder: '粘贴 CSS 源码', outLabel: '压缩结果',
    },
    usage: `<ol>
  <li>粘贴 CSS，点击“压缩”。</li>
  <li>删除注释与空格，如 a { color: red; } → a{color:red}。</li>
  <li>适合构建发布前的样式精简。</li>
</ol>`,
    faq: [
      { q: '字符串里的空格会误删吗？', a: 'content: "a b" 内的空格不会被删除（正则不处理引号内），基本安全。' },
      { q: '支持嵌套语法吗？', a: '纯 CSS 压缩；Less/Sass 嵌套需先编译为 CSS。' },
    ],
  },
  {
    slug: 'js-minify', name: 'JS 压缩',
    desc: 'JS 基础压缩：去除注释、行尾空白与多余空格，保留可读性。',
    keywords: 'js压缩,javascript压缩,去注释,js精简,代码压缩',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '压缩', fn: 'minifyJs' }],
      placeholder: '粘贴 JavaScript 源码', outLabel: '压缩结果',
    },
    usage: `<ol>
  <li>粘贴 JS，点击“压缩”。</li>
  <li>删除注释、多余空格与空行，保留换行结构便于阅读。</li>
  <li>比完整 minifier 保守，保证语法不被破坏。</li>
</ol>`,
    faq: [
      { q: '能压缩变量名吗？', a: '不能（需完整 AST 分析）；本工具只做空白与注释清理，安全性优先。' },
      { q: '模板字符串里的内容会变吗？', a: '不会，字符串与模板字面量内容保持原样。' },
    ],
  },
  {
    slug: 'slug-generator', name: 'URL Slug 生成',
    desc: '生成 URL 友好的 slug：中文转拼音首字母、去除特殊字符、连字符连接。',
    keywords: 'slug生成,url别名,seo链接,中文转拼音,友好链接,slugify',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '生成 Slug', fn: 'toSlug' }],
      placeholder: '输入标题或文本，如：我的第一篇文章！', outLabel: 'Slug',
    },
    usage: `<ol>
  <li>输入标题/文本，点击“生成 Slug”。</li>
  <li>中文转拼音首字母（我的文章→w-dwz），其他字符转连字符。</li>
  <li>博客 URL、CMS 别名、SEO 链接优化常用。</li>
</ol>`,
    faq: [
      { q: '中文为什么转拼音首字母？', a: 'URL 只支持 ASCII，中文转拼音首字母（如“中国”→zg）是常见做法，简短且可读。' },
      { q: '结果会大写吗？', a: '全部小写，符合 URL 规范；特殊字符统一替换为 -。' },
    ],
  },
  {
    slug: 'password-strength', name: '密码强度检测',
    desc: '密码强度评估：长度、字符类别、常见弱密码检测，5 档评分。',
    keywords: '密码强度,密码检测,密码安全,弱密码,强度评分',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '检测', fn: 'passwordStrength' }],
      multi: true,
      placeholder: '输入要检测的密码', outLabel: '检测结果',
    },
    usage: `<ol>
  <li>输入密码，点击“检测”。</li>
  <li>按长度、大小写、数字、符号 4 项给 0-5 档评分，并标记常见弱密码。</li>
  <li>评估结果仅本地计算，不会上传。</li>
</ol>`,
    faq: [
      { q: '什么密码算强？', a: '12 位以上、含大小写+数字+符号、非常见词组合；长度比复杂度更重要。' },
      { q: '会记录我的密码吗？', a: '不会。所有检测在浏览器本地完成，不发送任何数据。' },
    ],
  },
  {
    slug: 'meta-generator', name: 'SEO Meta 生成',
    desc: '生成完整 SEO meta 标签：title、description、OG、Twitter Card 一键输出。',
    keywords: 'meta生成,seo标签,og标签,twitter card,网站描述,seo优化',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'dev', fn: 'metaGenerator',
      inputs: [
        { label: '标题', type: 'text', value: '我的网站 - 免费在线工具' },
        { label: '描述', type: 'text', value: '免费在线工具集合' },
        { label: 'URL', type: 'text', value: 'https://example.com' },
        { label: '关键词', type: 'text', value: '工具,在线,免费' },
      ],
      hint: '输入标题/描述/URL/关键词，输出完整 head 标签片段。',
    },
    usage: `<ol>
  <li>填写标题、描述、URL 与关键词，点击“计算”。</li>
  <li>复制输出到页面 <head> 中即可。</li>
  <li>包含 description、keywords、OG、Twitter Card 与 canonical。</li>
</ol>`,
    faq: [
      { q: 'OG 标签有什么用？', a: 'Open Graph 让分享到微信/微博/社交平台时显示标题+描述+缩略图，提升点击率。' },
      { q: 'title 多长合适？', a: '建议 50-60 字符以内，避免搜索引擎截断；描述 120-160 字符。' },
    ],
  },
  {
    slug: 'sitemap-generator', name: 'Sitemap 生成',
    desc: '生成 sitemap.xml：输入站点 URL 与页面列表，输出标准 XML。',
    keywords: 'sitemap生成,站点地图,seo地图,xml地图,网站地图生成',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'dev', fn: 'sitemapGenerator',
      inputs: [
        { label: '站点根 URL', type: 'text', value: 'https://example.com' },
        { label: '页面路径（逗号/换行分隔）', type: 'text', value: '/about\n/privacy\n/tools/json' },
        { label: '更新频率', type: 'select', options: [['weekly', 'weekly'], ['daily', 'daily'], ['monthly', 'monthly'], ['yearly', 'yearly']], value: 'weekly' },
      ],
      hint: '页面路径自动拼接根 URL，首页自动包含。',
    },
    usage: `<ol>
  <li>填写站点根 URL 与页面路径列表，选择更新频率，点击“计算”。</li>
  <li>输出标准 sitemap.xml，保存为文件并提交到 Google Search Console / Bing。</li>
</ol>`,
    faq: [
      { q: 'sitemap 有什么用？', a: '帮助搜索引擎更快发现和收录页面，新站与深页面尤其重要。' },
      { q: '超过 5 万条怎么办？', a: '协议要求单个 sitemap ≤50000 URL 或 50MB，超出需拆分为多个子 sitemap 并建立索引。' },
    ],
  },
  {
    slug: 'robots-generator', name: 'robots.txt 生成',
    desc: '生成 robots.txt：允许/禁止爬虫规则与 Sitemap 声明一键生成。',
    keywords: 'robots生成,robots.txt,爬虫规则,搜索引擎,seo配置',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'dev', fn: 'robotsGenerator',
      inputs: [
        { label: 'User-agent', type: 'text', value: '*' },
        { label: '允许', type: 'text', value: '/' },
        { label: '禁止路径（逗号/换行分隔）', type: 'text', value: '/admin\n/api' },
        { label: 'Sitemap URL', type: 'text', value: 'https://example.com/sitemap.xml' },
      ],
      hint: '通常 * 表示所有爬虫；百度需单独配置 Baiduspider。',
    },
    usage: `<ol>
  <li>填写规则，点击“计算”。</li>
  <li>输出 robots.txt 内容，保存到网站根目录。</li>
  <li>禁止敏感路径被收录，声明 Sitemap 引导抓取。</li>
</ol>`,
    faq: [
      { q: 'Disallow 和 Allow 优先级？', a: '同一 User-agent 下按规则长度匹配，更具体的路径优先；大部分爬虫遵循“最长匹配”。' },
      { q: '可以屏蔽所有爬虫吗？', a: '可以（Disallow: /），但也会屏蔽搜索引擎收录；正式站点不建议。' },
    ],
  },
  {
    slug: 'keyword-density', name: '关键词密度分析',
    desc: '文本关键词密度分析：分词统计高频词占比，SEO 内容优化参考。',
    keywords: '关键词密度,词频分析,seo关键词,密度检测,关键词优化',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [{ label: '分析', fn: 'keywordDensity' }],
      multi: true,
      placeholder: '粘贴网页文本或文章内容', outLabel: '词频统计',
    },
    usage: `<ol>
  <li>粘贴文本，点击“分析”。</li>
  <li>按出现次数降序列出 Top 30 词与占比。</li>
  <li>单字中文按字统计；英文按单词统计。</li>
</ol>`,
    faq: [
      { q: '关键词密度多少合适？', a: '主流建议 1%-3%，过度堆砌会被判关键词堆砌；内容自然优先。' },
      { q: '为什么单字也算？', a: '中文无空格分词，本工具以单字+英文单词为最小单位；短语密度建议用“关键词计数”。' },
    ],
  },
  {
    slug: 'cron-generator', name: 'Cron 表达式生成',
    desc: 'Cron 表达式生成器：分/时/日/月/周五段式，附人类可读含义。',
    keywords: 'cron生成,cron表达式,定时任务,调度表达式,linux定时',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'dev', fn: 'cronGenerator',
      inputs: [
        { label: '分钟（0-59 或 *）', type: 'text', value: '0' },
        { label: '小时（0-23 或 *）', type: 'text', value: '8' },
        { label: '日（1-31 或 *）', type: 'text', value: '*' },
        { label: '月（1-12 或 *）', type: 'text', value: '*' },
        { label: '周（0-6 或 *）', type: 'text', value: '*' },
      ],
      hint: '五段式：分 时 日 月 周（0=周日）。* 表示任意。',
    },
    usage: `<ol>
  <li>填写分/时/日/月/周（可 *），点击“计算”。</li>
  <li>输出 Cron 表达式与人类可读含义（如每天 8 点）。</li>
  <li>配置 Linux crontab、CI 定时任务、云函数定时触发。</li>
</ol>`,
    faq: [
      { q: '每天 8 点怎么写？', a: '0 8 * * *；每 5 分钟：*/5 * * * *；每周一 9 点：0 9 * * 1。' },
      { q: '支持秒级吗？', a: '标准 cron 五段式不含秒；需要秒级用六段式（部分系统支持），可自行拼接。' },
    ],
  },
  {
    slug: 'totp-generator', name: 'TOTP 验证码生成',
    desc: 'TOTP 动态验证码（RFC 6238）：输入 Base32 密钥实时生成 6 位验证码。',
    keywords: 'totp,动态验证码,谷歌验证器,authenticator,2fa,双因素认证',
    category: 'dev', kind: 'gen',
    gen: {
      lib: 'dev', fn: 'totpGenerate',
      params: [{ name: 'secret', label: 'Base32 密钥', type: 'text', value: 'JBSWY3DPEHPK3PXP' }],
      hint: '与 Google Authenticator / 微信小程序等 2FA 应用算法一致（HMAC-SHA1/30s）。',
    },
    usage: `<ol>
  <li>粘贴 Base32 密钥（从 2FA 绑定时的二维码/明文获取），点击“生成”。</li>
  <li>实时输出当前 6 位验证码与剩余有效秒数。</li>
  <li>密钥仅在本地计算，不离开浏览器。</li>
</ol>`,
    faq: [
      { q: '密钥在哪找？', a: '绑定 2FA 时服务商提供的 Base32 字符串；或扫码前保存的 otpauth:// 链接中的 secret 参数。' },
      { q: '验证码多久变一次？', a: '每 30 秒更新（RFC 6238 标准）；剩余秒数提示到期时间。' },
      { q: '时间不对导致验证失败？', a: '确保设备时间与网络同步（NTP），误差超过 ±1 个窗口会失败。' },
    ],
  },
  {
    slug: 'punycode', name: 'Punycode 域名转换',
    desc: '中文域名与 Punycode 互转：输入中文域名转 xn-- 形式，或反向还原。',
    keywords: 'punycode,中文域名,idn域名,国际化域名,xn--,域名编码',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev', actions: [
        { label: '中文→Punycode', fn: 'punycodeEncode' },
        { label: 'Punycode→中文', fn: 'punycodeDecode' },
      ],
      placeholder: '输入域名，如：中国.com 或 xn--fiqs8s.com', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入中文域名（如 中国.com）点击“中文→Punycode”得到 xn--fiqs8s.com。</li>
  <li>粘贴 xn-- 开头域名点击反向还原。</li>
  <li>DNS 配置、证书签发、邮件头处理时需要。</li>
</ol>`,
    faq: [
      { q: '为什么要转 Punycode？', a: 'DNS 系统只支持 ASCII，中文域名需编码为 xn-- 前缀的 ASCII 形式才能在 DNS 中使用。' },
      { q: '支持 emoji 域名吗？', a: '支持（按 Unicode 码点编码），但 emoji 域名浏览器兼容性差，不建议实际使用。' },
    ],
  },
  {
    slug: 'curl-generator', name: 'cURL 命令生成',
    desc: 'cURL 命令生成器：方法、URL、请求头、请求体一键生成 curl 命令。',
    keywords: 'curl生成,curl命令,接口调试,请求命令,http请求生成',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'dev', fn: 'curlGenerator',
      inputs: [
        { label: '方法', type: 'select', options: [['GET', 'GET'], ['POST', 'POST'], ['PUT', 'PUT'], ['PATCH', 'PATCH'], ['DELETE', 'DELETE']], value: 'POST' },
        { label: 'URL', type: 'text', value: 'https://api.example.com/v1/data' },
        { label: '请求头（每行一个）', type: 'text', value: 'Content-Type: application/json\nAuthorization: Bearer token' },
        { label: '请求体', type: 'text', value: '{"name":"test"}' },
      ],
      hint: 'GET 不带请求体；多行请求头自动展开。',
    },
    usage: `<ol>
  <li>选择方法、填写 URL、请求头与请求体，点击“计算”。</li>
  <li>生成带 -X/-H/-d 参数的完整 curl 命令，复制到终端执行。</li>
  <li>调试 API、复现接口问题、分享请求时常用。</li>
</ol>`,
    faq: [
      { q: 'Windows 能用吗？', a: '可用（curl 已内置 Win10+）；命令行引号需按终端规则调整。' },
      { q: '能生成 Python/JS 版本吗？', a: '当前仅生成 curl；可用浏览器开发者工具“Copy as fetch”生成 JS 版本。' },
    ],
  },
];
