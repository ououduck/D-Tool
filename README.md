# D-Tool 在线工具箱

免费、开源的在线站长工具集：**30 款常用工具，全部在浏览器本地运行**——无需注册、无需登录、数据不上传服务器。

## 特性

- **纯前端零依赖**：无框架、无构建链负担，原生 HTML + CSS + ES Modules，构建脚本仅依赖 Node 内置模块
- **黑白灰纯色设计**：zinc 灰度色阶 + 自动暗色模式，无装饰性动画、无图标字体、无 Web 字体
- **性能优先**：首屏 CSS 约 11KB，资源按内容哈希命名并 31536000s 长效缓存，无任何运行时开销
- **强 SEO**：每页独立 title/description/canonical、语义化 HTML、JSON-LD（SoftwareApplication / FAQPage / BreadcrumbList / ItemList）、sitemap.xml、robots.txt、面包屑导航、静态可抓取
- **隐私友好**：接入自建 Umami 统计（无 Cookie），工具数据不出浏览器
- **双平台优化**：为 Cloudflare Pages 与腾讯云 EdgeOne Pages 准备了 `_headers` / `_redirects` / 404 页

## 工具清单（30 款）

| 分类 | 工具 |
| --- | --- |
| 编码加密 (8) | URL 编码/解码、Base64、HTML 实体、Unicode 转换、JWT 解析、Gzip 压缩、MD5、SHA 哈希 |
| 转换处理 (7) | 时间戳、进制转换、单位换算、CSV/JSON 互转、颜色转换、图片转 Base64、图片压缩 |
| 文本格式 (7) | JSON 格式化、XML 格式化、Markdown 编辑器、正则测试、文本对比、文本处理统计、命名转换 |
| 生成工具 (4) | 二维码、UUID、随机数、密码生成器 |
| 网络信息 (4) | IP 查询、HTTP 状态码、MIME 类型、浏览器信息 |

## 快速开始

```bash
# 构建（输出到 dist/）
node build.mjs

# 本地预览（http://localhost:8787）
node build.mjs --serve

# 运行核心算法单元测试
node test/run.mjs
```

Node.js ≥ 18 即可，无需 `npm install`。

## 部署

### Cloudflare Pages

1. 代码推送到 GitHub 后，在 Cloudflare Dashboard → Workers & Pages → Create → Pages 选择仓库。
2. 构建设置：**Build command** `node build.mjs`，**Build output directory** `dist`。
3. 部署完成后在自定义域名处绑定你的域名。
4. 首次部署后把 `src/site.config.mjs` 的 `SITE_URL` 改成你的域名并重新部署（影响 canonical / sitemap / OG）。

也可以跳过 Git：使用 **Direct Upload** 直接把 `dist/` 目录拖入上传。

### 腾讯云 EdgeOne Pages（Makers）

1. 在 EdgeOne Pages 控制台新建项目，选择 GitHub 仓库导入。
2. 构建配置：**构建命令** `node build.mjs`，**输出目录** `dist`。
3. 绑定你在 EdgeOne 加速的域名，完成后按上面同样方式修改 `SITE_URL`。

`dist/_headers` 与 `dist/_redirects` 同时兼容两个平台（EdgeOne 不支持时自动忽略，不影响功能）。

## 站点配置

所有站点级配置集中在 [`src/site.config.mjs`](src/site.config.mjs)：

```js
SITE_URL        // 线上域名（canonical / sitemap / OG / JSON-LD 的基础，部署后必改）
ANALYTICS       // Umami 统计脚本（改为你自己的实例；不需要则置 null）
```

其他自定义项：

- **备案号**：位于每个页面页脚，直接修改 `src/layout.mjs` 中的 `footer-bottom` 区块。
- **LOGO 与 favicon**：根目录 `logo.png`（1024×1024）与 `favicon.ico`（32×32）会被构建到 `dist/` 根路径，替换文件后重新构建即可。

## SEO 实现要点

- 所有页面为**服务端生成的静态 HTML**，工具内容与说明文字可直接被爬虫读取
- 工具页内嵌 JSON-LD：`SoftwareApplication`（价格 0）+ `BreadcrumbList` + `FAQPage`
- 首页内嵌 `WebSite`（含 SearchAction）+ `ItemList`（全部工具）
- URL 形态统一为 `/slug/`，`_redirects` 将无斜杠访问 301 到规范形态
- 页面文字全部为中文自然语言（含使用说明与 FAQ），配合每页独立 keywords

## 目录结构

```
├── build.mjs              # 零依赖构建脚本（页面生成 / sitemap / _headers / 预览服务器）
├── package.json
├── src/
│   ├── site.config.mjs    # ★ 站点配置（域名 / 统计 / 分类）
│   ├── layout.mjs         # 页面骨架模板（SEO head / header / footer / 面包屑）
│   ├── tools/             # 30 个工具定义（元数据 + UI + FAQ）
│   └── assets/
│       ├── css/main.css   # 黑白灰设计系统（~11KB）
│       └── js/
│           ├── main.js    # 全站交互（搜索 / 复制 / 提示）
│           ├── lib/       # 可测试的核心算法（md5 / sha / diff / csv / markdown 等）
│           └── t/         # 各工具的交互脚本
├── test/run.mjs           # 算法库单元测试（59 项）
└── dist/                  # 构建产物（部署此目录）
```

## 致谢

- 二维码生成使用 [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)（MIT License, © Kazuhiko Arase）
- 访问统计使用 [Umami](https://umami.is)（MIT License）
- 参考 [tool.echeverra.cn](https://tool.echeverra.cn) 的功能分类设计，全部工具为本项目独立实现
