export default {
  slug: 'gradient',
  name: '渐变生成器',
  desc: '在线 CSS 渐变生成器，支持线性与径向渐变、双色与角度调节，实时预览并复制 CSS 代码。',
  keywords: '渐变生成器,css渐变,渐变背景,线性渐变,径向渐变,gradient,背景渐变',
  category: 'convert',
  body: `<div class="row">
  <div class="field">
    <label for="gd-type" class="field-label">类型</label>
    <select id="gd-type">
      <option value="linear">线性渐变</option>
      <option value="radial">径向渐变</option>
    </select>
  </div>
  <div class="field grow">
    <label for="gd-angle" class="field-label">角度 <span id="gd-anglev" class="text-2">180°</span>（线性）</label>
    <input type="range" id="gd-angle" min="0" max="360" value="180">
  </div>
</div>
<div class="row">
  <div class="field grow">
    <label for="gd-c1" class="field-label">起始颜色</label>
    <input type="color" id="gd-c1" value="#3b82f6">
  </div>
  <div class="field grow">
    <label for="gd-c2" class="field-label">结束颜色</label>
    <input type="color" id="gd-c2" value="#8b5cf6">
  </div>
</div>
<div class="grad-preview" id="gd-preview" aria-label="渐变预览"></div>
<div class="toolbar mt-12">
  <button data-copy-from="#gd-css" class="btn btn-ghost btn-sm">复制 CSS</button>
</div>
<div class="output">
  <div class="output-label">CSS 代码</div>
  <textarea id="gd-css" class="mono" readonly rows="4"></textarea>
</div>`,
  usage: `<ol>
  <li>选择渐变类型（线性/径向）、调节角度与两个端点颜色，预览实时更新。</li>
  <li>CSS 代码同步生成，可一键复制到样式表中。</li>
  <li>适合页面背景、按钮渐变、海报设计等场景。</li>
</ol>`,
  faq: [
    { q: '线性与径向渐变有什么区别？', a: '线性渐变沿角度方向过渡；径向渐变从中心圆形向外扩散，适合聚光效果。' },
    { q: '可以加多个颜色吗？', a: '本工具为双色渐变，更多颜色可用 CSS 代码手动扩展（复制后自行添加 color-stop）。' },
    { q: '生成的代码兼容性如何？', a: '使用标准 linear-gradient / radial-gradient 语法，所有现代浏览器均支持，无需前缀。' },
  ],
};
