export default {
  slug: 'morse',
  name: '摩斯电码',
  desc: '在线摩斯电码编码与解码工具，支持字母与数字，点划间隔自动排版，一键复制。',
  keywords: '摩斯电码,摩斯密码,morse,电码翻译,摩斯编码,摩斯解码',
  category: 'codec',
  body: `<div class="field">
  <label for="mo-in">输入文本或摩斯码</label>
  <textarea id="mo-in" class="mono" placeholder="英文文本（自动转大写）或摩斯码（点 . 划 - 空格分隔，/ 表示单词间隔）"></textarea>
</div>
<div class="toolbar">
  <button id="mo-encode" class="btn">编码为摩斯</button>
  <button id="mo-decode" class="btn btn-ghost">解码为文本</button>
  <span class="spacer"></span>
  <button data-copy-from="#mo-out" class="btn btn-ghost btn-sm">复制结果</button>
  <button id="mo-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="output">
  <div class="output-label">输出</div>
  <textarea id="mo-out" class="mono" readonly placeholder="结果将显示在这里"></textarea>
</div>`,
  usage: `<ol>
  <li>编码：输入字母与数字（自动转大写），输出以 .（点）和 -（划）表示，字符间一个空格、单词间用 / 分隔。</li>
  <li>解码：粘贴摩斯码（. - 与空格），点击“解码为文本”。</li>
  <li>无法识别的字符会原样跳过，解码时未知码显示为 ?。</li>
</ol>`,
  faq: [
    { q: '支持中文摩斯码吗？', a: '摩斯电码标准仅定义字母、数字与少量符号；中文没有标准摩斯表示，本工具仅支持 A-Z 与 0-9。' },
    { q: '间隔怎么区分？', a: '字符内点划间无空格，字符间 1 个空格，单词间使用 / 加空格。这是最通用的文本表示法。' },
    { q: '可以听摩斯码声音吗？', a: '本工具暂不支持播放。可复制摩斯码到支持音频的摩斯练习器中试听。' },
  ],
};
