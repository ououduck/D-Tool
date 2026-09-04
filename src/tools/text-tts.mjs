export default {
  slug: 'text-tts',
  name: '文字转语音',
  desc: '在线文字转语音工具，使用浏览器原生语音合成，支持中英文朗读、语速音调调节。',
  keywords: '文字转语音,语音朗读,tts,文本朗读,中文朗读,语音合成,在线朗读',
  category: 'text',
  body: `<div class="field">
  <label for="tt-in">输入文本</label>
  <textarea id="tt-in" rows="5" placeholder="输入需要朗读的文本，支持中文与英文"></textarea>
</div>
<div class="row">
  <div class="field grow">
    <label for="tt-voice" class="field-label">语音</label>
    <select id="tt-voice"></select>
  </div>
  <div class="field">
    <label for="tt-rate" class="field-label">语速 <span id="tt-ratev" class="text-2">1.0</span></label>
    <input type="range" id="tt-rate" min="0.5" max="2" step="0.1" value="1">
  </div>
  <div class="field">
    <label for="tt-pitch" class="field-label">音调 <span id="tt-pitchv" class="text-2">1.0</span></label>
    <input type="range" id="tt-pitch" min="0.5" max="2" step="0.1" value="1">
  </div>
</div>
<div class="toolbar">
  <button id="tt-speak" class="btn">▶ 朗读</button>
  <button id="tt-stop" class="btn btn-ghost">停止</button>
  <span class="spacer"></span>
  <button id="tt-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div id="tt-status" class="note hidden"></div>
<div class="note">使用浏览器内置语音合成引擎（Web Speech API），无需网络与上传。可用语音列表与系统安装的语音包有关，中文语音通常在中文系统上可用。</div>`,
  usage: `<ol>
  <li>输入文本，选择语音（中文选 zh-CN 类语音），调节语速与音调。</li>
  <li>点击“朗读”开始，点击“停止”随时中断。</li>
  <li>适合文章试听、英文单词发音练习、无障碍辅助阅读。</li>
</ol>`,
  faq: [
    { q: '没有中文语音怎么办？', a: '语音列表来自操作系统：Windows 可在“设置→时间和语言→语音”添加中文语音包；macOS 在“系统设置→辅助功能→朗读内容”启用。' },
    { q: '朗读需要网络吗？', a: '不需要。使用浏览器本地语音引擎，全文在本地合成（部分系统语音包需离线安装后可用）。' },
    { q: '支持导出音频文件吗？', a: '浏览器语音合成不提供音频流导出接口，暂不支持下载为音频文件。' },
  ],
};
