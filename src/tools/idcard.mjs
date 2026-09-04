export default {
  slug: 'idcard',
  name: '身份证校验',
  desc: '在线身份证号码校验工具，验证 18 位号码格式、校验位与出生日期，解析性别年龄。',
  keywords: '身份证校验,身份证号码,身份证验证,身份证解析,身份证工具,校验位',
  category: 'web',
  body: `<div class="field">
  <label for="id-in">身份证号码（18 位）</label>
  <input type="text" id="id-in" class="mono" placeholder="输入 18 位身份证号码">
</div>
<div class="toolbar">
  <button id="id-run" class="btn">校验</button>
  <span class="spacer"></span>
  <button id="id-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="stat-grid">
  <div class="stat"><div class="num" id="id-valid">—</div><div class="lbl">校验结果</div></div>
  <div class="stat"><div class="num" id="id-birth">—</div><div class="lbl">出生日期</div></div>
  <div class="stat"><div class="num" id="id-gender">—</div><div class="lbl">性别</div></div>
  <div class="stat"><div class="num" id="id-age">—</div><div class="lbl">年龄</div></div>
</div>
<div class="note">校验依据 GB 11643-1999 标准：前 6 位地区码 + 8 位生日 + 3 位顺序码 + 1 位校验码。校验通过仅代表号码格式合法，不能证明号码真实存在；请在合法场景使用，勿泄露他人身份证号。</div>`,
  usage: `<ol>
  <li>输入 18 位身份证号点击“校验”，输出格式、出生日期、性别与年龄。</li>
  <li>校验位按 GB 11643-1999 权重计算，末位 X 自动兼容大小写。</li>
  <li>适合系统表单验证、测试数据合法性检查。</li>
</ol>`,
  faq: [
    { q: '校验通过就代表号码真实吗？', a: '不代表。校验只验证编码规则与校验位，无法确认该号码是否真实发放；真实有效性需公安部门核验。' },
    { q: '15 位旧版身份证支持吗？', a: '本工具仅支持 18 位新标准；15 位旧号已于 2013 年起停止使用，如需兼容可在代码中先做 15→18 升级转换。' },
    { q: '末位 X 是什么意思？', a: '校验位计算结果为 10 时用 X 表示（罗马数字 10），因此 X 只可能出现在末位。' },
  ],
};
