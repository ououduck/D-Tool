export default {
  slug: 'image-watermark',
  name: '图片水印',
  desc: '在线图片文字水印工具，自定义内容、大小、透明度与位置，批量保护图片版权。',
  keywords: '图片水印,添加水印,在线水印,水印工具,图片加水印,防盗图水印',
  category: 'image',
  body: `<div class="dropzone" id="wm-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="wm-file" accept="image/*" class="hidden">
<div class="row mt-12">
  <div class="field grow">
    <label for="wm-text">水印文字</label>
    <input type="text" id="wm-text" placeholder="如：© tool.pldduck.com">
  </div>
</div>
<div class="row">
  <div class="field">
    <label for="wm-size" class="field-label">字号</label>
    <input type="number" id="wm-size" value="48" min="8" max="400" class="w-xs">
  </div>
  <div class="field">
    <label for="wm-opacity" class="field-label">透明度</label>
    <input type="number" id="wm-opacity" value="60" min="5" max="100" class="w-xs">
  </div>
  <div class="field">
    <label for="wm-pos" class="field-label">位置</label>
    <select id="wm-pos">
      <option value="tl">左上</option>
      <option value="tr">右上</option>
      <option value="bl">左下</option>
      <option value="br" selected>右下</option>
      <option value="cc">居中</option>
    </select>
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="wm-tile">平铺水印</label>
  </div>
</div>
<div class="toolbar">
  <button id="wm-run" class="btn">生成水印</button>
  <button id="wm-download" class="btn btn-ghost" disabled>下载结果</button>
  <span class="spacer"></span>
  <button id="wm-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="qr-box mt-12">
  <canvas id="wm-canvas" aria-label="水印效果预览"></canvas>
</div>
<div id="wm-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>上传图片，输入水印文字并设置字号、透明度、位置。</li>
  <li>勾选“平铺水印”可生成斜向铺满全图的防盗图水印（适合社交平台分享图）。</li>
  <li>点击“生成水印”预览，满意后下载。</li>
</ol>`,
  faq: [
    { q: '水印会被裁掉吗？', a: '默认生成在图片内部边缘（留 2% 边距），不会超出画面；平铺模式覆盖全图。' },
    { q: '可以加图片水印吗？', a: '本工具为文字水印。需要图片水印可先用图片格式工具将 Logo 转为 PNG，再与本文字水印组合使用。' },
    { q: '能批量加水印吗？', a: '暂不支持批量。每张图片处理均在本地完成，多张图需要逐张上传处理。' },
  ],
};
