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
import { UA_LIST } from './assets/js/lib/data/ua-list.js';
import { HTTP_HEADERS } from './assets/js/lib/data/http-headers.js';
import { GIT_COMMANDS } from './assets/js/lib/data/GIT_COMMANDS.js';
import { LINUX_COMMANDS } from './assets/js/lib/data/LINUX_COMMANDS.js';
import { DOCKER_COMMANDS } from './assets/js/lib/data/DOCKER_COMMANDS.js';
import { NPM_COMMANDS } from './assets/js/lib/data/NPM_COMMANDS.js';
import { SQL_SYNTAX } from './assets/js/lib/data/SQL_SYNTAX.js';
import { VIM_SHORTCUTS } from './assets/js/lib/data/VIM_SHORTCUTS.js';
import { VSCODE_SHORTCUTS } from './assets/js/lib/data/VSCODE_SHORTCUTS.js';
import { MATH_SYMBOLS } from './assets/js/lib/data/MATH_SYMBOLS.js';
import { CSS_PROPERTIES } from './assets/js/lib/data/CSS_PROPERTIES.js';
import { HTML_ATTRIBUTES } from './assets/js/lib/data/HTML_ATTRIBUTES.js';
import { JS_ARRAY_METHODS } from './assets/js/lib/data/JS_ARRAY_METHODS.js';
import { JS_STRING_METHODS } from './assets/js/lib/data/JS_STRING_METHODS.js';
import { PYTHON_BUILTINS } from './assets/js/lib/data/PYTHON_BUILTINS.js';
import { LATEX_SYMBOLS } from './assets/js/lib/data/LATEX_SYMBOLS.js';
import { EMOJI_LIST } from './assets/js/lib/data/EMOJI_LIST.js';
import { SPECIAL_SYMBOLS } from './assets/js/lib/data/SPECIAL_SYMBOLS.js';
import { COUNTRY_CODES } from './assets/js/lib/data/COUNTRY_CODES.js';
import { SOLAR_TERMS } from './assets/js/lib/data/SOLAR_TERMS.js';
import { PAPER_SIZES } from './assets/js/lib/data/PAPER_SIZES.js';
import { CHINESE_DYNASTIES } from './assets/js/lib/data/CHINESE_DYNASTIES.js';
import { MAGIC_NUMBERS } from './assets/js/lib/data/MAGIC_NUMBERS.js';
import { REGEX_PATTERNS } from './assets/js/lib/data/REGEX_PATTERNS.js';
import { CSS_UNITS } from './assets/js/lib/data/CSS_UNITS.js';
import { CSS_SELECTORS } from './assets/js/lib/data/CSS_SELECTORS.js';
import { GEOMETRY_FORMULAS } from './assets/js/lib/data/GEOMETRY_FORMULAS.js';
import { FOOD_CALORIES } from './assets/js/lib/data/FOOD_CALORIES.js';
import { PROVINCES } from './assets/js/lib/data/PROVINCES.js';
import { WORLD_CITIES_TZ } from './assets/js/lib/data/WORLD_CITIES_TZ.js';
import { WIN_SHORTCUTS } from './assets/js/lib/data/WIN_SHORTCUTS.js';
import { MAC_SHORTCUTS } from './assets/js/lib/data/MAC_SHORTCUTS.js';
import { SCREEN_RESOLUTIONS } from './assets/js/lib/data/SCREEN_RESOLUTIONS.js';
import { GANZHI_TABLE } from './assets/js/lib/data/GANZHI_TABLE.js';
import { SURNAMES } from './assets/js/lib/data/SURNAMES.js';
import { PUNCTUATION } from './assets/js/lib/data/PUNCTUATION.js';
import { FILE_EXTENSIONS } from './assets/js/lib/data/FILE_EXTENSIONS.js';

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
  'ua-list': UA_LIST,
  'http-headers-ref': HTTP_HEADERS,
  'status-code-ref': HTTP_STATUS,
  'git-commands': GIT_COMMANDS,
  'linux-commands': LINUX_COMMANDS,
  'docker-commands': DOCKER_COMMANDS,
  'npm-commands': NPM_COMMANDS,
  'sql-syntax': SQL_SYNTAX,
  'vim-shortcuts': VIM_SHORTCUTS,
  'vscode-shortcuts': VSCODE_SHORTCUTS,
  'math-symbols': MATH_SYMBOLS,
  'file-extensions': FILE_EXTENSIONS,
  'provinces': PROVINCES,
  'world-timezones': WORLD_CITIES_TZ,
  'win-shortcuts': WIN_SHORTCUTS,
  'mac-shortcuts': MAC_SHORTCUTS,
  'screen-resolutions': SCREEN_RESOLUTIONS,
  'ganzhi-table': GANZHI_TABLE,
  'surnames': SURNAMES,
  'punctuation': PUNCTUATION,


  'css-properties': CSS_PROPERTIES,
  'html-attributes': HTML_ATTRIBUTES,
  'js-array-methods': JS_ARRAY_METHODS,
  'js-string-methods': JS_STRING_METHODS,
  'python-builtins': PYTHON_BUILTINS,
  'latex-symbols': LATEX_SYMBOLS,
  'emoji-list': EMOJI_LIST,
  'special-symbols': SPECIAL_SYMBOLS,
  'country-codes': COUNTRY_CODES,
  'solar-terms': SOLAR_TERMS,
  'paper-sizes': PAPER_SIZES,
  'chinese-dynasties': CHINESE_DYNASTIES,
  'magic-numbers': MAGIC_NUMBERS,
  'regex-patterns': REGEX_PATTERNS,
  'css-units': CSS_UNITS,
  'css-selectors': CSS_SELECTORS,
  'geometry-formulas': GEOMETRY_FORMULAS,
  'food-calories': FOOD_CALORIES,

};
