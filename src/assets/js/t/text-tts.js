/* 文字转语音工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#tt-in'), voiceEl = $('#tt-voice'), rateEl = $('#tt-rate'), pitchEl = $('#tt-pitch');
const ratev = $('#tt-ratev'), pitchv = $('#tt-pitchv'), statusEl = $('#tt-status');
const speakBtn = $('#tt-speak'), stopBtn = $('#tt-stop');

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
  voiceEl.innerHTML = '';
  const preferred = voices
    .slice()
    .sort((a, b) => {
      const rank = (v) => (v.lang.startsWith('zh') ? 0 : v.lang.startsWith('en') ? 1 : 2) + (v.localService ? 0 : 3);
      return rank(a) - rank(b);
    });
  for (const v of preferred) {
    const opt = document.createElement('option');
    opt.value = v.name;
    opt.textContent = `${v.name}（${v.lang}${v.localService ? '·本地' : '·在线'}）`;
    voiceEl.appendChild(opt);
  }
}

if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
} else {
  speakBtn.disabled = true;
  statusEl.textContent = '当前浏览器不支持语音合成（Web Speech API）';
  statusEl.classList.remove('hidden');
}

speakBtn.addEventListener('click', () => {
  const text = inEl.value.trim();
  if (!text) return toast('请先输入文本');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = voices.find((x) => x.name === voiceEl.value);
  if (v) u.voice = v;
  u.rate = Number(rateEl.value);
  u.pitch = Number(pitchEl.value);
  u.lang = v ? v.lang : 'zh-CN';
  statusEl.textContent = `正在朗读（${u.lang}）…`;
  statusEl.classList.remove('hidden');
  u.onend = () => { statusEl.textContent = '朗读完成'; };
  u.onerror = () => { statusEl.textContent = '朗读出错（可能语音包不可用）'; };
  speechSynthesis.speak(u);
});

stopBtn.addEventListener('click', () => {
  speechSynthesis.cancel();
  statusEl.textContent = '已停止';
});

rateEl.addEventListener('input', () => { ratev.textContent = rateEl.value; });
pitchEl.addEventListener('input', () => { pitchv.textContent = pitchEl.value; });
$('#tt-clear').addEventListener('click', () => { inEl.value = ''; speechSynthesis.cancel(); statusEl.classList.add('hidden'); inEl.focus(); });
