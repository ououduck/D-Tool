/* 站点图标生成：logo.png（header LOGO / 手机端图标）与 favicon.ico（旧浏览器兼容）
   零依赖，手写 PNG / ICO 编码；运行：node scripts/gen-icons.mjs
   图标样式：黑底圆角方块 + 白色 D 字（与站点黑白灰设计一致）
   输出到仓库根目录（构建时自动复制到 dist/） */

import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
mkdirSync(OUT, { recursive: true });

/* ---------- PNG 编码 ---------- */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, pixels) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // 位深 8bit
  ihdr[9] = 6;  // 色彩类型 RGBA
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 4)] = 0; // 每行过滤方式 none
    pixels.copy(raw, y * (1 + size * 4) + 1, y * size * 4, (y + 1) * size * 4);
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

/* ---------- 图标绘制：黑底圆角方块 + 白色 D 点阵 ---------- */
function iconPixels(size) {
  const px = new Uint8Array(size * size * 4);
  const radius = Math.max(1, Math.round(size * 0.22));
  // 四角圆角外的像素保持透明
  const outOfRadius = (x, y) => {
    const cx = x < radius ? radius : x >= size - radius ? size - 1 - radius : -1;
    const cy = y < radius ? radius : y >= size - radius ? size - 1 - radius : -1;
    if (cx < 0 || cy < 0) return false;
    const dx = x - cx, dy = y - cy;
    return dx * dx + dy * dy > radius * radius;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (outOfRadius(x, y)) continue;
      const i = (y * size + x) * 4;
      px[i] = 0x18; px[i + 1] = 0x18; px[i + 2] = 0x1b; px[i + 3] = 255; // #18181b
    }
  }
  // 白色 D（6×5 点阵放大，居中占约 60% 高度）
  const rows = ['.###.', '#...#', '#...#', '#...#', '#...#', '.###.'];
  const cell = Math.max(1, Math.floor((size * 0.6) / rows.length));
  const w = rows[0].length * cell, h = rows.length * cell;
  const ox = Math.floor((size - w) / 2), oy = Math.floor((size - h) / 2);
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (rows[r][c] !== '#') continue;
      for (let dy = 0; dy < cell; dy++) {
        for (let dx = 0; dx < cell; dx++) {
          const x = ox + c * cell + dx, y = oy + r * cell + dy;
          if (x >= size || y >= size) continue;
          const i = (y * size + x) * 4;
          px[i] = 255; px[i + 1] = 255; px[i + 2] = 255; px[i + 3] = 255;
        }
      }
    }
  }
  return px;
}

/* ---------- ICO 封装（ICO 容器内嵌 PNG，Windows Vista+ 均支持） ---------- */
function encodeIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // 类型：图标
  header.writeUInt16LE(1, 4); // 图像数量
  const entry = Buffer.alloc(16);
  entry[0] = 32; entry[1] = 32; // 32×32
  entry.writeUInt16LE(1, 4);   // 色彩平面
  entry.writeUInt16LE(32, 6);  // 位深
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12); // 数据偏移（6 头 + 16 条目）
  return Buffer.concat([header, entry, png]);
}

writeFileSync(path.join(OUT, 'logo.png'), encodePng(128, iconPixels(128)));
writeFileSync(path.join(OUT, 'favicon.ico'), encodeIco(encodePng(32, iconPixels(32))));
console.log('已生成：logo.png（128×128）、favicon.ico（32×32）');
