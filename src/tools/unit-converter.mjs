export default {
  slug: 'unit-converter',
  name: '单位换算',
  desc: '长度、重量、温度、面积、体积、速度、数据大小、时间等 8 类单位在线换算器。',
  keywords: '单位换算,长度换算,重量换算,温度换算,数据大小换算,英寸厘米,斤千克',
  category: 'convert',
  body: `<div class="row">
  <div class="field">
    <label for="un-cat">类别</label>
    <select id="un-cat"></select>
  </div>
  <div class="field grow">
    <label for="un-val">数值</label>
    <input type="number" id="un-val" step="any" placeholder="输入数值" class="w-md">
  </div>
  <div class="field">
    <label for="un-from">从</label>
    <select id="un-from"></select>
  </div>
  <div class="field">
    <label for="un-to">到</label>
    <select id="un-to"></select>
  </div>
</div>
<div class="output">
  <div class="output-label">换算结果</div>
  <div id="un-result" class="stat-grid"></div>
</div>
<div class="output">
  <div class="output-label">全部单位对照</div>
  <div class="table-wrap"><table class="data" id="un-table"></table></div>
</div>`,
  usage: `<ol>
  <li>选择类别（长度、重量、温度、面积、体积、速度、数据大小、时间），自动加载对应单位。</li>
  <li>输入数值并选择“从 / 到”单位，顶部换算结果实时更新。</li>
  <li>下方对照表显示输入值在全部单位下的换算值，便于一次性查看。</li>
</ol>`,
  faq: [
    { q: '数据大小为什么同时有 KB 和 KiB？', a: 'KB/MB/GB 按十进制（1000 进制），KiB/MiB/GiB 按二进制（1024 进制）。硬盘厂商用十进制、操作系统常显示二进制，两者数值有差异，本工具同时提供。' },
    { q: '斤、两是市制单位吗？', a: '是的。本工具的“斤”即市斤（500 克）、“两”即市两（50 克），常见于国内日常使用。' },
    { q: '温度换算支持哪些？', a: '摄氏度 ℃、华氏度 ℉、开尔文 K 三者可任意互转，计算使用精确的仿射变换公式。' },
  ],
};
