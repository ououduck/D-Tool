export default {
  slug: 'image-format',
  name: '图片格式转换',
  desc: '在线图片格式转换工具，PNG / JPEG / WebP 互转，可调质量与尺寸，本地转换不上传。',
  keywords: '图片格式转换,图片转webp,图片转jpg,png转jpg,webp转png,图片转换器',
  category: 'image',
  body: `<div class="dropzone" id="fm-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="fm-file" accept="image/*" class="hidden">
<div class="row mt-12">
  <div class="field">
    <label for="fm-format" class="field-label">目标格式</label>
    <select id="fm-format">
      <option value="image/png">PNG（无损）</option>
      <option value="image/jpeg">JPEG（有损）</option>
      <option value="image/webp">WebP（推荐）</option>
    </select>
  </div>
  <div class="field grow">
    <label for="fm-quality" class="field-label">质量 <span id="fm-qval" class="text-2">0.9</span>（仅 JPEG/WebP）</label>
    <input type="range" id="fm-quality" min="0.1" max="1" step="0.05" value="0.9">
  </div>
  <div class="field">
    <label for="fm-width" class="field-label">最大宽度（px，0=原尺寸）</label>
    <input type="number" id="fm-width" value="0" min="0" max="8192" class="w-sm">
  </div>
</div>
<div class="toolbar">
  <button id="fm-run" class="btn">转换</button>
  <button id="fm-download" class="btn btn-ghost" disabled>下载结果</button>
  <span class="spacer"></span>
  <button id="fm-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="row mt-12">
  <img id="fm-before" class="preview-img" alt="转换前">
  <img id="fm-after" class="preview-img" alt="转换后">
</div>
<div id="fm-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>上传图片并选择目标格式：PNG 无损（适合图标/截图）、JPEG 体积小（适合照片）、WebP 画质与体积均衡。</li>
  <li>JPEG / WebP 可调质量；设置最大宽度可同时缩小图片。</li>
  <li>转换结果实时预览，点击“下载结果”保存。</li>
</ol>`,
  faq: [
    { q: '透明背景会怎样？', a: '转换到 JPEG 时透明区域会填充为白色；需要保留透明请选择 PNG 或 WebP。' },
    { q: 'WebP 兼容性如何？', a: '现代浏览器（Chrome、Edge、Firefox、Safari 14+）均支持；老系统旧浏览器可能无法直接打开，可再转回 PNG。' },
    { q: '和图片压缩工具有什么区别？', a: '压缩工具专注减小体积，格式转换专注换格式；本工具也带质量与缩放控制，两者可配合使用。' },
  ],
};
