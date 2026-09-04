/* 常用端口表工具脚本（静态数据 + 过滤） */
const $ = (s) => document.querySelector(s);
const { escapeHtml } = window.DT;

const PORTS = [
  [20, 'FTP 数据', '文件传输（数据连接）'], [21, 'FTP', '文件传输（控制连接）'],
  [22, 'SSH / SFTP', '远程登录与安全文件传输'], [23, 'Telnet', '远程登录（明文，不推荐）'],
  [25, 'SMTP', '邮件发送'], [53, 'DNS', '域名解析'],
  [67, 'DHCP', 'DHCP 服务端'], [68, 'DHCP', 'DHCP 客户端'],
  [69, 'TFTP', '简单文件传输'], [80, 'HTTP', 'Web 服务'],
  [110, 'POP3', '邮件接收'], [111, 'RPC', '远程过程调用'],
  [123, 'NTP', '时间同步'], [135, 'RPC', 'Windows 远程过程调用'],
  [137, 'NetBIOS', '名称服务'], [138, 'NetBIOS', '数据报服务'],
  [139, 'NetBIOS', '会话服务'], [143, 'IMAP', '邮件接收（带文件夹）'],
  [161, 'SNMP', '网络管理'], [162, 'SNMP Trap', '网络管理告警'],
  [389, 'LDAP', '目录服务'], [443, 'HTTPS', 'Web 服务（加密）'],
  [445, 'SMB', 'Windows 文件共享'], [465, 'SMTPS', '邮件发送（SSL）'],
  [514, 'Syslog', '系统日志'], [587, 'SMTP', '邮件发送（提交）'],
  [636, 'LDAPS', '目录服务（加密）'], [873, 'Rsync', '远程同步'],
  [990, 'FTPS', 'FTP over TLS'], [993, 'IMAPS', 'IMAP over SSL'],
  [995, 'POP3S', 'POP3 over SSL'], [1080, 'SOCKS', '代理'],
  [1433, 'MSSQL', 'Microsoft SQL Server'], [1521, 'Oracle', 'Oracle 数据库'],
  [2049, 'NFS', '网络文件系统'], [2181, 'ZooKeeper', '分布式协调'],
  [2375, 'Docker', 'Docker API（未加密）'], [2376, 'Docker', 'Docker API（TLS）'],
  [3000, 'Node.js', '常见开发服务器 / Grafana'], [3306, 'MySQL', 'MySQL 数据库'],
  [3389, 'RDP', 'Windows 远程桌面'], [5432, 'PostgreSQL', 'PostgreSQL 数据库'],
  [5672, 'AMQP', 'RabbitMQ 消息队列'], [5900, 'VNC', '远程桌面（图形）'],
  [5984, 'CouchDB', 'CouchDB 数据库'], [6379, 'Redis', 'Redis 缓存'],
  [6443, 'Kubernetes', 'K8s API Server'], [7001, 'WebLogic', 'Oracle WebLogic'],
  [8000, 'HTTP 备用', '常见开发/管理端口'], [8080, 'HTTP 备用', '常见代理/开发端口'],
  [8081, 'HTTP 备用', 'Nacos / 管理端'], [8443, 'HTTPS 备用', 'Tomcat SSL 等'],
  [8888, 'HTTP 备用', '宝塔面板等管理面板'], [9000, 'PHP-FPM / SonarQube', '应用服务'],
  [9090, 'Prometheus', '监控指标'], [9092, 'Kafka', '消息队列'],
  [9200, 'Elasticsearch', '搜索引擎 HTTP'], [9300, 'Elasticsearch', '集群节点通信'],
  [11211, 'Memcached', '分布式缓存'], [15672, 'RabbitMQ', '管理界面'],
  [27017, 'MongoDB', 'MongoDB 数据库'],
];

function render(list) {
  const rows = list
    .map(([p, name, note]) => `<tr><td><code>${p}</code></td><td>${escapeHtml(name)}</td><td>${escapeHtml(note)}</td></tr>`)
    .join('');
  $('#pt-table').innerHTML = `<thead><tr><th style="width:90px">端口</th><th style="width:230px">服务</th><th>说明</th></tr></thead><tbody>${rows}</tbody>`;
}

render(PORTS);

$('#pt-search').addEventListener('input', () => {
  const q = $('#pt-search').value.trim().toLowerCase();
  render(q ? PORTS.filter(([p, n, t]) => String(p).includes(q) || n.toLowerCase().includes(q) || t.toLowerCase().includes(q)) : PORTS);
});
