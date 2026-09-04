/* D-Tool 生活实用算法库（纯函数，Node 可测）
   覆盖：骰子/硬币/猜拳、塔罗、姓名/星座/血型配对、水摄入、睡眠周期、宠物年龄、
   预产期、号码吉凶、幸运数字、情书/藏头诗生成、卡路里消耗 */

const ri = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[ri(arr.length)];
const pad2 = (n) => String(n).padStart(2, '0');

/* ---------- 抛硬币 ---------- */
export function coinFlip(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) out.push(Math.random() < 0.5 ? '正面' : '反面');
  return out.join('\n');
}

/* ---------- 掷骰子 ---------- */
export function rollDice(count = 2, sides = 6) {
  const n = Math.max(1, Math.min(20, parseInt(count, 10) || 2));
  const s = Math.max(2, Math.min(100, parseInt(sides, 10) || 6));
  const rolls = Array.from({ length: n }, () => ri(s) + 1);
  return [{ name: '点数', value: rolls.join(' + ') },
          { name: '总和', value: String(rolls.reduce((a, b) => a + b, 0)) }];
}

/* ---------- 石头剪刀布 ---------- */
export function rpsGame(values) {
  const choices = ['石头', '剪刀', '布'];
  const mine = values[0] || '石头';
  const idx = choices.indexOf(mine);
  if (idx < 0) return '请选择 石头/剪刀/布';
  const ai = ri(3);
  const beats = (a, b) => (a === 0 && b === 1) || (a === 1 && b === 2) || (a === 2 && b === 0);
  const result = idx === ai ? '平局' : beats(idx, ai) ? '你赢了 🎉' : '你输了';
  return [{ name: '你的选择', value: choices[idx] },
          { name: '对手选择', value: choices[ai] },
          { name: '结果', value: result }];
}

/* ---------- 塔罗牌（22 张大阿卡纳） ---------- */
const MAJOR_ARCANA = [
  ['愚者', '新的开始，随心而行'], ['魔术师', '创造力与行动力'], ['女祭司', '直觉与内在智慧'],
  ['女皇', '丰饶与滋养'], ['皇帝', '秩序与掌控'], ['教皇', '传统与指引'],
  ['恋人', '结合与选择'], ['战车', '意志与胜利'], ['力量', '勇气与耐心'],
  ['隐士', '内省与独处'], ['命运之轮', '转折与机遇'], ['正义', '平衡与因果'],
  ['倒吊人', '换位思考与等待'], ['死神', '结束与重生'], ['节制', '调和与适度'],
  ['恶魔', '束缚与欲望'], ['高塔', '突变与惊醒'], ['星星', '希望与疗愈'],
  ['月亮', '迷茫与潜意识'], ['太阳', '成功与活力'], ['审判', '觉醒与宽恕'], ['世界', '圆满与完成'],
];
export function tarotDraw(count = 1) {
  const n = Math.max(1, Math.min(5, parseInt(count, 10) || 1));
  const deck = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5).slice(0, n);
  return deck.map(([name, meaning], i) => ({ name: `第 ${i + 1} 张 · ${name}`, value: meaning }));
}

/* ---------- 姓名配对（趣味） ---------- */
export function nameMatch(values) {
  const [a, b] = values.map((s) => String(s).trim());
  if (!a || !b) return '请输入两个人的名字';
  const combined = a + b;
  // 用 Unicode 码点加权生成 60-99 的稳定"缘分值"
  let sum = 0;
  for (const ch of combined) sum += ch.codePointAt(0);
  const score = 60 + (sum % 40);
  const level = score >= 90 ? '天作之合' : score >= 80 ? '很般配' : score >= 70 ? '还不错' : '需要磨合';
  return [{ name: '缘分值', value: `${score} / 100` },
          { name: '评价', value: level },
          { name: '小提示', value: '仅供娱乐，缘分掌握在自己手里 😊' }];
}

/* ---------- 星座配对 ---------- */
const ZODIAC_NAMES = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
const ZODIAC_PAIRS = {
  白羊座: ['狮子座', '射手座', '双子座'], 金牛座: ['处女座', '摩羯座', '巨蟹座'],
  双子座: ['天秤座', '水瓶座', '白羊座'], 巨蟹座: ['天蝎座', '双鱼座', '金牛座'],
  狮子座: ['白羊座', '射手座', '双子座'], 处女座: ['金牛座', '摩羯座', '巨蟹座'],
  天秤座: ['双子座', '水瓶座', '狮子座'], 天蝎座: ['巨蟹座', '双鱼座', '摩羯座'],
  射手座: ['白羊座', '狮子座', '水瓶座'], 摩羯座: ['金牛座', '处女座', '天蝎座'],
  水瓶座: ['双子座', '天秤座', '射手座'], 双鱼座: ['巨蟹座', '天蝎座', '金牛座'],
};
export function zodiacMatch(values) {
  const [a, b] = values.map((s) => String(s).trim());
  if (!ZODIAC_NAMES.includes(a) || !ZODIAC_NAMES.includes(b)) return '请输入正确的星座名（如：白羊座）';
  if (a === b) return [{ name: '组合', value: `${a} × ${b}` }, { name: '评价', value: '同星座默契但个性相近，注意互补' }];
  const good = ZODIAC_PAIRS[a] || [];
  const match = good.includes(b);
  return [{ name: '组合', value: `${a} × ${b}` },
          { name: '评价', value: match ? '天生一对，相互吸引 ✨' : '有火花也有摩擦，需要包容' }];
}

