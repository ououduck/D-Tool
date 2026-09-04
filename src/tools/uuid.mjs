export default {
  slug: 'uuid',
  name: 'UUID 生成器',
  desc: '在线 UUID v4 生成工具，批量生成、大写与无连字符模式，基于加密随机数。',
  keywords: 'uuid生成,uuid,guid,在线uuid,uuid生成器,guid生成,唯一标识',
  category: 'gen',
  body: `<div class="row">
  <div class="field">
    <label for="uu-count" class="field-label">生成数量</label>
    <input type="number" id="uu-count" value="5" min="1" max="100" class="w-xs">
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="uu-upper">大写</label>
  </div>
  <div class="field">
    <label class="check"><input type="checkbox" id="uu-nohyphen">去掉连字符</label>
  </div>
</div>
<div class="toolbar">
  <button id="uu-run" class="btn">生成 UUID</button>
  <span class="spacer"></span>
  <button data-copy-from="#uu-out" class="btn btn-ghost btn-sm">复制全部</button>
  <button id="uu-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">结果</div>
  <textarea id="uu-out" class="mono" readonly placeholder="点击生成"></textarea>
</div>
<div class="note">使用浏览器加密随机数（crypto.getRandomValues）生成 UUID v4，本地完成、不上传；碰撞概率极低，适合作为数据库主键、文件 ID 等唯一标识。</div>`,
  usage: `<ol>
  <li>设置数量（1-100）与格式（大写、无连字符）后点击“生成 UUID”。</li>
  <li>“复制全部”一次复制所有生成的 UUID（每行一个）。</li>
  <li>无连字符模式输出 32 位十六进制，适合作为文件名等不含特殊字符的场景。</li>
</ol>`,
  faq: [
    { q: 'UUID 会重复吗？', a: 'UUID v4 使用 122 位随机数，理论碰撞概率极低：每秒生成 10 亿个，约 85 年才有 50% 概率出现一次碰撞。实际使用可放心。' },
    { q: 'UUID v4 和 v1 有什么区别？', a: 'v1 基于时间戳与机器标识（可能泄露创建时间与 MAC），v4 完全随机；现代应用默认使用 v4，本工具仅提供 v4。' },
    { q: '可以当密码用吗？', a: 'UUID 随机性虽强但只含十六进制字符，熵低于同长度随机密码。需要密码请使用密码生成器。' },
  ],
};
