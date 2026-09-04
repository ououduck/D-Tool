/* CSV 与 JSON 互转工具脚本 */
import { csvToJson, jsonToCsv } from '../lib/csv.js';

const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const csvEl = $('#cj-csv'), jsonEl = $('#cj-json'), headerEl = $('#cj-header');

$('#cj-to-json').addEventListener('click', () => {
  const v = csvEl.value.trim();
  if (!v) return toast('请先输入 CSV 数据');
  try {
    jsonEl.value = JSON.stringify(csvToJson(v, { header: headerEl.checked }), null, 2);
  } catch (e) {
    toast('CSV 解析失败：' + e.message);
  }
});

$('#cj-to-csv').addEventListener('click', () => {
  const v = jsonEl.value.trim();
  if (!v) return toast('请先输入 JSON 数据');
  try {
    csvEl.value = jsonToCsv(JSON.parse(v), { header: headerEl.checked });
  } catch {
    toast('JSON 解析失败：请检查是否为合法的 JSON 数组');
  }
});

$('#cj-clear').addEventListener('click', () => { csvEl.value = ''; jsonEl.value = ''; csvEl.focus(); });
