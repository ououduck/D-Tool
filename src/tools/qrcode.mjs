export default {
  slug: 'qrcode',
  name: '二维码生成器',
  desc: '在线二维码生成工具，支持链接、文本、Wi-Fi 信息，可调容错级别与尺寸，免费下载 PNG。',
  keywords: '二维码生成,二维码在线,生成二维码,二维码工具,qrcode,二维码下载',
  category: 'gen',
  body: `<div class="field">
  <label for="qr-in">内容</label>
  <textarea id="qr-in" class="mono" rows="3" placeholder="输入链接或文本，如 https://example.com"></textarea>
</div>
<div class="row">
  <div class="field">
    <label for="qr-size" class="field-label">尺寸（px）</label>
    <select id="qr-size">
      <option value="280">280</option>
      <option value="360" selected>360</option>
      <option value="480">480</option>
      <option value="640">640</option>
    </select>
  </div>
  <div class="field">
    <label for="qr-ecc" class="field-label">容错级别</label>
    <select id="qr-ecc">
      <option value="L">L（约 7%）</option>
      <option value="M" selected>M（约 15%，推荐）</option>
      <option value="Q">Q（约 25%）</option>
      <option value="H">H（约 30%）</option>
    </select>
  </div>
</div>
<div class="toolbar">
  <button id="qr-run" class="btn">生成二维码</button>
  <button id="qr-download" class="btn btn-ghost" disabled>下载 PNG</button>
  <span class="spacer"></span>
  <button id="qr-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="qr-box">
  <canvas id="qr-canvas" aria-label="生成的二维码"></canvas>
  <p class="text-3" style="font-size:13px">容错级别越高，二维码可遮挡面积越大，但能容纳的数据越少</p>
</div>`,
  usage: `<ol>
  <li>输入链接、文本或任意内容（推荐先写完整 <code>https://</code> 前缀）。</li>
  <li>选择尺寸与容错级别后点击“生成二维码”，可点击“下载 PNG”保存图片。</li>
  <li>容错级别：M 适用于大多数场景；二维码被遮挡/弯折时可改用 Q 或 H。</li>
</ol>`,
  faq: [
    { q: '最多能放多少内容？', a: '取决于容错级别：L 约 2953 字节（版本 40）。内容超长时会提示，建议改用短链或降低容错级别。' },
    { q: '微信扫码能识别吗？', a: '能。生成的是标准 QR Code，任何扫码应用均可识别；链接内容建议使用完整 URL 以便自动跳转。' },
    { q: '下载的 PNG 清晰吗？', a: 'PNG 按所选尺寸输出，默认 360px 以上在打印与分享场景足够清晰，需要更大可先选择 640px。' },
  ],
};
