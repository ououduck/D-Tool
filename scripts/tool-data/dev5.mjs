/* dev/text 分类补强 5 —— 最后一批工具 */
export default [
  {
    slug: 'base64-image-view', name: 'Base64 图片预览',
    desc: 'Base64 图片预览：粘贴 data:image 或纯 Base64 即时预览图片。',
    keywords: 'base64图片,图片预览,base64查看,data image,图片解码预览',
    category: 'image', kind: 'transform',
    transform: {
      lib: 'dev5', actions: [{ label: '预览', fn: 'b64ImagePreview' }],
      placeholder: '粘贴 data:image/png;base64,... 或纯 Base64 串', outLabel: '预览结果',
    },
    usage: `<ol><li>粘贴 Base64 图片数据（可含 data:image 前缀）。</li><li>点击“预览”，下方显示图片与信息。</li><li>接口返回的 Base64 图快速查看。</li></ol>`,
    faq: [
      { q: '支持哪些格式？', a: '支持 data:image 声明的格式；纯 Base64 默认按 PNG 尝试解码。' },
      { q: '图片太大怎么办？', a: '超过浏览器限制会失败；建议用图片工具先压缩。' },
    ],
  },
  {
    slug: 'text-align-justify', name: '文本对齐工具',
    desc: '文本对齐：左对齐、右对齐、居中、两端对齐一键处理。',
    keywords: '文本对齐,左对齐,右对齐,居中,两端对齐,排版工具',
    category: 'text', kind: 'transform',
    transform: {
      lib: 'dev5', actions: [
        { label: '左对齐', fn: 'alignLeft' },
        { label: '右对齐', fn: 'alignRight' },
        { label: '居中', fn: 'alignCenter' },
      ],
      params: [{ name: 'width', label: '宽度（字符）', type: 'number', value: '40', min: '4' }],
      placeholder: '输入多行文本', outLabel: '结果',
    },
    usage: `<ol><li>输入文本与宽度，选择对齐方式。</li><li>按宽度补空格实现 ASCII 对齐。</li><li>终端输出、注释对齐、简单排版常用。</li></ol>`,
    faq: [
      { q: '中文对齐效果？', a: '按字符数对齐，中文显示宽度与英文不同，视觉可能略偏。' },
      { q: '行超宽会怎样？', a: '超过宽度的行保持原样。' },
    ],
  },
  {
    slug: 'number-to-chinese-extra', name: '数字转中文大写',
    desc: '数字转中文大写：金额大写（壹贰叁）与普通中文数字转换。',
    keywords: '数字转大写,金额大写,人民币大写,中文数字,壹贰叁,财务大写',
    category: 'convert', kind: 'transform',
    transform: {
      lib: 'dev5', actions: [
        { label: '金额大写', fn: 'rmbUpper' },
        { label: '中文数字', fn: 'numToCn' },
      ],
      placeholder: '输入数字，如 123456.78', outLabel: '结果',
    },
    usage: `<ol><li>输入数字，点击“金额大写”得到人民币大写。</li><li>“中文数字”输出普通中文数字读法。</li><li>发票、合同、报销单据填写常用。</li></ol>`,
    faq: [
      { q: '和现有工具重复吗？', a: '本站另有“数字转中文”工具，本工具补充金额大写快捷入口。' },
      { q: '支持负数吗？', a: '金额大写支持负号（负）；超大数自动按亿/万分级。' },
    ],
  },
  {
    slug: 'color-palette', name: '配色方案生成',
    desc: '配色方案生成：输入主色生成单色/互补/类似色配色方案。',
    keywords: '配色方案,配色生成,色板生成,互补色,类似色,颜色搭配',
    category: 'dev', kind: 'transform',
    transform: {
      lib: 'dev5', actions: [{ label: '生成方案', fn: 'paletteGen' }],
      placeholder: '输入主色（HEX），如 #3498DB', outLabel: '配色方案',
    },
    usage: `<ol><li>输入主色（HEX），点击“生成方案”。</li><li>输出单色、互补色、类似色、三色组等方案。</li><li>设计选色、UI 主题、图表配色常用。</li></ol>`,
    faq: [
      { q: '配色方案科学吗？', a: '基于 HSL 色环关系（互补/类似/三角），是经典配色理论。' },
      { q: '能导出吗？', a: '复制结果即可，每行一个色值。' },
    ],
  },
];
