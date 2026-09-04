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

export const toolTableData = {
  'ascii-table': ASCII_ROWS,
  'html-entities': HTML_ENTITIES,
  'http-status': HTTP_STATUS,
  'mime-types': MIME_TYPES,
  'ports': PORTS,
};
