export default {
  slug: 'jwt-decode',
  name: 'JWT 在线解析',
  desc: 'JWT Token 在线解码工具，一键查看 Header、Payload 与过期时间，纯本地解析不上传。',
  keywords: 'jwt解析,jwt解码,jwt工具,token解析,json web token,jwt过期时间',
  category: 'codec',
  body: `<div class="field">
  <label for="jwt-in">JWT Token</label>
  <textarea id="jwt-in" class="mono" rows="4" placeholder="粘贴形如 eyJhbGciOiJIUzI1NiIs... 的 JWT"></textarea>
</div>
<div class="toolbar">
  <button id="jwt-run" class="btn">解析 Token</button>
  <span class="spacer"></span>
  <button id="jwt-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">Header</div>
  <pre id="jwt-header">等待解析…</pre>
</div>
<div class="output">
  <div class="output-label">Payload</div>
  <pre id="jwt-payload">等待解析…</pre>
</div>
<div class="output">
  <div class="output-label">有效期</div>
  <pre id="jwt-exp">等待解析…</pre>
</div>
<div class="note">JWT 的签名验证需要服务端密钥，纯前端无法完成。本工具仅做内容解码，请勿信任任何未经验证的 Token；解析全程在浏览器本地进行。</div>`,
  usage: `<ol>
  <li>粘贴完整的 JWT（由 . 分隔的三段：Header.Payload.Signature）。</li>
  <li>点击“解析 Token”，Header 与 Payload 会以格式化 JSON 展示。</li>
  <li>若 Payload 含 exp（过期时间）字段，会额外显示可读时间与是否已过期。</li>
</ol>`,
  faq: [
    { q: 'JWT 解码和验签是一回事吗？', a: '不是。解码只是 Base64Url 解出 JSON 内容，任何人都能做；验签需要服务端持有的密钥来确认 Token 未被篡改。本工具只做解码。' },
    { q: '为什么我解码出来是乱码？', a: 'JWT 的 Payload 必须是 UTF-8 JSON。如果乱码，可能是 Token 被复制时截断或粘贴了多余内容，请检查是否完整。' },
    { q: 'Token 会被上传吗？', a: '不会。解码在浏览器本地完成，页面没有向任何服务器发送 Token 内容。' },
  ],
};
