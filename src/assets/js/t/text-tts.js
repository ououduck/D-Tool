/* 文字转语音工具脚本
   要点：主动取消（canceled/interrupted）不视为错误；
   Chrome 在 cancel 后立即 speak 存在竞态，需延迟 80ms 再播放 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#tt-in'), voiceEl = $('#tt-voice'), rateEl = $('#tt-rate'), pitchEl = $('#tt-pitch');
const ratev = $('#tt-ratev'), pitchv = $('#tt-pitchv'), statusEl = $('#tt-status');
const speakBtn = $('#tt-speak'), stopBtn = $('#tt-stop');

let voices = [];
let current = null; // 当前正在播放的 utterance

function loadVoices() {
  const all = speechSynthesis.getVoices();
  if (!all.length) return;
  voices = all;
  const selected = voiceEl.value;
  voiceEl.innerHTML = '';
  const preferred = all
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
  // 保持用户之前的选择，否则默认第一个（排序后即首选中文语音）
  if (selected && all.some((v) => v.name === selected)) voiceEl.value = selected;
}

if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
} else {
  speakBtn.disabled = true;
  statusEl.textContent = '当前浏览器不支持语音合成（Web Speech API）';
  statusEl.classList.remove('hidden');
}

function stop() {
  // 取消前摘除回调，避免 canceled/interrupted 误报
  if (current) {
    current.onend = null;
    current.onerror = null;
  }
  speechSynthesis.cancel();
  current = null;
}

function setStatus(msg) {
  statusEl.textContent = msg;
  statusEl.classList.remove('hidden');
}

function speak(text) {
  stop();
  speechSynthesis.resume(); // 清除可能残留的 paused 状态（Chrome 已知问题）

  const u = new SpeechSynthesisUtterance(text);
  current = u;
  const v = voices.find((x) => x.name === voiceEl.value);
  if (v) u.voice = v;
  u.rate = Number(rateEl.value);
  u.pitch = Number(pitchEl.value);
  u.lang = v ? v.lang : 'zh-CN';
  setStatus(`正在朗读（${u.lang}）…`);

  u.onstart = () => {
    if (current === u) setStatus(`正在朗读（${u.lang}）…`);
  };
  u.onend = () => {
    if (current === u) { setStatus('朗读完成'); current = null; }
  };
  u.onerror = (e) => {
    if (current !== u) return; // 已被替换或主动取消
    if (e.error === 'canceled' || e.error === 'interrupted') return; // 主动取消，非错误
    setStatus(`朗读出错：${e.error || '未知原因'}。可尝试更换语音或浏览器。`);
    current = null;
  };

  // Chrome 竞态 workaround：cancel 后稍作延迟再 speak
  setTimeout(() => {
    if (current === u) speechSynthesis.speak(u);
  }, 80);
}

speakBtn.addEventListener('click', () => {
  const text = inEl.value.trim();
  if (!text) return toast('请先输入文本');
  speak(text);
});

stopBtn.addEventListener('click', () => {
  stop();
  setStatus('已停止');
});

rateEl.addEventListener('input', () => { ratev.textContent = rateEl.value; });
pitchEl.addEventListener('input', () => { pitchv.textContent = pitchEl.value; });
$('#tt-clear').addEventListener('click', () => {
  inEl.value = '';
  stop();
  statusEl.classList.add('hidden');
  inEl.focus();
});
