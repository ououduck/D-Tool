/* 共享运行时冒烟测试 —— node test/smoke.mjs
   解析 src/tools/*.mjs 中 transform/calc/gen 三类工具的 cfg 与表单结构，
   以与浏览器运行时 (t/transform.js t/calc.js t/gen.js) 完全一致的参数方式
   在 Node 中调用 lib 函数：
   - 函数缺失 / 语法错误 / 返回 undefined / 行对象缺 name|value → 失败
   - encode+decode 成对出现的 transform → 往返一致性测试 → 失败
   - 其余无法自动构造合法输入的调用错误 → skip（不算失败） */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOOLS = path.join(ROOT, 'src', 'tools');
const LIB = path.join(ROOT, 'src', 'assets', 'js', 'lib');

const modCache = new Map();
const loadMod = (name) => {
  if (!modCache.has(name)) modCache.set(name, import(pathToFileURL(path.join(LIB, name + '.js')).href));
  return modCache.get(name);
};

/* ---- 从 body HTML 按文档顺序提取表单控件 ---- */
const ATTR = /([a-zA-Z-]+)\s*=\s*"([^"]*)"/g;
function attrsOf(tag) {
  const a = {}; let m;
  ATTR.lastIndex = 0;
  while ((m = ATTR.exec(tag))) a[m[1]] = m[2];
  return a;
}
function formControls(html) {
  const out = [];
  const re = /<(input|select|textarea)\b([^>]*)>(?:([\s\S]*?)<\/\1>)?/g;
  let m;
  while ((m = re.exec(html))) {
    const [, tag, attrStr, inner] = m;
    const a = attrsOf(attrStr);
    if (tag === 'select') {
      a._options = [...inner.matchAll(/<option[^>]*value="([^"]*)"[^>]*(selected)?/g)].map((o) => o[1]);
    }
    out.push({ tag, ...a });
  }
  return out;
}

/* ---- 按控件类型生成示例值（模拟浏览器默认状态） ---- */
function sampleValue(el) {
  if (el.tag === 'select') return el._options?.[0] ?? '';
  if (el.type === 'number' || el.type === 'range') {
    if (el.value !== undefined && el.value !== '') return el.value;
    const min = el.min !== undefined ? parseFloat(el.min) : NaN;
    const max = el.max !== undefined ? parseFloat(el.max) : NaN;
    if (!Number.isNaN(min) && !Number.isNaN(max)) return String(Math.min(min + 1, max));
    if (!Number.isNaN(min)) return String(min + 10);
    return '10';
  }
  if (el.type === 'date') return el.value || '2026-01-15';
  if (el.type === 'datetime-local') return el.value || '2026-01-15T12:00';
  if (el.type === 'time') return el.value || '12:30';
  if (el.type === 'checkbox' || el.type === 'radio') return 'on';
  if (el.type === 'color') return el.value || '#3b82f6';
  if (el.value !== undefined && el.value !== '') return el.value;
  if (el.placeholder) return el.placeholder;
  if (el.tag === 'textarea') {
    const inner = el._inner;
    if (inner !== undefined) return inner;
    return 'D-Tool 测试文本 test 123\n第二行 line2';
  }
  return '测试文本 test';
}

/* ---- 校验返回值形状 ---- */
function shapeErrs(result) {
  const errs = [];
  if (result === undefined || result === null) errs.push('返回 undefined/null');
  else if (Array.isArray(result) && result.length && typeof result[0] === 'object') {
    result.forEach((r, i) => {
      if (!('name' in r) || !('value' in r)) errs.push(`行对象[${i}] 缺 name/value 字段: ${JSON.stringify(r).slice(0, 80)}`);
      else if (r.value === undefined || r.value === null) errs.push(`行对象[${i}] value 为 undefined`);
    });
  }
  return errs;
}

/* ---- 主流程 ---- */
const files = fs.readdirSync(TOOLS).filter((f) => f.endsWith('.mjs'));
let pass = 0, fail = 0, skip = 0;
const failures = [];
const skips = [];
const libFns = new Set();

async function callFn(lib, fn, args) {
  const mod = await loadMod(lib);
  const f = mod[fn];
  if (typeof f !== 'function') throw Object.assign(new Error(`函数 ${fn} 不存在于 lib/${lib}.js`), { hard: true });
  return f(...args);
}

