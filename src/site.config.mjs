/**
 * 站点全局配置 —— 部署前唯一需要修改的地方
 *
 * SITE_URL：线上绝对地址（不含结尾斜杠）。
 * 部署到 Cloudflare Pages / EdgeOne Pages 后，请替换成你自己的域名。
 * canonical、sitemap、OG、JSON-LD 都基于它生成，对 SEO 至关重要。
 */
export const SITE_URL = 'https://tool.pldduck.com';

export const BRAND = 'D-Tool';
export const BRAND_NAME = 'D-Tool 在线工具箱';
export const LANG = 'zh-CN';
export const COPYRIGHT_YEAR = 2026;

export const SITE_DESC =
  '免费在线站长工具箱：JSON 格式化、时间戳转换、Base64、正则测试、二维码生成等 400 款实用工具，全部在浏览器本地运行，无需注册、数据不上传。';

/** 工具分类（顺序即导航顺序） */
export const CATEGORIES = [
  { key: 'codec', name: '编码加密', desc: 'Base64、哈希、加解密、摩斯等编解码与加密工具' },
  { key: 'convert', name: '转换计算', desc: '单位换算、进制转换、颜色格式、比例与换算' },
  { key: 'text', name: '文本处理', desc: '大小写、统计、去重排序、文本对比与格式化' },
  { key: 'image', name: '图片处理', desc: '图片压缩、裁剪、滤镜、格式转换与生成' },
  { key: 'gen', name: '生成工具', desc: '二维码、UUID、密码、随机数据与假数据生成' },
  { key: 'dev', name: '开发辅助', desc: 'JSON、正则、代码格式化与开发调试工具' },
  { key: 'math', name: '数学计算', desc: '科学计算器、统计、金融与生活数学工具' },
  { key: 'date', name: '日期时间', desc: '时间戳、时区、日期计算与节日查询' },
  { key: 'web', name: '网络信息', desc: 'IP、UA、HTTP 与站点诊断工具' },
  { key: 'life', name: '生活实用', desc: '健康、娱乐、趣味测试与生活小工具' },
  { key: 'ref', name: '速查手册', desc: 'ASCII、端口、状态码、命令与语法速查表' },
];

/** 全站通用关键词（每页会在其后追加自己的关键词） */
export const SITE_KEYWORDS = '在线工具,站长工具,工具箱,开发者工具,免费工具';

/** 首页顶部"常用工具"推荐栏（按 slug 引用，不存在则自动忽略） */
export const FEATURED_TOOLS = [
  'json', 'base64', 'timestamp', 'qrcode', 'uuid',
  'hash', 'url-encode', 'regex', 'unit-converter', 'password',
  'md5', 'text-tool',
];

/**
 * Umami 访问统计（隐私友好，无需 cookie）。
 * 部署到自己的 Umami 实例后，把下面两处替换为你的 script 地址与 data-website-id；
 * 不需要统计时置为 null 即可整体移除。
 */
export const ANALYTICS = {
  umamiScript:
    '<script defer src="https://umami.pldduck.com/script.js" data-website-id="5782074a-f6a8-47fc-9804-0dd368195fcd"></script>',
};
