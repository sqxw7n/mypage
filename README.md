# Qixin Wang — academic homepage

单页学术主页，基于 [Astro](https://astro.build)，发布在 https://sqxw7n.github.io/mypage/

## 日常维护：只改 `src/content/` 里的文字文件

| 想做的事 | 改哪里 |
|---|---|
| 加一篇论文 | `src/content/publications.yaml`：复制一段，改标题、作者、会议、年份、链接；配图放 `src/assets/papers/`，PDF 放 `public/papers/` |
| 加获奖 / 展览 / 经历 | `src/content/activities.yaml` |
| 加设计作品（Designs） | `src/content/projects.yaml`，图片放 `src/assets/projects/` |
| 改介绍、学历、邮箱、照片 | `src/content/about.md` |
| 换 CV | 用新 PDF 覆盖 `public/cv.pdf`（Word 源文件在 `cv/`） |

写错了（比如图片文件名对不上、少了必填项），构建时会直接报错并指出哪个文件、哪一项。

## 预览和发布

```bash
npm install          # 第一次
npm run dev          # 本地预览 http://localhost:4322
git add -A && git commit -m "更新" && git push   # 保存源码
npm run deploy       # 构建并发布到 GitHub Pages（gh-pages 分支）
```