for (const f of files) {
  const def = (await import(pathToFileURL(path.join(TOOLS, f)).href)).default;
  const body = def.body || '';
  const kind = def.kind;
  const slug = def.slug || f.replace(/\.mjs$/, '');
  if (!['transform', 'calc', 'gen'].includes(kind)) continue;

  const cfgMatch = body.match(/<script type="application\/json" id="x-cfg">([\s\S]*?)<\/script>/)
    || body.match(/<script type="application\/json" id="g-cfg">([\s\S]*?)<\/script>/)
    || body.match(/<script type="application\/json" id="c-cfg">([\s\S]*?)<\/script>/);
  if (!cfgMatch) { failures.push(`${slug}: 无 cfg JSON`); continue; }
  const cfg = JSON.parse(cfgMatch[1]);

  /* transform：输入 + 可选参数；encode/decode 成对时做往返测试 */
  if (kind === 'transform') {
    const controls = formControls(body);
    const inEl = controls.find((c) => c.id === 'x-in');
    if (inEl && inEl.tag === 'textarea') inEl._inner = (body.match(/<textarea id="x-in"[^>]*>([\s\S]*?)<\/textarea>/) || [])[1]?.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') ?? undefined;
    const input = inEl ? sampleValue(inEl) : '';
    const params = (cfg.params || []).map((_, i) => {
      const el = controls.find((c) => c.id === `xp-${i}`);
      return el ? sampleValue(el) : '';
    });
    const actions = cfg.actions || [{ fn: cfg.fn }];
    /* 配对：xxxEncode/xxxDecode 或 encodeX/decodeX（培根/北约/猪圈仅支持 A-Z；punycode 域名规范转小写） */
    const AZ_ONLY = /bacon|nato|pigpen/i;
    const LOWERCASE = /punycode/i;
    const SAMPLE = AZ_ONLY.test(cfg.lib + actions.map((x) => x.fn).join('')) ? 'SENDMOREINFO' : 'D-Tool 中文测试 🦆 test 123';
    /* 配对：xxxEncode/xxxDecode 或 encodeX/decodeX */
    const pairs = [];
    const used = new Set();
    for (const a of actions) {
      if (used.has(a.fn)) continue;
      const m = a.fn.match(/^(.*?)(Encode|Decode)$/i) || a.fn.match(/^(encode|decode)(.*)$/i);
      if (!m) continue;
      const [, stem, dir] = m;
      const other = actions.find((b) => {
        const m2 = b.fn.match(/^(.*?)(Encode|Decode)$/i) || b.fn.match(/^(encode|decode)(.*)$/i);
        return m2 && m2[1] === stem && m2[2] !== dir;
      });
      if (other) { pairs.push([a, other]); used.add(a.fn); used.add(other.fn); }
    }
    for (const [e, d] of pairs) {
      libFns.add(cfg.lib + ':' + e.fn);
      libFns.add(cfg.lib + ':' + d.fn);
      try {
        const enc = await callFn(cfg.lib, e.fn, [SAMPLE, ...params]);
        const dec = await callFn(cfg.lib, d.fn, [String(Array.isArray(enc) ? enc[0] : enc), ...params]);
        const decStr = String(Array.isArray(dec) ? dec[0] : dec);
        const errs = [...shapeErrs(enc), ...shapeErrs(dec)];
        if (!LOWERCASE.test(cfg.lib + e.fn) && SAMPLE !== decStr) errs.push(`往返不一致: "${SAMPLE.slice(0, 20)}" → "${decStr.slice(0, 30)}"`);
        if (errs.length) throw new Error(errs.join('; '));
        pass++;
      } catch (e2) {
        fail++;
        failures.push(`${slug} 往返 ${cfg.lib}.${e.fn}/${d.fn}: ${e2.message}`);
      }
    }
    for (const a of actions) {
      if (used.has(a.fn)) continue;
      if (!a.fn) { failures.push(`${slug}: cfg 缺 fn`); continue; }
      libFns.add(cfg.lib + ':' + a.fn);
      try {
        const result = await callFn(cfg.lib, a.fn, [input, ...params]);
        const errs = shapeErrs(result);
        if (errs.length) throw new Error(errs.join('; '));
        pass++;
      } catch (e2) {
        if (e2.hard) { fail++; failures.push(`${slug} [${cfg.lib}.${a.fn}]: ${e2.message}`); }
        else { skip++; skips.push(`${slug}.${a.fn}: ${e2.message.slice(0, 60)}`); }
      }
    }
    continue;
  }

  /* calc：提取 .calc-form 内全部控件（与运行时选择器一致，含 textarea） */
  if (kind === 'calc') {
    const formHtml = (body.match(/<div class="calc-form">([\s\S]*?)\n<\/div>\n/) || [])[1] || body;
    const controls = formControls(formHtml);
    const values = controls.map((c) => {
      if (c.tag === 'textarea') c._inner = undefined;
      return sampleValue(c);
    });
    libFns.add(cfg.lib + ':' + cfg.fn);
    try {
      const result = await callFn(cfg.lib, cfg.fn, [values]);
      const errs = shapeErrs(result);
      if (errs.length) throw new Error(errs.join('; '));
      pass++;
    } catch (e2) {
      if (e2.hard) { fail++; failures.push(`${slug} [${cfg.lib}.${cfg.fn}]: ${e2.message}`); }
      else { skip++; skips.push(`${slug}.${cfg.fn}: ${e2.message.slice(0, 60)}`); }
    }
    continue;
  }

  /* gen：gp-* 控件按序展开（与运行时一致） */
  const controls = formControls(body);
  const params = controls.filter((c) => /^gp-\d+$/.test(c.id || '')).sort((a, b) => parseInt(a.id.slice(3), 10) - parseInt(b.id.slice(3), 10)).map(sampleValue);
  libFns.add(cfg.lib + ':' + cfg.fn);
  try {
    const result = await callFn(cfg.lib, cfg.fn, params);
    const errs = shapeErrs(result);
    if (errs.length) throw new Error(errs.join('; '));
    pass++;
  } catch (e2) {
    if (e2.hard) { fail++; failures.push(`${slug} [${cfg.lib}.${cfg.fn}]: ${e2.message}`); }
    else { skip++; skips.push(`${slug}.${cfg.fn}: ${e2.message.slice(0, 60)}`); }
  }
}

console.log(`\n冒烟结果: ${pass} 通过, ${fail} 失败, ${skip} 跳过, 覆盖 ${libFns.size} 个 lib 函数组合`);
if (skips.length) console.log(`跳过（无法自动构造合法输入）:\n  · ${[...new Set(skips)].join('\n  · ')}`);
if (failures.length) {
  console.log('\n---- 失败明细 ----');
  failures.forEach((f) => console.log('  ✗ ' + f));
  process.exit(1);
}
