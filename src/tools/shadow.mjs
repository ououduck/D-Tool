export default {
  slug: 'shadow',
  name: '阴影生成器',
  desc: '在线 CSS 阴影生成器，调节偏移、模糊、扩散与透明度，实时预览并一键复制 box-shadow。',
  keywords: '阴影生成器,css阴影,box-shadow,阴影在线,投影生成,按钮阴影',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="sh-x" class="field-label">水平偏移 <span id="sh-xv" class="text-2">0</span>px</label>
    <input type="range" id="sh-x" min="-50" max="50" value="0">
  </div>
  <div class="field grow">
    <label for="sh-y" class="field-label">垂直偏移 <span id="sh-yv" class="text-2">10</span>px</label>
    <input type="range" id="sh-y" min="-50" max="50" value="10">
  </div>
</div>
<div class="row">
  <div class="field grow">
    <label for="sh-blur" class="field-label">模糊 <span id="sh-bv" class="text-2">20</span>px</label>
    <input type="range" id="sh-blur" min="0" max="100" value="20">
  </div>
  <div class="field grow">
    <label for="sh-spread" class="field-label">扩散 <span id="sh-sv" class="text-2">0</span>px</label>
    <input type="range" id="sh-spread" min="-30" max="30" value="0">
  </div>
</div>
<div class="row">
  <div class="field grow">
    <label for="sh-color" class="field-label">阴影颜色</label>
    <input type="color" id="sh-color" value="#000000">
  </div>
  <div class="field grow">
    <label for="sh-opacity" class="field-label">透明度 <span id="sh-ov" class="text-2">25%</span></label>
    <input type="range" id="sh-opacity" min="0" max="100" value="25">
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="sh-inset">内阴影</label>
  </div>
</div>
<div class="shadow-stage">
  <div class="shadow-box" id="sh-target"></div>
</div>
<div class="toolbar mt-12">
  <button data-copy-from="#sh-css" class="btn btn-ghost btn-sm">复制 CSS</button>
</div>
<div class="output">
  <div class="output-label">CSS 代码</div>
  <textarea id="sh-css" class="mono" readonly rows="3"></textarea>
</div>`,
  usage: `<ol>
  <li>拖动滑块设置水平/垂直偏移、模糊与扩散半径，选择颜色与透明度。</li>
  <li>“内阴影”开关切换 inset 模式，实时预览同步更新。</li>
  <li>复制 CSS 代码即可用于按钮、卡片、弹窗等元素。</li>
</ol>`,
  faq: [
    { q: '扩散和模糊有什么区别？', a: '模糊决定阴影边缘的柔和程度；扩散让阴影整体放大或缩小（负值为收缩），可做出描边式阴影。' },
    { q: '内阴影用在什么地方？', a: '内阴影适合凹陷效果、输入框内嵌、按钮按下态等场景。' },
    { q: '可以叠加多层阴影吗？', a: '本工具生成单层阴影；多层效果可复制代码后用逗号手动拼接多层 box-shadow。' },
  ],
};
