/* codec（编码加密）分类工具定义 —— 每个工具都有真实算法（lib/codec.js 等），手写说明与 FAQ */
export default [
  {
    slug: 'base58', name: 'Base58 编码',
    desc: 'Base58 编码/解码（比特币字母表），去除易混淆字符 0/O/I/l，常用于地址与短 ID。',
    keywords: 'base58,base58编码,base58解码,比特币地址,base58check,短id',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '编码', fn: 'base58Encode' }, { label: '解码', fn: 'base58Decode' },
      ],
      placeholder: '输入文本或 Base58 字符串', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入任意文本，点击“编码”得到 Base58；粘贴 Base58 串点击“解码”还原。</li>
  <li>Base58 字符集为 1-9、A-H、J-N、P-Z、a-k、m-z（去掉了 0、O、I、l 四个易混淆字符）。</li>
  <li>比特币地址、IPFS CID、部分短链接服务都使用 Base58。</li>
</ol>`,
    faq: [
      { q: 'Base58 和 Base64 有什么区别？', a: 'Base58 去掉了 0/O/I/l 等易混淆字符，也不含 +/ 符号，方便人工抄写和语音传达；代价是体积略大（约膨胀 27%）。' },
      { q: 'Base58Check 是什么？', a: 'Base58Check 是在 Base58 前附加 4 字节校验（对原数据做两次 SHA-256 取前 4 字节），比特币地址就是 Base58Check 编码。' },
      { q: '支持中文吗？', a: '支持。编码按 UTF-8 处理，中文、emoji 都能正确编码与还原。' },
    ],
  },
  {
    slug: 'base85', name: 'Base85 编码',
    desc: 'Base85（RFC 1924）编码/解码，与 Python base64.b85 完全兼容，比 Base64 更紧凑。',
    keywords: 'base85,ascii85,rfc1924,base85编码,base85解码,python b85',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '编码', fn: 'base85Encode' }, { label: '解码', fn: 'base85Decode' },
      ],
      placeholder: '输入文本或 Base85 字符串', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本点击“编码”，粘贴 Base85 串点击“解码”。</li>
  <li>本实现遵循 RFC 1924 字母表，与 Python 标准库 base64.b85encode/b85decode 输出一致。</li>
  <li>Base85 每 4 字节输出 5 字符，膨胀率约 25%，比 Base64（33%）更紧凑。</li>
</ol>`,
    faq: [
      { q: 'Base85 和 Ascii85 一样吗？', a: '不同。Ascii85（Adobe）用 <~ ~> 包裹且使用不同的字母表；本工具实现的是 RFC 1924，对应 Python 的 b85。' },
      { q: '为什么输出里有特殊符号？', a: 'RFC 1924 字母表包含 85 个字符：数字、大小写字母加 !#$%&()*+-;<=>?@^_\`{|}~ 等符号，属正常现象。' },
      { q: '适合什么场景？', a: '需要紧凑文本传输的二进制场景，如嵌入 URL 参数、配置文件存储二进制数据；解压文件时也要配套解码。' },
    ],
  },
  {
    slug: 'base91', name: 'Base91 编码',
    desc: 'Base91 编码/解码：使用 91 个可打印字符，膨胀率约 23%，比 Base64 更省空间。',
    keywords: 'base91,base91编码,base91解码,紧凑编码,二进制转文本',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '编码', fn: 'base91Encode' }, { label: '解码', fn: 'base91Decode' },
      ],
      placeholder: '输入文本或 Base91 字符串', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本点击“编码”，粘贴 Base91 串点击“解码”。</li>
  <li>Base91 使用 91 个可打印字符（不含空格与易混淆字符），编码效率接近理论极限。</li>
  <li>常用于对体积敏感的文本化二进制传输。</li>
