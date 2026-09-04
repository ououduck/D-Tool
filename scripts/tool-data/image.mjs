/* image（图片处理）分类工具定义 —— 共享 image-effect 运行时，全部为真实可用的图片工具 */
const DROP = (hint) => `<div class="dropzone" id="ie-drop" tabindex="0" role="button" aria-label="选择图片">
  点击或拖拽图片到此处${hint ? `<br><small>${hint}</small>` : ''}
  <input type="file" id="ie-file" accept="image/*" class="hidden">
</div>`;

const PANEL = (extraParams = '', note = '') => `<div class="field">
  ${DROP('JPG / PNG / WebP，处理在本地完成，不上传')}
</div>
${extraParams}
<div class="toolbar">
  <button id="ie-download" class="btn" disabled>下载 PNG</button>
  <span class="spacer"></span>
  <button id="ie-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="img-meta" id="ie-meta"></div>
<div class="output">
  <canvas id="ie-canvas" style="display:none" aria-label="处理后的图片预览"></canvas>
</div>
${note}`;

const RANGE = (name, label, min = 0, max = 100, value = 50) => `
<div class="row">
  <div class="field grow">
    <label for="ie-p-${name}" class="field-label">${label}</label>
    <input type="range" id="ie-p-${name}" min="${min}" max="${max}" value="${value}">
  </div>
  <span class="range-val" id="ie-p-${name}-v">${value}%</span>
</div>`;

const cfg = (effect, params = []) => `<script type="application/json" id="ie-cfg">${JSON.stringify({ effect, params }).replace(/</g, '\\u003c')}</script>`;

