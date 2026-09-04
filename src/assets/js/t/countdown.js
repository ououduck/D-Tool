/* 倒计时器工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const dEl = $('#cd-d'), hEl = $('#cd-h'), mEl = $('#cd-m'), sEl = $('#cd-s');
const dtEl = $('#cd-datetime'), secEl = $('#cd-seconds'), msgEl = $('#cd-msg');
const startBtn = $('#cd-start'), pauseBtn = $('#cd-pause'), resetBtn = $('#cd-reset');

let remaining = 0, timer = null, running = false;

function render() {
  const r = Math.max(0, remaining);
  dEl.textContent = Math.floor(r / 86400);
  hEl.textContent = Math.floor((r % 86400) / 3600);
  mEl.textContent = Math.floor((r % 3600) / 60);
  sEl.textContent = r % 60;
  if (r === 0 && running) {
    running = false;
    clearInterval(timer);
    timer = null;
    startBtn.disabled = false;
    msgEl.textContent = '倒计时结束';
    msgEl.classList.remove('hidden');
  }
}

function tick() {
  remaining = Math.max(0, remaining - 1);
  render();
}

function start() {
  if (running) return;
  if (remaining <= 0) {
    // 取目标时间或秒数
    if (dtEl.value) {
      const target = new Date(dtEl.value).getTime();
      if (Number.isNaN(target)) return toast('请选择有效的目标时间');
      remaining = Math.max(0, Math.round((target - Date.now()) / 1000));
      if (remaining === 0) return toast('目标时间已过，请重新选择');
    } else {
      remaining = Math.min(8640000, Math.max(1, Math.round(Number(secEl.value) || 300)));
    }
  }
  running = true;
  startBtn.disabled = true;
  msgEl.classList.add('hidden');
  timer = setInterval(tick, 1000);
  render();
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', () => {
  running = false;
  if (timer) { clearInterval(timer); timer = null; }
  startBtn.disabled = false;
  msgEl.textContent = `已暂停，剩余 ${remaining} 秒`;
  msgEl.classList.remove('hidden');
});
resetBtn.addEventListener('click', () => {
  running = false;
  if (timer) { clearInterval(timer); timer = null; }
  remaining = 0; startBtn.disabled = false;
  msgEl.classList.add('hidden');
  render();
});
$('#cd-fill').addEventListener('click', () => {
  const d = new Date(Date.now() + 10 * 60000);
  dtEl.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  toast('已填入 10 分钟后，点击“开始”');
});

render();
