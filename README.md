# NemoArce's Blog

[https://nemoarce2007.github.io](https://nemoarce2007.github.io)

用 [Astro](https://astro.build) 搭的静态长文站点。排版优先，装饰让路。文章写在 Markdown / MDX 内容集合里，构建后部署到 GitHub Pages。

## 本地开发

需要 Node.js 22.23.4 或更高版本。

```sh
npm ci
npm run dev
```

浏览器打开 `http://localhost:4321`。

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发服务器 |
| `npm run build` | 产出静态站点到 `dist/` |
| `npm run preview` | 预览生产构建 |

## 写一篇文章

1. 在 `src/content/posts/` 新建 `.md` 或 `.mdx` 文件。文件名即 slug，例如 `gongzuotai-kaizhang.md` → `/posts/gongzuotai-kaizhang`。
2. 填好 frontmatter：

```md
---
title: 标题
description: 一两句摘要，用于列表、RSS 和 SEO。
date: 2026-11-05
lang: zh
category: 随笔
tags: []
draft: false
---
```

| 字段 | 说明 |
| --- | --- |
| `title` | 标题 |
| `description` | 摘要 |
| `date` | 发布日期 |
| `lang` | `zh` 或 `en`。只影响正文 `lang`，导航仍是中文。 |
| `category` | `技术` / `产品与创业` / `观念` / `随笔` |
| `tags` | 可选标签数组 |
| `draft` | `true` 时只在 `npm run dev` 可见，生产构建不会发布 |

正文从 frontmatter 下面开始写。分类 schema 定义在 `src/content.config.ts`。

## 部署

仓库是 user site：`https://nemoarce2007.github.io`，因此 `astro.config.mjs` 只设置了 `site`，没有 `base`。

推送到 `main` 后，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 会：

1. 用官方 `withastro/action` 执行 `npm ci && npm run build`
2. 把 `dist/` 作为 Pages artifact 上传
3. 用 `actions/deploy-pages` 发布

合并本仓库的第一份工作流之后，在 GitHub 仓库设置里把 **Pages → Source** 选成 **GitHub Actions**。不必再维护 `gh-pages` 分支。

站点、sitemap 与 RSS：

- 站点：`https://nemoarce2007.github.io`
- Sitemap：`/sitemap-index.xml`
- RSS：`/rss.xml`
