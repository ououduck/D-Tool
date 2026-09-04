export default {
  slug: 'ip',
  name: 'IP 地址查询',
  desc: '在线查询本机公网 IP 地址与归属地，支持 IPv4/IPv6 双栈，自动获取地理位置。',
  keywords: 'ip查询,ip地址,ip归属地,公网ip,查ip,ip地址查询,ipv6',
  category: 'web',
  body: `<div class="toolbar">
  <button id="ip-run" class="btn">查询我的 IP</button>
  <span class="spacer"></span>
  <span class="text-3" style="font-size:13px" id="ip-status"></span>
</div>
<div class="stat-grid" id="ip-grid">
  <div class="stat"><div class="num mono" id="ip-v4">—</div><div class="lbl">IPv4 地址</div></div>
  <div class="stat"><div class="num mono" id="ip-v6">—</div><div class="lbl">IPv6 地址</div></div>
</div>
<div class="output">
  <div class="output-label">归属地信息</div>
  <pre id="ip-geo">点击“查询我的 IP”获取…</pre>
</div>
<div class="note">查询通过第三方公共服务（ipify / ipapi.co）完成，仅在您主动点击时发起请求；数据可能因网络环境无法访问（如部分运营商网络）而失败，可稍后重试。</div>`,
  usage: `<ol>
  <li>点击“查询我的 IP”，自动获取本机公网 IPv4 与 IPv6 地址。</li>
  <li>归属地信息包含国家、地区、城市与运营商（取决于上游服务数据）。</li>
  <li>适用场景：确认代理/VPN 是否生效、排查网络出口、备案填表等。</li>
</ol>`,
  faq: [
    { q: '查询到的 IP 是宽带公网 IP 吗？', a: '是出口公网 IP，即访问互联网时对外的地址。家庭宽带（NAT）下与路由器拨号获得的 IP 一致；若在使用代理/VPN，则显示代理出口 IP。' },
    { q: '为什么查询失败或没有 IPv6？', a: '若当前网络未分配 IPv6，则 IPv6 显示不可用；查询失败通常是网络到上游服务不通（如防火墙拦截），可刷新重试。' },
    { q: '会泄露我的位置吗？', a: '归属地仅精确到城市级别，且由公网 IP 推断，并不精确。若对隐私敏感，可使用代理后查询验证。' },
  ],
};
