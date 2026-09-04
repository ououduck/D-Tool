export default {
  slug: 'contrast',
  name: '对比度检查',
  desc: 'WCAG 颜色对比度检查器，输入前景与背景色即得对比度比值与 AA/AAA 通过情况。',
  keywords: '对比度检查,wcag,颜色对比度,对比度计算,无障碍,文字可读性',
  category: 'web',
  body: `<div class="row">
  <div class="field grow">
    <label for="ct-fg" class="field-label">前景色（文字）</label>
    <input type="color" id="ct-fg" value="#18181b">
  </div>
  <div class="field grow">
    <label for="ct-bg" class="field-label">背景色</label>
    <input type="color" id="ct-bg" value="#ffffff">
  </div>
</div>
<div class="swatch-row">
  <div class="swatch-box" id="ct-swatch"></div>
  <div class="swatch-meta" id="ct-meta"></div>
</div>
<div class="stat-grid">
  <div class="stat"><div class="num mono" id="ct-ratio">—</div><div class="lbl">对比度比值</div></div>
  <div class="stat"><div class="num" id="ct-aa">—</div><div class="lbl">正文 AA（4.5:1）</div></div>
  <div class="stat"><div class="num" id="ct-aaa">—</div><div class="lbl">正文 AAA（7:1）</div></div>
</div>
<div class="note">WCAG 2.1 标准：正文文本需 ≥ 4.5:1（AA）/ 7:1（AAA），大号文本（≥24px 或 ≥18.66px 加粗）标准为 3:1 / 4.5:1。对比度不足时建议加深前景色或提亮背景色。</div>`,
  usage: `<ol>
  <li>选择前景（文字）与背景颜色，对比度与通过标准实时计算。</li>
  <li>色块展示文字在背景上的效果，可直接判断可读性。</li>
  <li>适合页面配色、无障碍优化、按钮与表单设计。</li>
</ol>`,
  faq: [
    { q: '对比度怎么计算的？', a: '按 WCAG 公式：先计算两色的相对亮度 L1/L2，比值 = (L1+0.05)/(L2+0.05)，L 基于 sRGB 线性化与感知权重。' },
    { q: '怎么提升对比度？', a: '文字加深、背景提亮，或减小透明度。避免浅灰配白底、深灰配黑底这类低对比组合。' },
    { q: '图片上的文字怎么检查？', a: '取图片上文字区域的平均颜色作为背景色输入即可；更严格的做法是给文字加半透明遮罩。' },
  ],
};
