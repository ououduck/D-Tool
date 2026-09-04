export default {
  slug: 'gzip',
  name: 'Gzip 压缩/解压',
  desc: '在线 gzip / deflate 文本压缩工具，输出 Base64，实时对比压缩前后体积。',
  keywords: 'gzip压缩,gzip解压,deflate,在线压缩文本,字符串压缩,gzip工具',
  category: 'codec',
  body: `<div class="field">
  <label for="gz-in">输入内容</label>
  <textarea id="gz-in" class="mono" placeholder="压缩：输入文本；解压：粘贴 Base64 编码的压缩数据"></textarea>
</div>
<div class="toolbar">
  <button id="gz-compress" class="btn">压缩为 gzip（Base64）</button>
  <button id="gz-decompress" class="btn btn-ghost">解压为文本</button>
  <span class="spacer"></span>
  <button data-copy-from="#gz-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="gz-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="field">
  <label class="check"><input type="checkbox" id="gz-deflate">使用 deflate 算法而非 gzip</label>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="gz-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>
<div id="gz-meta" class="img-meta"></div>
<div id="gz-warn" class="warn hidden">当前浏览器不支持 CompressionStream（需 Chrome 80+ / Edge 80+ / Firefox 113+ / Safari 16.4+），请更换浏览器使用。</div>`,
  usage: `<ol>
  <li>压缩：输入文本 → 点击“压缩为 gzip”，得到 Base64 编码的压缩结果，并显示压缩前后体积对比。</li>
  <li>解压：粘贴 Base64 编码的压缩数据 → 点击“解压为文本”。</li>
  <li>gzip 与 deflate 两种格式的解压结果可以互通（数据头可自动识别由格式决定）。</li>
</ol>`,
  faq: [
    { q: '压缩后变大了？', a: '正常现象。Base64 编码本身会让数据膨胀约 33%，短文本或高随机性内容压缩收益小甚至为负；文本越长、重复内容越多，压缩率越好。' },
    { q: '与 gzip 命令压缩的结果兼容吗？', a: '兼容。本工具生成标准 gzip / zlib(deflate) 数据流，可被 gzip -d、zlib 等标准工具解压；同样也能解压标准工具生成的 Base64 内容。' },
    { q: '适合压缩什么内容？', a: '适合 JSON、日志、源码等重复度高的文本。图片、音视频等已压缩的二进制请勿使用本工具（需先将二进制转文本）。' },
  ],
};
