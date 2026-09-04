/* D-Tool 生成工具算法库 2（纯函数，Node 可测）
   覆盖：随机诗句、成语、英文名、单词、emoji、藏头诗数据版 */

const ri = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[ri(arr.length)];

/* ---------- 随机诗句 ---------- */
const POEMS = [
  ['床前明月光', '疑是地上霜'], ['举头望明月', '低头思故乡'],
  ['白日依山尽', '黄河入海流'], ['欲穷千里目', '更上一层楼'],
  ['春眠不觉晓', '处处闻啼鸟'], ['夜来风雨声', '花落知多少'],
  ['锄禾日当午', '汗滴禾下土'], ['谁知盘中餐', '粒粒皆辛苦'],
  ['红豆生南国', '春来发几枝'], ['愿君多采撷', '此物最相思'],
  ['离离原上草', '一岁一枯荣'], ['野火烧不尽', '春风吹又生'],
  ['千山鸟飞绝', '万径人踪灭'], ['孤舟蓑笠翁', '独钓寒江雪'],
  ['两个黄鹂鸣翠柳', '一行白鹭上青天'], ['窗含西岭千秋雪', '门泊东吴万里船'],
  ['好雨知时节', '当春乃发生'], ['随风潜入夜', '润物细无声'],
  ['大漠孤烟直', '长河落日圆'], ['山重水复疑无路', '柳暗花明又一村'],
  ['会当凌绝顶', '一览众山小'], ['海内存知己', '天涯若比邻'],
  ['沉舟侧畔千帆过', '病树前头万木春'], ['长风破浪会有时', '直挂云帆济沧海'],
  ['天生我材必有用', '千金散尽还复来'], ['人生得意须尽欢', '莫使金樽空对月'],
  ['无边落木萧萧下', '不尽长江滚滚来'], ['问渠那得清如许', '为有源头活水来'],
  ['落红不是无情物', '化作春泥更护花'], ['不畏浮云遮望眼', '自缘身在最高层'],
  ['但愿人长久', '千里共婵娟'], ['大江东去', '浪淘尽'],
  ['独在异乡为异客', '每逢佳节倍思亲'], ['春风又绿江南岸', '明月何时照我还'],
  ['忽如一夜春风来', '千树万树梨花开'], ['停车坐爱枫林晚', '霜叶红于二月花'],
  ['接天莲叶无穷碧', '映日荷花别样红'], ['竹外桃花三两枝', '春江水暖鸭先知'],
];
export function randomPoem(count = 1) {
  const n = Math.max(1, Math.min(20, parseInt(count, 10) || 1));
  const out = [];
  for (let i = 0; i < n; i++) {
    const [a, b] = pick(POEMS);
    out.push(`${a}，${b}。`);
  }
  return out.join('\n');
}

/* ---------- 随机成语 ---------- */
const IDIOMS = [
  '画蛇添足', '守株待兔', '掩耳盗铃', '亡羊补牢', '刻舟求剑', '狐假虎威', '井底之蛙', '叶公好龙',
  '自相矛盾', '滥竽充数', '杯弓蛇影', '鹤立鸡群', '对牛弹琴', '黔驴技穷', '惊弓之鸟', '望梅止渴',
  '三顾茅庐', '卧薪尝胆', '破釜沉舟', '四面楚歌', '背水一战', '纸上谈兵', '围魏救赵', '声东击西',
  '草船借箭', '空城计', '桃李满天下', '马到成功', '龙飞凤舞', '画龙点睛', '愚公移山', '精卫填海',
  '夸父逐日', '嫦娥奔月', '牛郎织女', '女娲补天', '盘古开天', '指鹿为马', '完璧归赵', '负荆请罪',
  '毛遂自荐', '闻鸡起舞', '悬梁刺股', '囊萤映雪', '凿壁偷光', '程门立雪', '入木三分', '胸有成竹',
  '洛阳纸贵', '东山再起', '草木皆兵', '风声鹤唳', '一鼓作气', '退避三舍', '老马识途', '按图索骥',
  '唇亡齿寒', '鹤蚌相争', '鹬蚌相争', '买椟还珠', '郑人买履', '邯郸学步', '东施效颦', '朝三暮四',
  '南辕北辙', '拔苗助长', '盲人摸象', '塞翁失马', '鹏程万里', '千里迢迢', '心心相印', '一见钟情',
  '两全其美', '三心二意', '四面八方', '五光十色', '六神无主', '七上八下', '八面玲珑', '九牛一毛',
  '十全十美', '百发百中', '千变万化', '万紫千红',
];
export function randomIdiom(count = 1) {
  const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
  return Array.from({ length: n }, () => pick(IDIOMS)).join('\n');
}