/* ---------- 血型配对 ---------- */
export function bloodMatch(values) {
  const [a, b] = values.map((s) => String(s).toUpperCase().trim());
  const types = ['A', 'B', 'AB', 'O'];
  if (!types.includes(a) || !types.includes(b)) return '请输入正确的血型（A/B/AB/O）';
  const table = {
    A: { A: '沉稳组合', B: '互补组合', AB: '包容组合', O: '守护组合' },
    B: { A: '互补组合', B: '活泼组合', AB: '默契组合', O: '行动组合' },
    AB: { A: '包容组合', B: '默契组合', AB: '艺术组合', O: '信任组合' },
    O: { A: '守护组合', B: '行动组合', AB: '信任组合', O: '热烈组合' },
  };
  return [{ name: '组合', value: `${a}型 × ${b}型` }, { name: '评价', value: table[a][b] + '（趣味参考）' }];
}

/* ---------- 每日饮水 ---------- */
export function waterIntake(values) {
  const weight = parseFloat(values[0]);
  if (!weight || weight < 20 || weight > 300) return '请输入有效体重（20-300kg）';
  const ml = weight * 30; // 每公斤 30ml
  const cups = ml / 250;
  return [{ name: '每日建议', value: `${Math.round(ml)} 毫升（约 ${cups.toFixed(1)} 杯）` },
          { name: '参考公式', value: '体重 × 30ml（温和运动者）；运动/高温酌情增加' },
          { name: '提示', value: '少量多次饮用，避免一次猛灌' }];
}

/* ---------- 睡眠周期 ---------- */
export function sleepCycle(values) {
  const [hour, minute] = values.map((n) => parseInt(n, 10));
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return '请输入合法时间（0-23 时 / 0-59 分）';
  const startMin = hour * 60 + minute;
  const out = [];
  for (let cycles = 4; cycles <= 6; cycles++) {
    const wake = (startMin + cycles * 90) % 1440;
    out.push({ name: `${cycles} 个周期（${cycles * 1.5} 小时）`, value: `建议 ${pad2(Math.floor(wake / 60))}:${pad2(wake % 60)} 起床` });
  }
  out.push({ name: '说明', value: '按 90 分钟睡眠周期计算，在周期结束时起床更清醒' });
  return out;
}

/* ---------- 宠物年龄 ---------- */
export function petAge(values) {
  const [years, type] = [parseInt(values[0], 10), values[1]];
  if (!years || years < 0 || years > 40) return '请输入 0-40 岁';
  if (type === 'dog') {
    const human = years <= 1 ? 15 : years <= 2 ? 24 : 24 + (years - 2) * 4;
    return [{ name: '狗狗年龄', value: `${years} 岁` }, { name: '人类年龄（约）', value: `${human} 岁` }, { name: '说明', value: '小型犬 1 岁≈15 人岁，之后每年≈4 人岁' }];
  }
  const human = years <= 1 ? 15 : years <= 2 ? 24 : 24 + (years - 2) * 4;
  return [{ name: '猫咪年龄', value: `${years} 岁` }, { name: '人类年龄（约）', value: `${human} 岁` }, { name: '说明', value: '猫 1 岁≈15 人岁，之后每年≈4 人岁' }];
}

/* ---------- 预产期 ---------- */
export function dueDateCalc(values) {
  const d = new Date(values[0]);
  if (Number.isNaN(d.getTime())) return '请输入有效日期';
  const due = new Date(d.getTime() + 280 * 86400000);
  const today = new Date();
  const diff = Math.round((due - today) / 86400000);
  const week = Math.min(42, Math.max(0, Math.floor((today - d) / (7 * 86400000))));
  return [{ name: '预产期', value: due.toISOString().slice(0, 10) },
          { name: '当前孕周（约）', value: `${week} 周` },
          { name: '剩余天数', value: `${diff} 天` },
          { name: '说明', value: '按末次月经 + 280 天估算，实际以医生 B 超为准' }];
}

/* ---------- 手机号吉凶（趣味） ---------- */
export function numberLucky(values) {
  const phone = String(values[0]).replace(/\D/g, '');
  if (phone.length < 7) return '请输入至少 7 位数字';
  let sum = 0;
  for (const ch of phone) sum += Number(ch);
  const score = 40 + (sum % 60);
  const level = score >= 90 ? '大吉' : score >= 75 ? '吉' : score >= 60 ? '中平' : '小凶';
  return [{ name: '数字能量', value: `${score} 分` }, { name: '评价', value: level }, { name: '说明', value: '趣味娱乐参考，切勿迷信' }];
}

