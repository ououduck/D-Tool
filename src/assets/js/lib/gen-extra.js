/* D-Tool 生成工具算法库（纯函数，Node 可测）
   覆盖：姓名/手机/邮箱/地址/公司/职位/昵称/银行卡/车牌/QQ/微信号/色值/日期/句子/身份证/IP/MAC/优惠码/Mock 数据
   统一签名：fn(count?, ...opts) → string（多行）或 string[]（gen 运行时按行输出） */

const SURN = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄麹家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘斜厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍却璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公';
const GIVEN_M = '伟强磊军洋勇毅俊峰大山辉良平刚建华明超鹏亮飞彬宇轩浩然嘉杰昊然宇航铭哲凯翔辰逸泽洋旭尧博文俊驰昊天思远志强承恩宇达弘文鹏涛煜城懿轩烨磊俊哲昊天擎宇振宇伟诚绍辉鹏煊昊强帆越景澄俊驰修杰志泽弘翰峻熙嘉懿煜城';
const GIVEN_F = '芳娜敏静丽娟艳玲燕红玉萍莉秀英兰霞雪梅秀兰文娟婷婷欣怡语嫣若曦梦瑶雨欣晨曦子涵思思雅静慧敏慧玲彩英雪丽春梅秋月荷花桂香凤英晓红玉琴月娥彩霞洁莹璐瑶欣妍雅雯心怡梦洁';
const CITIES = ['北京市', '上海市', '广州市', '深圳市', '杭州市', '南京市', '成都市', '重庆市', '武汉市', '西安市', '天津市', '苏州市', '长沙市', '郑州市', '青岛市', '大连市', '厦门市', '宁波市', '昆明市', '合肥市'];
const DISTRICTS = ['朝阳区', '海淀区', '浦东新区', '天河区', '南山区', '西湖区', '鼓楼区', '锦江区', '洪山区', '雁塔区', '和平区', '工业园区', '岳麓区', '金水区', '市南区', '中山区', '思明区', '鄞州区', '五华区', '蜀山区'];
const ROADS = ['中山路', '人民路', '解放路', '建设路', '和平路', '新华路', '幸福路', '东风路', '朝阳路', '胜利路', '长江路', '黄河路', '文化路', '体育路', '科技路', '创新路', '振兴街', '团结巷', '光明街', '前进路'];
const COMPS = ['科技', '网络', '信息', '数据', '智能', '传媒', '贸易', '实业', '咨询', '软件', '云', '金融', '教育', '文化', '健康', '能源', '环保', '物流', '设计', '电子'];
const COMP_TAIL = ['有限公司', '股份有限公司', '集团', '工作室', '中心', '有限责任公司'];
const JOBS = ['工程师', '设计师', '产品经理', '运营专员', '市场经理', '销售代表', '人事专员', '财务主管', '客服专员', '项目经理', '测试工程师', '数据分析师', '文案策划', '摄影师', '律师', '医生', '教师', '会计', '编辑', '架构师'];
const NICK_ADJ = ['快乐', '阳光', '安静', '勇敢', '温柔', '聪明', '可爱', '帅气', '美丽', '善良', '活泼', '自信', '幽默', '真诚', '勤奋', '大气', '酷炫', '甜美', '机智', '淡定'];
const NICK_NOUN = ['小猫', '小鱼', '小鸟', '小熊', '兔子', '狐狸', '星星', '月亮', '太阳', '云朵', '彩虹', '雪花', '微风', '糖果', '奶茶', '西瓜', '柠檬', '布丁', '饼干', '耳机'];
const EMAIL_DOMAINS = ['qq.com', '163.com', '126.com', 'gmail.com', 'outlook.com', 'foxmail.com', 'sina.com', '139.com', 'icloud.com', 'hotmail.com'];
const SENT_SUB = ['我们', '他们', '大家', '生活', '时间', '梦想', '努力', '坚持', '学习', '工作', '朋友', '家人', '世界', '明天', '今天', '青春', '岁月', '阳光', '风雨', '远方'];
const SENT_VERB = ['总是在', '一直在', '从未停止', '值得', '需要', '应该', '必须', '可以', '希望', '期待', '相信', '热爱', '珍惜', '拥抱', '面对', '超越', '成就', '创造', '守护', '分享'];
const SENT_OBJ = ['前进', '成长', '改变', '突破', '梦想', '幸福', '美好', '希望', '未来', '挑战', '机遇', '自己', '他人', '生活', '工作', '学习', '快乐', '平安', '成功', '温暖'];
const PLATE_PROV = '京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新';
const IDCARD_AREA = ['110101', '310101', '440305', '440106', '330106', '320106', '510107', '500103', '420106', '610113', '120101', '320508', '350203', '330211', '530102', '340111', '430104', '410105', '370202', '210202'];

