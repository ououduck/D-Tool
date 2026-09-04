export default {
  slug: 'image-grid',
  name: '九宫格切图',
  desc: '在线九宫格切图工具，将图片按 N×M 网格切分，用于朋友圈、小红书九图排版。',
  keywords: '九宫格切图,九宫格图片,图片切图,朋友圈九宫格,图片分割,切图工具',
  category: 'image',
  body: `<div class="dropzone" id="gr-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="gr-file" accept="image/*" class="hidden">
<div class="row mt-12">
  <div class="field">
    <label for="gr-rows" class="field-label">行数</label>
    <input type="number" id="gr-rows" value="3" min="1" max="9" class="w-xs">
  </div>
  <div class="field">
    <label for="gr-cols" class="field-label">列数</label>
    <input type="number" id="gr-cols" value="3" min="1" max="9" class="w-xs">
  </div>
  <div class="field grow">
    <label class="check"><input type="checkbox" id="gr-square" checked>裁剪为正方形（中心裁剪）</label>
  </div>
</div>
<div class="toolbar">
  <button id="gr-run" class="btn">切图</button>
  <button id="gr-download" class="btn btn-ghost" disabled>下载全部切片</button>
  <span class="spacer"></span>
  <button id="gr-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div id="gr-preview" class="row mt-12"></div>
<div id="gr-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>上传图片，设置行数与列数（默认 3×3 九宫格）。</li>
  <li>勾选“裁剪为正方形”会先按中心裁剪为正方形再切分，适合朋友圈九图。</li>
  <li>点击“切图”预览全部切片，再点击“下载全部切片”逐个保存（文件名含行列号）。</li>
</ol>`,
  faq: [
    { q: '为什么朋友圈九图要正方形？', a: '朋友圈九宫格预览时非正方形图会被截断，裁剪为正方形再切分能保证九图拼合后是一张完整方图。' },
    { q: '切片会降低清晰度吗？', a: '不会。每个切片按原图比例输出，清晰度与源图一致（方形裁剪仅裁去边缘）。' },
    { q: '最多能切多少块？', a: '行列各最多 9，即最多 81 块。块数过多时单块过小，建议 3×3 或 4×3。' },
  ],
};
