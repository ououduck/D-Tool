/* D-Tool 开发/网络/生活 补强算法库 2（纯函数，Node 可测）
   覆盖：SQL 格式化、代码转义（JS/HTML/URL）、子网计算、IP 进制转换、端口速查、生活计算 */

const num = (v, fallback = 0) => { const n = parseFloat(v); return Number.isFinite(n) ? n : fallback; };
const fmt = (n, maxFrac = 4) => {
  if (!Number.isFinite(n)) return '—';
  const abs = Math.abs(n);
  let s;
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) s = n.toExponential(6).replace(/\.?0+e/, 'e');
  else s = String(Number(n.toFixed(maxFrac)));
  const [i, f] = s.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : '');
};

/* ---------- SQL 格式化（关键字换行缩进） ---------- */
const SQL_KW = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'ON', 'AND', 'OR', 'SET', 'VALUES', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'UNION', 'UNION ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'];
export function sqlFormat(input) {
  let sql = String(input).replace(/\s+/g, ' ').trim();
  for (const kw of SQL_KW.sort((a, b) => b.length - a.length)) {
    sql = sql.replace(new RegExp('\\b' + kw + '\\b', 'gi'), (m) => '\n' + m.toUpperCase());
  }
  const lines = sql.split('\n').map((l) => l.trim()).filter(Boolean);
  let indent = 0;
  const out = [];
  for (const line of lines) {
    if (/^\s*(\)|END)\b/i.test(line)) indent = Math.max(0, indent - 1);
    out.push('  '.repeat(indent) + line);
    if (/\(\s*$/.test(line) || /^CASE\b/i.test(line) || /^WHEN\b/i.test(line)) indent++;
    if (/^END\b/i.test(line)) indent = Math.max(0, indent - 1);
  }
  return out.join('\n');
}

