/* 命名格式转换：camelCase / PascalCase / snake_case / kebab-case / UPPER_SNAKE / Title Case
   中文等非字母数字字符按分隔符处理（转换结果仅含 ASCII） */

function splitWords(s) {
  return String(s)
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')        // camelCase 边界
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')     // 连续大写边界
    .replace(/[^a-zA-Z0-9]+/g, ' ')                // 其余分隔符
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

export function toCamel(s) { return splitWords(s).map((w, i) => (i ? cap(w) : w)).join(''); }
export function toPascal(s) { return splitWords(s).map(cap).join(''); }
export function toSnake(s) { return splitWords(s).join('_'); }
export function toUpperSnake(s) { return splitWords(s).join('_').toUpperCase(); }
export function toKebab(s) { return splitWords(s).join('-'); }
export function toTitle(s) { return splitWords(s).map(cap).join(' '); }

export const CONVERTERS = [
  ['camelCase', toCamel, '首字母小写驼峰'],
  ['PascalCase', toPascal, '首字母大写驼峰'],
  ['snake_case', toSnake, '下划线分隔'],
  ['UPPER_SNAKE', toUpperSnake, '大写下划线（常量）'],
  ['kebab-case', toKebab, '中划线分隔'],
  ['Title Case', toTitle, '单词首字母大写'],
];
