/* codec（编码加密）分类补强 2 —— 全部为真实算法，手写说明与 FAQ */
export default [
  {
    slug: 'base62', name: 'Base62 编码',
    desc: 'Base62 编码/解码（0-9a-zA-Z）：短链接、邀请码场景常用的紧凑编码。',
    keywords: 'base62,base62编码,base62解码,短链编码,邀请码,url安全编码',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: '编码', fn: 'base62Encode' }, { label: '解码', fn: 'base62Decode' },
      ],
      placeholder: '输入文本或 Base62 字符串', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本点击“编码”得到 Base62；粘贴 Base62 串点击“解码”。</li>
  <li>字符集为 0-9、A-Z、a-z 共 62 个 URL 安全字符。</li>
  <li>短链接系统、邀请码、数据库 ID 混淆常用。</li>
</ol>`,
    faq: [
      { q: 'Base62 和 Base64 什么区别？', a: 'Base62 不含 + / = 等需转义字符，可直接放入 URL；体积比 Base64 略大（约 38% 膨胀）。' },
      { q: '适合什么场景？', a: '短链 ID、邀请码、优惠码等需要“短 + URL 安全”的标识场景。' },
    ],
  },
  {
    slug: 'base36', name: 'Base36 编码',
    desc: 'Base36 编码/解码（0-9a-z）：字母数字混合的紧凑编码，短 ID 常用。',
    keywords: 'base36,base36编码,base36解码,短id,36进制,邀请码',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: '编码', fn: 'base36Encode' }, { label: '解码', fn: 'base36Decode' },
      ],
      placeholder: '输入文本或 Base36 字符串', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本点击“编码”；粘贴 Base36 串点击“解码”。</li>
  <li>字符集为 0-9、a-z 共 36 个，全部小写可读性更好。</li>
  <li>短 ID、优惠码、注册码场景常用。</li>
</ol>`,
    faq: [
      { q: '和 36 进制转换一样吗？', a: '本质上都是 36 进制，但本工具按 UTF-8 字节流编码任意文本（含中文），而进制转换工具处理数字。' },
      { q: '大小写敏感吗？', a: '解码时大小写不敏感（统一按小写处理）；编码输出小写。' },
    ],
  },
  {
    slug: 'rot5', name: 'ROT5/ROT18 旋转',
    desc: 'ROT5（数字旋转 5 位）与 ROT18（字母 ROT13 + 数字 ROT5）编解码。',
    keywords: 'rot5,rot18,数字旋转,验证码混淆,字母数字旋转,文本混淆',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: 'ROT5', fn: 'rot5' }, { label: 'ROT18', fn: 'rot18' },
      ],
      placeholder: '输入需要旋转的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>ROT5：只旋转数字 0-9（各移 5 位）；ROT18：字母 ROT13 + 数字 ROT5。</li>
  <li>两者都是自逆变换，再次执行即还原。</li>
  <li>验证码防 OCR、简单混淆场景常用。</li>
</ol>`,
    faq: [
      { q: 'ROT18 是 ROT13+ROT5 吗？', a: '是的，ROT18 同时处理字母与数字，一次完成两类旋转。' },
      { q: '能防住程序识别吗？', a: '只能防“一眼看穿”，正则即可破解；仅用于低强度混淆。' },
    ],
  },
  {
    slug: 'nato-alphabet', name: 'NATO 音标字母',
    desc: 'NATO 音标字母表：字母转无线电标准读法（Alfa/Bravo/Charlie），反向还原。',
    keywords: 'nato音标,北约音标,无线电读法,字母音标,phonetic,报读字母',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: '字母→音标', fn: 'natoEncode' }, { label: '音标→字母', fn: 'natoDecode' },
      ],
      placeholder: '输入字母（如 SOS）或音标文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“字母→音标”：每个字母输出标准 NATO 读法（SOS → Sierra Oscar Sierra）。</li>
  <li>“音标→字母”：从读法文本还原字母。</li>
  <li>对讲机通话、客服报单号、语音传达关键信息时避免混淆。</li>
</ol>`,
    faq: [
      { q: '为什么用音标读法？', a: 'B/P、M/N 等在电话或嘈杂环境中极易听混，音标单词发音差异大，能显著降低误听率。' },
      { q: '数字怎么读？', a: '数字按标准读法（zero/one/two…），本工具以“数字 X”形式标注。' },
    ],
  },
  {
    slug: 'pigpen', name: '猪圈密码',
    desc: '猪圈密码（Pigpen Cipher）编解码：经典网格替换密码，趣味解密工具。',
    keywords: '猪圈密码,pigpen,网格密码,古典密码,密文解密,趣味密码',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: '编码', fn: 'pigpenEncode' }, { label: '解码', fn: 'pigpenDecode' },
      ],
      placeholder: '输入字母或 [网格符号] 编码文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>“编码”：字母转为网格位置符号 [行列]（带点/叉标记区分三组网格）。</li>
  <li>“解码”：粘贴符号文本还原字母。</li>
  <li>解密题、游戏彩蛋、密室逃脱谜题常用。</li>