/* ---------- 幸运数字 ---------- */
export function luckyNumber(values) {
  const name = String(values[0] || '').trim();
  if (!name) return '请输入名字';
  let sum = 0;
  for (const ch of name) sum += ch.codePointAt(0);
  const lucky = (sum % 9) + 1;
  const colors = ['红色', '橙色', '黄色', '绿色', '青色', '蓝色', '紫色', '金色', '白色'];
  return [{ name: '幸运数字', value: String(lucky) },
          { name: '幸运颜色', value: colors[lucky - 1] },
          { name: '幸运星期', value: '星期' + ['日', '一', '二', '三', '四', '五', '六'][lucky % 7] }];
}

/* ---------- 情书生成 ---------- */
const LOVE_OPEN = ['亲爱的', '致我最爱的', '给我心中的'];
const LOVE_MID = ['遇见你是我最大的幸运', '你的笑容照亮了我的每一天', '有你的日子连风都是甜的', '世界那么大，我只想和你一起走', '和你在一起的每分每秒都值得珍藏'];
const LOVE_END = ['永远爱你的', '只属于你的', '想陪你到老的我'];
export function loveLetter(values) {
  const name = String(values[0] || '').trim() || '你';
  const lines = [
    `${pick(LOVE_OPEN)}${name}：`,
    '',
    `　　今天想起你，心里还是甜甜的。${pick(LOVE_MID)}。`,
    `　　想带你看遍四季风景，想和你分享每一顿早餐，想把所有温柔都给你。`,
    `　　未来的日子，请让我一直陪在你身边。`,
    '',
    `　　　　　　　　${pick(LOVE_END)}`,
  ];
  return lines.join('\n');
}

/* ---------- 藏头诗生成 ---------- */
const POEM_LIB = [
  ['春风', '送暖', '入屠苏'], ['明月', '照我', '归故里'], ['青山', '不改', '绿水长'],
  ['花间', '一壶', '酒'], ['白云', '深处', '有人家'], ['海内存', '知己', '天涯若比邻'],
  ['长风', '破浪', '会有时'], ['但愿', '人长久', '千里共婵娟'], ['会当', '凌绝顶', '一览众山小'],
  ['采菊', '东篱下', '悠然见南山'], ['大漠', '孤烟直', '长河落日圆'], ['飞流', '直下', '三千尺'],
];
export function acrosticPoem(values) {
  const text = String(values[0] || '').trim();
  if (!text) return '请输入藏头文字';
  const chars = [...text];
  const lines = chars.map((ch, i) => {
    const [a, b, c] = POEM_LIB[i % POEM_LIB.length];
    return `${ch}${a}${b}，${c}${i % 2 === 0 ? '。' : '！'}`;
  });
  return lines.join('\n');
}

/* ---------- 卡路里消耗（MET） ---------- */
const METS = { 步行: 3.5, 慢跑: 7, 快跑: 10, 骑行: 6, 游泳: 8, 跳绳: 11, 瑜伽: 3, 健身: 6, 羽毛球: 7, 篮球: 8, 足球: 9, 跳舞: 5 };
export function calorieBurn(values) {
  const [weight, minutes, activity] = [parseFloat(values[0]), parseFloat(values[1]), values[2]];
  if (!weight || !minutes || !METS[activity]) return '请输入体重、时长并选择运动';
  const kcal = METS[activity] * 3.5 * weight / 200 * minutes;
  return [{ name: '消耗热量', value: `${Math.round(kcal)} 千卡` },
          { name: '运动', value: `${activity} ${minutes} 分钟` },
          { name: '参考', value: 'MET 代谢当量估算，个体差异 ±20%' }];
}

/* ---------- 酒驾判断（趣味参考） ---------- */
export function drunkCalc(values) {
  const [weight, beers, hours] = values.map((n) => parseFloat(n));
  if (!weight || !beers || weight < 30) return '请输入体重、啤酒数量与饮酒时长';
  // 简化模型：一瓶啤酒 ≈ 20g 酒精
  const alcoholG = beers * 20;
  const bac = alcoholG / (weight * 0.7) * 0.8 - hours * 0.015;
  const level = bac <= 0.02 ? '未达酒驾标准' : bac < 0.08 ? '酒驾（处罚）' : '醉驾（刑事）';
  return [{ name: '估算血液酒精浓度', value: `${Math.max(0, bac).toFixed(3)}%` },
          { name: '判定', value: level },
          { name: '郑重提示', value: '饮酒不开车，开车不饮酒！本计算仅为科普参考' }];
}

/* ---------- 随机号码（彩票模拟） ---------- */
export function lotteryDraw(values) {
  const type = values[0] || 'ssq';
  if (type === 'ssq') {
    const reds = shuffle(Array.from({ length: 33 }, (_, i) => i + 1)).slice(0, 6).sort((a, b) => a - b);
    const blue = ri(16) + 1;
    return `红球：${reds.join(' ')}\n蓝球：${blue}`;
  }
  const fronts = shuffle(Array.from({ length: 35 }, (_, i) => i + 1)).slice(0, 5).sort((a, b) => a - b);
  const backs = shuffle(Array.from({ length: 12 }, (_, i) => i + 1)).slice(0, 2).sort((a, b) => a - b);
  return `前区：${fronts.join(' ')}\n后区：${backs.join(' ')}`;
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = ri(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
