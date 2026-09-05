/* image 分类补强 2：图片生成与图片信息工具（共享 image-gen / 手写脚本） */
const GEN_PANEL = (params, cfg) => `<div class="field">
  <label for="ig-run" class="field-label">参数</label>
</div>
${params}
<div class="toolbar">
  <button id="ig-run" class="btn">生成</button>
  <span class="spacer"></span>
  <button id="ig-download" class="btn btn-ghost" disabled>下载 PNG</button>
</div>
<div class="output">
  <canvas id="ig-canvas" aria-label="生成结果"></canvas>
</div>
${cfg}`;

const NUM = (name, label, value, min = 1) => `
<div class="field">
  <label for="ig-p-${name}" class="field-label">${label}</label>
  <input type="number" id="ig-p-${name}" value="${value}" min="${min}">
</div>`;

const TEXT = (name, label, value) => `
<div class="field">
  <label for="ig-p-${name}" class="field-label">${label}</label>
  <input type="text" id="ig-p-${name}" value="${value}">
</div>`;

const RANGE = (name, label, min = 0, max = 100, value = 50) => `
<div class="row">
  <div class="field grow">
    <label for="ig-p-${name}" class="field-label">${label}</label>
    <input type="range" id="ig-p-${name}" min="${min}" max="${max}" value="${value}">
  </div>
  <span class="range-val" id="ig-p-${name}-v">${value}%</span>
</div>`;

export default [
  {
    slug: 'captcha-image', name: '验证码图片生成',
    desc: '验证码图片生成器：随机字母数字 + 干扰线，可下载 PNG 用于测试。',
    keywords: '验证码图片,验证码生成,图形验证码,验证码png,随机验证码',
    category: 'image', kind: 'image', script: 'image-gen',
    body: GEN_PANEL(
      NUM('length', '字符数', 4, 4) + RANGE('noise', '干扰强度', 10, 100, 30),
      `<script type="application/json" id="ig-cfg">{"type":"captcha","params":[{"name":"length","type":"number"},{"name":"noise","type":"range"}]}</script>`,
    ),
    usage: `<ol><li>设置字符数与干扰强度，点击“生成”。</li><li>生成随机验证码图片（不含易混淆字符 0/O/1/l/I）。</li><li>用于系统测试、登录页演示，下载 PNG 使用。</li></ol>`,
    faq: [
      { q: '验证码会被机器识别吗？', a: '本工具用于演示与测试，干扰较弱；生产环境请使用专业验证码服务。' },
      { q: '字符集有哪些？', a: '去除了 0/O/1/l/I 等易混淆字符，保留大小写字母与数字。' },
    ],
  },
  {
    slug: 'avatar-generator', name: '字母头像生成',
    desc: '字母头像生成器：输入名字生成渐变底色首字母头像，下载 PNG。',
    keywords: '头像生成,字母头像,首字母头像,渐变头像,头像制作,avatar',
    category: 'image', kind: 'image', script: 'image-gen',
    body: GEN_PANEL(
      TEXT('name', '名字', 'D-Tool') + NUM('size', '尺寸（px）', 256, 64),
      `<script type="application/json" id="ig-cfg">{"type":"avatar","params":[{"name":"name","type":"text"},{"name":"size","type":"number"}]}</script>`,
    ),
    usage: `<ol><li>输入名字与尺寸，点击“生成”。</li><li>按名字生成稳定的渐变底色与首字母。</li><li>适合占位头像、账号头像、团队通讯录。</li></ol>`,
    faq: [
      { q: '同名字颜色会变吗？', a: '不会，颜色由名字哈希决定，同名字永远同色。' },
      { q: '支持中文名吗？', a: '支持，取第一个字符（中英文均可）。' },
    ],
  },
  {
    slug: 'placeholder-image', name: '占位图生成',
    desc: '占位图生成器：指定宽高与文字生成灰色占位图，页面开发常用。',
    keywords: '占位图,占位图片,placeholder,图片占位,默认图生成,灰图',
    category: 'image', kind: 'image', script: 'image-gen',
    body: GEN_PANEL(
      NUM('width', '宽度（px）', 400, 32) + NUM('height', '高度（px）', 300, 32) + TEXT('text', '文字', '400 × 300'),
      `<script type="application/json" id="ig-cfg">{"type":"placeholder","params":[{"name":"width","type":"number"},{"name":"height","type":"number"},{"name":"text","type":"text"}]}</script>`,
    ),
    usage: `<ol><li>设置宽高与文字，点击“生成”。</li><li>生成灰色带边框占位图，可下载 PNG。</li><li>前端布局开发、图片加载前占位、设计稿演示常用。</li></ol>`,
    faq: [
      { q: '能生成 SVG 吗？', a: '当前输出 PNG；需要 SVG 可用文本占位替代。' },
      { q: '最大尺寸？', a: '支持最大 1600×1600，更大建议用图片处理工具缩放。' },
    ],
  },
];
