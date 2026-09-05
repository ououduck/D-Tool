/* web 分类补强：在线 API 工具（免费公共 API，需联网）
   共享运行时 t/api-tool.js，页面 JSON 配置 type 区分调用 */
export default [
  {
    slug: 'my-ip-info', name: '我的 IP 信息',
    desc: '查询公网 IP 地址及归属地、运营商、时区、经纬度等详细信息（联网查询）。',
    keywords: '我的ip,公网ip,ip查询,ip归属地,运营商查询,ip定位',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="toolbar">
  <button id="api-run" class="btn">查询我的 IP</button>
  <span class="spacer"></span>
  <span class="text-3" style="font-size:13px">数据源：ip-api.com（免费）</span>
</div>
<div class="output">
  <div class="output-label">查询结果</div>
  <div id="api-out"></div>
</div>
<div class="note">首次打开自动查询。IP 归属地来自公共数据库，可能与你实际位置有偏差；运营商信息仅供参考。</div>
<script type="application/json" id="api-cfg">{"type":"myip"}</script>`,
    usage: `<ol><li>打开页面自动查询，或点击"查询我的 IP"刷新。</li><li>查看公网 IP、归属地、运营商、时区与经纬度。</li><li>排障网络、确认出口 IP、配置白名单时常用。</li></ol>`,
    faq: [
      { q: '显示的位置准确吗？', a: 'IP 归属地是运营商分配的大致区域，精度通常到城市；移动网络可能偏差更大。' },
      { q: '会泄露隐私吗？', a: '本工具将你的公网 IP 发送给 ip-api 查询；IP 本身是访问任何网站都会暴露的信息，查询过程不涉及其他数据。' },
      { q: '能查别人的 IP 吗？', a: '可以输入任意 IP 查询归属，但需要访问本工具的数据源；本站仅展示当前出口 IP。' },
    ],
  },
  {
    slug: 'weather-forecast', name: '全球天气查询',
    desc: '全球城市天气查询：输入城市名查看当前天气与未来 7 天预报（联网查询）。',
    keywords: '天气预报,天气查询,全球天气,城市天气,7天预报,气温查询',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="api-form">
  <div class="field grow">
    <label for="api-city">城市名（支持中文/拼音/英文）</label>
    <input type="text" id="api-city" placeholder="如：北京 / beijing / 上海 / London">
  </div>
  <button id="api-run" class="btn">查询天气</button>
</div>
<div class="output">
  <div class="output-label">天气信息</div>
  <div id="api-out"></div>
</div>
<div class="note">数据源：Open-Meteo（免费，无需密钥）。支持全球城市；中文城市名可识别。</div>
<script type="application/json" id="api-cfg">{"type":"weather"}</script>`,
    usage: `<ol><li>输入城市名（中文/拼音/英文均可），点击"查询天气"。</li><li>查看当前温度、体感、湿度、风速与气压。</li><li>下方为未来 7 天预报（最高/最低温与天气现象）。</li></ol>`,
    faq: [
      { q: '支持哪些城市？', a: 'Open-Meteo 覆盖全球城市，中文名、拼音、英文名均可识别（如 北京、beijing、Shanghai）。' },
      { q: '预报准吗？', a: 'Open-Meteo 聚合多家气象机构数据，短期预报准确度较高；仅供参考，出行以当地气象台为准。' },
      { q: '需要 API 密钥吗？', a: '不需要，Open-Meteo 完全免费开放，无需注册。' },
    ],
  },
  {
    slug: 'currency-rate', name: '实时汇率换算',
    desc: '实时汇率换算：30+ 种货币实时汇率查询与换算（联网查询）。',
    keywords: '汇率换算,实时汇率,货币换算,外汇查询,美元人民币,汇率查询',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="api-form">
  <div class="field">
    <label for="api-amount">金额</label>
    <input type="number" id="api-amount" value="1" min="0" step="any">
  </div>
  <div class="field">
    <label for="api-from">从</label>
    <select id="api-from">
      <option value="CNY" selected>CNY 人民币</option><option value="USD">USD 美元</option>
      <option value="EUR">EUR 欧元</option><option value="JPY">JPY 日元</option>
      <option value="GBP">GBP 英镑</option><option value="HKD">HKD 港币</option>
      <option value="TWD">TWD 台币</option><option value="KRW">KRW 韩元</option>
      <option value="SGD">SGD 新加坡元</option><option value="AUD">AUD 澳元</option>
      <option value="CAD">CAD 加元</option><option value="CHF">CHF 瑞士法郎</option>
      <option value="RUB">RUB 卢布</option><option value="THB">THB 泰铢</option>
      <option value="VND">VND 越南盾</option><option value="MYR">MYR 林吉特</option>
      <option value="PHP">PHP 比索</option><option value="IDR">IDR 印尼盾</option>
      <option value="INR">INR 卢比</option><option value="MXN">MXN 比索</option>
      <option value="BRL">BRL 雷亚尔</option><option value="TRY">TRY 里拉</option>
    </select>
  </div>
  <div class="field">
    <label for="api-to">到</label>
    <select id="api-to">
      <option value="USD" selected>USD 美元</option><option value="CNY">CNY 人民币</option>
      <option value="EUR">EUR 欧元</option><option value="JPY">JPY 日元</option>
      <option value="GBP">GBP 英镑</option><option value="HKD">HKD 港币</option>
      <option value="TWD">TWD 台币</option><option value="KRW">KRW 韩元</option>
      <option value="SGD">SGD 新加坡元</option><option value="AUD">AUD 澳元</option>
      <option value="CAD">CAD 加元</option><option value="CHF">CHF 瑞士法郎</option>
      <option value="RUB">RUB 卢布</option><option value="THB">THB 泰铢</option>
      <option value="VND">VND 越南盾</option><option value="MYR">MYR 林吉特</option>
      <option value="PHP">PHP 比索</option><option value="IDR">IDR 印尼盾</option>
      <option value="INR">INR 卢比</option><option value="MXN">MXN 比索</option>
      <option value="BRL">BRL 雷亚尔</option><option value="TRY">TRY 里拉</option>
    </select>
  </div>
  <button id="api-run" class="btn">换算</button>
</div>
<div class="output">
  <div class="output-label">汇率结果</div>
  <div id="api-out"></div>
</div>
<div class="note">数据源：欧洲央行（frankfurter.dev，免费）。汇率每个工作日更新，为中间价，实际换汇有买卖差价。</div>
<script type="application/json" id="api-cfg">{"type":"exchange"}</script>`,
    usage: `<ol><li>输入金额，选择源货币与目标货币，点击"换算"。</li><li>查看实时汇率与换算结果。</li><li>海淘比价、出行预算、跨境支付参考。</li></ol>`,
    faq: [
      { q: '汇率多久更新？', a: '欧洲央行每个工作日更新一次（中间价），非实时波动价；高频交易请用券商实时报价。' },
      { q: '为什么和银行牌价不同？', a: '银行牌价含买卖差价与服务费，通常比中间价高 1%-3%；本工具显示中间价。' },
      { q: '支持哪些货币？', a: '支持约 30 种主要货币，覆盖常见贸易与旅游币种。' },
    ],
  },
  {
    slug: 'hitokoto', name: '一言（每日一句）',
    desc: '一言：随机获取一句动漫、文学、诗词或网络金句（联网获取）。',
    keywords: '一言,每日一句,动漫台词,经典语录,hitokoto,句子分享',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="toolbar">
  <button id="api-run" class="btn">换一句</button>
  <span class="spacer"></span>
  <span class="text-3" style="font-size:13px">数据源：hitokoto.cn</span>
</div>
<div class="output">
  <div class="output-label">今日一言</div>
  <div id="api-out"></div>
</div>
<div class="note">自动加载随机一言；点击"换一句"获取新内容。涵盖动画、漫画、文学、诗词、网络等类型。</div>
<script type="application/json" id="api-cfg">{"type":"hitokoto"}</script>`,
    usage: `<ol><li>打开页面自动获取随机一言。</li><li>点击"换一句"刷新内容。</li><li>适合签名、文案灵感、心情分享。</li></ol>`,
    faq: [
      { q: '内容版权如何？', a: '一言内容由社区贡献，多数来自公开作品；商用前请确认来源授权。' },
      { q: '能指定类型吗？', a: '当前随机获取；hitokoto 支持按类型参数（动画/文学/诗词等），后续可加类型选择。' },
    ],
  },
  {
    slug: 'dad-joke', name: '英文冷笑话',
    desc: '随机英文冷笑话（Dad Joke）：一键获取一条冷到家的英文段子（联网获取）。',
    keywords: '英文笑话,冷笑话,dadjoke,英文段子,幽默,学习英语',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="toolbar">
  <button id="api-run" class="btn">再来一条</button>
  <span class="spacer"></span>
  <span class="text-3" style="font-size:13px">数据源：icanhazdadjoke.com</span>
</div>
<div class="output">
  <div class="output-label">Joke</div>
  <div id="api-out"></div>
</div>
<div class="note">自动加载随机冷笑话；英文内容，适合英语学习与放松时刻。</div>
<script type="application/json" id="api-cfg">{"type":"dadjoke"}</script>`,
    usage: `<ol><li>打开页面自动获取一条英文冷笑话。</li><li>点击"再来一条"刷新。</li><li>英语学习、Icebreaker、轻松时刻使用。</li></ol>`,
    faq: [
      { q: '为什么是英文？', a: 'icanhazdadjoke 是经典的英文 Dad Joke 社区；中文段子可配合本站"冷笑话生成器"。' },
      { q: '内容健康吗？', a: '社区内容以双关语为主，整体健康；个别可能偏冷。' },
    ],
  },
  {
    slug: 'random-user', name: '随机用户信息',
    desc: '随机用户生成：从公共数据库获取真实感测试用户信息（联网获取）。',
    keywords: '随机用户,测试数据,用户信息生成,randomuser,假用户,数据填充',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="toolbar">
  <button id="api-run" class="btn">生成新用户</button>
  <span class="spacer"></span>
  <span class="text-3" style="font-size:13px">数据源：randomuser.me</span>
</div>
<div class="output">
  <div class="output-label">用户信息</div>
  <div id="api-out"></div>
</div>
<div class="note">自动加载随机用户；数据由 randomuser.me 生成（非真实个人），适合测试与演示。</div>
<script type="application/json" id="api-cfg">{"type":"randomuser"}</script>`,
    usage: `<ol><li>打开自动获取随机用户信息。</li><li>点击"生成新用户"刷新。</li><li>接口联调、表单测试、演示数据填充。</li></ol>`,
    faq: [
      { q: '用户是真实的吗？', a: '不是，randomuser.me 生成的虚构数据，可放心用于测试。' },
      { q: '能指定国家吗？', a: '当前随机国籍；该 API 支持 nat 参数，后续可加筛选。' },
    ],
  },
  {
    slug: 'name-age', name: '英文名年龄预测',
    desc: '英文名预测：输入英文名预测年龄、性别与可能国籍（联网查询）。',
    keywords: '英文名预测,年龄预测,性别预测,国籍预测,agify,姓名分析',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="api-form">
  <div class="field grow">
    <label for="api-name">英文名（如 michael / lisa）</label>
    <input type="text" id="api-name" placeholder="输入英文名">
  </div>
  <button id="api-run" class="btn">预测</button>
</div>
<div class="output">
  <div class="output-label">预测结果</div>
  <div id="api-out"></div>
</div>
<div class="note">基于全球姓名统计数据的趣味预测（agify/genderize/nationalize），样本越多越准。</div>
<script type="application/json" id="api-cfg">{"type":"nameage"}</script>`,
    usage: `<ol><li>输入英文名，点击"预测"。</li><li>查看预测年龄、性别（含置信度）与可能国籍。</li><li>起英文名参考、数据有趣解读。</li></ol>`,
    faq: [
      { q: '预测准确吗？', a: '基于公开姓名统计（如美国社保数据），常见英文名较准；冷门名可能无数据。' },
      { q: '支持中文名吗？', a: '不支持，仅英文名；拼音名可以尝试。' },
    ],
  },
  {
    slug: 'password-leak', name: '密码泄露检查',
    desc: '密码泄露检查：查询密码是否出现在公开泄露数据库中（k-anonymity 保护隐私）。',
    keywords: '密码泄露,密码安全,泄露检查,have i been pwned,密码风险,安全检测',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="api-form">
  <div class="field grow">
    <label for="api-password">要检查的密码</label>
    <input type="password" id="api-password" placeholder="输入密码（仅本地计算哈希）">
  </div>
  <button id="api-run" class="btn">检查</button>
</div>
<div class="output">
  <div class="output-label">检查结果</div>
  <div id="api-out"></div>
</div>
<div class="note">🔒 隐私保护：采用 k-anonymity 方案，仅发送密码 SHA-1 哈希的前 5 位，完整密码绝不出浏览器。</div>
<script type="application/json" id="api-cfg">{"type":"pwned"}</script>`,
    usage: `<ol><li>输入要检查的密码，点击"检查"。</li><li>查询 Have I Been Pwned 泄露数据库。</li><li>若显示已泄露，请立即更换该密码。</li></ol>`,
    faq: [
      { q: '密码会发送到服务器吗？', a: '不会。仅发送 SHA-1 哈希前 5 位（k-anonymity），服务端返回前缀匹配列表，完整密码与哈希都不会离开浏览器。' },
      { q: '泄露数据来源？', a: 'Have I Been Pwned 收集了历次公开数据泄露事件（约 100 亿条记录）的哈希。' },
      { q: '没泄露就安全吗？', a: '只说明不在已知泄露库中；仍需使用强密码、不同网站不同密码并开启双重认证。' },
    ],
  },
  {
    slug: 'random-dog', name: '随机狗狗图片',
    desc: '随机狗狗图片：从 Dog CEO 数据库获取随机品种狗狗照片（联网获取）。',
    keywords: '随机狗狗,狗狗图片,宠物图片,dog ceo,柴犬,金毛',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="toolbar">
  <button id="api-run" class="btn">换一只</button>
  <span class="spacer"></span>
  <span class="text-3" style="font-size:13px">数据源：dog.ceo</span>
</div>
<div class="output">
  <div class="output-label">随机狗狗</div>
  <div id="api-out"></div>
</div>
<div class="note">自动加载随机狗狗照片；图片来自 Dog CEO 公开图片库，可下载使用（遵循其许可）。</div>
<script type="application/json" id="api-cfg">{"type":"dog"}</script>`,
    usage: `<ol><li>打开自动获取随机狗狗照片。</li><li>点击"换一只"刷新。</li><li>放松心情、设计素材、演示图片均可。</li></ol>`,
    faq: [
      { q: '图片可以商用吗？', a: 'dog.ceo 图片来自公开来源（多为 Flickr 免费许可），商用前建议确认单张图片的许可。' },
      { q: '能指定品种吗？', a: '当前随机；该 API 支持按品种查询（如 corgi），后续可加品种选择。' },
    ],
  },
  {
    slug: 'country-info', name: '国家信息查询',
    desc: '国家信息查询：输入国家名查询首都、人口、货币、语言、区号等（内置数据，离线可用）。',
    keywords: '国家查询,国家信息,首都查询,人口查询,货币查询,国家百科',
    category: 'web', kind: 'api', script: 'api-tool',
    body: `<div class="api-form">
  <div class="field grow">
    <label for="api-country">国家名（中文/英文/代码）</label>
    <input type="text" id="api-country" placeholder="如：中国 / China / CN">
  </div>
  <button id="api-run" class="btn">查询</button>
</div>
<div class="output">
  <div class="output-label">国家信息</div>
  <div id="api-out"></div>
</div>
<div class="note">内置 60+ 常用国家/地区数据（离线可用，无需联网）。支持中文名、英文名与 ISO 代码查询。</div>
<script type="application/json" id="api-cfg">{"type":"country"}</script>`,
    usage: `<ol><li>输入国家名（中英文或代码），点击"查询"。</li><li>查看首都、货币、语言、区号、人口、时区等信息。</li><li>内置数据离线可用，查询即时返回。</li></ol>`,
    faq: [
      { q: '支持中文名吗？', a: '支持，如输入"中国"或"China"或"CN"均可查询。' },
      { q: '数据需要联网吗？', a: '不需要，内置 60+ 常用国家/地区数据，完全离线。' },
      { q: '没找到的国家怎么办？', a: '当前覆盖常见国家/地区；如需补充可在反馈中告知。' },
    ],
  },
];
