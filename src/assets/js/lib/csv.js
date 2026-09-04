/* CSV 解析 / 序列化（RFC 4180 兼容：引号、内嵌逗号与换行、双引号转义）
   以及 CSV ⇄ JSON 转换 */

export function parseCsv(text, delim = ',') {
  const s = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === delim) {
      row.push(field); field = '';
    } else if (c === '\n') {
      row.push(field); field = '';
      rows.push(row); row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

export function detectDelimiter(text) {
  const first = String(text).split(/\r?\n/, 1)[0] || '';
  const cands = [',', '\t', ';', '|'];
  let best = ',', bestCount = -1;
  for (const d of cands) {
    const n = first.split(d).length;
    if (n > bestCount) { bestCount = n; best = d; }
  }
  return best;
}

export function toCsv(rows, delim = ',') {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const c = String(cell ?? '');
          return /[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
        })
        .join(delim)
    )
    .join('\n');
}

/* CSV → JSON 对象数组（默认首行为表头；无表头时输出二维数组） */
export function csvToJson(text, { header = true, delim = 'auto' } = {}) {
  const d = delim === 'auto' ? detectDelimiter(text) : delim;
  const rows = parseCsv(text, d);
  if (!rows.length) return [];
  if (!header) return rows;
  const keys = rows[0].map((k, i) => k || `col${i + 1}`);
  return rows.slice(1).map((r) => {
    const obj = {};
    keys.forEach((k, i) => { obj[k] = r[i] ?? ''; });
    return obj;
  });
}

/* JSON → CSV。支持对象数组（自动收集字段）或二维数组 */
export function jsonToCsv(json, { header = true, delim = ',' } = {}) {
  let rows, cols;
  if (Array.isArray(json) && json.length && typeof json[0] === 'object' && json[0] !== null) {
    cols = [...new Set(json.flatMap((o) => Object.keys(o)))];
    rows = header ? [cols] : [];
    for (const o of json) rows.push(cols.map((k) => o[k]));
  } else if (Array.isArray(json) && Array.isArray(json[0])) {
    rows = json;
  } else {
    throw new Error('JSON 需为对象数组或二维数组');
  }
  return toCsv(rows, delim);
}
