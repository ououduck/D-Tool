/* D-Tool 文本处理算法库（纯函数，Node 可测）
   覆盖：行操作、统计、提取、掩码、转换、格式化等 */

const td = new TextDecoder();
const te = new TextEncoder();

/* ---------- 行操作 ---------- */
export function linesOf(input) {
  return input.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
}
export function dedupeLines(input, keepOrder = true) {
  const seen = new Set();
  const out = [];
  for (const line of linesOf(input)) {
    if (keepOrder) { if (!seen.has(line)) { seen.add(line); out.push(line); } }
    else out.push(line);
  }
  return keepOrder ? out.join('\n') : [...new Set(out)].join('\n');
}
export function sortLines(input, desc = false, ignoreCase = false) {
  const lines = linesOf(input);
  const key = (s) => ignoreCase ? s.toLowerCase() : s;
  lines.sort((a, b) => { const x = key(a), y = key(b); return x < y ? -1 : x > y ? 1 : 0; });
  if (desc) lines.reverse();
  return lines.join('\n');
}
export const sortLinesDesc = (input) => sortLines(input, true);
export const dedupeSortLines = (input) => [...new Set(linesOf(input))].sort().join('\n');
export const joinLinesComma = (input) => linesOf(input).join(',');
export const joinLinesDun = (input) => linesOf(input).join('、');
export const splitBySpace = (input) => input.split(/\s+/).filter(Boolean).join('\n');
export function reverseLines(input) {
  return linesOf(input).reverse().join('\n');
}
export function reverseText(input) {
  return [...input].reverse().join('');
}
export function numberLines(input, start = 1) {
  const n = Math.max(0, parseInt(start, 10) || 0);
  return linesOf(input).map((line, i) => `${String(i + n).padStart(4, '0')}  ${line}`).join('\n');
}
export function stripEmptyLines(input) {
  return linesOf(input).filter((l) => l.trim() !== '').join('\n');
}
export function trimLines(input) {
  return linesOf(input).map((l) => l.trim()).join('\n');
}
export function removeSpaces(input) {
  return input.replace(/\s+/g, '');
}
export function removeLineBreaks(input) {
  return input.replace(/\r?\n/g, '');
}
export function joinLines(input, sep = ',') {
  return linesOf(input).join(sep);
}
export function splitBySeparator(input, sep = ',') {
  return input.split(sep).map((s) => s.trim()).join('\n');
}
export function wrapLines(input, width = 80) {
  const w = Math.max(1, parseInt(width, 10) || 80);
  const out = [];
  for (const line of linesOf(input)) {
    if (line.length <= w) { out.push(line); continue; }
    let rest = line;
    while (rest.length > w) { out.push(rest.slice(0, w)); rest = rest.slice(w); }
    out.push(rest);
  }
  return out.join('\n');
}
export function shuffleLines(input) {
  const lines = linesOf(input);
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lines[i], lines[j]] = [lines[j], lines[i]];
  }
  return lines.join('\n');
}
export function reverseWords(input) {
  return input.split(/\s+/).reverse().join(' ');
}

