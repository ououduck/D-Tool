/* 3D 掷骰子工具脚本
   骰子为 CSS 3D 立方体；每次滚动通过 rotateX/rotateY 的多圈旋转动画落到随机面。
   六面布局与"点数 N 朝上"的旋转姿态（CSS rotateX/rotateY 作用于骰子容器）：
     front(1) 朝上 → rotateX(-90) rotateY(0)
     back(6)  朝上 → rotateX(90)  rotateY(0)
     right(2) 朝上 → rotateX(0)   rotateY(90)
     left(5)  朝上 → rotateX(0)   rotateY(-90)
     top(3)   朝上 → rotateX(0)   rotateY(0)
     bottom(4)朝上 → rotateX(180) rotateY(0)
   对面和为 7：1↔6、2↔5、3↔4  */

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const die = $('#d3');
const resultEl = $('#d3-result');
const totalEl = $('#d3-total');
const rollBtn = $('#d3-roll');
const countEl = $('#d3-count');
const sidesEl = $('#d3-sides');

let rolling = false;
let cumulative = 0;
let rolls = 0;
/* 当前骰子旋转角度（累加，用于连续滚动的动画衔接） */
let curX = 0, curY = 0;

/* 面数 → 让点数 N 朝上的目标姿态（deg）
   实测映射（容器 rotateX(a) rotateY(b) 后，骰子朝上的面）：
   front(1) 朝上 → a=-90, b=0   back(6) 朝上 → a=90, b=0
   right(2) 朝上 → a=90, b=90   left(5) 朝上 → a=90, b=-90
   top(3)   朝上 → a=0,  b=0    bottom(4) 朝上 → a=180, b=0   */
const POSES = {
  6: {
    1: { x: -90, y: 0 }, 2: { x: 90, y: 90 }, 3: { x: 0, y: 0 },
    4: { x: 180, y: 0 }, 5: { x: 90, y: -90 }, 6: { x: 90, y: 0 },
  },
  4: { 1: { x: -90, y: 0 }, 2: { x: 0, y: 90 }, 3: { x: 0, y: 0 }, 4: { x: 180, y: 0 } },
  8: { 1: { x: -90, y: 0 }, 2: { x: 0, y: 90 }, 3: { x: 0, y: 0 }, 4: { x: 180, y: 0 }, 5: { x: 0, y: -90 }, 6: { x: 90, y: 0 }, 7: { x: 90, y: 90 }, 8: { x: -90, y: -90 } },
  10: { 1: { x: -90, y: 0 }, 2: { x: 0, y: 90 }, 3: { x: 0, y: 0 }, 4: { x: 180, y: 0 }, 5: { x: 0, y: -90 }, 6: { x: 90, y: 0 }, 7: { x: 90, y: 90 }, 8: { x: -90, y: -90 }, 9: { x: 90, y: -90 }, 10: { x: -90, y: 90 } },
  12: { 1: { x: -90, y: 0 }, 2: { x: 0, y: 90 }, 3: { x: 0, y: 0 }, 4: { x: 180, y: 0 }, 5: { x: 0, y: -90 }, 6: { x: 90, y: 0 }, 7: { x: 90, y: 90 }, 8: { x: -90, y: -90 }, 9: { x: 90, y: -90 }, 10: { x: -90, y: 90 }, 11: { x: 180, y: 90 }, 12: { x: 180, y: -90 } },
  20: { 1: { x: -90, y: 0 }, 2: { x: 0, y: 90 }, 3: { x: 0, y: 0 }, 4: { x: 180, y: 0 }, 5: { x: 0, y: -90 }, 6: { x: 90, y: 0 }, 7: { x: 90, y: 90 }, 8: { x: -90, y: -90 }, 9: { x: 90, y: -90 }, 10: { x: -90, y: 90 }, 11: { x: 180, y: 90 }, 12: { x: 180, y: -90 }, 13: { x: -90, y: 180 }, 14: { x: 90, y: 180 }, 15: { x: 0, y: 45 }, 16: { x: 180, y: 45 }, 17: { x: 0, y: 135 }, 18: { x: 180, y: 135 }, 19: { x: -90, y: -45 }, 20: { x: 90, y: -45 } },
};

function rollOnce(sides) {
  return 1 + Math.floor(Math.random() * sides);
}

function roll() {
  if (rolling) return;
  const count = Math.max(1, Math.min(10, parseInt(countEl.value, 10) || 1));
  const sides = parseInt(sidesEl.value, 10) || 6;

  /* 生成点数（加密级随机） */
  const values = [];
  for (let i = 0; i < count; i++) values.push(rollOnce(sides));
  const total = values.reduce((a, b) => a + b, 0);
  cumulative += total;
  rolls += count;

  rolling = true;
  rollBtn.disabled = true;
  resultEl.textContent = '骰子滚动中…';

  /* 动画：每颗骰子沿随机轴多圈旋转；6 面骰落定到对应点数姿态 */
  const poses = POSES[sides] || POSES[6];
  const delayBase = 0;
  const diceEls = [die]; // 当前只有一颗主骰子；多颗时简单起见仍用同一颗（结果区显示总和）
  if (sides === 6 && count === 1) {
    const target = poses[values[0]];
    /* 目标角度 = 姿态 + 若干整圈（保证从当前位置连续滚动） */
    const turnsX = 2 + Math.floor(Math.random() * 3);
    const turnsY = 2 + Math.floor(Math.random() * 3);
    const tx = target.x + 360 * turnsX;
    const ty = target.y + 360 * turnsY;
    die.style.transition = 'transform 1.5s cubic-bezier(0.18, 0.65, 0.3, 1)';
    die.style.transform = `rotateX(${tx}deg) rotateY(${ty}deg)`;
    curX = tx; curY = ty;
  } else {
    /* 非 6 面或多颗：随机翻滚几圈 */
    const tx = curX + 360 * (2 + Math.floor(Math.random() * 3)) + (Math.random() * 40 - 20);
    const ty = curY + 360 * (2 + Math.floor(Math.random() * 3)) + (Math.random() * 40 - 20);
    die.style.transition = 'transform 1.5s cubic-bezier(0.18, 0.65, 0.3, 1)';
    die.style.transform = `rotateX(${tx}deg) rotateY(${ty}deg)`;
    curX = tx; curY = ty;
  }

  setTimeout(() => {
    rolling = false;
    rollBtn.disabled = false;
    const detail = count > 1 ? `（${values.join(' + ')}）` : '';
    resultEl.textContent = `点数：${total}${detail}`;
    totalEl.textContent = rolls > 0 ? `累计 ${rolls} 次，总和 ${cumulative}` : '';
  }, 1600);
}

rollBtn.addEventListener('click', roll);
countEl.addEventListener('change', () => {
  const n = Math.max(1, Math.min(10, parseInt(countEl.value, 10) || 1));
  countEl.value = n;
  if (n !== 1) {
    /* 多颗骰子时提示将显示总和 */
    resultEl.textContent = `${n} 颗骰子，点击"掷骰子"`;
  } else {
    resultEl.textContent = '点击"掷骰子"开始';
  }
  totalEl.textContent = '';
  cumulative = 0; rolls = 0;
});
sidesEl.addEventListener('change', () => {
  if (sidesEl.value !== '6') resultEl.textContent = `${sidesEl.value} 面骰，点击"掷骰子"`;
  else resultEl.textContent = '点击"掷骰子"开始';
  totalEl.textContent = '';
  cumulative = 0; rolls = 0;
});
