// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** 图片原图会被一起复制进 dist；构建后删掉页面没有引用的原图，只发布压缩后的版本 */
const dropUnusedOriginals = {
  name: 'drop-unused-originals',
  hooks: {
    'astro:build:done': ({ dir, logger }) => {
      const root = fileURLToPath(dir);
      const files = [];
      const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
        const p = path.join(d, e.name);
        e.isDirectory() ? walk(p) : files.push(p);
      });
      walk(root);
      const text = files.filter((f) => /\.(html|css|js)$/.test(f)).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
      let n = 0;
      for (const f of files) {
        if (f.includes(`${path.sep}_astro${path.sep}`) && /\.(jpe?g|png)$/i.test(f) && !text.includes(path.basename(f))) { fs.rmSync(f); n++; }
      }
      logger.info(`removed ${n} unused original images`);
    },
  },
};

// 发布时由 scripts/deploy.mjs 传入 SITE / BASE（仓库 mypage → https://sqxw7n.github.io/mypage/）
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4322',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  server: { port: 4322 },
  integrations: [dropUnusedOriginals],
});
