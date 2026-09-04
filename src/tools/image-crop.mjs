export default {
  slug: 'image-crop',
  name: '图片裁切',
  desc: '在线图片裁剪工具，拖拽调整裁剪框大小与位置，支持自由比例与固定比例，本地完成。',
  keywords: '图片裁剪,图片裁切,在线裁剪,裁剪图片,图片剪切,头像裁剪',
  category: 'image',
  body: `<div class="dropzone" id="cr-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="cr-file" accept="image/*" class="hidden">
<div class="row mt-12">
  <div class="field grow">
    <label for="cr-ratio" class="field-label">裁剪比例</label>
    <select id="cr-ratio">
      <option value="free">自由</option>
      <option value="1:1">1:1 正方形</option>
      <option value="4:3">4:3</option>
      <option value="3:2">3:2</option>
      <option value="16:9">16:9</option>
    </select>
  </div>
  <div class="field">
    <label for="cr-size" class="field-label">输出宽度（px）</label>
    <input type="number" id="cr-size" value="800" min="16" max="8192" class="w-sm">
  </div>
</div>
<div class="crop-stage" id="cr-stage">
  <canvas id="cr-canvas"></canvas>
  <div class="crop-box" id="cr-box"></div>
</div>
<div class="toolbar mt-12">
  <button id="cr-run" class="btn">裁剪</button>
  <button id="cr-download" class="btn btn-ghost" disabled>下载结果</button>
  <span class="spacer"></span>
  <button id="cr-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">裁切结果预览</div>
  <img id="cr-preview" class="preview-img" alt="裁切结果">
</div>
<div id="cr-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>上传图片后，拖动虚线框移动位置，拖动边框或四角调整大小。</li>
  <li>选择裁剪比例（自由或 1:1、16:9 等固定比例）与输出宽度。</li>
  <li>点击“裁剪”生成结果，满意后“下载结果”。</li>
</ol>`,
  faq: [
    { q: '支持什么图片格式？', a: '支持浏览器可显示的常见格式：PNG、JPG、WebP、GIF、SVG 等。输出默认 PNG（透明背景保留）。' },
    { q: '裁剪会影响原图吗？', a: '不会。所有操作在浏览器内存中进行，原文件保持不变，结果可随时下载。' },
    { q: '固定比例怎么用？', a: '适合制作头像（1:1）、公众号配图（16:9）等场景，裁剪框会锁定比例，只可缩放整体大小。' },
  ],
};
