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
  '免费在线站长工具箱：JSON 格式化、时间戳转换、Base64、正则测试、二维码生成等 30+ 款实用工具，全部在浏览器本地运行，无需注册、数据不上传。';

/** 工具分类（顺序即导航顺序） */
export const CATEGORIES = [
  { key: 'codec', name: '编码加密', desc: 'URL、Base64、哈希、压缩等编解码与加密转换' },
  { key: 'convert', name: '转换计算', desc: '时间戳、进制、单位、颜色、日期等常用换算' },
  { key: 'image', name: '图片处理', desc: '图片压缩、裁剪、滤镜、格式转换与二维码' },
  { key: 'text', name: '文本格式', desc: 'JSON、XML、Markdown、正则与文本处理' },
  { key: 'gen', name: '生成工具', desc: '二维码、条形码、UUID、密码、头像一键生成' },
  { key: 'web', name: '网络信息', desc: 'IP、UA、状态码、MIME、时间与站点辅助工具' },
];

/** 全站通用关键词（每页会在其后追加自己的关键词） */
export const SITE_KEYWORDS = '在线工具,站长工具,工具箱,开发者工具,免费工具';

/**
 * Umami 访问统计（隐私友好，无需 cookie）。
 * 部署到自己的 Umami 实例后，把下面两处替换为你的 script 地址与 data-website-id；
 * 不需要统计时置为 null 即可整体移除。
 */
export const ANALYTICS = {
  umamiScript:
    '<script defer src="https://umami.pldduck.com/script.js" data-website-id="5782074a-f6a8-47fc-9804-0dd368195fcd"></script>',
};