</ol>`,
    faq: [
      { q: '猪圈密码安全吗？', a: '不安全，只是历史上用于简单保密与共济会装饰；现在主要用于谜题与娱乐。' },
      { q: 'I 和 J 怎么处理？', a: '传统猪圈密码 26 字母分 3×9 网格，I/J 共用一个位置；编码时 J 归为 I。' },
    ],
  },
  {
    slug: 'keyboard-shift', name: '键盘移位密码',
    desc: '键盘移位密码：按 QWERTY 键盘同行左右移动字符，趣味文本变换。',
    keywords: '键盘移位,键盘密码,qwerty,手滑密码,错位输入,字符移位',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: '右移一位', fn: 'keyboardShiftRight' }, { label: '左移一位', fn: 'keyboardShiftLeft' },
      ],
      placeholder: '输入文本（如 hello → jr;;p）', outLabel: '结果',
    },
    usage: `<ol>
  <li>“右移”：每个字符在同一键盘行向右移一格（h→j）；“左移”反向。</li>
  <li>模拟手放在错误位置打字的“手滑密码”。</li>
  <li>左移可还原右移结果（反之亦然）。</li>
</ol>`,
    faq: [
      { q: '还原需要几次？', a: '一次反向移动即可还原；连续右移两次需左移两次还原。' },
      { q: '特殊字符会处理吗？', a: '只在同一键盘行内移动（含数字行与符号），行首行尾循环，中文保留原样。' },
    ],
  },
  {
    slug: 'substitution', name: '单表替换密码',
    desc: '单表替换密码：密钥生成替换字母表，古典替换加密/解密。',
    keywords: '单表替换,替换密码,密钥替换,古典密码,字母表替换,cipher',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: '加密', fn: 'substitutionEncode' }, { label: '解密', fn: 'substitutionDecode' },
      ],
      params: [{ name: 'key', label: '密钥（字母）', type: 'text', value: 'ZEBRA' }],
      placeholder: '输入明文或密文', outLabel: '结果',
    },
    usage: `<ol>
  <li>填写密钥（仅取字母，自动去重并补齐 26 字母表）。</li>
  <li>“加密”按替换表逐字母替换；“解密”反向还原。</li>
  <li>密钥一致才能正确还原。</li>
</ol>`,
    faq: [
      { q: '密钥怎么生成替换表？', a: '密钥字母在前（去重），剩余字母按 A-Z 补齐，如密钥 ZEBRA → ZEBRACDFGHIJKLMNOPQSTUVWXY。' },
      { q: '安全吗？', a: '单表替换可被频率分析轻松破解（英文文本中 e/t/a 频率特征明显），仅适合教学与谜题。' },
    ],
  },
  {
    slug: 'aes-encrypt', name: 'AES 加解密',
    desc: 'AES-256-GCM 文本加解密：密码派生密钥，本地加密，输出 Base64。',
    keywords: 'aes加密,aes解密,文本加密,对称加密,gcm加密,本地加密',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec2', actions: [
        { label: '加密', fn: 'aesEncrypt' }, { label: '解密', fn: 'aesDecrypt' },
      ],
      params: [{ name: 'password', label: '密码', type: 'text', value: '' }],
      placeholder: '输入明文或 Base64 密文', outLabel: '结果',
    },
    usage: `<ol>
  <li>填写密码，输入文本。</li>
  <li>“加密”：AES-256-GCM 加密（密码经 PBKDF2 派生密钥），输出 Base64（含随机 IV）。</li>
  <li>“解密”：粘贴密文与相同密码还原；密码错误会提示。</li>
</ol>`,
    faq: [
      { q: '安全吗？', a: '使用 WebCrypto 标准 AES-256-GCM，密码经 1 万次 PBKDF2 派生；加密强度取决于密码强度。' },
      { q: '换设备能解密吗？', a: '可以，密文是自包含的（含 IV），任何支持 AES-GCM 的工具用相同密码都能解密。' },
      { q: '密码忘了怎么办？', a: '无法找回，AES 没有后门；请妥善保管密码。' },
    ],
  },
];
