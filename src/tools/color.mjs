export default {
  slug: 'color',
  name: '颜色转换',
  desc: 'HEX、RGB、HSL、HSV 颜色在线互转，支持透明度，实时预览并提供可读文本色建议。',
  keywords: '颜色转换,hex转rgb,rgb转hex,hsl,颜色代码,调色,色值转换,在线取色',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="cl-in">颜色值</label>
    <input type="text" id="cl-in" class="mono" placeholder="#3498db / rgb(52,152,219) / hsl(210,70%,53%) / red">
  </div>
  <div class="field">
    <label for="cl-picker" class="field-label">颜色选择器</label>
    <input type="color" id="cl-picker" value="#3498db" aria-label="选择颜色">
  </div>
</div>
<div class="swatch-row">
  <div class="swatch-box" id="cl-swatch"></div>
  <div class="swatch-meta" id="cl-meta"></div>
</div>
<div class="case-box" id="cl-values"></div>`,
  usage: `<ol>
  <li>在输入框粘贴任意格式颜色：十六进制（#3498db、#fff、含透明度 #3498db80）、rgb()/rgba()、hsl()/hsla() 或常见颜色英文名。</li>
  <li>也可使用颜色选择器直接取色。</li>
  <li>下方自动生成 HEX / RGB / HSL / HSV 各格式与复制按钮，并给出该颜色上可读的文本颜色建议。</li>
</ol>`,
  faq: [
    { q: '支持带透明度的颜色吗？', a: '支持。HEX 8 位（#rrggbbaa）、rgba()、hsla() 均可解析，输出会保留透明度。' },
    { q: '为什么不支持颜色英文名？', a: '内置了 21 个常用颜色名（red、blue、gray 等）。完整 CSS 颜色名列表过于庞大，输入完整名称不识别时建议转换为 HEX 或 RGB 形式。' },
    { q: '“建议文本色”是什么？', a: '根据 WCAG 相对亮度计算该颜色上黑字或白字哪个可读性更好，方便为按钮、卡片背景选择前景色。' },
  ],
};
