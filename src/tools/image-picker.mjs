export default {
  slug: 'image-picker',
  name: '图片取色器',
  desc: '在线图片取色工具，上传图片点击任意位置即可取色，输出 HEX / RGB / HSL 并一键复制。',
  keywords: '图片取色,取色器,在线取色,图片颜色,吸管工具,取色工具',
  category: 'image',
  body: `<div class="dropzone" id="pk-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片，然后点击图中任意位置取色
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="pk-file" accept="image/*" class="hidden">
<div class="toolbar mt-12">
  <span class="text-3" style="font-size:13.5px" id="pk-hint">上传图片后点击任意像素取色</span>
  <span class="spacer"></span>
  <button id="pk-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="qr-box mt-12">
  <canvas id="pk-canvas" aria-label="图片预览"></canvas>
</div>
<div class="swatch-row">
  <div class="swatch-box" id="pk-swatch"></div>
  <div class="swatch-meta" id="pk-meta"></div>
</div>
<div class="case-box" id="pk-values"></div>`,
  usage: `<ol>
  <li>上传图片后，图片会按比例缩放到合适宽度显示。</li>
  <li>点击图片任意位置，该像素的颜色立即显示：色块、HEX / RGB / HSL 值与复制按钮。</li>
  <li>适合从设计稿、截图、照片中提取配色。</li>
</ol>`,
  faq: [
    { q: '取的是原图像素吗？', a: '是。取色基于原图分辨率在画布上的实际像素，点击位置会按缩放比例映射回原图像素坐标。' },
    { q: '能取屏幕任意位置的颜色吗？', a: '本工具只支持从上传的图片取色。需要屏幕取色请使用浏览器截图后上传。' },
    { q: '支持放大查看吗？', a: '图片会缩放显示，但取色精度不受影响——坐标映射按原图比例计算，不会丢失像素。' },
  ],
};