</ol>`,
    faq: [
      { q: '为什么叫 Base91 而不是 Base85/95？', a: '可打印 ASCII 字符约 95 个，去掉空格等后可用 91 个；91 = 2^13 的近似最优基，13 比特可编码 8192 个值，利用率高于 Base64。' },
      { q: '比 Base64 省多少？', a: 'Base91 膨胀率约 23%，Base64 约 33%，同样数据 Base91 更短；代价是编解码稍复杂。' },
      { q: '支持中文吗？', a: '支持，统一按 UTF-8 字节流处理，与编码文本的语言无关。' },
    ],
  },
  {
    slug: 'rot13', name: 'ROT13/ROT47 旋转',
    desc: 'ROT13（字母旋转 13 位）与 ROT47（可打印字符旋转 47 位）编解码，用于简单的文本混淆。',
    keywords: 'rot13,rot47,凯撒旋转,字母旋转,文本混淆,rot5',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: 'ROT13', fn: 'rot13' }, { label: 'ROT47', fn: 'rot47' },
      ],
      placeholder: '输入需要旋转的文本', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本，点击 ROT13 旋转字母（a-z/A-Z 各移 13 位），点击 ROT47 旋转全部可打印字符。</li>
  <li>两者都是自逆变换：对结果再执行一次即还原原文。</li>
  <li>ROT13 常用于论坛隐藏剧透；ROT47 可混淆含数字、符号的文本。</li>
</ol>`,
    faq: [
      { q: 'ROT13 是加密吗？', a: '不是。它只是简单的字母替换，没有密钥，任何人都能还原，只能防“一眼看到”，不能保护任何真实秘密。' },
      { q: 'ROT5 和 ROT13 什么关系？', a: 'ROT5 只旋转数字 0-9，常与 ROT13 组合为 ROT5/13/18 处理数字+字母，用于验证码或简易混淆。' },
      { q: '中文会被旋转吗？', a: 'ROT13 只处理英文字母；中文、标点原样保留（ROT47 也仅处理 ASCII 可见字符）。' },
    ],
  },
  {
    slug: 'atbash', name: 'Atbash 密码',
    desc: 'Atbash 替换密码：字母表首尾对调（A↔Z、B↔Y），经典希伯来密码，可解密还原。',
    keywords: 'atbash,埃特巴什,替换密码,字母反序,古典密码,字母表对调',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '加密/解密', fn: 'atbash' },
      ],
      placeholder: '输入需要处理的文本（自逆变换）', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本点击按钮：A↔Z、B↔Y 依次对调，字母大小写保持。</li>
  <li>Atbash 是自逆变换，同一按钮加密与解密。</li>
  <li>源自希伯来语，后用于《圣经》密码与古典文学谜题。</li>
</ol>`,
    faq: [
      { q: 'Atbash 安全吗？', a: '不安全，它只有一种固定映射且没有密钥，属于教学用古典密码，现代密码学早已弃用。' },
      { q: '怎么还原？', a: '再次执行 Atbash 即可还原：对调两次等于原样。' },
      { q: '非字母字符怎么处理？', a: '数字、空格、标点与中文全部保留原样，只对 26 个英文字母生效。' },
    ],
  },
  {
    slug: 'vigenere', name: '维吉尼亚密码',
    desc: '维吉尼亚密码加密/解密：用密钥重复扩展对字母位移，古典多表替换密码。',
    keywords: '维吉尼亚,维吉尼亚密码,vigenere,多表替换,古典密码,密钥加密',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '加密', fn: 'vigenere' }, { label: '解密', fn: 'vigenereDecode' },
      ],
      params: [{ name: 'key', label: '密钥（字母）', type: 'text', value: 'key' }],
      placeholder: '输入明文或密文', outLabel: '结果',
    },
    usage: `<ol>
  <li>填写密钥（仅取字母，如 secret），输入文本。</li>
  <li>点击“加密”逐字母位移得到密文；粘贴密文点击“解密”还原。</li>
  <li>密钥越长、越随机，破译难度越高；短密钥可用频率分析破解。</li>
</ol>`,
    faq: [
      { q: '和凯撒密码有什么区别？', a: '凯撒对所有字母用同一个位移量；维吉尼亚按密钥字母逐位变化位移量（A=0、B=1…），相同字母在不同位置加密结果可能不同。' },
      { q: '为什么解密结果偶尔不对？', a: '本工具只处理英文字母且密钥只取字母，中文与符号原样保留；请确认密钥一致且未混入非字母字符。' },
      { q: '维吉尼亚密码安全吗？', a: '历史上曾被认为不可破，但 1863 年卡西斯基测试可破解；现代标准至少要求密钥长于明文且完全随机。' },
    ],
  },
  {
    slug: 'rail-fence', name: '栅栏密码',
    desc: '栅栏密码（Zigzag）加密/解密：按 N 条轨道之字形排列字符后按行读出，经典换位密码。',
    keywords: '栅栏密码,rail fence,之字形密码,换位密码,古典密码,分栏加密',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '加密', fn: 'railFence' }, { label: '解密', fn: 'railFenceDecode' },
      ],
      params: [{ name: 'rails', label: '轨道数', type: 'number', value: '3', min: '2' }],
      placeholder: '输入明文或密文', outLabel: '结果',
    },
    usage: `<ol>
  <li>设置轨道数（2-20，默认 3），输入文本。</li>
  <li>“加密”把字符按之字形写入 N 条轨道后逐行读出；“解密”反向还原。</li>
  <li>轨道数越多，字符被打散得越远。</li>
