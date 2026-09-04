export default {
  slug: 'luhn',
  name: '银行卡号校验',
  desc: '在线银行卡号校验工具（Luhn 算法），验证卡号合法性并识别常见卡组织，本地计算。',
  keywords: '银行卡号校验,银行卡验证,luhn算法,卡号检测,银行卡识别,visa,万事达',
  category: 'web',
  body: `<div class="field">
  <label for="lu-in">银行卡号</label>
  <input type="text" id="lu-in" class="mono" placeholder="输入卡号，支持空格分隔，如 4111 1111 1111 1111">
</div>
<div class="toolbar">
  <button id="lu-run" class="btn">校验</button>
  <span class="spacer"></span>
  <button id="lu-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="stat-grid">
  <div class="stat"><div class="num" id="lu-valid">—</div><div class="lbl">Luhn 校验</div></div>
  <div class="stat"><div class="num" id="lu-brand">—</div><div class="lbl">卡组织</div></div>
  <div class="stat"><div class="num" id="lu-len">—</div><div class="lbl">位数</div></div>
</div>
<div class="note">Luhn 校验只能证明卡号格式合法，不能证明卡真实存在或可用。请勿在非可信页面输入真实卡号；本工具本地计算、不上传。</div>`,
  usage: `<ol>
  <li>输入卡号（可含空格），点击“校验”。</li>
  <li>输出 Luhn 校验结果、识别到的卡组织（Visa/MasterCard/银联等）与卡号位数。</li>
  <li>适用于开发测试、表单验证逻辑排查。</li>
</ol>`,
  faq: [
    { q: 'Luhn 校验能防盗刷吗？', a: '不能。Luhn 只是检查数字排列是否符合规则（用于防笔误），任何符合规则的号码都可构造，与卡的真实有效性无关。' },
    { q: '如何识别卡组织？', a: '按卡 Bin（前几位）判断：4 开头 Visa、5 开头 MasterCard、62 银联、34/37 美国运通、6011/65 发现卡等。' },
    { q: '测试用什么卡号？', a: '标准测试号：Visa 4111111111111111、MasterCard 5555555555554444，均为合法 Luhn 号，可用于开发验证。' },
  ],
};
