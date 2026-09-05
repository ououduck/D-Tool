/* 速查手册（ref）数据生成 6：node scripts/gen-ref-data6.mjs
   HTML 字符集/编程语言/前端框架/HTTP 方法补充/浏览器引擎/设计模式/正则语法/常用 CSS 动画 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'js', 'lib', 'data');
const write = (name, rows) => {
  writeFileSync(path.join(OUT, name + '.js'), `/* 自动生成：${name} 速查表 */\nexport const ${name} = ${JSON.stringify(rows)};\n`);
  console.log(`✓ ${name}.js (${rows.length} 行)`);
};

/* ---------- 编程语言 ---------- */
const languages = [
  ['JavaScript', '前端/全栈', '浏览器与 Node 生态'],
  ['TypeScript', '类型化 JS', '大型前端项目标准'],
  ['Python', '通用/数据/AI', '机器学习首选'],
  ['Java', '企业级后端', 'Android 与大型系统'],
  ['Go', '云原生后端', '高并发服务'],
  ['Rust', '系统级', '内存安全高性能'],
  ['C', '系统/嵌入式', '操作系统与驱动'],
  ['C++', '系统/游戏', '高性能计算'],
  ['C#', 'Windows/.NET', 'Unity 游戏开发'],
  ['PHP', 'Web 后端', 'WordPress 生态'],
  ['Ruby', 'Web 后端', 'Rails 框架'],
  ['Swift', 'Apple 平台', 'iOS/macOS 应用'],
  ['Kotlin', 'Android', '现代安卓开发'],
  ['SQL', '数据库查询', '结构化数据操作'],
  ['HTML/CSS', 'Web 标记/样式', '网页结构样式'],
  ['Shell', '自动化脚本', 'Linux/服务器运维'],
  ['R', '统计分析', '数据科学与图表'],
  ['MATLAB', '数值计算', '工程与科研'],
  ['Dart', '跨端', 'Flutter 开发'],
  ['Lua', '嵌入式脚本', '游戏与配置'],
];
write('PROGRAMMING_LANGS', languages);

/* ---------- 前端框架 ---------- */
const frameworks = [
  ['React', 'Meta', '组件化 UI 库，生态最大'],
  ['Vue', '尤雨溪', '渐进式框架，易上手'],
  ['Angular', 'Google', '完整框架，企业级'],
  ['Svelte', 'Rich Harris', '编译时框架，无虚拟 DOM'],
  ['Next.js', 'Vercel', 'React 全栈框架（SSR/SSG）'],
  ['Nuxt', 'Nuxt 团队', 'Vue 全栈框架'],
  ['Astro', 'Astro 团队', '内容优先，岛屿架构'],
  ['Tailwind CSS', 'Tailwind Labs', '原子化 CSS 框架'],
  ['Bootstrap', '开源', '经典 CSS 组件库'],
  ['jQuery', '开源', '老牌 DOM 操作库'],
  ['Flutter', 'Google', '跨端 UI 框架（Dart）'],
  ['React Native', 'Meta', '跨端移动（JS）'],
  ['uni-app', 'DCloud', '多端小程序框架'],
  ['Electron', 'GitHub', '桌面应用（JS）'],
  ['Tauri', 'Tauri 团队', '轻量桌面（Rust）'],
  ['Express', '开源', 'Node 后端框架'],
  ['FastAPI', '开源', 'Python 高性能 API'],
  ['Spring Boot', 'VMware', 'Java 后端框架'],
  ['Django', '开源', 'Python 全栈框架'],
  ['Laravel', '开源', 'PHP 框架'],
];
write('FRAMEWORKS', frameworks);

/* ---------- 浏览器引擎 ---------- */
const browserEngines = [
  ['Blink', 'Chrome/Edge/Opera', 'Chromium 内核'],
  ['WebKit', 'Safari', 'Apple 浏览器内核'],
  ['Gecko', 'Firefox', 'Mozilla 内核'],
  ['Goanna', 'Pale Moon', 'Gecko 分支'],
  ['Trident', 'IE 旧版', '已淘汰'],
  ['EdgeHTML', 'Edge 旧版', '已弃用（转 Blink）'],
  ['Servo', '实验项目', 'Rust 编写'],
  ['V8', 'JS 引擎', 'Chrome/Node 的 JS 引擎'],
  ['SpiderMonkey', 'JS 引擎', 'Firefox 的 JS 引擎'],
  ['JavaScriptCore', 'JS 引擎', 'Safari 的 JS 引擎'],
  ['QuickJS', 'JS 引擎', '嵌入式小型引擎'],
  ['Hermes', 'JS 引擎', 'React Native 引擎'],
];
write('BROWSER_ENGINES', browserEngines);

/* ---------- 设计模式（GoF） ---------- */
const designPatterns = [
  ['单例 Singleton', '创建型', '全局唯一实例'],
  ['工厂 Factory', '创建型', '统一创建对象'],
  ['抽象工厂', '创建型', '创建对象族'],
  ['建造者 Builder', '创建型', '分步构建复杂对象'],
  ['原型 Prototype', '创建型', '克隆创建对象'],
  ['适配器 Adapter', '结构型', '接口转换'],
  ['装饰器 Decorator', '结构型', '动态扩展功能'],
  ['代理 Proxy', '结构型', '控制访问'],
  ['外观 Facade', '结构型', '简化接口'],
  ['组合 Composite', '结构型', '树形结构'],
  ['桥接 Bridge', '结构型', '抽象与实现分离'],
  ['享元 Flyweight', '结构型', '共享对象'],
  ['观察者 Observer', '行为型', '发布订阅'],
  ['策略 Strategy', '行为型', '算法替换'],
  ['模板方法', '行为型', '固定流程骨架'],
  ['迭代器 Iterator', '行为型', '顺序访问'],
  ['状态 State', '行为型', '状态机'],
  ['命令 Command', '行为型', '操作封装'],
  ['责任链 Chain', '行为型', '请求传递'],
  ['中介者 Mediator', '行为型', '解耦交互'],
  ['备忘录 Memento', '行为型', '状态快照'],
  ['访问者 Visitor', '行为型', '操作与结构分离'],
  ['解释器 Interpreter', '行为型', '语法解释'],
];
write('DESIGN_PATTERNS', designPatterns);

/* ---------- 正则语法速查 ---------- */
const regexSyntax = [
  ['.', '任意字符（除换行）'], ['\\d', '数字 [0-9]'], ['\\D', '非数字'],
  ['\\w', '单词字符 [a-zA-Z0-9_]'], ['\\W', '非单词字符'], ['\\s', '空白字符'],
  ['\\S', '非空白'], ['\\b', '单词边界'], ['^', '行首'], ['$', '行尾'],
  ['[abc]', '字符集合'], ['[^abc]', '排除集合'], ['[a-z]', '范围'],
  ['*', '0 次或多次'], ['+', '1 次或多次'], ['?', '0 次或 1 次'],
  ['{n}', '恰好 n 次'], ['{n,}', '至少 n 次'], ['{n,m}', 'n 到 m 次'],
  ['(abc)', '分组捕获'], ['(?:abc)', '非捕获分组'], ['(?<name>...)', '命名分组'],
  ['a|b', '或'], ['(?=x)', '正向预查'], ['(?!x)', '负向预查'],
  ['\\1', '反向引用'], ['\\n', '换行符'], ['\\t', '制表符'], ['\\\\', '字面反斜杠'],
  ['\\uXXXX', 'Unicode 字符'], ['i 标志', '忽略大小写'], ['g 标志', '全局匹配'], ['m 标志', '多行模式'],
];
write('REGEX_SYNTAX', regexSyntax);

/* ---------- CSS 动画属性 ---------- */
const cssAnimation = [
  ['animation-name', '动画名称（@keyframes）'], ['animation-duration', '动画时长（s/ms）'],
  ['animation-timing-function', '缓动函数（ease/linear）'], ['animation-delay', '延迟开始'],
  ['animation-iteration-count', '播放次数（infinite 无限）'], ['animation-direction', '方向（reverse/alternate）'],
  ['animation-fill-mode', '填充模式（forwards 保持末帧）'], ['animation-play-state', '播放状态（paused）'],
  ['@keyframes', '定义关键帧'], ['transition', '过渡简写'], ['transition-property', '过渡属性'],
  ['transition-duration', '过渡时长'], ['transition-timing-function', '过渡缓动'],
  ['transition-delay', '过渡延迟'], ['transform', '变换（translate/rotate/scale）'],
  ['transform-origin', '变换原点'], ['perspective', '透视距离（3D）'],
  ['translate()', '位移'], ['rotate()', '旋转'], ['scale()', '缩放'],
  ['skew()', '倾斜'], ['opacity', '透明度'], ['will-change', '提示浏览器优化'],
];
write('CSS_ANIMATION', cssAnimation);

/* ---------- HTML5 新特性 ---------- */
const html5Features = [
  ['语义标签', 'header/nav/main/article/section/footer'],
  ['video/audio', '原生音视频播放'],
  ['canvas', '2D 绘图'],
  ['SVG', '矢量图形'],
  ['localStorage', '本地存储（5MB，持久）'],
  ['sessionStorage', '会话存储'],
  ['IndexedDB', '客户端数据库'],
  ['WebSocket', '全双工通信'],
  ['Fetch API', '现代网络请求'],
  ['Geolocation', '地理位置'],
  ['Web Worker', '多线程'],
  ['Service Worker', '离线缓存/PWA'],
  ['Web Storage', '浏览器存储'],
  ['拖放 API', '原生拖拽'],
  ['表单增强', 'required/placeholder/pattern'],
  ['contenteditable', '页面内编辑'],
  ['History API', '前端路由'],
  ['Notification', '桌面通知'],
  ['Fullscreen', '全屏'],
  ['WebRTC', '实时音视频'],
];
write('HTML5_FEATURES', html5Features);

/* ---------- 常用 CSS 布局技巧 ---------- */
const cssLayout = [
  ['水平居中', 'margin: 0 auto + 定宽'],
  ['flex 居中', 'display:flex; align-items:center; justify-content:center'],
  ['grid 居中', 'display:grid; place-items:center'],
  ['垂直居中（绝对）', 'top:50%; transform:translateY(-50%)'],
  ['两栏布局', 'flex: 左固定 + 右 flex:1'],
  ['三栏布局', 'grid-template-columns: 200px 1fr 200px'],
  ['圣杯/双飞翼', '中间自适应，两侧固定'],
  ['等高列', 'flex 默认等高'],
  ['粘性页脚', 'flex 布局 + min-height:100vh'],
  ['sticky 定位', 'position:sticky; top:0'],
  ['响应式断点', '@media (max-width: 768px)'],
  ['移动优先', '默认移动样式 + min-width 渐进增强'],
  ['隐藏元素', 'display:none（移除）/ visibility:hidden（占位）'],
  ['文字溢出省略', 'text-overflow:ellipsis + overflow:hidden + nowrap'],
  ['多行省略', '-webkit-line-clamp:2'],
  ['滚动条美化', '::-webkit-scrollbar 定制'],
  ['平滑滚动', 'scroll-behavior:smooth'],
  ['aspect-ratio', '固定宽高比'],
  ['容器查询', '@container 响应容器尺寸'],
  ['CSS 变量', '--var: value; var(--var)'],
];
write('CSS_LAYOUT', cssLayout);