const ri = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[ri(arr.length)];
const pad2 = (n) => String(n).padStart(2, '0');

/* ---------- 中文姓名 ---------- */
export function randomChineseName(count = 1, gender = 'any') {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    const sur = pick(SURN);
    let given;
    if (gender === 'male') given = pick(GIVEN_M);
    else if (gender === 'female') given = pick(GIVEN_F);
    else given = Math.random() < 0.5 ? pick(GIVEN_M) : pick(GIVEN_F);
    // 30% 概率双字名
    if (Math.random() < 0.3) {
      const pool = gender === 'female' ? GIVEN_F : GIVEN_M;
      given = given[0] + pick(pool);
    }
    out.push(sur + given);
  }
  return out.join('\n');
}

/* ---------- 手机号 ---------- */
export function randomPhone(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const prefixes = ['13', '15', '16', '17', '18', '19'];
  const out = [];
  for (let i = 0; i < n; i++) {
    let num = pick(prefixes) + ri(10);
    if (num[1] === '7' && !['0', '1', '9'].includes(num[2])) num = num[0] + num[1] + '0'; // 17 号段修正
    for (let k = 0; k < 8; k++) num += ri(10);
    out.push(num);
  }
  return out.join('\n');
}

/* ---------- 邮箱 ---------- */
export function randomEmail(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    const name = pick(NICK_ADJ) + pick(NICK_NOUN) + ri(100);
    out.push(`${name}@${pick(EMAIL_DOMAINS)}`);
  }
  return out.join('\n');
}

/* ---------- 地址 ---------- */
export function randomAddress(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(`${pick(CITIES)}${pick(DISTRICTS)}${pick(ROADS)}${ri(1, 300)}号${ri(1, 20)}栋${ri(1, 30)}${ri(1, 20) < 5 ? '0' + ri(1, 9) : ri(10, 30)}室`);
  }
  return out.join('\n');
}

/* ---------- 公司名 ---------- */
export function randomCompany(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(`${pick(SURN)}${pick(COMPS)}${pick(COMPS)}${pick(COMP_TAIL)}`);
  }
  return out.join('\n');
}

/* ---------- 职位 ---------- */
export function randomJob(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  return Array.from({ length: n }, () => pick(JOBS)).join('\n');
}

/* ---------- 昵称 ---------- */
export function randomNickname(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(pick(NICK_ADJ) + pick(NICK_NOUN) + (Math.random() < 0.5 ? String(ri(1000)) : ''));
  }
  return out.join('\n');
}

/* ---------- 银行卡（Luhn 校验） ---------- */
export function randomBankCard(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const prefixes = ['622202', '621700', '622848', '622262', '621558', '622188', '622575', '621661', '622155', '621226'];
  const out = [];
  for (let i = 0; i < n; i++) {
    let card = pick(prefixes);
    while (card.length < 18) card += ri(10);
    // Luhn 补校验位
    let sum = 0;
    const digits = card.split('').map(Number);
    for (let k = digits.length - 1; k >= 0; k--) {
      let d = digits[k];
      if ((digits.length - k) % 2 === 0) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
    }
    const check = (10 - (sum % 10)) % 10;
    out.push(card + check);
  }
  return out.join('\n');
}

/* ---------- 车牌号 ---------- */
export function randomPlate(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  const out = [];
  for (let i = 0; i < n; i++) {
    let plate = pick(PLATE_PROV) + 'A';
    if (Math.random() < 0.3) { plate += pick('ABCDEFGHJKLMNPQRSTUVWXYZ'); plate += pick(chars) + pick(chars) + pick(chars) + pick(chars) + pick(chars); }
    else plate += pick(chars) + pick(chars) + pick(chars) + pick(chars) + pick(chars);
    out.push(plate);
  }
  return out.join('\n');
}

