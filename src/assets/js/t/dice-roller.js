/* 2D 掷骰子工具脚本
   掷骰后在一个正方形骰子面上绘制对应点数（6 面骰显示圆点图案，其余显示数字）。
   点击骰子面或按钮均可掷骰；掷骰时有快速翻动动画，结果在点击时已由加密随机确定。 */

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const die = $('#d2');
const faceEl = $('#d2-face');
const resultEl = $('#d3-result');
const totalEl = $('#d3-total');
const rollBtn = $('#d3-roll');
const countEl = $('#d3-count');
const sidesEl = $('#d3-sides');

let rolling = false;
let cumulative = 0;
let totalRolls = 0;

/* 6 面骰点数图案：grid-area 行列位置（1-based） */
const PIPS = {
  1: ['2/2'],
  2: ['1/3', '3/1'],
  3: ['1/3', '2/2', '3/1'],
  4: ['1/1', '1/3', '3/1', '3/3'],
  5: ['1/1', '1/3', '2/2', '3/1', '3/3'],
  6: ['1/1', '2/1', '3/1', '1/3', '2/3', '3/3'],
};

function drawFace(value, sides) {
  if (sides === 6) {
    faceEl.classList.remove('d2-num');
    const cells = Array.from({ length: 9 }, (_, i) => {
      const row = Math.floor(i / 3) + 1;
      const col = (i % 3) + 1;
      const on = PIPS[value].includes(`${row}/${col}`);
      return `<span class="pip${on ? ' on' : ''}" style="grid-area:${row}/${col}"></span>`;
    }).join('');
    faceEl.innerHTML = cells;
  } else {
    faceEl.classList.add('d2-num');
    faceEl.textContent = String(value);
  }
}

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
  totalRolls += count;

  rolling = true;
  rollBtn.disabled = true;
  die.classList.add('rolling');
  resultEl.textContent = '掷骰中…';

  /* 翻动动画：快速切换几个随机面后落定 */
  let ticks = 0;
  const timer = setInterval(() => {
    drawFace(rollOnce(sides), sides);
    if (++ticks >= 10) {
      clearInterval(timer);
      /* 落定：单颗显示其点数，多颗显示总和 */
      drawFace(count === 1 ? values[0] : total, sides);
      die.classList.remove('rolling');
      rolling = false;
      rollBtn.disabled = false;
      const detail = count > 1 ? `（${values.join(' + ')}）` : '';
      resultEl.textContent = `点数：${total}${detail}`;
      totalEl.textContent = totalRolls > 0 ? `累计 ${totalRolls} 次，总和 ${cumulative}` : '';
    }
  }, 55);
}

/* 点击骰子面或按钮均可掷骰 */
die.addEventListener('click', roll);
die.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); roll(); }
});
rollBtn.addEventListener('click', roll);

/* 修改参数时重置累计与显示 */
countEl.addEventListener('change', () => {
  const n = Math.max(1, Math.min(10, parseInt(countEl.value, 10) || 1));
  countEl.value = n;
  cumulative = 0; totalRolls = 0;
  totalEl.textContent = '';
  resultEl.textContent = n > 1 ? `将掷 ${n} 颗骰子，点击骰子或按钮开始` : '点击骰子或按钮掷骰';
});
sidesEl.addEventListener('change', () => {
  cumulative = 0; totalRolls = 0;
  totalEl.textContent = '';
  resultEl.textContent = `${sidesEl.value} 面骰，点击骰子或按钮开始`;
});

/* 初始显示 */
drawFace(1, 6);