</ol>`,
    faq: [
      { q: '栅栏密码和“栅栏”二字什么关系？', a: '加密时字符像在篱笆的栅栏条之间之字形上下走，因此得名；它是纯换位密码，不改变字符本身。' },
      { q: '怎么选择轨道数？', a: '常用 2-5。轨道数增加会加大“打散”效果，但也更易写错；解密时轨道数必须与加密一致。' },
      { q: '为什么还原后和原文一样？', a: '换位密码只是重排位置，不改变字符，所以解密（逆向重排）后与原文逐字一致，中文同样支持。' },
    ],
  },
  {
    slug: 'bacon', name: '培根密码',
    desc: '培根密码编解码：每个字母用 5 位 A/B（或 0/1）表示，可隐藏在普通文本中。',
    keywords: '培根密码,bacon,培根cipher,ab密码,隐写,古典密码',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '编码', fn: 'baconEncode' }, { label: '解码', fn: 'baconDecode' },
      ],
      placeholder: '输入字母文本或 A/B 序列', outLabel: '结果',
    },
    usage: `<ol>
  <li>“编码”：输入英文（仅 A-Z），每个字母输出 5 位 A/B 码，如 A=AAAAA、B=AAAAB。</li>
  <li>“解码”：输入 A/B 序列（可含空格），每 5 位还原一个字母；I/J、U/V 共用一组码。</li>
  <li>可把 A/B 映射为两种字体的文本做隐写（经典用法）。</li>
</ol>`,
    faq: [
      { q: '培根密码的原理？', a: '培根（Francis Bacon）提出用 5 位二元码表示字母（2^5=32 种组合），可通过两种视觉差异（如字体、粗细）隐藏信息。' },
      { q: 'I 和 J 怎么区分？', a: '本实现按古典培根密码约定 I/J 与 U/V 共用同一码组，解码时统一还原为 I 和 U；现代变体可用 26 个独立码。' },
      { q: '能隐藏中文吗？', a: '不能直接隐藏，需先把中文转成拼音或 Unicode 码点再编码；本工具仅处理 A-Z。' },
    ],
  },
  {
    slug: 'affine', name: '仿射密码',
    desc: '仿射密码加密/解密：y = (ax + b) mod 26 线性变换，带密钥的古典单表替换密码。',
    keywords: '仿射密码,affine,线性密码,单表替换,古典密码,数学密码',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '加密', fn: 'affineCipher' }, { label: '解密', fn: 'affineDecode' },
      ],
      params: [
        { name: 'a', label: '乘数 a（与 26 互质）', type: 'number', value: '5' },
        { name: 'b', label: '偏移 b', type: 'number', value: '8' },
      ],
      placeholder: '输入明文或密文', outLabel: '结果',
    },
    usage: `<ol>
  <li>设置乘数 a 与偏移 b，输入文本。</li>
  <li>加密：y = (a·x + b) mod 26；解密需要 a 与 26 互质（1,3,5,7,9,11,15,17,19,21,23,25）。</li>
  <li>a 决定替换表“斜度”，b 决定起点偏移，组合出 312 种替换表。</li>
