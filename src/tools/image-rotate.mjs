export default {
  slug: 'image-rotate',
  name: '图片旋转/翻转',
  desc: '在线图片旋转与翻转工具，支持 90° 旋转与水平/垂直镜像，一键导出 PNG。',
  keywords: '图片旋转,图片翻转,旋转图片,镜像图片,图片方向,横竖图转换',
  category: 'image',
  body: `<div class="dropzone" id="rt-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="rt-file" accept="image/*" class="hidden">
<div class="toolbar mt-12">
  <button id="rt-left" class="btn">向左旋转 90°</button>
  <button id="rt-right" class="btn">向右旋转 90°</button>
  <button id="rt-flip-h" class="btn btn-ghost">水平翻转</button>
  <button id="rt-flip-v" class="btn btn-ghost">垂直翻转</button>
  <span class="spacer"></span>
  <button id="rt-download" class="btn btn-ghost" disabled>下载 PNG</button>
  <button id="rt-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="qr-box mt-12">
  <canvas id="rt-canvas" aria-label="处理后的图片"></canvas>
</div>
<div id="rt-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>上传图片后点击旋转 / 翻转按钮，画布实时更新。</li>
  <li>旋转次数可叠加（如两次向右 = 180°），翻转与旋转可组合使用。</li>
  <li>下载为 PNG 格式，透明背景保留。</li>
</ol>`,
  faq: [
    { q: '旋转会损失画质吗？', a: '90°/180° 旋转是像素级重排，无损；任意角度旋转（本工具不支持）才会产生插值损失。' },
    { q: '可以旋转视频或动图吗？', a: '本工具仅处理静态图片。GIF 动图会保留第一帧的静态图像。' },
    { q: '输出为什么是 PNG？', a: 'PNG 无损且支持透明背景，适合旋转后的再编辑；如需 JPEG/WebP 请使用图片格式转换工具。' },
  ],
};
