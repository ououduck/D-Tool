/* 浏览器信息工具脚本 */
const $ = (s) => document.querySelector(s);
const { escapeHtml } = window.DT;

const tableEl = $('#br-table'), outEl = $('#br-out');

function collect() {
  const n = navigator;
  const d = new Date();
  const tz = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return '不支持'; } })();
  const data = {
    'User-Agent': n.userAgent,
    '浏览器语言': n.language || '—',
    '平台': n.platform || '—',
    '操作系统': (n.userAgentData && n.userAgentData.platform) || n.platform || '—',
    '在线状态': n.onLine ? '在线' : '离线',
    'Cookie 可用': n.cookieEnabled ? '是' : '否',
    '触摸屏': n.maxTouchPoints > 0 ? `支持（${n.maxTouchPoints} 点）` : '不支持',
    '逻辑核心数': n.hardwareConcurrency ? `${n.hardwareConcurrency}` : '不支持',
    '设备内存': n.deviceMemory ? `${n.deviceMemory} GB` : '不支持',
    '屏幕分辨率': `${screen.width} × ${screen.height}`,
    '可视区域': `${window.innerWidth} × ${window.innerHeight}`,
    '设备像素比': window.devicePixelRatio ? `${window.devicePixelRatio.toFixed(2)}` : '1',
    '颜色深度': `${screen.colorDepth} bit`,
    '语言列表': n.languages ? n.languages.join(', ') : '—',
    '时区': tz,
    '本地时间': d.toString(),
    '暗色模式': matchMedia('(prefers-color-scheme: dark)').matches ? '是' : '否',
    '网络类型': (() => { try { return (n.connection && n.connection.effectiveType) || '不支持'; } catch { return '不支持'; } })(),
    '网络速度': (() => { try { return n.connection ? `${n.connection.downlink} Mb/s` : '不支持'; } catch { return '不支持'; } })(),
    'WebGL': (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl') || c.getContext('experimental-webgl')) ? '支持' : '不支持';
      } catch { return '不支持'; }
    })(),
    'Service Worker': 'serviceWorker' in n ? '支持' : '不支持',
    'Web Crypto': typeof crypto !== 'undefined' && crypto.subtle ? '支持' : '不支持',
    '压缩流 API': typeof CompressionStream !== 'undefined' ? '支持' : '不支持',
    '文件系统': typeof showOpenFilePicker === 'function' ? '支持' : '不支持',
  };
  return data;
}

$('#br-run').addEventListener('click', () => {
  const data = collect();
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="width:170px"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('');
  tableEl.innerHTML = `<tbody>${rows}</tbody>`;
  outEl.textContent = JSON.stringify(data, null, 2);
});