/* ---------- 微信号/QQ ---------- */
export function randomWechat(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    const len = 6 + ri(10);
    let w = Math.random() < 0.5 ? pick(NICK_ADJ) : pick(NICK_NOUN);
    while (w.length < len) w += ri(10);
    out.push(w);
  }
  return out.join('\n');
}
export function randomQQ(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  return Array.from({ length: n }, () => String(ri(9) + 1) + Array.from({ length: 5 + ri(4) }, () => ri(10)).join('')).join('\n');
}

/* ---------- 十六进制颜色 ---------- */
export function randomColor(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  return Array.from({ length: n }, () => '#' + Array.from({ length: 6 }, () => '0123456789abcdef'[ri(16)]).join('')).join('\n');
}

/* ---------- 随机日期 ---------- */
export function randomDate(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    const y = 1970 + ri(55);
    const m = 1 + ri(12);
    const d = 1 + ri(28);
    out.push(`${y}-${pad2(m)}-${pad2(d)}`);
  }
  return out.join('\n');
}

/* ---------- 随机句子 ---------- */
export function randomSentence(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  return Array.from({ length: n }, () => `${pick(SENT_SUB)}${pick(SENT_VERB)}${pick(SENT_OBJ)}。`).join('\n');
}

/* ---------- 身份证号（18 位，含校验位） ---------- */
export function randomIdCard(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const out = [];
  for (let i = 0; i < n; i++) {
    const area = pick(IDCARD_AREA);
    const y = 1950 + ri(55);
    const m = 1 + ri(12);
    const d = 1 + ri(28);
    const seq = String(ri(1000)).padStart(3, '0');
    const birth = `${y}${pad2(m)}${pad2(d)}`;
    const body = area + birth + seq;
    const W = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const CODE = '10X98765432';
    let sum = 0;
    for (let k = 0; k < 17; k++) sum += Number(body[k]) * W[k];
    out.push(body + CODE[sum % 11]);
  }
  return out.join('\n');
}

/* ---------- 随机 IPv4 ---------- */
export function randomIpv4(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  return Array.from({ length: n }, () => `${ri(223) + 1}.${ri(256)}.${ri(256)}.${ri(256)}`).join('\n');
}

/* ---------- 随机 MAC ---------- */
export function randomMac(count = 1) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const hex = () => pad2(ri(256).toString(16));
  return Array.from({ length: n }, () => `${hex()}:${hex()}:${hex()}:${hex()}:${hex()}:${hex()}`).join('\n');
}

/* ---------- 优惠码 ---------- */
export function randomCoupon(count = 1, length = 10) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const len = Math.max(4, Math.min(20, parseInt(length, 10) || 10));
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const out = [];
  for (let i = 0; i < n; i++) {
    let code = '';
    for (let k = 0; k < len; k++) code += pick(chars);
    out.push(code);
  }
  return out.join('\n');
}

/* ---------- Mock 数据（JSON 数组） ---------- */
export function randomMockData(count = 5) {
  const n = Math.max(1, Math.min(50, parseInt(count, 10) || 5));
  const rows = [];
  for (let i = 0; i < n; i++) {
    rows.push({
      id: i + 1,
      name: randomChineseName(1).split('\n')[0],
      phone: randomPhone(1).split('\n')[0],
      email: randomEmail(1).split('\n')[0],
      age: 18 + ri(45),
      city: pick(CITIES),
      company: randomCompany(1).split('\n')[0],
      score: Number((ri(1000) / 10).toFixed(1)),
      active: Math.random() < 0.7,
      createdAt: `${1970 + ri(55)}-${pad2(1 + ri(12))}-${pad2(1 + ri(28))}`,
    });
  }
  return JSON.stringify(rows, null, 2);
}

/* ---------- 随机密码（区分大小写+数字+符号） ---------- */
export function randomPassword(count = 1, length = 16) {
  const n = Math.max(1, parseInt(count, 10) || 1);
  const len = Math.max(6, Math.min(64, parseInt(length, 10) || 16));
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghjkmnpqrstuvwxyz';
  const digits = '23456789';
  const syms = '!@#$%^&*()-_=+[]{};:,.?';
  const all = upper + lower + digits + syms;
  const out = [];
  for (let i = 0; i < n; i++) {
    let pwd = pick(upper) + pick(lower) + pick(digits) + pick(syms);
    while (pwd.length < len) pwd += pick(all);
    pwd = [...pwd].sort(() => Math.random() - 0.5).join('');
    out.push(pwd);
  }
  return out.join('\n');
}
