export default {
  slug: 'image-filter',
  name: '图片滤镜',
  desc: '在线图片滤镜工具：灰度、复古、反色、模糊、亮度与对比度调节，实时预览可下载。',
  keywords: '图片滤镜,在线滤镜,图片特效,灰度图,复古滤镜,图片调色,亮度对比度',
  category: 'image',
  body: `<div class="dropzone" id="fl-drop" tabindex="0" role="button" aria-label="选择或拖入图片">
  点击选择或拖入图片
  <small>图片仅在浏览器本地处理，不会上传</small>
</div>
<input type="file" id="fl-file" accept="image/*" class="hidden">
<div class="row mt-12">
  <div class="field">
    <label for="fl-preset" class="field-label">预设滤镜</label>
    <select id="fl-preset">
      <option value="none">原图</option>
      <option value="grayscale">黑白</option>
      <option value="sepia">复古</option>
      <option value="invert">反色</option>
      <option value="blur">模糊</option>
      <option value="brightness">提亮</option>
      <option value="contrast">增强对比</option>
      <option value="saturate">高饱和</option>
      <option value="cool">冷色调</option>
      <option value="warm">暖色调</option>
    </select>
  </div>
  <div class="field grow">
    <label for="fl-amount" class="field-label">强度 <span id="fl-amt" class="text-2">100%</span></label>
    <input type="range" id="fl-amount" min="0" max="100" value="100">
  </div>
</div>
<div class="toolbar">
  <button id="fl-download" class="btn" disabled>下载结果</button>
  <span class="spacer"></span>
  <button id="fl-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="qr-box mt-12">
  <canvas id="fl-canvas" aria-label="滤镜效果预览"></canvas>
</div>
<div id="fl-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>上传图片后选择预设滤镜，拖动“强度”滑杆微调效果，预览实时更新。</li>
  <li>滤镜基于 CSS canvas filter 实现，叠加组合：先选预设再调强度。</li>
  <li>满意后点击“下载结果”保存为 PNG。</li>
</ol>`,
  faq: [
    { q: '预设滤镜的原理？', a: '使用 Canvas 2D 的 filter 属性（grayscale/sepia/invert/blur 等），由浏览器原生加速，效果与 CSS 滤镜一致。' },
    { q: '强度怎么理解？', a: '强度为滤镜效果的百分比：0% 等于原图，100% 为完整效果。模糊类滤镜强度越大越模糊。' },
    { q: '会改变原图吗？', a: '不会。原图保持不变，处理结果仅在预览与下载时生成。' },
  ],
};
