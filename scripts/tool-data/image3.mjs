/* image 分类补强 3：图片分析工具（共享 image-analyze 运行时） */
const PANEL = (cfg) => `<div class="field">
  <div class="dropzone" id="ia-drop" tabindex="0" role="button" aria-label="选择图片">
    点击或拖拽图片到此处<br><small>JPG / PNG / WebP，本地分析不上传</small>
    <input type="file" id="ia-file" accept="image/*" class="hidden">
  </div>
</div>
<div class="output">
  <div class="output-label">分析结果</div>
  <div id="ia-out">等待选择图片…</div>
</div>
${cfg}`;

export default [
  {
    slug: 'image-info', name: '图片信息查看',
    desc: '图片信息查看：尺寸、宽高比、文件大小、类型一键分析。',
    keywords: '图片信息,图片尺寸,查看图片,图片属性,宽高比,图片详情',
    category: 'image', kind: 'image', script: 'image-analyze',
    body: PANEL(`<script type="application/json" id="ia-cfg">{"mode":"info"}</script>`),
    usage: `<ol><li>上传图片，自动分析尺寸、比例、大小与类型。</li><li>所有分析在浏览器本地完成。</li><li>检查图片是否超限、确认比例适配场景常用。</li></ol>`,
    faq: [
      { q: '能看 EXIF 吗？', a: '当前显示尺寸/大小/类型；EXIF 信息受浏览器安全限制，部分图片可读。' },
      { q: '支持哪些格式？', a: '浏览器可解码的格式均可：JPG、PNG、WebP、GIF、SVG 等。' },
    ],
  },
  {
    slug: 'image-colors', name: '图片主色提取',
    desc: '图片主色提取：自动分析图片主色调与占比，配色灵感工具。',
    keywords: '图片取色,主色提取,配色提取,图片配色,色卡生成,dominant color',
    category: 'image', kind: 'image', script: 'image-analyze',
    body: PANEL(`<script type="application/json" id="ia-cfg">{"mode":"colors"}</script>`),
    usage: `<ol><li>上传图片，自动提取 Top 8 主色与占比。</li><li>输出十六进制色值，可直接用于设计。</li><li>品牌配色分析、网页取色、海报灵感常用。</li></ol>`,
    faq: [
      { q: '提取准确吗？', a: '基于缩略图统计（近似），适合主色调分析；精确取色请用“图片取色”工具。' },
      { q: '透明区域怎么处理？', a: '透明像素会被忽略，不影响主色统计。' },
    ],
  },
  {
    slug: 'image-histogram', name: '图片亮度直方图',
    desc: '图片亮度直方图：分析明暗分布，判断曝光是否正常。',
    keywords: '亮度直方图,直方图,曝光分析,图片明暗,histogram,摄影分析',
    category: 'image', kind: 'image', script: 'image-analyze',
    body: PANEL(`<script type="application/json" id="ia-cfg">{"mode":"histogram"}</script>`),
    usage: `<ol><li>上传图片，查看亮度分布直方图（16 档）。</li><li>集中在左侧=偏暗，右侧=偏亮，均匀=曝光正常。</li><li>摄影后期、曝光检查、图像质量评估常用。</li></ol>`,
    faq: [
      { q: '直方图怎么看？', a: '横轴亮度（左暗右亮），竖条高度=像素数量；山峰在中间且分布广通常曝光良好。' },
      { q: '能判断过曝吗？', a: '右侧贴边堆积说明高光溢出（过曝），左侧贴边说明暗部死黑（欠曝）。' },
    ],
  },
];
