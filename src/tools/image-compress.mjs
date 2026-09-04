export default {
  slug: 'image-compress',
  name: '图片压缩',
  desc: '在线图片压缩工具，可调质量与最大宽度，支持 JPEG/WebP 输出，本地压缩不上传。',
  keywords: '图片压缩,图片在线压缩,压缩图片,图片缩小,webp转换,jpeg压缩',
  category: 'image',
  body: `<div class="dropzone" id="ic-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="ic-file" accept="image/*" class="hidden">
<div class="row mt-12">
  <div class="field grow">
    <label for="ic-quality">质量 <span id="ic-qval" class="text-2">0.8</span></label>
    <input type="range" id="ic-quality" min="0.05" max="1" step="0.05" value="0.8">
  </div>
  <div class="field">
    <label for="ic-width" class="field-label">最大宽度（px）</label>
    <input type="number" id="ic-width" value="1920" min="16" max="8192" class="w-sm">
  </div>
  <div class="field">
    <label for="ic-format" class="field-label">输出格式</label>
    <select id="ic-format">
      <option value="image/jpeg">JPEG</option>
      <option value="image/webp">WebP（推荐）</option>
    </select>
  </div>
</div>
<div class="toolbar">
  <button id="ic-run" class="btn">压缩</button>
  <button id="ic-download" class="btn btn-ghost" disabled>下载压缩结果</button>
  <span class="spacer"></span>
  <button id="ic-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div id="ic-meta" class="img-meta"></div>
<div class="row mt-12" id="ic-preview-row">
  <img id="ic-before" class="preview-img" alt="压缩前预览">
  <img id="ic-after" class="preview-img" alt="压缩后预览">
</div>`,
  usage: `<ol>
  <li>拖入或选择图片后自动按默认参数压缩，调整质量 / 最大宽度 / 输出格式后结果实时更新。</li>
  <li>JPEG 适合照片类图片；WebP 体积更小、画质更好，兼容现代浏览器（IE 除外）。</li>
  <li>确认满意后点击“下载压缩结果”。处理全程在本地进行，图片不会上传。</li>
</ol>`,
  faq: [
    { q: 'PNG 带透明背景怎么办？', a: '输出 JPEG 时透明区域会填充为白色；需要保留透明请选择 WebP 格式，它支持透明度且体积小于 PNG。' },
    { q: '压缩会损坏图片质量吗？', a: '有损压缩会有轻微画质损失，肉眼通常难以察觉。质量参数建议保持 0.7~0.9；对画质敏感的图片可先比较前后预览再下载。' },
    { q: '为什么我的图没变小？', a: '如果原图已经是高压缩率的 JPEG/WebP，二次压缩收益有限；可将最大宽度调小（如 1280px）或降低质量值再试。' },
  ],
};
