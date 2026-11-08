import type { ImageMetadata } from 'astro';

// src/assets 下所有图片，按 "子文件夹/文件名" 查找
const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpg,jpeg,png,webp}', { eager: true });
const byPath = new Map(Object.entries(modules).map(([p, m]) => [p.replace('/src/assets/', ''), m.default]));

/** 找图片：asset('papers', 'V-CASS.jpg')；找不到时构建报错并提示 */
export function asset(folder: string, name: string): ImageMetadata {
  const key = folder ? `${folder}/${name}` : name;
  const img = byPath.get(key);
  if (!img) throw new Error(`[assets] 找不到图片 src/assets/${key}，检查 src/content 里的文件名`);
  return img;
}

/** .gif 动图放在 public/ 里，按原样使用 */
export const isGif = (name: string) => /\.gif$/i.test(name);
