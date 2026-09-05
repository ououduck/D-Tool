/* life/gen 内容生成分类补强 —— 全部为真实内容数据，手写说明与 FAQ */
export default [
  {
    slug: 'joke-generator', name: '冷笑话生成器',
    desc: '冷笑话生成器：随机冷笑话与谐音梗，聊天暖场必备。',
    keywords: '冷笑话,笑话大全,谐音梗,笑话生成,幽默段子,冷段子',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomJoke',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '内置 20 条精选冷笑话与程序员梗。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>输出随机冷笑话。</li><li>聊天暖场、群聊活跃气氛常用。</li></ol>`,
    faq: [
      { q: '笑话会重复吗？', a: '独立随机可能重复，多生成几次挑选。' },
      { q: '有荤段子吗？', a: '没有，全部为健康内容。' },
    ],
  },
  {
    slug: 'riddle-generator', name: '脑筋急转弯',
    desc: '脑筋急转弯生成器：趣味问答附带答案，聚会互动神器。',
    keywords: '脑筋急转弯,急转弯,趣味问答,智力题,脑筋急转弯大全',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomRiddle',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '每题带答案，适合聚会提问与亲子互动。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>每道题附带答案，先考考对方再揭晓。</li><li>聚会、课堂、亲子互动常用。</li></ol>`,
    faq: [
      { q: '答案会一起显示吗？', a: '会，问题与答案分行显示；想考别人可先只念题目。' },
      { q: '题目难吗？', a: '以经典入门题为主，老少皆宜。' },
    ],
  },
  {
    slug: 'riddle-poem', name: '谜语生成器',
    desc: '经典谜语生成器：传统谜语附带谜底，亲子娱乐与文化学习。',
    keywords: '谜语,谜语大全,猜谜语,传统谜语,灯谜,谜底',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomRiddle2',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '内置 20 条经典谜语（动物/植物/日用品等）。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>谜面与谜底分行显示。</li><li>元宵灯谜、亲子游戏、语文教学常用。</li></ol>`,
    faq: [
      { q: '谜语有分类吗？', a: '暂不分类，随机抽取；内容涵盖动植物与生活物品。' },
      { q: '适合孩子吗？', a: '适合，谜底多为常见事物，难度适中。' },
    ],
  },
  {
    slug: 'tongue-twister', name: '绕口令生成器',
    desc: '绕口令生成器：经典中文绕口令，口才与发音练习。',
    keywords: '绕口令,绕口令大全,口才练习,发音练习,普通话练习',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomTongueTwister',
      params: [{ name: 'count', label: '数量', type: 'number', value: '1', min: '1' }],
      hint: '内置 12 条经典绕口令（四十四、化肥、扁担等）。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>大声朗读练习发音与语速。</li><li>播音主持练习、亲子互动、课堂游戏常用。</li></ol>`,
    faq: [
      { q: '有难度分级吗？', a: '暂不分级；从“四是四”入门到“化肥”进阶。' },
      { q: '能随机换吗？', a: '重新点击生成即可换一条。' },
    ],
  },
  {
    slug: 'quote-generator', name: '名人名言生成',
    desc: '名人名言生成器：古今中外经典名言，写作与朋友圈素材。',
    keywords: '名人名言,名言警句,经典语录,名言大全,励志名言',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomQuote',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '内置 20 条经典名言（孔子/李白/海明威等），附作者。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>输出名言与作者，可直接引用。</li><li>写作素材、朋友圈文案、演讲开场常用。</li></ol>`,
    faq: [
      { q: '名言准确吗？', a: '为流传版本，个别出处有争议；引用重要场合请核对原文。' },
      { q: '能按作者筛选吗？', a: '暂不支持，随机抽取。' },
    ],
  },
  {
    slug: 'soul-soup', name: '毒鸡汤生成器',
    desc: '毒鸡汤生成器：扎心又真实的文案，反鸡汤爱好者福利。',
    keywords: '毒鸡汤,反鸡汤,扎心语录,毒文案,丧文化,吐槽语录',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomSoulSoup',
      params: [{ name: 'count', label: '数量', type: 'number', value: '3', min: '1' }],
      hint: '内置 20 条经典毒鸡汤，仅供娱乐。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>输出扎心文案。</li><li>朋友圈吐槽、减压放松、文案灵感常用。</li></ol>`,
    faq: [
      { q: '内容消极吗？', a: '以幽默吐槽为主，博君一笑，请勿当真。' },
      { q: '可以商用吗？', a: '文案为网络流行语整理，商用请注意原创性。' },
    ],
  },
  {
    slug: 'cheesy-lines', name: '土味情话生成',
    desc: '土味情话生成器：经典土味情话，表白调侃两相宜。',
    keywords: '土味情话,情话大全,表白情话,撩人语录,土味表白',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomCheesy',
      params: [{ name: 'count', label: '数量', type: 'number', value: '1', min: '1' }],
      hint: '内置 16 条经典土味情话，慎用于正式场合。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>输出土味情话。</li><li>情侣互动、朋友圈文案、逗趣开场常用。</li></ol>`,
    faq: [
      { q: '适合表白吗？', a: '适合活跃气氛，正式表白建议搭配真诚的心里话。' },
      { q: '内容健康吗？', a: '健康幽默，无低俗内容。' },
    ],
  },
  {
    slug: 'meme-words', name: '网络流行语速查',
    desc: '网络流行语速查：YYDS、破防、内卷等热词含义，一键生成随机热词。',
    keywords: '网络流行语,网络热词,梗百科,yyds,破防,流行语大全',
    category: 'life', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomMeme',
      params: [{ name: 'count', label: '数量', type: 'number', value: '5', min: '1' }],
      hint: '内置 20 条网络热词与含义解释，刷社交平台必备。',
    },
    usage: '<ol><li>设置数量，点击“生成”。</li><li>输出热词与含义，每行一个。</li><li>看懂评论区、写文案、聊天不落伍。</li></ol>',
    faq: [
      { q: '热词更新及时吗？', a: '收录近年流行热词；新词层出不穷，会持续更新。' },
      { q: '有谐音梗吗？', a: '有，如“尊嘟假嘟”标注为谐音用法。' },
    ],
  },
  {
    slug: 'moment-copy', name: '朋友圈文案生成',
    desc: '朋友圈文案生成器：日常/心情/晒图文案，配图灵感来源。',
    keywords: '朋友圈文案,文案生成,发圈文案,心情文案,晒图配文',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomMoment',
      params: [{ name: 'count', label: '数量', type: 'number', value: '1', min: '1' }],
      hint: '内置 16 条日常与心情文案，可直接使用。',
    },
    usage: `<ol><li>设置数量，点击“生成”。</li><li>输出朋友圈文案。</li><li>晒图配文、心情记录、社交运营常用。</li></ol>`,
    faq: [
      { q: '文案能商用吗？', a: '短文案通用性高，但建议稍作个性化修改。' },
      { q: '有节日文案吗？', a: '当前以日常为主，节日文案后续补充。' },
    ],
  },
  {
    slug: 'pet-name', name: '宠物名生成器',
    desc: '宠物名生成器：猫咪狗狗名字批量生成，支持种类选择。',
    keywords: '宠物名,宠物起名,猫咪名字,狗狗名字,宠物名字大全',
    category: 'gen', kind: 'gen',
    gen: {
      lib: 'gen3', fn: 'randomPetName',
      params: [
        { name: 'count', label: '数量', type: 'number', value: '5', min: '1' },
        { name: 'species', label: '宠物类型', type: 'select', options: [['any', '随机'], ['cat', '猫咪'], ['dog', '狗狗']], value: 'any' },
      ],
      hint: '组合式生成（小豆/奶糖/旺财…），含专属名库。',
    },
    usage: `<ol><li>选择宠物类型与数量，点击“生成”。</li><li>输出候选宠物名。</li><li>领养取名、开宠物店、游戏宠物命名常用。</li></ol>`,
    faq: [
      { q: '名字会重复吗？', a: '组合式生成重复率低；多生成几次挑选。' },
      { q: '有英文名吗？', a: '当前为中文名；英文名可用“英文名生成器”。' },
    ],
  },
];