</ol>`,
    faq: [
      { q: '为什么 a 必须与 26 互质？', a: '解密需要求 a 的模逆元，只有 a 与 26 互质时逆元才存在；否则多个字母会映射到同一个密文字母，无法还原。' },
      { q: '仿射密码有多少种组合？', a: 'a 有 12 种选择（1-25 中与 26 互质的数），b 有 26 种，共 312 种替换表；暴力穷举很快，只适合教学与谜题。' },
      { q: '凯撒密码和仿射密码的关系？', a: '凯撒是仿射密码的特例（a=1），只做平移；仿射增加了乘法变换，两者都属于单表替换。' },
    ],
  },
  {
    slug: 'xor', name: 'XOR 异或加密',
    desc: 'XOR 异或加密/解密：用密钥对字节流逐位异或，输出 Base64，同一操作可加密与解密。',
    keywords: 'xor加密,异或加密,异或解密,对称加密,简单加密,xor cipher',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '加密', fn: 'xorEncrypt' }, { label: '解密', fn: 'xorDecrypt' },
      ],
      params: [{ name: 'key', label: '密钥', type: 'text', value: 'secret' }],
      placeholder: '输入明文或 Base64 密文', outLabel: '结果',
    },
    usage: `<ol>
  <li>填写密钥，输入文本。</li>
  <li>“加密”把文本按 UTF-8 转字节后与密钥循环异或，输出 Base64；“解密”需使用相同密钥。</li>
  <li>XOR 是对称操作：同一密钥再执行一次即还原。</li>
</ol>`,
    faq: [
      { q: 'XOR 加密安全吗？', a: '不安全。短密钥 XOR 可用频率分析/已知明文破解；若密钥长于数据且完全随机（一次性密码本）才是信息论安全的。XOR 常用于简单的数据混淆。' },
      { q: '密钥可以含中文吗？', a: '可以。密钥与数据都按 UTF-8 转字节后逐字节异或，中文密钥同样生效。' },
      { q: '密文为什么是 Base64？', a: '异或后的字节可能不是可打印字符，用 Base64 表示便于复制存储，同时兼容本工具的文本输入框。' },
    ],
  },
  {
    slug: 'crc32', name: 'CRC32 校验',
    desc: 'CRC32 校验值计算：文本或文件的 32 位循环冗余校验，用于数据完整性检测。',
    keywords: 'crc32,crc32校验,循环冗余校验,文件校验,数据完整性,crc计算',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '计算 CRC32', fn: 'crc32' },
      ],
      placeholder: '输入文本计算 CRC32（小写十六进制）', outLabel: 'CRC32',
    },
    usage: `<ol>
  <li>输入任意文本（UTF-8），点击“计算 CRC32”得到 8 位十六进制校验值。</li>
  <li>常见压缩包（zip/gzip）与网络协议用它检测传输/存储损坏。</li>
  <li>校验值会随内容任何一位变化而剧烈改变。</li>
</ol>`,
    faq: [
      { q: 'CRC32 能防篡改吗？', a: '不能。CRC32 只有 32 位且是线性校验，容易构造碰撞，只用于检测随机损坏（误码），不适用于安全校验；安全场景用 SHA-256。' },
      { q: '为什么有时和别人算的不一样？', a: 'CRC32 有多种变体（初始值、反射、异或输出不同）。本工具采用标准 zlib/PKZIP 参数（init 0xFFFFFFFF、reflected），即 Python zlib.crc32 的结果。' },
      { q: '和 MD5 有什么区别？', a: 'MD5 是密码学哈希（128 位），CRC32 是检错码（32 位）；CRC32 速度快得多但碰撞概率高，两者用途不同。' },
    ],
  },
  {
    slug: 'crc16', name: 'CRC16 校验',
    desc: 'CRC16 校验值计算（CCITT-FALSE 参数）：Modbus、X.25 等工业协议常用的 16 位校验。',
    keywords: 'crc16,modbus crc,crc16校验,ccitt,循环冗余校验,工业协议校验',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '计算 CRC16', fn: 'crc16' },
      ],
      placeholder: '输入文本计算 CRC16（4 位十六进制）', outLabel: 'CRC16',
    },
    usage: `<ol>
  <li>输入文本（UTF-8），点击“计算 CRC16”得到 4 位十六进制校验值。</li>
  <li>本工具使用 CRC-16/CCITT-FALSE（poly 0x1021、初值 0xFFFF），常见于 Modbus、PPP 等协议。</li>
  <li>适合嵌入式开发、串口协议调试时快速核对报文校验。</li>