/* ---------- 代码转义 ---------- */
export function escapeJs(input) {
  return JSON.stringify(input).slice(1, -1);
}
export function unescapeJs(input) {
  try { return JSON.parse('"' + input.replace(/"/g, '\\"') + '"'); } catch { return '转义还原失败'; }
}
export function escapeHtmlStr(input) {
  return String(input).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export function escapeUrl(input) {
  return encodeURIComponent(input);
}
export function unescapeUrl(input) {
  try { return decodeURIComponent(input); } catch { return '解码失败'; }
}

/* ---------- 子网计算（CIDR） ---------- */
export function subnetCalc(values) {
  const [ip, prefixStr] = [String(values[0] || '').trim(), String(values[1] || '').trim()];
  if (!ip) return '请输入 IP 地址';
  let prefix = parseInt(prefixStr, 10);
  if (Number.isNaN(prefix)) {
    const slash = ip.indexOf('/');
    if (slash >= 0) { prefix = parseInt(ip.slice(slash + 1), 10); }
    else prefix = 24;
  }
  const ipPart = ip.split('/')[0];
  const octets = ipPart.split('.').map((x) => parseInt(x, 10));
  if (octets.length !== 4 || octets.some((o) => Number.isNaN(o) || o < 0 || o > 255)) return 'IP 格式不正确';
  if (prefix < 0 || prefix > 32) return '前缀长度需在 0-32 之间';
  const ipInt = octets.reduce((acc, o) => (acc << 8) | o, 0) >>> 0;
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ipInt & mask) >>> 0;
  const broadcast = (ipInt | (~mask >>> 0)) >>> 0;
  const toIp = (n) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  const hosts = prefix >= 31 ? 0 : 2 ** (32 - prefix) - 2;
  const total = 2 ** (32 - prefix);
  return [
    { name: '网络地址', value: `${toIp(network)}/${prefix}` },
    { name: '广播地址', value: toIp(broadcast) },
    { name: '子网掩码', value: toIp(mask) },
    { name: '可用主机数', value: String(hosts) },
    { name: '地址总数', value: String(total) },
    { name: '首可用地址', value: hosts ? toIp(network + 1) : '—' },
    { name: '末可用地址', value: hosts ? toIp(broadcast - 1) : '—' },
    { name: '地址范围', value: `${toIp(network)} - ${toIp(broadcast)}` },
  ];
}

/* ---------- IP 进制转换 ---------- */
export function ipConvert(values) {
  const input = String(values[0] || '').trim();
  if (!input) return '请输入内容';
  const toInt = (ip) => {
    const o = ip.split('.').map((x) => parseInt(x, 10));
    if (o.length !== 4 || o.some((x) => Number.isNaN(x) || x < 0 || x > 255)) return null;
    return ((o[0] << 24) | (o[1] << 16) | (o[2] << 8) | o[3]) >>> 0;
  };
  const fromInt = (n) => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
  if (/^\d+$/.test(input)) {
    const n = parseInt(input, 10);
    if (n < 0 || n > 4294967295) return '数字超出 IPv4 范围（0-4294967295）';
    return [{ name: 'IPv4 地址', value: fromInt(n) },
            { name: '二进制', value: n.toString(2).padStart(32, '0') },
            { name: '十六进制', value: '0x' + n.toString(16).toUpperCase().padStart(8, '0') }];
  }
  const n = toInt(input);
  if (n === null) return 'IPv4 格式不正确';
  return [{ name: '十进制', value: String(n) },
          { name: '二进制', value: n.toString(2).padStart(32, '0') },
          { name: '十六进制', value: '0x' + n.toString(16).toUpperCase().padStart(8, '0') }];
}

/* ---------- 端口速查（按服务名） ---------- */
const PORT_SERVICES = {
  '20': 'FTP 数据', '21': 'FTP', '22': 'SSH/SFTP', '23': 'Telnet', '25': 'SMTP',
  '53': 'DNS', '67': 'DHCP', '68': 'DHCP', '69': 'TFTP', '80': 'HTTP', '110': 'POP3',
  '123': 'NTP', '135': 'RPC', '137': 'NetBIOS', '139': 'NetBIOS', '143': 'IMAP',
  '161': 'SNMP', '389': 'LDAP', '443': 'HTTPS', '445': 'SMB', '465': 'SMTPS',
  '514': 'Syslog', '587': 'SMTP 提交', '636': 'LDAPS', '873': 'Rsync',
  '993': 'IMAPS', '995': 'POP3S', '1080': 'SOCKS', '1433': 'MSSQL', '1521': 'Oracle',
  '2049': 'NFS', '2181': 'ZooKeeper', '2375': 'Docker', '2376': 'Docker TLS',
  '3000': '开发服务器', '3306': 'MySQL', '3389': 'RDP', '5432': 'PostgreSQL',
  '5672': 'RabbitMQ', '5900': 'VNC', '6379': 'Redis', '6443': 'K8s API',
  '7001': 'WebLogic', '8000': 'HTTP 备用', '8080': 'HTTP 代理/开发', '8443': 'HTTPS 备用',
  '8888': '常用开发端口', '9000': '应用服务', '9092': 'Kafka', '9200': 'Elasticsearch',
  '9300': 'ES 集群', '11211': 'Memcached', '15672': 'RabbitMQ 管理', '27017': 'MongoDB',
};
export function portLookup(input) {
  const port = String(input).trim();
  if (!/^\d+$/.test(port)) return '请输入端口号（0-65535）';
  const name = PORT_SERVICES[port];
  if (!name) return `端口 ${port} 未收录常用服务表（可能是动态/私有端口）`;
  return `端口 ${port}：${name}`;
}

/* ---------- 生活：卡路里目标 ---------- */
export function calorieGoalCalc(values) {
  const [weight, height, age, gender, activity] = [num(values[0]), num(values[1]), num(values[2]), values[3], values[4]];
  if (!weight || !height || !age) return '请输入体重、身高与年龄';
  const bmr = gender === 'female' ? 10 * weight + 6.25 * height - 5 * age - 161 : 10 * weight + 6.25 * height - 5 * age + 5;
  const factors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very: 1.9 };
  const tdee = bmr * (factors[activity] || 1.2);
  return [
    { name: 'BMR', value: `${Math.round(bmr)} 千卡` },
    { name: '维持体重（TDEE）', value: `${Math.round(tdee)} 千卡` },
    { name: '减脂（-400）', value: `${Math.round(tdee - 400)} 千卡` },
    { name: '增肌（+300）', value: `${Math.round(tdee + 300)} 千卡` },
  ];
}

/* ---------- 生活：BMI 补充计算（腰臀比） ---------- */
export function waistHipCalc(values) {
  const [waist, hip] = [num(values[0]), num(values[1])];
  if (!waist || !hip) return '请输入腰围与臀围';
  const ratio = waist / hip;
  const level = ratio <= 0.85 ? '低风险' : ratio <= 0.9 ? '中风险' : '高风险';
  return [{ name: '腰臀比', value: fmt(ratio, 2) },
          { name: '健康评价（男 <0.9 女 <0.85）', value: level }];
}

/* ---------- 生活：最佳睡眠时长 ---------- */
export function sleepNeedCalc(values) {
  const age = parseInt(values[0], 10);
  if (Number.isNaN(age) || age < 0 || age > 120) return '请输入有效年龄';
  let range;
  if (age <= 2) range = '11-14 小时';
  else if (age <= 5) range = '10-13 小时';
  else if (age <= 13) range = '9-11 小时';
  else if (age <= 17) range = '8-10 小时';
  else if (age <= 64) range = '7-9 小时';
  else range = '7-8 小时';
  return [{ name: '建议睡眠时长', value: range },
          { name: '入睡时间建议', value: '固定作息比时长更重要' }];
}

/* ---------- 生活：理想腰围 ---------- */
export function idealWaistCalc(values) {
  const [height, gender] = [num(values[0]), values[1]];
  if (!height) return '请输入身高';
  const waist = gender === 'female' ? height * 0.42 : height * 0.47;
  return [{ name: '理想腰围（约）', value: fmt(waist, 1) + ' cm' },
          { name: '参考', value: gender === 'female' ? '女性健康腰围 <80cm' : '男性健康腰围 <85cm' }];
}

/* ---------- 生活：预产期已存在，做孕期周数 ---------- */
export function pregnancyWeekCalc(values) {
  const d = new Date(values[0]);
  if (Number.isNaN(d.getTime())) return '请输入有效日期';
  const days = Math.floor((new Date() - d) / 86400000);
  const week = Math.floor(days / 7);
  const day = days % 7;
  return [{ name: '当前孕周', value: `${week} 周 ${day} 天` },
          { name: '已过天数', value: `${days} 天` },
          { name: '剩余天数', value: `${280 - days} 天` }];
}