/* ---------- 随机英文名 ---------- */
const EN_FIRST_M = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Steven', 'Andrew', 'Kevin', 'Brian', 'Edward', 'George'];
const EN_FIRST_F = ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Carol'];
const EN_LAST = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];
export function randomEnglishName(count = 1, gender = 'any') {
  const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
  const out = [];
  for (let i = 0; i < n; i++) {
    const first = gender === 'female' ? pick(EN_FIRST_F) : gender === 'male' ? pick(EN_FIRST_M) : (Math.random() < 0.5 ? pick(EN_FIRST_M) : pick(EN_FIRST_F));
    out.push(`${first} ${pick(EN_LAST)}`);
  }
  return out.join('\n');
}

/* ---------- 随机英文单词 ---------- */
const WORDS = ['apple', 'book', 'cat', 'dog', 'elephant', 'flower', 'garden', 'house', 'island', 'jungle', 'key', 'lamp', 'moon', 'night', 'ocean', 'piano', 'queen', 'river', 'sun', 'tree', 'umbrella', 'valley', 'water', 'xylophone', 'yellow', 'zebra', 'mountain', 'cloud', 'star', 'rainbow', 'forest', 'desert', 'meadow', 'canyon', 'glacier', 'volcano', 'waterfall', 'meadow', 'orchard', 'harvest', 'journey', 'adventure', 'discovery', 'wonder', 'dream', 'hope', 'peace', 'joy', 'smile', 'laughter'];
export function randomWord(count = 1) {
  const n = Math.max(1, Math.min(100, parseInt(count, 10) || 10));
  return Array.from({ length: n }, () => pick(WORDS)).join('\n');
}

/* ---------- 随机数字（带格式） ---------- */
export function randomNumberFormatted(values) {
  const [min, max, count] = [parseInt(values[0], 10), parseInt(values[1], 10), parseInt(values[2], 10)];
  if (Number.isNaN(min) || Number.isNaN(max) || min > max) return '请输入合法范围';
  const n = Math.max(1, Math.min(100, count || 10));
  const span = max - min + 1;
  const arr = new Uint32Array(n);
  crypto.getRandomValues(arr);
  return Array.from({ length: n }, (_, i) => String(min + (arr[i] % span))).join('\n');
}

/* ---------- 随机时间 ---------- */
export function randomTime(count = 1) {
  const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
  const pad = (x) => String(x).padStart(2, '0');
  return Array.from({ length: n }, () => `${pad(ri(24))}:${pad(ri(60))}:${pad(ri(60))}`).join('\n');
}

/* ---------- 随机手机验证码 ---------- */
export function randomCode(count = 1, digits = 6) {
  const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
  const len = Math.max(4, Math.min(10, parseInt(digits, 10) || 6));
  return Array.from({ length: n }, () => Array.from({ length: len }, () => ri(10)).join('')).join('\n');
}

/* ---------- 随机表情（颜文字） ---------- */
const KAOMOJI = ['(●\'◡\'●)', '(◕‿◕)', '(￣▽￣)', '(¬‿¬)', '(•̀ᴗ•́)و', '(/◕ヮ◕)/', '(╯°□°)╯', '(☞ﾟヮﾟ)☞', '(ノ◕ヮ◕)ノ*:･ﾟ✧', 'ヽ(・∀・)ﾉ', '(｡♥‿♥｡)', '(づ｡◕‿‿◕｡)づ', '(；一_一)', '(￣ε￣)', '(≧∇≦)ﾉ', '(＾▽＾)', '(´･ω･`)', '(•_•)', '(>_<)', '(^-^)'];
export function randomKaomoji(count = 1) {
  const n = Math.max(1, Math.min(20, parseInt(count, 10) || 3));
  return Array.from({ length: n }, () => pick(KAOMOJI)).join('\n');
}

/* ---------- 随机 Emoji ---------- */
const EMOJIS = ['😀', '😂', '😊', '😍', '🤔', '😭', '😡', '🥳', '👍', '👏', '🙏', '💪', '❤️', '💯', '🔥', '✨', '⭐', '🌈', '🌸', '🍀', '🎂', '🎁', '🎉', '🏆', '🚀', '✈️', '💻', '📱', '📚', '🎵'];
export function randomEmoji(count = 1) {
  const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
  return Array.from({ length: n }, () => pick(EMOJIS)).join(' ');
}