</ol>`,
    faq: [
      { q: 'CRC16 有多少种参数？', a: '很多。CCITT-FALSE、XMODEM、MODBUS、USB 等使用不同初值/反射/异或输出。请先确认协议要求的参数，本工具固定为 CCITT-FALSE。' },
      { q: 'Modbus 的 CRC16 一样吗？', a: 'Modbus 使用 CRC-16/MODBUS（初值 0xFFFF、输入反射、输出异或 0x0000），与本工具的 CCITT-FALSE 不同，注意区分。' },
      { q: '能校验文件吗？', a: '本工具接受文本输入；大文件请先用其他工具读取为文本/十六进制后校验，或使用本站 SHA 工具的“文件哈希”能力。' },
    ],
  },
  {
    slug: 'adler32', name: 'Adler-32 校验',
    desc: 'Adler-32 校验值计算：zlib 使用的 32 位校验算法，比 CRC32 更快。',
    keywords: 'adler32,adler校验,zlib校验,快速校验,滚动校验',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '计算 Adler-32', fn: 'adler32' },
      ],
      placeholder: '输入文本计算 Adler-32', outLabel: 'Adler-32',
    },
    usage: `<ol>
  <li>输入文本点击“计算 Adler-32”，得到 8 位十六进制校验值。</li>
  <li>zlib 压缩格式用它做二级校验，也用于快速检测数据损坏。</li>
  <li>与 CRC32 参数一致（Python zlib.adler32 同款）。</li>
</ol>`,
    faq: [
      { q: 'Adler-32 和 CRC32 哪个好？', a: 'Adler-32 计算更快但碰撞更差（对短数据与连续数据不敏感），CRC32 检错能力更强；zlib 选择 Adler-32 是速度与实现简单的折中。' },
      { q: '值域多大？', a: 'Adler-32 基于 65521 取模的两段累加（a、b 各 16 位），输出 32 位。' },
      { q: '与 CRC32 结果能互换吗？', a: '不能。两者算法完全不同，同一个文本得到的校验值不同，校验时必须使用与对方一致的算法。' },
    ],
  },
  {
    slug: 'hmac', name: 'HMAC 消息认证码',
    desc: 'HMAC-MD5/SHA-1/SHA-256 计算：带密钥的哈希，用于 API 签名、消息完整性验证。',
    keywords: 'hmac,hmac-sha256,hmac-md5,消息认证码,api签名,密钥哈希',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '计算 HMAC', fn: 'hmac' },
      ],
      params: [
        { name: 'algorithm', label: '算法', type: 'select', options: [['SHA-256', 'SHA-256'], ['SHA-1', 'SHA-1'], ['MD5', 'MD5'], ['SHA-384', 'SHA-384'], ['SHA-512', 'SHA-512']], value: 'SHA-256' },
        { name: 'key', label: '密钥', type: 'text', value: 'secret' },
      ],
      placeholder: '输入要签名的消息', outLabel: 'HMAC 结果',
    },
    usage: `<ol>
  <li>选择算法、填写密钥，输入消息文本。</li>
  <li>点击“计算 HMAC”得到十六进制摘要；对方用相同密钥与算法可验证。</li>
  <li>HMAC 比单纯“哈希(密钥+消息)”更安全，能抵抗长度扩展攻击。</li>
</ol>`,
    faq: [
      { q: 'HMAC 和哈希有什么区别？', a: 'HMAC 在哈希基础上引入了密钥（两次异或填充），只有知道密钥才能计算/验证，用于认证而非内容公开校验。' },
      { q: 'API 签名怎么用？', a: '常见做法：把请求参数按规则拼接成字符串，用 HMAC-SHA256(密钥, 字符串) 生成签名附在请求头，服务端用同一密钥重算比对。' },
      { q: '密钥应该多长？', a: '建议与哈希输出等长或更长（如 HMAC-SHA256 用 32 字节以上随机密钥）；过短密钥可被暴力猜测。' },
    ],
  },
  {
    slug: 'pbkdf2', name: 'PBKDF2 密钥派生',
    desc: 'PBKDF2-SHA256 密码派生：把弱密码经多轮迭代转成强密钥，用于口令存储与加密密钥。',
    keywords: 'pbkdf2,密码派生,密钥派生,口令哈希,加盐哈希,密码存储',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '派生', fn: 'pbkdf2' },
      ],
      params: [
        { name: 'salt', label: '盐（Salt）', type: 'text', value: 'random-salt' },
        { name: 'iterations', label: '迭代次数', type: 'number', value: '10000' },
        { name: 'length', label: '输出长度（字节）', type: 'number', value: '32' },
      ],
      placeholder: '输入密码（口令）', outLabel: '派生密钥（十六进制）',
    },
    usage: `<ol>
  <li>填写盐与迭代次数，输入密码。</li>
  <li>点击“派生”得到十六进制密钥（默认 32 字节 = 256 位）。</li>
  <li>存储口令时应为每个用户使用随机盐，并选择尽量高的迭代次数（如 60 万次以上）。</li>
