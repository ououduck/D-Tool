/* 假文生成：中文占位文 / 英文 Lorem Ipsum */

const CN_WORDS = [
  '我们', '他们', '这个', '那个', '可以', '需要', '应该', '已经', '正在', '进行',
  '使用', '提供', '支持', '包括', '通过', '实现', '功能', '系统', '平台', '数据',
  '用户', '内容', '信息', '服务', '产品', '设计', '开发', '测试', '上线', '优化',
  '页面', '工具', '网站', '搜索', '浏览', '点击', '加载', '缓存', '渲染', '交互',
  '技术', '方案', '需求', '问题', '解决', '分析', '处理', '管理', '统计', '生成',
];

const EN_WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

const rand = (n) => Math.floor(Math.random() * n);
const pick = (arr) => arr[rand(arr.length)];
const cnSentence = () => {
  const len = 8 + rand(12);
  let s = '';
  for (let i = 0; i < len; i++) {
    if (i > 0 && Math.random() < 0.18) s += '，';
    s += pick(CN_WORDS);
  }
  return s + '。';
};
const enSentence = () => {
  const len = 8 + rand(10);
  const words = Array.from({ length: len }, () => pick(EN_WORDS));
  const s = words.join(' ');
  return s.charAt(0).toUpperCase() + s.slice(1) + '.';
};

export function loremCn(paragraphs = 3, sentencesPerPara = 5) {
  return Array.from({ length: paragraphs }, () =>
    Array.from({ length: sentencesPerPara }, cnSentence).join('')
  ).join('\n\n');
}

export function loremEn(paragraphs = 3, sentencesPerPara = 5) {
  return Array.from({ length: paragraphs }, () =>
    Array.from({ length: sentencesPerPara }, enSentence).join(' ')
  ).join('\n\n');
}
