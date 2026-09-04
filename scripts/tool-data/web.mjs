/* web（网络信息）分类工具定义 —— 全部为真实可用的网络工具，手写说明与 FAQ */
export default [
  {
    slug: 'http-headers-parse', name: 'HTTP 请求头解析',
    desc: 'HTTP 请求头解析：粘贴原始请求头文本，逐行解析为名称/值表格。',
    keywords: '请求头解析,http头解析,header解析,请求头查看,http报文',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'web', actions: [{ label: '解析', fn: 'parseHeaders' }],
      multi: true,
      placeholder: '粘贴请求头，如：\nContent-Type: application/json\nAuthorization: Bearer xxx',
      outLabel: '解析结果',
    },
    usage: `<ol>
  <li>粘贴原始请求头（每行 名称: 值），点击“解析”。</li>
  <li>逐行拆分为名称与值，忽略空行与格式错误的行。</li>
  <li>调试接口、分析抓包数据时快速整理。</li>
</ol>`,
    faq: [
      { q: '支持多行值吗？', a: '每行视为一个头；多行折叠值需先手工合并。' },
      { q: '大小写会保留吗？', a: '保留原样；HTTP 头名称不区分大小写，但惯例为首字母大写。' },
    ],
  },
  {
    slug: 'cookie-parse', name: 'Cookie 解析',
    desc: 'Cookie 字符串解析：将 Set-Cookie/Cookie 文本拆分为名称与值列表。',
    keywords: 'cookie解析,cookie查看,cookie工具,会话cookie,浏览器cookie',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'web', actions: [{ label: '解析', fn: 'parseCookies' }],
      multi: true,
      placeholder: '粘贴 Cookie，如：session=abc123; theme=dark; lang=zh-CN',
      outLabel: '解析结果',
    },
    usage: `<ol>
  <li>粘贴 Cookie 字符串（分号分隔），点击“解析”。</li>
  <li>输出每个名称/值对，便于查看与调试。</li>
  <li>可粘贴浏览器 DevTools 中复制的 Cookie 或响应头 Set-Cookie。</li>
</ol>`,
    faq: [
      { q: 'Cookie 和 Set-Cookie 有区别吗？', a: '有。Cookie 是请求头发送的值对；Set-Cookie 是响应头（含 Domain/Path/Expires 等属性）。本工具解析值对部分。' },
      { q: '值里有分号怎么办？', a: '分号是 Cookie 分隔符，值内含分号属少见情况；如遇截断请手工处理。' },
    ],
  },
  {
    slug: 'url-params', name: 'URL 参数解析',
    desc: 'URL 查询参数解析：自动解码 URL 编码，输出参数名与值列表。',
    keywords: 'url参数,查询参数解析,query参数,参数提取,url解码,query string',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'web', actions: [{ label: '解析', fn: 'urlParams' }],
      multi: true,
      placeholder: '粘贴带 ? 的 URL，如：https://x.com/path?a=1&b=hello%20world',
      outLabel: '参数列表',
    },
    usage: `<ol>
  <li>粘贴完整 URL，点击“解析”。</li>
  <li>提取 ? 后全部参数，自动解码 %20、+ 等转义。</li>
  <li>调试跳转链接、分析埋点参数、构造接口请求常用。</li>
</ol>`,
    faq: [
      { q: '没有参数会怎样？', a: '提示“URL 中没有查询参数”；带 #hash 的部分会忽略。' },
      { q: '重复参数名怎么办？', a: '逐个列出（同名多条），不合并；需要合并可自行处理结果。' },
    ],
  },
  {
    slug: 'http-request-build', name: 'HTTP 请求报文生成',
    desc: '生成原始 HTTP 请求报文：方法、路径、Host、请求头、请求体一键拼装。',
    keywords: 'http报文,请求报文生成,http请求构造,原始请求,报文模板',
    category: 'web', kind: 'calc',
    calc: {
      lib: 'web', fn: 'rawRequest',
      inputs: [
        { label: '方法', type: 'select', options: [['GET', 'GET'], ['POST', 'POST'], ['PUT', 'PUT'], ['DELETE', 'DELETE'], ['PATCH', 'PATCH']], value: 'GET' },
        { label: '路径', type: 'text', value: '/api/users' },
        { label: 'Host', type: 'text', value: 'api.example.com' },
        { label: '请求头（每行一个）', type: 'textarea', value: 'Accept: application/json' },
        { label: '请求体（可选）', type: 'textarea', value: '', rows: 2 },
      ],
      hint: '输出 HTTP/1.1 原始报文，可用于 nc/telnet 调试或协议学习。',
    },
    usage: `<ol>
  <li>选择方法、填写路径、Host 与请求头，点击“计算”。</li>
  <li>输出 HTTP/1.1 原始报文（含空行与可选请求体）。</li>
  <li>可用 nc 或 telnet 直接发送，协议调试与教学场景。</li>
</ol>`,
    faq: [
      { q: '报文能直接用吗？', a: '可配合 nc -v host 80 粘贴发送；HTTPS 需要 TLS，不能用明文报文。' },
      { q: 'Host 头必须吗？', a: 'HTTP/1.1 必须带 Host 头（虚拟主机路由依据），本工具自动生成。' },
    ],
  },
  {
    slug: 'encoding-detect', name: '文本编码检测',
    desc: '文本编码分析：检测 UTF-8 合法性、是否含中文、字节数统计。',
    keywords: '编码检测,字符编码,utf8检测,乱码检测,编码分析,文本编码',
    category: 'web', kind: 'transform',
    transform: {
      lib: 'web', actions: [{ label: '检测', fn: 'detectEncoding' }],
      multi: true,
      placeholder: '粘贴要检测的文本',
      outLabel: '检测结果',
    },
    usage: `<ol>
  <li>粘贴文本，点击“检测”。</li>
  <li>输出 UTF-8 合法性（字节序列检查）、是否含中文与字节数。</li>
  <li>排查乱码问题时判断内容是否为合法 UTF-8。</li>
</ol>`,
    faq: [
      { q: '能检测 GBK 吗？', a: '浏览器环境输入已是 Unicode；本工具检查内容是否构成合法 UTF-8 序列，无法反推原始字节编码。' },
      { q: '乱码文本能修复吗？', a: '无法直接修复，需知道原始编码；可先用“十六进制互转”查看字节再判断。' },
    ],
  },



];
