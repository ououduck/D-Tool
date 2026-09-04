/* 图片转 Base64 工具脚本 */
const $ = (s) => document.querySelector(s);
const { toast } = window.DT;

const drop = $('#ib-drop'), fileEl = $('#ib-file'), outEl = $('#ib-out'), preview = $('#ib-preview'), metaEl = $('#ib-meta');

function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return toast('请选择图片文件');
  if (file.size > 20 * 1024 * 1024) return toast('图片过大（>20MB），请先压缩');
  const reader = new FileReader();
  reader.onload = () => {
    outEl.value = reader.result;
    preview.src = reader.result;
    preview.classList.remove('hidden');
    const kb = (file.size / 1024).toFixed(1);
    metaEl.textContent = `${file.name} · ${file.type} · ${kb} KB · Data URL 长度 ${reader.result.length.toLocaleString()} 字符`;
  };
  reader.onerror = () => toast('读取文件失败');
  reader.readAsDataURL(file);
}

drop.addEventListener('click', () => fileEl.click());
drop.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileEl.click(); } });
drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.classList.add('drag'); });
drop.addEventListener('dragleave', () => drop.classList.remove('drag'));
drop.addEventListener('drop', (e) => {
  e.preventDefault();
  drop.classList.remove('drag');
  handleFile(e.dataTransfer.files[0]);
});
fileEl.addEventListener('change', () => { handleFile(fileEl.files[0]); fileEl.value = ''; });

$('#ib-clear').addEventListener('click', () => {
  outEl.value = ''; preview.classList.add('hidden'); preview.removeAttribute('src');
  metaEl.textContent = '';
});