/* ---------- 统计 ---------- */
export function textStats(input) {
  const chars = input.length;
  const noSpace = input.replace(/\s/g, '').length;
  const words = (input.trim().match(/[\u4e00-\u9fff]|[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g) || []).length;
  const lines = linesOf(input).length;
  const bytes = te.encode(input).length;
  const paragraphs = input.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const cjk = (input.match(/[\u4e00-\u9fff]/g) || []).length;
  const chinesePunct = (input.match(/[，。！？；：、“”‘’（）《》【】]/g) || []).length;
  const englishPunct = (input.match(/[.,!?;:()'"-]/g) || []).length;
  const digits = (input.match(/[0-9]/g) || []).length;
  return { chars, noSpace, words, lines, bytes, paragraphs, cjk, chinesePunct, englishPunct, digits };
}

/* ---------- 提取 ---------- */
export function extractUrls(input) {
  const re = /https?:\/\/[^\s<>"']+/g;
  return input.match(re) || [];
}
export function extractEmails(input) {
  const re = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
  return input.match(re) || [];
}
export function extractPhones(input) {
  const re = /(?:\+?86[- ]?)?1[3-9]\d{9}|0\d{2,3}[- ]?\d{7,8}/g;
  return input.match(re) || [];
}
export function extractChinese(input) {
  return (input.match(/[\u4e00-\u9fff]+/g) || []).join('');
}
export function extractNumbers(input, keepDecimals = false) {
  const re = keepDecimals ? /-?\d+(?:\.\d+)?/g : /-?\d+/g;
  return (input.match(re) || []).join('\n');
}
export const extractNumbersDecimal = (input) => extractNumbers(input, true);
export function extractEnglish(input) {
  return (input.match(/[A-Za-z]+/g) || []).join(' ');
}
export function extractIpv4(input) {
  const re = /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g;
  return input.match(re) || [];
}
export function extractJson(input) {
  const out = [];
  const re = /\{(?:[^{}]|"[^"]*")*\}|\[(?:[^\[\]]|"[^"]*")*\]/g;
  let m;
  while ((m = re.exec(input)) !== null) out.push(m[0]);
  return out;
}

/* ---------- 掩码/隐私 ---------- */
export function maskPhone(input) {
  return input.replace(/(1[3-9]\d)\d{4}(\d{4})/g, '$1****$2');
}
export function maskIdCard(input) {
  return input.replace(/(\d{6})\d{8}(\d{3}[\dXx])/g, '$1********$2');
}
export function maskEmail(input) {
  return input.replace(/([A-Za-z0-9._%+-])[^@]*@/, (m, first) => first + '***@');
}
export function maskName(input) {
  return input.replace(/[\u4e00-\u9fff]{2,}/g, (m) => m[0] + '*'.repeat(m.length - 1));
}
export function maskBankCard(input) {
  return input.replace(/\d{12,19}/g, (m) => m.slice(0, 4) + ' **** **** ' + m.slice(-4));
}
export function maskAll(input) {
  return '*'.repeat(input.length);
}

/* ---------- 转换 ---------- */
export function toUpperCase(input) { return input.toUpperCase(); }
export function toLowerCase(input) { return input.toLowerCase(); }
export function toTitleCase(input) {
  return input.toLowerCase().replace(/(^|[\s\-_/(])([a-z])/g, (m, p, c) => p + c.toUpperCase());
}
export function toSentenceCase(input) {
  return input.toLowerCase().replace(/(^\s*|[.!?。！？]\s+)([a-z])/g, (m, p, c) => p + c.toUpperCase());
}
export function toFullWidth(input) {
  return input.replace(/[A-Za-z0-9!-~]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0));
}
export function toHalfWidth(input) {
  return input.replace(/[\uff01-\uff5e]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/\u3000/g, ' ');
}
export function verticalText(input) {
  return linesOf(input).map((line) => [...line].join('\n')).join('\n');
}
export function addLineNumbers(input, start = 1) { return numberLines(input, start); }
export function indentText(input, spaces = 2) {
  const pad = ' '.repeat(Math.max(0, parseInt(spaces, 10) || 0));
  return linesOf(input).map((l) => pad + l).join('\n');
}
export function stripHtml(input) {
  return input.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&(\w+);/g, '').replace(/\n{3,}/g, '\n\n');
}
export function stripMarkdown(input) {
  return input
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/^```.*$/gm, ''))
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/~~([^~]+)~~/g, '$1');
}
export function htmlToPlain(input) { return stripHtml(input); }
export function cjkToPinyinFirst(input) {
  // 取每个汉字的拼音首字母（常用字表），无法识别的原样保留
  return input.replace(/[\u4e00-\u9fff]/g, (ch) => PINYIN_FIRST[ch] || ch);
}
export function removeEmoji(input) {
  return input.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '');
}
export function countKeyword(input, keyword = '') {
  if (!keyword) return 0;
  let count = 0, idx = 0;
  while ((idx = input.indexOf(keyword, idx)) !== -1) { count++; idx += keyword.length; }
  return count;
}
/* 多关键词计数：返回 [{name, value}] */
export function countKeywords(input, keywordStr = '') {
  const keywords = keywordStr.split(/[,，]/).map((k) => k.trim()).filter(Boolean);
  if (!keywords.length) return [{ name: '提示', value: '请填写关键词' }];
  return keywords.map((k) => ({ name: k, value: `${countKeyword(input, k)} 次` }));
}
export function charFrequency(input) {
  const map = new Map();
  for (const ch of input.replace(/\s/g, '')) map.set(ch, (map.get(ch) || 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([ch, n]) => ({ name: ch, value: `${n} 次` }));
}

/* 常用汉字拼音首字母映射（一级常用字子集） */
const PINYIN_FIRST = (() => {
  const groups = [
    ['a', '阿啊哎哀唉挨癌矮艾爱碍安岸按案暗昂袄傲奥懊'], ['b', '八巴扒吧疤拔把坝爸罢白百柏摆败拜班般颁斑搬板版办半伴扮拌瓣邦帮绑棒傍包胞剥雹薄饱宝保堡报抱暴爆卑杯悲碑北贝备背倍被辈奔本笨崩绷蹦逼鼻比彼笔币必毕闭毙秘碧蔽壁避臂边编鞭扁便变遍辨辩辫标表别宾滨冰兵丙柄饼并病拨波玻剥播伯驳泊勃脖博搏膊薄卜补捕不布步部'], ['c', '猜才材财裁采彩踩菜参餐残蚕惭惨灿仓苍舱藏操糙曹槽草册厕侧测策层叉插查茶察岔差拆柴馋缠产铲颤昌长肠尝偿厂场畅倡唱抄超朝潮吵炒车扯彻撤臣尘辰沉陈晨衬称趁撑成呈诚承城乘程惩澄橙吃池驰迟持尺齿斥赤翅充冲虫崇抽仇绸酬稠愁筹丑臭出初除厨锄础储楚处触川穿传船喘串窗床闯创吹炊垂春纯唇词瓷慈辞磁此刺赐匆从葱聪丛凑粗促醋窜催摧脆存寸搓撮错'], ['d', '搭达答打大呆代带待怠贷袋逮戴丹担单耽胆但担诞弹淡蛋当挡党荡刀叨导岛倒蹈到悼盗道稻得德灯登等邓凳滴低堤敌笛底抵地弟帝递第颠典点电店垫殿叼雕吊钓掉跌爹叠碟丁盯钉顶订丢东冬懂动冻栋洞都斗抖陡豆逗毒独读堵赌杜肚度渡端短断段缎锻堆队对吨蹲盾顿多夺朵躲惰'], ['e', '俄鹅额恶饿恩儿而耳二'], ['f', '发罚乏伐阀法帆番翻凡烦繁反返犯饭泛范贩方坊芳防房仿访纺放飞非肥匪肺废费沸芬吩纷坟粉份奋愤丰风枫疯峰锋蜂逢缝讽凤奉佛否夫肤孵伏扶佛俘浮符幅福抚甫府斧俯辅腐父付妇负附咐阜复赴副傅富腹覆'], ['g', '该改概钙盖溉干甘杆肝赶敢感刚钢缸岗港高搞稿告戈胳鸽搁割歌革阁格葛隔个各给根跟更耕工弓公功攻供宫恭躬巩共贡勾沟钩狗构购够估姑孤辜古谷股骨鼓固故顾瓜刮寡挂乖拐怪关观官冠馆管贯惯灌罐光广归龟规硅轨鬼柜贵桂滚棍锅国果裹过'], ['h', '哈孩海害含寒函罕喊汉汗旱杭航毫豪好号耗浩呵喝合何和河荷核盒贺褐鹤黑嘿痕很狠恨哼恒横衡轰哄红宏洪虹喉侯猴吼后厚候乎呼忽狐胡壶湖蝴糊虎互户护花哗华滑化划画话怀坏欢还环缓换唤患荒慌皇黄煌晃灰挥恢辉回毁悔汇会绘贿惠慧昏婚浑魂混活火伙或货获祸惑'], ['j', '几击饥圾机肌鸡积基绩激及吉级即极急疾集籍几己挤给计记纪忌际剂季既济继寂寄加夹佳家嘉甲假价驾架嫁稼尖奸歼坚间肩艰监兼渐煎拣俭捡剪减检简见件建荐贱健舰渐践鉴键箭江讲奖降将酱交郊娇骄胶教焦角狡绞饺脚搅叫轿较教阶皆接街节劫杰洁结捷截竭姐解介戒届借巾今斤金津筋仅紧锦尽进近劲晋浸禁京经茎荆惊晶睛精井颈景警径净竞竟敬静境镜纠究九久酒旧救就舅居局菊橘举矩句巨拒具距剧惧据惧聚卷倦决绝觉嚼掘君军均菌俊'], ['k', '卡开凯慨刊看砍坎抗扛炕考拷烤靠科棵颗壳咳可克刻客课肯坑空孔恐控口扣寇枯哭苦库裤夸跨块快筷宽款狂况矿亏葵愧坤昆困扩括阔'], ['l', '拉啦喇腊蜡辣来赖兰拦栏蓝览懒烂滥郎狼廊朗浪捞劳牢老乐勒雷累泪类冷愣厘梨离理李里礼丽厉立励利例隶栗粒俩连帘怜莲联廉脸练炼恋良凉梁粮两亮谅辆量辽疗僚了料列烈劣猎裂邻林临淋磷鳞凛吝灵铃陵零龄岭领另令溜刘流留硫瘤柳六龙笼聋隆垄拢笼楼搂漏露卢芦炉颅卤虏鲁陆录鹿碌路露驴吕铝旅屡律虑率绿卵乱掠略轮论罗萝逻锣箩骡骆落'], ['m', '妈麻马码蚂骂埋买麦卖迈脉瞒馒蛮满漫慢忙芒盲茫猫毛矛茅茂冒贸帽貌么没眉梅媒煤霉每美妹闷门们萌蒙猛梦咪迷谜米密秘蜜眠绵棉免勉面苗描秒妙庙灭民敏名明鸣命摸模膜摩磨蘑魔抹末沫陌莫漠墨默谋某母亩牡姆木目牧墓幕慕暮'], ['n', '拿哪那纳娜乃奶耐男南难囊脑闹内嫩能尼泥你拟逆年念娘酿鸟尿捏您宁凝牛扭农浓弄奴努怒女暖挪诺'], ['o', '欧偶'], ['p', '趴爬怕拍排牌派攀盘判叛盼乓旁胖抛炮袍跑泡赔陪培佩配喷盆朋棚蓬鹏捧批披劈皮疲脾匹屁偏篇片骗漂飘票撇拼贫品聘乒平评凭瓶屏坡泼颇婆破迫剖扑铺葡蒲朴普谱'], ['q', '七妻欺戚期漆齐其奇骑棋旗乞企启起气弃汽砌器恰千迁牵铅谦签前钱钳潜浅遣欠枪腔强墙抢悄敲乔桥瞧巧俏切且怯窃亲侵秦琴勤青轻倾清情晴请庆穷丘秋求球区曲驱屈渠取娶去趣圈权全拳犬劝券缺却雀确鹊裙群'], ['r', '然燃染嚷壤让饶扰绕热人仁忍认任扔仍日荣绒容溶融柔肉如儒乳辱入软锐瑞润若'], ['s', '撒洒塞赛三伞散嗓丧扫嫂色森杀沙纱傻晒山杉衫珊闪陕扇善伤商赏上尚捎稍烧少绍哨舌蛇舍设社射涉摄申伸身深神沈审婶甚肾慎升生声牲省圣胜师诗施狮湿十石时识实拾食蚀史使始驶士氏示世市式事侍势视试饰室是适逝释收手守首寿受授售兽瘦书叔殊舒疏输蔬熟暑鼠属术述树竖数刷衰摔甩帅拴双霜爽水税睡顺说硕丝司私思斯撕死寺似饲松宋送诵搜艘苏俗诉素速宿塑酸算虽随岁碎孙损笋缩所索锁'], ['t', '他它她塔踏台抬太态泰贪摊滩坛谈痰坦毯叹炭探汤唐堂塘膛糖躺烫掏逃桃陶淘萄讨套特疼腾梯踢提题蹄体替天添田甜填挑条跳贴铁帖厅听亭庭停挺通同铜童统桶筒痛偷头投透突图徒途涂屠土吐兔团推腿退吞屯托拖脱驼妥拓唾'], ['w', '挖哇歪外弯湾玩顽丸完晚碗万汪亡王网往忘望危威微为围违唯维伟伪尾委卫未位味畏胃喂慰温文纹闻蚊稳问翁窝我沃卧握乌污屋无吴五午武舞务物误悟雾'], ['x', '夕西吸希昔析息牺悉惜晰稀溪熄膝习席袭媳洗喜系细隙虾峡狭辖霞下夏吓仙先纤掀鲜闲贤弦衔嫌显险现县限线宪陷馅羡献乡相香箱详祥享响想向项象像橡削消宵萧硝销小晓孝校笑效些歇协胁斜携鞋写泄泻卸屑械谢心辛欣新薪信星腥刑行形醒兴杏姓幸性凶兄胸雄休修羞朽秀绣袖需徐许序叙畜蓄宣悬旋选穴学雪血寻巡询循训讯迅'], ['y', '压呀押鸦鸭牙芽崖哑雅亚咽烟淹延严言岩沿炎研盐颜衍掩眼演厌雁焰燕央秧杨扬羊阳仰养样腰邀窑摇遥咬药要耀爷也冶野业叶页夜液一伊衣医依仪宜姨移遗疑乙已以蚁倚椅亿义艺忆议亦异役译易疫益谊意溢毅翼因阴音吟银引饮隐印应英婴鹰迎盈营蝇赢影映硬哟拥庸永咏泳勇涌用优忧悠尤由邮犹油游友有又右幼诱于予余鱼渔愉愚榆与宇羽雨语玉育郁狱浴预域欲遇寓御裕愈誉豫元员园原圆援源缘远怨院愿约月悦阅跃越云匀允运孕蕴'], ['z', '杂砸灾栽载宰再在咱暂赞脏遭糟早枣灶造噪燥责择则泽贼怎增赠扎渣轧闸眨炸榨爪找沼召兆照罩遮折哲者这浙珍真针侦枕诊震镇争征怔睁挣蒸整正证郑政症之支汁芝枝知织肢脂蜘执直侄值职植殖止只旨址纸指趾至志制治质致智置中忠终钟肿种众舟周洲粥皱朱株珠诸猪竹烛逐主煮嘱助住注驻柱祝著铸筑抓爪专砖转赚庄装壮状撞追准捉桌着仔姿资滋子紫字自宗综棕踪总纵走奏租足族阻组祖钻嘴最罪尊遵昨左作坐座做'],
  ];
  const map = {};
  for (const [first, chars] of groups) for (const ch of chars) map[ch] = first.toUpperCase();
  return map;
})();
