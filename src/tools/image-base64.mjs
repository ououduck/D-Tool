export default {
  slug: 'image-base64',
  name: '图片转 Base64',
  desc: '在线图片转 Base64 Data URL 工具，支持拖拽上传，输出可直接用于 CSS/IMG 标签。',
  keywords: '图片转base64,图片base64,data url,图片编码,img src base64,在线图片转码',
  category: 'convert',
  body: `<div class="dropzone" id="ib-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片（PNG / JPG / WebP / GIF / SVG）
  <small>图片仅在浏览器本地读取，不会上传</small>
</div>
<input type="file" id="ib-file" accept="image/*" class="hidden">
<div class="toolbar mt-12">
  <button data-copy-from="#ib-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="ib-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">Data URL</div>
  <textarea id="ib-out" class="mono" readonly placeholder="选择图片后显示"></textarea>
</div>
<img id="ib-preview" class="preview-img hidden" alt="图片预览">
<div id="ib-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>点击虚线区域或直接拖入图片，即可读取为 Data URL（base64）格式。</li>
  <li>输出可直接写入 <code>&lt;img src&gt;</code>、CSS <code>background-image</code> 或嵌入 HTML 邮件。</li>
  <li>大图生成的文本很长，建议先用图片压缩工具缩小后再转换。</li>
</ol>`,
  faq: [
    { q: 'Data URL 和普通 Base64 有区别吗？', a: 'Data URL = data:[MIME];base64,内容，它自带类型信息，浏览器可直接识别。去掉前缀 data:image/png;base64, 后就是普通 Base64 字符串。' },
    { q: 'Base64 图片适合嵌入网页吗？', a: '小图标（几 KB 内）适合内联以减少请求；大图不建议，Base64 会让体积膨胀约 33%，且无法利用浏览器图片缓存。' },
    { q: '图片会被上传吗？', a: '不会。FileReader 在浏览器本地读取文件内容，整个过程无任何网络请求。' },
  ],
};
