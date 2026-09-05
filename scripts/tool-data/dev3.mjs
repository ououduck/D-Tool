/* dev 分类补强 3 —— 全部为真实可用的开发工具，手写说明与 FAQ */
export default [
  {
    slug: 'regex-escape', name: '正则转义',
    desc: '正则表达式转义：把特殊字符自动加反斜杠，避免正则语法错误。',
    keywords: '正则转义,正则特殊字符,转义正则,regex escape,特殊字符转义',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev3', actions: [{ label: '转义', fn: 'regexEscape' }],
      placeholder: '输入要转义的文本（如 a.b*c）', outLabel: '转义结果',
    },
    usage: `<ol>
  <li>输入文本，点击“转义”。</li>
  <li>特殊字符（. * + ? [ ] 等）自动加反斜杠。</li>
  <li>把用户输入当作字面量匹配时必用。</li>
</ol>`,
    faq: [
      { q: '为什么要转义？', a: '正则中 . * + 等有特殊含义；匹配字面文本不转义会得到错误结果。' },
      { q: '转义后能直接用吗？', a: '能，转义结果可直接放入 new RegExp() 或正则字面量。' },
    ],
  },
  {
    slug: 'color-format', name: '颜色格式转换',
    desc: '颜色格式转换：HEX、RGB、HSL 三种格式互转，支持常用颜色名。',
    keywords: '颜色转换,hex转rgb,rgb转hex,颜色格式,hex转hsl,色值转换',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev3', actions: [{ label: '转换', fn: 'colorFormat' }],
      placeholder: '输入颜色，如 #FF6347、rgb(255,99,71)、tomato', outLabel: '转换结果',
    },
    usage: `<ol>
  <li>输入任意格式颜色（HEX/RGB/常用颜色名），点击“转换”。</li>
  <li>同时输出 HEX、RGB、HSL 三种表示。</li>
  <li>前端样式、设计稿取色、颜色调试常用。</li>
</ol>`,
    faq: [
      { q: '支持缩写 HEX 吗？', a: '支持，如 #f00 自动展开为 #FF0000。' },
      { q: '颜色名支持哪些？', a: '内置常用颜色名（red/green/blue/black 等）；更多名称见“CSS 颜色名速查”。' },
    ],
  },
  {
    slug: 'time-format', name: '毫秒时长格式化',
    desc: '毫秒转天时分秒：时长格式化工具，性能分析常用。',
    keywords: '毫秒转换,时长格式化,天时分秒,毫秒转秒,时间格式,耗时分析',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'dev3', fn: 'timeFormat',
      inputs: [{ label: '毫秒数', type: 'number', value: '86461000' }],
      hint: '输出天时分秒、总秒数、总分钟等多种表示。',
    },
    usage: `<ol>
  <li>输入毫秒数（如接口耗时、视频时长），点击“计算”。</li>
  <li>输出天/时/分/秒与总秒数、总分钟。</li>
  <li>日志耗时分析、倒计时设计、数据展示常用。</li>
</ol>`,
    faq: [
      { q: '86461000ms 是多少？', a: '1 天 0 时 1 分 1 秒（86461000 = 24×3600×1000 + 61000）。' },
      { q: '支持负数吗？', a: '不支持，请输入非负毫秒数。' },
    ],
  },
  {
    slug: 'json-validate', name: 'JSON 校验器',
    desc: 'JSON 校验：检查 JSON 语法是否正确，显示类型与键数。',
    keywords: 'json校验,json验证,json格式检查,json语法,json错误提示',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev3', actions: [{ label: '校验', fn: 'jsonValidate' }],
      placeholder: '粘贴 JSON 内容', outLabel: '校验结果',
    },
    usage: `<ol>
  <li>粘贴 JSON，点击“校验”。</li>
  <li>有效时显示类型与顶层键数；无效时给出错误位置。</li>
  <li>接口联调、配置检查、数据验证常用。</li>
</ol>`,
    faq: [
      { q: '和 JSON 格式化有什么区别？', a: '校验只检查合法性；需要格式化/压缩请用“JSON 格式化”工具。' },
      { q: '能定位错误行吗？', a: '显示浏览器解析器的错误信息（含位置），方便定位。' },
    ],
  },
  {
    slug: 'status-classify', name: 'HTTP 状态码分类',
    desc: 'HTTP 状态码分类速查：输入状态码返回所属类别与含义。',
    keywords: '状态码分类,http状态码,状态码含义,404 500,错误码查询',
    category: 'web', kind: 'calc',
    calc: {
      lib: 'dev3', fn: 'statusClassify',
      inputs: [{ label: '状态码', type: 'number', value: '404' }],
      hint: '1xx 信息 / 2xx 成功 / 3xx 重定向 / 4xx 客户端错误 / 5xx 服务端错误。',
    },
    usage: `<ol>
  <li>输入状态码（100-599），点击“计算”。</li>
  <li>返回类别与排查建议。</li>
  <li>接口报错快速定位问题方向。</li>
</ol>`,
    faq: [
      { q: '404 和 403 怎么区分？', a: '403 是“有权限限制不允许访问”，404 是“资源不存在”；404 也常用于隐藏存在但受限的资源。' },
      { q: '5xx 一定是服务器问题吗？', a: '大多是；但 504 可能是网关/代理配置问题，502 可能是上游应用崩溃。' },
    ],
  },
  {
    slug: 'html-skeleton', name: 'HTML 骨架生成',
    desc: 'HTML 页面骨架生成：标题与语言参数一键生成标准 HTML5 模板。',
    keywords: 'html模板,html骨架,页面模板,html5模板,页面结构,代码模板',
    category: 'dev', kind: 'calc',
    calc: {
      lib: 'dev3', fn: 'htmlSkeleton',
      inputs: [
        { label: '页面标题', type: 'text', value: '页面标题' },
        { label: '语言', type: 'select', options: [['zh-CN', '中文 zh-CN'], ['en', 'English']], value: 'zh-CN' },
      ],
      hint: '生成标准 HTML5 骨架（含 viewport、style、script 占位）。',
    },
    usage: `<ol>
  <li>填写标题与语言，点击“计算”。</li>
  <li>复制生成的 HTML5 骨架到编辑器开始开发。</li>
  <li>新页面起步、快速原型常用。</li>
</ol>`,
    faq: [
      { q: '骨架包含什么？', a: 'DOCTYPE、html/head/body、viewport、title、style 与 script 占位。' },
      { q: '能生成其他语言吗？', a: 'lang 属性可选中文/英文，其余结构通用。' },
    ],
  },
  {
    slug: 'http-headers-template', name: 'HTTP 请求头模板',
    desc: 'HTTP 请求头模板生成：方法与 Content-Type 参数生成标准请求头。',
    keywords: '请求头模板,http头生成,请求头示例,http模板,接口调试',
    category: 'web', kind: 'calc',
    calc: {
      lib: 'dev3', fn: 'httpHeadersTemplate',
      inputs: [
        { label: '方法', type: 'select', options: [['GET', 'GET'], ['POST', 'POST'], ['PUT', 'PUT'], ['DELETE', 'DELETE']], value: 'GET' },
        { label: 'Content-Type', type: 'select', options: [['application/json', 'application/json'], ['application/x-www-form-urlencoded', '表单'], ['multipart/form-data', 'multipart'], ['text/plain', 'text/plain']], value: 'application/json' },
      ],
      hint: '生成含常见头的请求头模板，Token 处替换为实际值。',
    },
    usage: `<ol>
  <li>选择方法与 Content-Type，点击“计算”。</li>
  <li>复制请求头模板，替换 Host 与 Token。</li>
  <li>接口调试、教学演示、报文构造常用。</li>
</ol>`,
    faq: [
      { q: '可以直接发送吗？', a: '模板包含占位符（example.com、token），替换后可用于 curl/Postman。' },
      { q: '为什么有 Cache-Control？', a: '避免调试时缓存干扰，no-cache 强制每次回源。' },
    ],
  },
  {
    slug: 'gitignore-template', name: 'gitignore 模板',
    desc: 'gitignore 模板生成：一键输出通用 .gitignore（Node/前端项目）。',
    keywords: 'gitignore,gitignore模板,忽略文件,git忽略,node忽略文件',
    category: 'dev', kind: 'gen',
    gen: {
      lib: 'dev3', fn: 'gitignoreTemplate',
      params: [],
      hint: '覆盖 node_modules、构建产物、环境变量、日志、编辑器文件。',
    },
    usage: `<ol>
  <li>点击“生成”，复制 .gitignore 内容到项目根目录。</li>
  <li>适合 Node/前端项目；其他语言按需追加规则。</li>
  <li>避免把依赖与敏感配置提交到仓库。</li>
</ol>`,
    faq: [
      { q: '环境变量为什么要忽略？', a: '.env 含密钥与数据库密码，提交到仓库是常见安全事故；用 .env.example 提交模板。' },
      { q: '已提交的文件能忽略吗？', a: '不能，gitignore 只对未跟踪文件生效；已跟踪需 git rm --cached 后重新提交。' },
    ],
  },
];
