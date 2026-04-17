---
title: 部署指南
description: 学习如何按照仓库当前配置部署 Awesome AI Pedia
---

# 部署指南

本文档只描述仓库当前已经落地的部署方式和需要注意的配置项。

## 本地构建

在部署之前，先在本地验证构建：

```bash
npm install
npm run build
```

构建完成后，静态产物位于：

```text
docs/.vitepress/dist
```

## 部署到 GitHub Pages

当前仓库已经内置 GitHub Actions 工作流，文件位置是：

```text
.github/workflows/blank.yml
```

### 当前工作流行为

- 监听 `master` 分支推送
- 使用 Node.js `20.18.1`
- 执行 `npm i`
- 执行 `npm run build`
- 将 `docs/.vitepress/dist` 发布到 `gh-pages`

### 关键点

- 站点 `base` 当前固定为 `/Awesome-AI-Pedia/`
- GitHub Pages 场景下，这个配置与仓库名匹配
- 如果未来改仓库名，必须同步修改 `docs/.vitepress/config.ts`

## 部署到 Vercel

仓库已包含 `vercel.json`，核心行为是：

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/:path*.html"
    }
  ],
  "cleanUrls": false,
  "trailingSlash": false
}
```

### 使用建议

- Build Command: `npm run build`
- Output Directory: `docs/.vitepress/dist`
- 如果部署域名不是仓库子路径，而是根域名，需要同步调整 `base`

## 部署到 Netlify

仓库已包含 `netlify.toml`，当前配置的发布目录也是：

```text
docs/.vitepress/dist
```

并且附带了一个兜底重写规则，把未知路径回退到 `index.html`。

## 部署到云服务器

如果使用自己的服务器，上传目录同样是：

```text
docs/.vitepress/dist
```

### Nginx 示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 常见问题

### Q: 部署后页面 404？

A: 优先检查三件事：

- `docs/.vitepress/config.ts` 中的 `base`
- 实际发布目录是否是 `docs/.vitepress/dist`
- 托管平台是否为 `.html` 路径或历史路由配置了重写

### Q: 资源加载失败？

A: 大多数情况是 `base` 与部署路径不匹配。

```typescript
export default defineConfig({
  base: '/Awesome-AI-Pedia/'
})
```

### Q: 部署失败？

A: 检查构建日志，常见问题：

- Node.js 版本不兼容
- 依赖安装失败
- 构建脚本错误

## 参考位置

- GitHub Actions 工作流：`.github/workflows/blank.yml`
- Vercel 配置：`vercel.json`
- Netlify 配置：`netlify.toml`
- VitePress 主配置：`docs/.vitepress/config.ts`
