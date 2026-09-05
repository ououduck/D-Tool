/* 3D 抛硬币工具脚本
   硬币为 CSS 3D 双面圆片；翻转通过 rotateY 多圈动画落定。 */

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const coin = $('#cf-coin');
const resultEl = $('#cf-result');
const statsEl = $('#cf-stats');
const flipBtn = $('#cf-flip');
const countEl = $('#cf-count');

let rolling = false;
let heads = 0, tails = 0, totalFlips = 0;
let curRot = 0;

function flip() {
  if (rolling) return;
  const count = Math.max(1, Math.min(100, parseInt(countEl.value, 10) || 1));
  const results = [];
  for (let i = 0; i < count; i++) results.push(Math.random() < 0.5 ? '正面' : '反面');
  const h = results.filter((r) => r === '正面').length;
  heads += h;
  tails += count - h;
  totalFlips += count;

  rolling = true;
  flipBtn.disabled = true;
  resultEl.textContent = '硬币翻转中…';

  /* 动画：旋转 3-6 圈 + 随机偏移；最终停稳到结果面 */
  const isHeads = h > count / 2 ? true : h < count / 2 ? false : Math.random() < 0.5;
  const turns = 3 + Math.floor(Math.random() * 4);
  /* 正面朝上 rotateY 为 0 的倍数，反面为 180 的倍数 */
  const base = isHeads ? 0 : 180;
  /* 从当前位置连续旋转：目标 = 与 base 同余且比当前大的角度 */
  const curMod = ((curRot % 360) + 360) % 360;
  const target = base + 360 * Math.ceil((curRot - base + 360) / 360) + 360 * turns;
  coin.style.transition = 'transform 1.4s cubic-bezier(0.2, 0.55, 0.35, 1)';
  coin.style.transform = `rotateY(${target}deg)`;
  curRot = target;

  setTimeout(() => {
    rolling = false;
    flipBtn.disabled = false;
    const single = count === 1 ? (isHeads ? '正面' : '反面') : `正面 ${h} 次，反面 ${count - h} 次`;
    resultEl.textContent = `结果：${single}`;
    const pct = totalFlips ? Math.round((heads / totalFlips) * 100) : 0;
    statsEl.textContent = `累计 ${totalFlips} 次：正 ${heads}（${pct}%）/ 反 ${tails}`;
  }, 1500);
}

flipBtn.addEventListener('click', flip);
countEl.addEventListener('change', () => {
  const n = Math.max(1, Math.min(100, parseInt(countEl.value, 10) || 1));
  countEl.value = n;
  resultEl.textContent = n > 1 ? `将抛掷 ${n} 次，点击"抛硬币"` : '点击"抛硬币"开始';
});
