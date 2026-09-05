/* 共享运行时：图片分析（主色提取/尺寸信息） */

const $ = (s) => document.querySelector(s);
const { toast, setupDropzone, loadImage } = window.DT;

const cfgEl = $('#ia-cfg');
if (cfgEl) main();

function main() {
  const cfg = JSON.parse(cfgEl.textContent);
  const drop = $('#ia-drop'), fileEl = $('#ia-file');
  const outEl = $('#ia-out');

async function handleFile(file) {
  loadImage(file).then(({ img }) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const results = [{ name: '尺寸', value: `${img.naturalWidth} × ${img.naturalHeight}px` }];
    results.push({ name: '宽高比', value: (img.naturalWidth / img.naturalHeight).toFixed(3) });
    results.push({ name: '文件大小', value: (file.size / 1024).toFixed(1) + ' KB' });
    results.push({ name: '文件类型', value: file.type || '未知' });

    if (cfg.mode === 'colors') {
      // 主色提取：缩略后统计主色调
      const size = 100;
      const small = document.createElement('canvas');
      small.width = size;
      small.height = size;
      const sctx = small.getContext('2d');
      sctx.drawImage(img, 0, 0, size, size);
      const data = sctx.getImageData(0, 0, size, size).data;
      const buckets = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a < 128) continue;
        const key = `${r >> 4},${g >> 4},${b >> 4}`;
        buckets.set(key, (buckets.get(key) || 0) + 1);
      }
      const top = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
      const total = top.reduce((s, [, c]) => s + c, 0);
      const rows = top.map(([key, count]) => {
        const [r, g, b] = key.split(',').map((x) => (parseInt(x, 10) << 4) + 8);
        const hex = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
        return { name: hex, value: `${Math.round((count / total) * 100)}%` };
      });
      results.push(...rows);
    } else if (cfg.mode === 'histogram') {
      // 亮度直方图
      const size = 100;
      const small = document.createElement('canvas');
      small.width = size;
      small.height = size;
      const sctx = small.getContext('2d');
      sctx.drawImage(img, 0, 0, size, size);
      const data = sctx.getImageData(0, 0, size, size).data;
      const hist = new Array(16).fill(0);
      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        hist[Math.min(15, Math.floor(lum / 16))]++;
      }
      const max = Math.max(...hist);
      results.push({ name: '亮度分布', value: hist.map((c, i) => `${i * 16}-${i * 16 + 15}:${'█'.repeat(Math.round((c / max) * 12))}`).join(' / ') });
    }
    render(results);
  }).catch(() => toast('无法读取该图片'));
}

function render(rows) {
  outEl.innerHTML = rows.map((r, i) => `<div class="out-row">
    <span class="out-name">${r.name}</span>
    <code class="out-val">${r.value}</code>
  </div>`).join('');
}

setupDropzone(drop, fileEl, handleFile);
}
