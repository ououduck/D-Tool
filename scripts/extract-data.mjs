/* 一次性数据提取脚本：把旧工具脚本里的静态数组迁移到 lib/data/ 模块
   运行：node scripts/extract-data.mjs （迁移完成后可删除） */
import { readFileSync, writeFileSync } from 'node:fs';

function extract(srcFile, varName) {
  const s = readFileSync(srcFile, 'utf8');
  const start = s.indexOf(`const ${varName} = `);
  if (start < 0) throw new Error(`未找到 ${varName} in ${srcFile}`);
  const end = s.indexOf('];', start) + 1;
  return s.slice(start + `const ${varName} = `.length, end);
}

const jobs = [
  ['src/assets/js/t/http-status.js', 'CODES', 'src/assets/js/lib/data/http-status.js', 'HTTP_STATUS'],
  ['src/assets/js/t/mime.js', 'TYPES', 'src/assets/js/lib/data/mime.js', 'MIME_TYPES'],
  ['src/assets/js/t/ports.js', 'PORTS', 'src/assets/js/lib/data/ports.js', 'PORTS'],
];
for (const [src, varName, out, exportName] of jobs) {
  const body = extract(src, varName).replace(/</g, '\\u003c');
  writeFileSync(out, `export const ${exportName} = ${body};\n`);
  console.log(`✓ ${out}`);
}
