export default {
  slug: 'csv-json',
  name: 'CSV 与 JSON 互转',
  desc: '在线 CSV 与 JSON 双向转换工具，自动识别分隔符，支持表头与 RFC 4180 引号字段。',
  keywords: 'csv转json,csv转json,josn转csv,表格转json,excel转json,csv解析',
  category: 'convert',
  body: `<div class="row">
  <div class="field grow">
    <label for="cj-csv">CSV 数据</label>
    <textarea id="cj-csv" class="mono" rows="10" placeholder="name,age&#10;张三,28&#10;李四,31"></textarea>
  </div>
  <div class="field grow">
    <label for="cj-json">JSON 数据</label>
    <textarea id="cj-json" class="mono" rows="10" placeholder='[&#10;  { "name": "张三", "age": "28" },&#10;  { "name": "李四", "age": "31" }&#10;]'></textarea>
  </div>
</div>
<div class="toolbar">
  <button id="cj-to-json" class="btn">CSV → JSON</button>
  <button id="cj-to-csv" class="btn btn-ghost">JSON → CSV</button>
  <label class="check"><input type="checkbox" id="cj-header" checked>首行为表头</label>
  <span class="spacer"></span>
  <button id="cj-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="note">CSV 输入自动识别逗号、制表符、分号、竖线四种分隔符；包含引号、逗号、换行的字段按 RFC 4180 规范解析。</div>`,
  usage: `<ol>
  <li>左侧粘贴 CSV（可用 Excel / WPS 导出的内容，含中文、引号均可），点击“CSV → JSON”。</li>
  <li>右侧粘贴 JSON 数组（对象数组或二维数组），点击“JSON → CSV”。</li>
  <li>勾选“首行为表头”时，CSV 第一行作为 JSON 字段名；取消则输出二维数组。</li>
</ol>`,
  faq: [
    { q: 'Excel 复制的内容可以直接用吗？', a: '可以。Excel 复制到剪贴板默认用制表符分隔，本工具会自动识别；粘贴后点击转换即可。也可以先用 Excel 另存为 CSV 再上传。' },
    { q: 'JSON 转 CSV 时字段顺序怎么定？', a: '按对象中出现字段的顺序合并去重；不同行字段不一致时会自动补空值，保证表格完整。' },
    { q: '单元格里有逗号或换行会出错吗？', a: '不会。按 RFC 4180 规范，含逗号/换行/引号的字段会自动加引号包裹、内部引号双写转义，转换结果可用 Excel 正常打开。' },
  ],
};
