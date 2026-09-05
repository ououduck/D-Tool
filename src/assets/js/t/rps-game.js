/* 石头剪刀布可视化对战脚本：出拳动画 + 计分 + 历史记录 */

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const mineEl = $('#rps-mine');
const aiEl = $('#rps-ai');
const resultEl = $('#rps-result');
const scoreEl = $('#rps-score');
const historyEl = $('#rps-history');
const choices = [...document.querySelectorAll('.rps-choice')];

const HANDS = { rock: '✊', scissors: '✌️', paper: '✋' };
const NAMES = { rock: '石头', scissors: '剪刀', paper: '布' };
/* 胜负表：key 胜 value */
const BEATS = { rock: 'scissors', scissors: 'paper', paper: 'rock' };

let score = { me: 0, ai: 0 };
let history = [];
let playing = false;

function renderScore() {
  scoreEl.textContent = `比分：你 ${score.me} : ${score.ai} 电脑（先赢 5 局获胜）`;
}

function renderHistory() {
  historyEl.innerHTML = history.slice(-8).reverse().map((h) => {
    const cls = h.winner === 'me' ? 'rps-win' : h.winner === 'ai' ? 'rps-lose' : 'rps-draw';
    return `<div class="rps-row ${cls}">第 ${h.round} 局：你 ${NAMES[h.me]} vs 电脑 ${NAMES[h.ai]} — ${h.text}</div>`;
  }).join('');
}

/* 挥拳动画：快速切换手势后落定 */
function animate(el, finalHand, onDone) {
  const frames = ['✊', '✌️', '✋'];
  let i = 0;
  const timer = setInterval(() => {
    el.textContent = frames[i++ % frames.length];
  }, 90);
  setTimeout(() => {
    clearInterval(timer);
    el.textContent = HANDS[finalHand];
    onDone();
  }, 700);
}

function play(choice) {
  if (playing) return;
  playing = true;
  choices.forEach((b) => (b.disabled = true));
  resultEl.textContent = '出拳中…';

  const aiChoice = ['rock', 'scissors', 'paper'][Math.floor(Math.random() * 3)];
  mineEl.textContent = HANDS[choice];
  animate(aiEl, aiChoice, () => {
    playing = false;
    choices.forEach((b) => (b.disabled = false));

    let winner, text;
    if (choice === aiChoice) {
      winner = 'draw';
      text = '平局';
    } else if (BEATS[choice] === aiChoice) {
      winner = 'me';
      text = '你赢了 🎉';
      score.me++;
    } else {
      winner = 'ai';
      text = '你输了';
      score.ai++;
    }
    resultEl.textContent = text;
    history.push({ round: history.length + 1, me: choice, ai: aiChoice, winner, text });
    renderScore();
    renderHistory();

    if (score.me >= 5 || score.ai >= 5) {
      const final = score.me >= 5 ? '你获得最终胜利！🎉' : '电脑获胜，再接再厉！';
      resultEl.textContent = final;
      setTimeout(() => {
        score = { me: 0, ai: 0 };
        history = [];
        renderScore();
        renderHistory();
        resultEl.textContent = '新的一局，选择手势开始';
        mineEl.textContent = '🤚';
        aiEl.textContent = '🤚';
      }, 2500);
    }
  });
}

choices.forEach((b) => b.addEventListener('click', () => play(b.dataset.choice)));
renderScore();
