/* 文本行级 diff —— LCS 动态规划，返回带类型的行序列
   行数上限 3000×3000（内存约 36MB），超出返回 null 由调用方提示 */

export const MAX_LINES = 3000;

export function diffLines(aText, bText) {
  const a = String(aText).split('\n');
  const b = String(bText).split('\n');
  const n = a.length, m = b.length;
  if (n > MAX_LINES || m > MAX_LINES) return null;

  const W = m + 1;
  const dp = new Uint32Array((n + 1) * W);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * W + j] = a[i] === b[j]
        ? dp[(i + 1) * W + j + 1] + 1
        : Math.max(dp[(i + 1) * W + j], dp[i * W + j + 1]);
    }
  }

  const out = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { out.push({ type: 'same', text: a[i] }); i++; j++; }
    else if (dp[(i + 1) * W + j] >= dp[i * W + j + 1]) { out.push({ type: 'del', text: a[i] }); i++; }
    else { out.push({ type: 'add', text: b[j] }); j++; }
  }
  while (i < n) out.push({ type: 'del', text: a[i++] });
  while (j < m) out.push({ type: 'add', text: b[j++] });
  return out;
}
