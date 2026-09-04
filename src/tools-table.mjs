/**
 * 共享运行时表格数据注册表（kind: 'table' 的工具）
 * 大表格数据放在这里，工具定义里 table.rows 省略时按 slug 在此查找。
 * 运行时 table.js 从该模块加载数据进行前端过滤。
 */
import { ASCII_ROWS } from './assets/js/lib/data/ascii.js';
import { HTML_ENTITIES } from './assets/js/lib/data/html-entities.js';
import { HTTP_STATUS } from './assets/js/lib/data/http-status.js';
import { MIME_TYPES } from './assets/js/lib/data/mime.js';
import { PORTS } from './assets/js/lib/data/ports.js';
import { UNICODE_BLOCKS } from './assets/js/lib/data/UNICODE_BLOCKS.js';
import { SI_UNITS } from './assets/js/lib/data/SI_UNITS.js';
import { SI_PREFIXES } from './assets/js/lib/data/SI_PREFIXES.js';
import { HTML_TAGS } from './assets/js/lib/data/HTML_TAGS.js';
import { CSS_COLORS } from './assets/js/lib/data/CSS_COLORS.js';
import { CURRENCIES } from './assets/js/lib/data/CURRENCIES.js';
import { HTTP_METHODS } from './assets/js/lib/data/HTTP_METHODS.js';
import { ELEMENTS } from './assets/js/lib/data/ELEMENTS.js';

export const toolTableData = {
  'ascii-table': ASCII_ROWS,
  'html-entities': HTML_ENTITIES,
  'http-status': HTTP_STATUS,
  'mime-types': MIME_TYPES,
  'ports': PORTS,
  'unicode-blocks': UNICODE_BLOCKS,
  'si-units': SI_UNITS,
  'si-prefixes': SI_PREFIXES,
  'html-tags': HTML_TAGS,
  'css-colors': CSS_COLORS,
  'currencies': CURRENCIES,
  'http-methods': HTTP_METHODS,
  'elements': ELEMENTS,
};
