/* 时区转换工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const inEl = $('#tz-in'), fromEl = $('#tz-from'), outEl = $('#tz-out');

const ZONES = [
  ['Asia/Shanghai', '北京时间'], ['Asia/Tokyo', '东京'], ['Asia/Seoul', '首尔'], ['Asia/Singapore', '新加坡'],
  ['Asia/Kolkata', '新德里'], ['Asia/Dubai', '迪拜'], ['Europe/London', '伦敦'], ['Europe/Paris', '巴黎'],
  ['Europe/Berlin', '柏林'], ['Europe/Moscow', '莫斯科'], ['America/New_York', '纽约'], ['America/Chicago', '芝加哥'],
  ['America/Denver', '丹佛'], ['America/Los_Angeles', '洛杉矶'], ['America/Sao_Paulo', '圣保罗'],
  ['America/Toronto', '多伦多'], ['Australia/Sydney', '悉尼'], ['Pacific/Auckland', '奥克兰'],
  ['Pacific/Honolulu', '夏威夷'], ['Africa/Cairo', '开罗'], ['Africa/Lagos', '拉各斯'],
];

function fillZones() {
  const mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const names = [...new Set([mine, ...ZONES.map(([z]) => z)])];
  for (const z of names) {
    const opt = document.createElement('option');
    opt.value = z;
    const label = ZONES.find(([zz]) => zz === z);
    opt.textContent = label ? `${label[1]}（${z}）` : z;
    fromEl.appendChild(opt);
  }
  fromEl.value = mine;
}

const fmtIn = (d, zone) => {
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).format(d).replace(/\//g, '-');
  } catch { return '—'; }
};

const offsetOf = (d, zone) => {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'longOffset' }).formatToParts(d);
    const off = parts.find((p) => p.type === 'timeZoneName');
    return off ? off.value : '';
  } catch { return ''; }
};

$('#tz-run').addEventListener('click', () => {
  if (!inEl.value) return toast('请选择时间');
  const d = new Date(inEl.value);
  if (Number.isNaN(d.getTime())) return toast('时间无效');
  const from = fromEl.value;
  const lines = [
    `输入时间：${inEl.value.replace('T', ' ')}（${from}）`,
    `UTC：${fmtIn(d, 'UTC')}`,
    '',
  ];
  for (const [z, label] of ZONES) {
    lines.push(`${label.padEnd(5)}${fmtIn(d, z)}${' '.repeat(3)}${offsetOf(d, z)}`);
  }
  outEl.textContent = lines.join('\n');
});

$('#tz-now').addEventListener('click', () => {
  const d = new Date();
  inEl.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
});

fillZones();
