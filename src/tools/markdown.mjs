export default {
  slug: 'markdown',
  name: 'Markdown 编辑器',
  desc: '在线 Markdown 编辑器与实时预览，支持表格、代码块、引用，安全渲染不上传。',
  keywords: 'markdown编辑器,markdown在线,md编辑器,markdown预览,在线md,markdown工具',
  category: 'dev',
  body: `<div class="toolbar">
  <div class="seg" role="toolbar" aria-label="Markdown 快捷插入">
    <button data-md="**$sel**" title="加粗">B</button>
    <button data-md="*$sel*" title="斜体">I</button>
    <button data-md="\`\$sel\`" title="行内代码">&lt;/&gt;</button>
    <button data-md="[\$sel](https://)" title="链接">链接</button>
    <button data-md="# \$sel" title="标题">H</button>
    <button data-md="- \$sel" title="无序列表">•</button>
    <button data-md="1. \$sel" title="有序列表">1.</button>
    <button data-md="> \$sel" title="引用">引用</button>
    <button data-md="&#96;&#96;&#96;&#10;$sel&#10;&#96;&#96;&#96;" title="代码块">代码</button>
  </div>
  <span class="spacer"></span>
  <button id="md-clear" class="btn btn-ghost btn-sm">清空</button>
</div>
<div class="md-grid">
  <div class="field">
    <label for="md-in">Markdown 源码</label>
    <textarea id="md-in" class="mono" placeholder="支持标题、列表、表格、代码块、引用、链接、粗斜体等常用语法"></textarea>
  </div>
  <div class="field">
    <label for="md-out">实时预览</label>
    <div id="md-out" class="md-body"><p class="text-3">等待输入…</p></div>
  </div>
</div>
<div class="note">预览为安全渲染：所有 HTML 标签先转义再转换 Markdown，原始脚本不会被执行，可放心粘贴任意内容。</div>`,
  usage: `<ol>
  <li>左侧直接书写 Markdown，右侧实时预览（输入后约 100ms 刷新）。</li>
  <li>工具栏按钮会在光标处插入对应语法；选中文本后插入会包裹所选内容。</li>  <li>支持语法：1-6 级标题、粗体/斜体/删除线、行内代码与代码块、引用、有序/无序列表、表格、链接与自动链接、分割线。</li>
</ol>`,
  faq: [
    { q: '支持哪些 Markdown 语法？', a: '覆盖日常高频语法：标题、粗斜体、删除线、代码、列表、引用、表格、链接、分割线。图片与脚注等冷门语法暂不支持。' },
    { q: '预览安全吗？会不会执行脚本？', a: '安全。渲染前会先转义全部 HTML 标签，粘贴 <code>&lt;script&gt;</code> 之类的原始 HTML 只会以文本形式展示，不会执行。' },
    { q: '内容会保存到哪里？', a: '仅保存在当前页面内存中，刷新或关闭即丢失，也不会上传到任何服务器。需要保存请自行复制到本地文件。' },
  ],
};
