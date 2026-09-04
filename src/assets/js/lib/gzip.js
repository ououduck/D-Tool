/* Gzip / Deflate 压缩解压（基于浏览器内置 CompressionStream）
   注意：仅在 Chromium / Safari 16.4+ / Firefox 113+ 等支持流式压缩的浏览器可用 */

export const SUPPORTED = typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

export async function compressToBytes(text, format = 'gzip') {
  const stream = new Blob([new TextEncoder().encode(text)]).stream().pipeThrough(new CompressionStream(format));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function decompressToText(bytes, format = 'gzip') {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format));
  return await new Response(stream).text();
}

export function bytesToB64(bytes) {
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

export function b64ToBytes(b64) {
  const bin = atob(String(b64).trim().replace(/\s+/g, ''));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