</ol>`,
    faq: [
      { q: '为什么要加盐？', a: '盐让相同密码产生不同哈希，阻止彩虹表预计算攻击，也使两个相同密码的存储值不同。' },
      { q: '迭代次数越多越好吗？', a: '迭代次数越大破解成本越高，但服务端验证也越慢；业界建议在可接受延迟内取最大值（OWASP 建议 SHA-256 60 万次+）。' },
      { q: 'PBKDF2 和 bcrypt/argon2 比如何？', a: 'PBKDF2 是 NIST 标准、内置广泛，但对 GPU 并行破解不够抵抗；argon2id 是最新推荐，bcrypt 次之。' },
    ],
  },
  {
    slug: 'quoted-printable', name: 'Quoted-Printable 编解码',
    desc: 'Quoted-Printable（RFC 2045）编码/解码：邮件 MIME 常用的文本传输编码。',
    keywords: 'quoted-printable,qp编码,邮件编码,mime编码,rfc2045,电子邮件编码',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '编码', fn: 'qpEncode' }, { label: '解码', fn: 'qpDecode' },
      ],
      placeholder: '输入文本或 QP 编码内容', outLabel: '结果',
    },
    usage: `<ol>
  <li>输入文本点击“编码”：ASCII 可见字符原样输出，非 ASCII/控制字符转 =XX 十六进制，行尾软换行用 = 续行。</li>
  <li>粘贴 QP 内容点击“解码”还原，自动处理软换行。</li>
  <li>常见于邮件正文（Content-Transfer-Encoding: quoted-printable）。</li>
</ol>`,
    faq: [
      { q: '为什么邮件里中文会变成 =E4=BD=A0 这种？', a: '邮件协议只允许 7 位 ASCII，中文 UTF-8 字节用 =XX 转义后传输，接收端解码还原；这就是 Quoted-Printable。' },
      { q: '和 Base64 编码邮件怎么选？', a: '文本为主用 QP（可读性好、体积小），二进制/附件用 Base64；邮件客户端按 Content-Transfer-Encoding 头自动识别。' },
      { q: '软换行是什么？', a: 'QP 规范要求每行不超过 76 字符，超出部分用“=（换行）”续行，解码时“=\\n”应被删除还原为原内容。' },
    ],
  },
  {
    slug: 'hash-detect', name: '哈希类型识别',
    desc: '哈希指纹识别：根据长度与格式推断 MD5、SHA 系列、bcrypt、crypt 等哈希类型。',
    keywords: '哈希识别,hash识别,哈希类型,md5判断,sha256判断,哈希检测',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '识别', fn: 'identifyHash' },
      ],
      multi: true,
      placeholder: '粘贴要识别的哈希值', outLabel: '识别结果',
    },
    usage: `<ol>
  <li>粘贴哈希值（可含空格），点击“识别”。</li>
  <li>根据长度、字符集与前缀特征列出所有可能类型及说明。</li>
  <li>注意：MD5 与 NTLM、SHA-256 与 SHA3-256 长度相同，仅凭指纹无法 100% 区分，需结合上下文。</li>