export default [
  {
    slug: 'image-grayscale', name: '图片灰度化',
    desc: '图片灰度处理：一键把彩色图片转为黑白灰度，本地处理不上传。',
    keywords: '图片灰度,灰度图,黑白图片,去色,grayscale,灰度化',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL('', '<div class="note">灰度按亮度权重（0.299R+0.587G+0.114B）转换，保留明暗层次。</div>') + cfg('grayscale'),
    usage: `<ol><li>上传图片，自动预览灰度效果。</li><li>点击“下载 PNG”保存结果。</li><li>适合证件照去色、打印预览、艺术效果。</li></ol>`,
    faq: [
      { q: '灰度图体积会变小吗？', a: 'PNG 输出可能略有减小（通道冗余减少），但压缩率取决于内容；JPEG 灰度可显著减小。' },
      { q: '能恢复彩色吗？', a: '不能，灰度转换丢失色彩信息；请保留原图。' },
    ],
  },
  {
    slug: 'image-sepia', name: '图片怀旧滤镜',
    desc: '图片怀旧（棕褐）滤镜：一键给照片添加复古色调，本地处理。',
    keywords: '怀旧滤镜,棕褐,老照片,复古滤镜,sepia,照片做旧',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL('', '<div class="note">棕褐色调（Sepia）模拟老照片质感，适合怀旧风格处理。</div>') + cfg('sepia'),
    usage: `<ol><li>上传图片，自动预览怀旧效果。</li><li>下载 PNG 保存。</li><li>老照片翻新、复古海报常用。</li></ol>`,
    faq: [
      { q: 'Sepia 滤镜的原理？', a: '按经典系数矩阵（0.393R+0.769G+0.189B 等）混合 RGB 通道，模拟银盐照片老化色调。' },
      { q: '会损失画质吗？', a: 'PNG 无损输出；颜色信息被替换，无法还原原彩色。' },
    ],
  },
  {
    slug: 'image-invert', name: '图片反色',
    desc: '图片反色（负片）效果：RGB 通道取反，生成负片风格图片。',
    keywords: '图片反色,负片效果,反相,invert,照片反转,颜色取反',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL('', '<div class="note">反色即每个像素 RGB 值取 255-原值，得到底片效果。</div>') + cfg('invert'),
    usage: `<ol><li>上传图片，自动预览反色效果。</li><li>下载保存结果。</li><li>X 光片、暗房效果、创意设计常用。</li></ol>`,
    faq: [
      { q: '反色能还原吗？', a: '可以！再执行一次反色即恢复原图（255-(255-x)=x）。' },
      { q: '适合什么图片？', a: '高对比构图效果强烈；人像肤色会变得奇怪，慎用。' },
    ],
  },
  {
    slug: 'image-brightness', name: '图片亮度调节',
    desc: '图片亮度调节：滑块实时调整明暗，本地处理。',
    keywords: '图片亮度,亮度调节,变亮,变暗,照片亮度,亮度调整',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('amount', '亮度', -50, 100, 0), '') + cfg('brightness', [{ name: 'amount', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动亮度滑块实时预览。</li><li>正值变亮、负值变暗。</li><li>下载保存处理结果。</li></ol>`,
    faq: [
      { q: '亮度调节会丢失细节吗？', a: '过度调亮会损失高光细节（255 截断），过度调暗损失暗部；适度调整影响小。' },
      { q: '和曝光调节一样吗？', a: '本工具按乘法调整（线性增益），接近曝光；专业曝光还含曲线校正，效果略不同。' },
    ],
  },
  {
    slug: 'image-contrast', name: '图片对比度调节',
    desc: '图片对比度调节：增强或减弱明暗反差，让照片更通透。',
    keywords: '图片对比度,对比度调节,反差,照片通透,对比度调整',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('amount', '对比度', -50, 100, 0), '') + cfg('contrast', [{ name: 'amount', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动对比度滑块实时预览。</li><li>正值增强反差（更“硬”），负值减弱（更“灰”）。</li><li>下载保存结果。</li></ol>`,
    faq: [
      { q: '对比度和亮度什么区别？', a: '亮度整体加减明暗；对比度围绕中灰（128）拉伸/压缩明暗差，增强立体感。' },
      { q: '调太高会怎样？', a: '高光与阴影会溢出为纯白/纯黑，丢失细节；建议适度。' },
    ],
  },
  {
    slug: 'image-blur', name: '图片模糊',
    desc: '图片高斯模糊：调节模糊强度，隐私遮挡、背景虚化效果。',
    keywords: '图片模糊,高斯模糊,模糊处理,背景虚化,打码模糊,blur',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('amount', '模糊强度', 5, 100, 15), '') + cfg('blur', [{ name: 'amount', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动模糊强度实时预览。</li><li>适合脸部打码、背景虚化、隐私遮挡。</li><li>下载保存结果。</li></ol>`,
    faq: [
      { q: '是高斯模糊吗？', a: '实现为两遍盒式模糊（近似高斯），效果柔和；强度越大处理越慢。' },
      { q: '模糊能还原吗？', a: '不能，模糊丢失高频细节；隐私打码请用不可逆的强模糊。' },
    ],
  },
  {
    slug: 'image-sharpen', name: '图片锐化',
    desc: '图片锐化：增强边缘细节，让照片更清晰，可调节强度。',
    keywords: '图片锐化,锐化工具,照片清晰,边缘增强,sharpen,清晰度',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('amount', '锐化强度', 10, 100, 50), '') + cfg('sharpen', [{ name: 'amount', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动锐化强度实时预览。</li><li>适度锐化让边缘更利落；过度会出现白边与噪点。</li><li>下载保存结果。</li></ol>`,
    faq: [
      { q: '锐化能修复模糊照片吗？', a: '只能视觉上增强边缘对比，无法恢复已丢失的细节；对轻微模糊有效。' },
      { q: '为什么会出现光晕？', a: '锐化在边缘产生过冲（overshoot），强度过高时光晕明显；建议强度 30-60%。' },
    ],
  },
  {
    slug: 'image-pixelate', name: '图片像素化',
    desc: '图片像素化（马赛克）：模糊隐私区域、像素艺术效果一键生成。',
    keywords: '图片像素化,马赛克,像素艺术,pixelate,像素风格,打码',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('amount', '像素块大小', 5, 100, 30), '') + cfg('pixelate', [{ name: 'amount', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动像素块大小实时预览。</li><li>小像素块是像素艺术风格；大块可遮挡敏感区域。</li><li>下载保存结果。</li></ol>`,
    faq: [
      { q: '像素化和模糊哪个更适合打码？', a: '像素化把区域压缩为色块，直观且不可逆；模糊更柔和。两者都不可还原原细节。' },
      { q: '能只处理局部吗？', a: '当前处理整图；局部马赛克需专业编辑软件。' },
    ],
  },
  {
    slug: 'image-mirror', name: '图片镜像翻转',
    desc: '图片水平/垂直镜像：左右翻转、上下翻转，一键处理。',
    keywords: '图片镜像,水平翻转,垂直翻转,左右镜像,上下翻转,图片翻转',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL('', '<div class="note">水平镜像=左右翻转（selfie 效果），垂直镜像=上下翻转。</div>') + cfg('mirror'),
    usage: `<ol><li>上传图片，自动预览镜像效果。</li><li>下载保存结果。</li><li>水平镜像常用于自拍修正；垂直镜像用于创意设计。</li></ol>`,
    faq: [
      { q: '镜像会改变图片尺寸吗？', a: '不会，仅翻转方向，宽高不变。' },
      { q: '文字会变反吗？', a: '会，镜像后文字左右颠倒；这是镜像的正常效果。' },
    ],
  },
  {
    slug: 'image-rounded', name: '图片圆角',
    desc: '图片圆角处理：给图片加圆角，滑块控制圆角大小，头像卡片常用。',
    keywords: '图片圆角,圆角图片,头像圆角,圆角处理,rounded,圆角裁剪',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('radius', '圆角大小', 0, 50, 15), '') + cfg('rounded', [{ name: 'radius', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动圆角大小实时预览。</li><li>生成透明背景的圆角 PNG，适合头像、卡片。</li><li>下载保存结果。</li></ol>`,
    faq: [
      { q: '圆角图片背景透明吗？', a: '是，导出 PNG 保留透明通道，可直接叠加到任意背景。' },
      { q: '圆角最大值是多少？', a: '滑块最大为短边 50%，即完全椭圆/圆形效果。' },
    ],
  },
  {
    slug: 'image-resize', name: '图片缩放',
    desc: '图片缩放：按最长边像素等比缩小，适合压缩超大图片。',
    keywords: '图片缩放,图片改尺寸,压缩图片,等比缩放,resize,缩小图片',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('scale', '最长边（%原尺寸）', 10, 100, 50), '<div class="note">等比缩放，保持宽高比；缩到 50% 时 PNG 体积约降为 1/4。</div>') + cfg('resize', [{ name: 'scale', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动比例实时预览缩放结果。</li><li>等比缩小大图（如 4000px → 2000px）。</li><li>下载保存；进一步减小体积可配合“图片压缩”。</li></ol>`,
    faq: [
      { q: '能放大图片吗？', a: '可以（比例>100%），但放大是插值，画质不会提升；建议只缩小。' },
      { q: '输出格式？', a: '当前导出 PNG；需要 JPG 请用“图片格式转换”工具。' },
    ],
  },
  {
    slug: 'image-hue', name: '图片色相旋转',
    desc: '图片色相旋转：整体改变色调（0-360°），创意调色效果。',
    keywords: '图片色相,色相旋转,色调调整,hue,调色,色彩变换',
    category: 'image', kind: 'image', script: 'image-effect',
    body: PANEL(RANGE('amount', '色相旋转（%360°）', 0, 100, 30), '') + cfg('hue', [{ name: 'amount', type: 'range' }]),
    usage: `<ol><li>上传图片，拖动色相滑块实时预览。</li><li>30% ≈ 旋转 108°，整体色调漂移。</li><li>下载保存创意调色结果。</li></ol>`,
    faq: [
      { q: '色相旋转会改变亮度吗？', a: '只旋转色相环，明度与饱和度保持不变（近似）。' },
      { q: '适合什么场景？', a: '创意海报、赛博朋克风格、UI 配色快速试色。' },
    ],
  },
];
