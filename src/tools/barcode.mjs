export default {
  slug: 'barcode',
  name: '条形码生成',
  desc: '在线 EAN-13 条形码生成器，输入 12 位数字自动计算校验位，输出矢量级清晰条码可下载。',
  keywords: '条形码生成,条码生成,ean13,条形码在线,商品条码,条码工具',
  category: 'gen',
  body: `<div class="row">
  <div class="field grow">
    <label for="bc-in">商品代码（12 位数字）</label>
    <input type="text" id="bc-in" class="mono" placeholder="如 690123456789" maxlength="12">
  </div>
  <div class="field">
    <label for="bc-height" class="field-label">高度（px）</label>
    <input type="number" id="bc-height" value="80" min="40" max="300" class="w-xs">
  </div>
  <div class="field">
    <label for="bc-width" class="field-label">放大倍数</label>
    <input type="number" id="bc-width" value="2" min="1" max="6" class="w-xs">
  </div>
</div>
<div class="toolbar">
  <button id="bc-run" class="btn">生成条形码</button>
  <button id="bc-download" class="btn btn-ghost" disabled>下载 PNG</button>
  <span class="spacer"></span>
  <button id="bc-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="qr-box">
  <canvas id="bc-canvas" aria-label="生成的条形码"></canvas>
</div>
<div id="bc-meta" class="img-meta"></div>`,
  usage: `<ol>
  <li>输入 12 位商品代码（前 12 位），第 13 位校验位自动计算并显示。</li>
  <li>调整高度与放大倍数后点击“生成条形码”，可下载为 PNG。</li>
  <li>EAN-13 是中国大陆商品条码标准（690-695 开头为中国前缀）。</li>
</ol>`,
  faq: [
    { q: '校验位怎么算？', a: '前 12 位从右往左奇数位×3、偶数位×1 求和，校验位 = (10 − 和%10)%10。本工具自动计算。' },
    { q: '可以生成 Code 128 等其他码制吗？', a: '本工具支持 EAN-13。需要其他码制可尝试二维码生成器或专业条码软件。' },
    { q: '打印能用吗？', a: '能。条码以矢量方式绘制，放大倍数保证打印清晰；建议放大倍数 ≥ 2。' },
  ],
};