</ol>`,
    faq: [
      { q: '识别一定准确吗？', a: '不一定。很多哈希长度相同（如 MD5 与 NTLM 都是 32 位十六进制），指纹只能缩小范围，最终需结合来源判断。' },
      { q: 'bcrypt 为什么是 $2a$ 开头？', a: 'bcrypt 哈希自带算法标识（$2a/$2b/$2y）与迭代次数（$10$ 表示 2^10 轮），格式固定，容易识别。' },
      { q: '能识别哪些类型？', a: 'MD5、SHA-1/256/384/512、SHA3-256、CRC32、Adler-32、NTLM、MySQL、bcrypt、crypt-SHA512/256 及长 Base64。' },
    ],
  },
  {
    slug: 'text-binary', name: '文本二进制互转',
    desc: '文本与二进制（0/1）互转：每个 UTF-8 字节转 8 位二进制，支持中文。',
    keywords: '文本转二进制,二进制转文本,文本转01,二进制编码,机器码查看',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '文本→二进制', fn: 'textToBinary' }, { label: '二进制→文本', fn: 'binaryToText' },
      ],
      placeholder: '输入文本或二进制串（每字节 8 位）', outLabel: '结果',
    },
    usage: `<ol>
  <li>“文本→二进制”：按 UTF-8 把每个字节输出 8 位 0/1，空格分隔。</li>
  <li>“二进制→文本”：粘贴 8 位一组（可含空格）还原为文本。</li>
  <li>适合计算机基础教学、理解字符在内存中的表示。</li>
</ol>`,
    faq: [
      { q: '为什么一个中文要 24 位？', a: 'UTF-8 编码下汉字占 3 字节 = 24 位，这是 Unicode 标准规定的，emoji 甚至占 4 字节（32 位）。' },
      { q: '二进制串能带空格吗？', a: '可以，解码时自动忽略空格与换行；建议每 8 位一组便于阅读。' },
      { q: '和 ASCII 表什么关系？', a: '英文字符的二进制与 ASCII 表一致（如 A=01000001）；本工具按 UTF-8 处理，中文也能正确转换。' },
    ],
  },
  {
    slug: 'text-hex', name: '文本十六进制互转',
    desc: '文本与十六进制互转：UTF-8 字节流与 Hex 字符串双向转换，调试利器。',
    keywords: '文本转十六进制,hex转文本,hex编码,十六进制查看,utf8 hex',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '文本→Hex', fn: 'textToHex' }, { label: 'Hex→文本', fn: 'hexToText' },
      ],
      placeholder: '输入文本或十六进制串（如 48656c6c6f）', outLabel: '结果',
    },
    usage: `<ol>
  <li>“文本→Hex”：按 UTF-8 输出每个字节的两位十六进制。</li>
  <li>“Hex→文本”：粘贴十六进制（可含空格、0x 前缀、大写小写均可）还原。</li>
  <li>调试协议报文、查看文件魔数、核对字节序列都常用。</li>
</ol>`,
    faq: [
      { q: '怎么去掉 0x 前缀？', a: '解码时自动忽略 0x、空格与换行，直接粘贴即可。' },
      { q: '奇数个十六进制字符怎么办？', a: '本工具要求成对字节（偶数长度），奇数会提示错误；一个字节由两位十六进制表示。' },
      { q: '和 Unicode 码点有什么区别？', a: '本工具展示的是 UTF-8 编码字节；Unicode 码点是字符编号（如 U+4F60），需要码点请用“ASCII 与字符互转”工具。' },
    ],
  },
  {
    slug: 'text-octal', name: '文本八进制互转',
    desc: '文本与八进制互转：UTF-8 字节转 \\ooo 八进制转义，Unix 权限与转义调试常用。',
    keywords: '文本转八进制,八进制转文本,八进制转义,octal,转义序列',
    category: 'codec', kind: 'transform',
    transform: {
      lib: 'codec', actions: [
        { label: '文本→八进制', fn: 'textToOctal' }, { label: '八进制→文本', fn: 'octalToText' },
      ],
      placeholder: '输入文本或八进制串（如 110 145 154）', outLabel: '结果',
    },
    usage: `<ol>
  <li>“文本→八进制”：每个 UTF-8 字节输出 3 位八进制。</li>
  <li>“八进制→文本”：粘贴八进制数（可含空格、\\ 前缀）还原。</li>
  <li>Unix 文件权限（如 755）、C 语言转义序列（\\ooo）场景常用。</li>
</ol>`,
    faq: [
      { q: '八进制和十六进制怎么选？', a: '二者都是字节的数值表示；八进制每字节 3 位（000-377），十六进制每字节 2 位（00-FF），调试时十六进制更常见。' },
      { q: '权限 755 和本工具有关系吗？', a: '755 是权限位语义（rwxr-xr-x），不是字符编码；八进制转义用于表示字节内容，场景不同。' },
      { q: '支持 \\ 前缀吗？', a: '支持，解码时忽略 \\ 与空格前缀，如 \\110\\145 与 110 145 等价。' },
    ],
  },
];
