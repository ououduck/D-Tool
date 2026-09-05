# D-Tool 在线工具箱

免费、开源的在线站长工具集：**400 款常用工具，全部在浏览器本地运行**——无需注册、无需登录、数据不上传服务器。

![License](https://img.shields.io/badge/License-MIT-18181b)
![Tools](https://img.shields.io/badge/工具-400%20款-18181b)
![Pure Frontend](https://img.shields.io/badge/纯前端-零依赖-18181b)
![Node](https://img.shields.io/badge/Node-%E2%89%A518-18181b)

在线体验：<https://tool.pldduck.com>

## 特性

- **纯前端零依赖**：无框架、无构建链负担，原生 HTML + CSS + ES Modules，构建脚本仅依赖 Node 内置模块
- **黑白灰纯色设计**：zinc 灰度色阶 + 自动暗色模式，无装饰性动画、无图标字体、无 Web 字体，满足 WCAG AA 对比度
- **性能优先**：首屏 CSS 约 12KB，资源按内容哈希命名并 31536000s 长效缓存，无任何运行时开销
- **强 SEO**：每页独立 title/description/canonical、语义化 HTML、JSON-LD（SoftwareApplication / FAQPage / BreadcrumbList / ItemList）、sitemap.xml、robots.txt、面包屑导航、静态可抓取、工具页底部同类推荐
- **隐私友好**：接入自建 Umami 统计（无 Cookie），工具数据不出浏览器；部分网络类工具仅在主动点击时请求第三方接口
- **响应式与无障碍**：移动端单行滚动导航、320px 零水平溢出、返回顶部按钮、对比度达标
- **双平台优化**：为 Cloudflare Pages 与腾讯云 EdgeOne Pages 准备了 `_headers` / `_redirects` / 404 页

## 工具分类（400 款）

| 分类 | 数量 | 覆盖内容 |
| --- | --- | --- |
| 编码加密 | 44 | Base16/32/58/62/64/85/91、ROT13/47、凯撒、维吉尼亚、栅栏、培根、仿射、XOR、AES、HMAC、PBKDF2、CRC、哈希识别、JWT、Punycode、摩斯、NATO 音标、猪圈密码、键盘移位、单表替换等 |
| 转换计算 | 40 | 单位换算（15 类）、进制、颜色、温度、百分比、折扣、比例、科学计数法、分数、鞋码、衣码、K 金、PPI、屏幕尺寸、油耗、AA 分摊等 |
| 文本处理 | 44 | 大小写、命名转换、统计、去重排序、提取（URL/邮箱/手机/IP）、脱敏、Markdown/HTML 转换、CSV 表格、引号、竖排、拼音首字母、字符频率等 |
| 图片处理 | 27 | 压缩、裁剪、旋转、滤镜（12 种效果）、格式转换、九宫格、水印、取色、主色提取、直方图、验证码图、字母头像、占位图等 |
| 生成工具 | 40 | 二维码、条形码、UUID、密码、姓名/手机/邮箱/地址/公司假数据、Mock JSON、优惠码、诗句、成语、英文名、表情等 |
| 开发辅助 | 45 | JSON（格式化/对比/转 TS/Go/路径）、正则（测试/速查/转义）、代码压缩美化、SQL 格式化、Cron、TOTP、cURL、sitemap/robots/meta 生成、gitignore、版本比较等 |
| 数学计算 | 30 | 计算器、质数、因数、GCD/LCM、阶乘、排列组合、统计、舍入、幂根、对数、三角函数、复利、单利、电费、油费、配速、BMR、理想体重等 |
| 日期时间 | 21 | 时间戳、时区、日期差、年龄、星座、生肖、干支、闰年、工作日、春节、节日倒计时等 |
| 网络信息 | 19 | IP 查询、子网计算、IP 进制、UA 解析、HTTP 头/报文、Cookie、URL 参数、编码检测、端口查询等 |
| 生活实用 | 42 | BMI、体脂率、腰臀比、热量、睡眠、预产期、宠物年龄、酒驾估算、彩票、塔罗、姓名/星座/血型配对、情书、藏头诗、笑话、谜语、绕口令等 |
| 速查手册 | 48 | ASCII、HTML 实体、Unicode 区块、SI 单位、状态码、MIME、端口、Git/Linux/Docker/npm/SQL 命令、Vim/VS Code 快捷键、数学符号、emoji、颜色名、元素周期表、文件魔数等 |

## 快速开始

要求：Node.js ≥ 18（无需 `npm install`）。

```bash
# 构建（输出到 dist/）
node build.mjs

# 本地预览（http://localhost:8787）
node build.mjs --serve

# 运行单元测试
node test/run.mjs
```

## 新增一个工具

新增工具只需两个文件，构建脚本会自动生成页面、sitemap 与导航，无需修改其他代码：

1. **定义文件** `src/tools/<slug>.mjs` —— 元数据 + UI + FAQ：

```js
export default {
  slug: 'my-tool',          // URL：/my-tool/
  name: '我的工具',          // 页面标题与导航名称
  desc: '一句话描述，用于 SEO 与卡片展示。',
  keywords: '关键词1,关键词2', // 页面 meta keywords
  category: 'codec',        // 所属分类：codec/convert/text/image/gen/dev/math/date/web/life/ref
  body: `...`,              // 工具 UI 的 HTML（放在 panel 内）
  usage: `...`,             // 使用说明（ol/ul）
  faq: [{ q: '...', a: '...' }], // 常见问题（生成 FAQPage JSON-LD）
};
```

2. **交互脚本** `src/assets/js/t/<slug>.js` —— 工具逻辑：

```js
import { helper } from '../lib/xxx.js'; // 需要算法时放入 lib/ 并编写测试
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;           // 全站工具：toast / copyText / setupDropzone 等
// ...绑定事件
```

3. **可选**：纯算法放入 `src/assets/js/lib/` 并在 `test/run.mjs` 添加用例。

### 快速批量新增（共享运行时）

对输入→输出类的工具（编码、转换、计算、生成、速查表），可直接使用**共享运行时**，一个定义文件即可上线，无需单独写 JS：

- `kind: 'transform'` —— 文本输入 → 多按钮转换（`lib` + `fn`/`actions` 指定算法）
- `kind: 'calc'` —— 多输入数字/日期/下拉 → 计算结果（支持 select/date/text/textarea 输入）
- `kind: 'gen'` —— 参数化生成器（数量 + 下拉/滑块 → 输出）
- `kind: 'table'` —— 速查表（数据放 `src/tools-table.mjs`，build 时渲染静态表格 + 前端搜索）
- `kind: 'image'` + `script` —— 共享 canvas 效果/生成/分析运行时

批量定义的示例见 `scripts/tool-data/`（每个分类一个 `.mjs`，运行 `node scripts/gen-tools.mjs <分类>` 展开为 `src/tools/` 下的独立文件）。

之后运行 `node build.mjs` 即完成上线，再跑一次 `node test/run.mjs` 确认无回归。

## 项目结构

```
├── build.mjs              # 零依赖构建脚本（页面生成 / sitemap / _headers / 预览服务器）
├── package.json
├── scripts/
│   ├── gen-tools.mjs      # 批量工具生成器（tool-data/ → src/tools/）
│   ├── tool-data/         # 批量工具的紧凑定义（按分类一个文件）
│   ├── gen-ref-data*.mjs  # 速查表数据生成
│   └── gen-icons.mjs      # LOGO / favicon 生成
├── src/
│   ├── site.config.mjs    # ★ 站点配置（域名 / 统计 / 分类 / 推荐工具）
│   ├── layout.mjs         # 页面骨架模板（SEO head / header / footer / 面包屑 / 反馈按钮）
│   ├── tools/             # 400 个工具定义（元数据 + UI + FAQ）
│   ├── tools-table.mjs    # 速查表数据注册表
│   └── assets/
│       ├── css/main.css   # 黑白灰设计系统（~12KB）
│       └── js/
│           ├── main.js    # 全站交互（搜索 / 复制 / 提示 / 图片工具共享助手）
│           ├── lib/       # 可测试的核心算法（md5 / sha / diff / csv / codec / text / units 等）
│           ├── lib/data/  # 速查表数据（状态码 / MIME / 端口 / 命令 / 元素周期表等）
│           └── t/         # 各工具的交互脚本与共享运行时（transform/calc/gen/table/image-effect）
├── test/run.mjs           # 算法库单元测试（69 项）
└── dist/                  # 构建产物（部署此目录）
```

## 部署

### Cloudflare Pages

1. 代码推送到 GitHub 后，在 Cloudflare Dashboard → Workers & Pages → Create → Pages 选择仓库。
2. 构建设置：**Build command** `node build.mjs`，**Build output directory** `dist`。
3. 部署完成后在自定义域名处绑定你的域名。
4. 首次部署后把 `src/site.config.mjs` 的 `SITE_URL` 改成你的域名并重新部署（影响 canonical / sitemap / OG）。

也可以跳过 Git：使用 **Direct Upload** 直接把 `dist/` 目录拖入上传。

### 腾讯云 EdgeOne Pages（Makers）

1. 在 EdgeOne Pages 控制台新建项目，选择 GitHub 仓库导入。
2. 构建配置：**构建命令** `node build.mjs`，**输出目录** `dist`（构建环境需安装命令 `npm install`，零依赖会秒过）。
3. 绑定你在 EdgeOne 加速的域名，完成后按上面同样方式修改 `SITE_URL`。

`dist/_headers` 与 `dist/_redirects` 同时兼容两个平台（EdgeOne 不支持时自动忽略，不影响功能）。

## 站点配置

所有站点级配置集中在 [`src/site.config.mjs`](src/site.config.mjs)：

```js
SITE_URL        // 线上域名（canonical / sitemap / OG / JSON-LD 的基础，部署后必改）
FEATURED_TOOLS  // 首页顶部"常用工具"推荐栏（按 slug 引用）
ANALYTICS       // Umami 统计脚本（改为你自己的实例；不需要则置 null）
```

其他自定义项：

- **反馈按钮**：页面右侧边缘的固定反馈入口，在 `src/layout.mjs` 中修改链接（默认指向 Tally 表单）
- **备案号**：位于每个页面页脚，直接修改 `src/layout.mjs` 中的 `footer-bottom` 区块
- **LOGO 与 favicon**：仓库根目录 `logo.png` 与 `favicon.ico` 会被构建到 `dist/` 根路径，替换文件后重新构建即可；也可运行 `node scripts/gen-icons.mjs` 重新生成

## SEO 实现要点

- 所有页面为**服务端生成的静态 HTML**，工具内容与说明文字可直接被爬虫读取
- 工具页内嵌 JSON-LD：`SoftwareApplication`（价格 0）+ `BreadcrumbList` + `FAQPage`
- 首页内嵌 `WebSite`（含 SearchAction）+ `ItemList`（全部工具）
- URL 形态统一为 `/slug/`，`_redirects` 将无斜杠访问 301 到规范形态
- 页面文字全部为中文自然语言（含使用说明与 FAQ），配合每页独立 keywords
- 工具页底部同类推荐模块，提升站内互链与浏览深度

## 贡献

欢迎任何形式的贡献：

- **报告问题与建议**：GitHub Issues，或页面右下角反馈按钮（Tally 表单）
- **新增工具**：按上文「新增一个工具」的步骤提交 Pull Request
- **代码规范**：保持零依赖、黑白灰设计、中文界面、本地运行的原则；改动后请运行 `node test/run.mjs` 确保测试通过

## 致谢

- 二维码生成使用 [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)（MIT License, © Kazuhiko Arase）
- 访问统计使用 [Umami](https://umami.is)（MIT License)

## License

[MIT](LICENSE) © 跑路的duck
