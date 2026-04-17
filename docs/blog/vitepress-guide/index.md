---
title: VitePress博客搭建完整指南
date: 2024-01-20
author: 文档团队
readingTime: 10 分钟阅读
tags:
  - VitePress
  - 博客
  - 指南
description: 从零开始搭建基于VitePress的现代化博客网站，包含完整配置和部署流程
---

# VitePress博客搭建完整指南

VitePress是Vue.js创始人尤雨溪开发的静态网站生成器，专为构建快速、以内容为中心的网站而设计。本指南将带你从零开始搭建一个功能完整的VitePress博客。

## 什么是VitePress？

VitePress是一个基于Vite和Vue 3的静态网站生成器，具有以下特点：

- ⚡ **极速开发**: 基于Vite构建，毫秒级热更新
- 🎨 **精美主题**: 默认主题美观大方，支持自定义
- 📝 **Markdown增强**: 原生支持代码高亮、目录生成
- 🔍 **SEO友好**: 静态生成，利于搜索引擎收录
- 📱 **响应式设计**: 自动适配各种设备

## 快速开始

### 环境准备

确保你的系统已安装：

- Node.js >= 18
- npm 或 yarn

### 项目初始化

```bash
# 创建项目目录
mkdir my-blog
cd my-blog

# 初始化package.json
npm init -y

# 安装依赖
npm install vitepress vue
```

### 目录结构

```
my-blog/
├── docs/
│   ├── .vitepress/         # VitePress配置
│   │   └── config.ts       # 站点配置
│   ├── guide/              # 指南页面
│   ├── blog/               # 博客文章
│   └── index.md            # 首页
├── public/                 # 静态资源
└── package.json
```

### 创建首页

在`docs/index.md`中添加：

```markdown
---
layout: home
hero:
  name: 我的博客
  text: 这是一个使用VitePress搭建的博客
  tagline: 简单、快速、美观
  actions:
    - theme: brand
      text: 开始阅读
      link: /blog/
features:
  - icon: ⚡
    title: 极速开发
    details: 基于Vite构建，开发体验极佳
  - icon: 🎨
    title: 精美主题
    details: 默认主题美观大方
---
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 即可看到你的博客！

## 配置文件详解

### 基础配置

在`docs/.vitepress/config.ts`中：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的博客',
  description: '个人技术博客',
  lang: 'zh-CN',

  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏
    sidebar: {
      '/blog/': [
        {
          text: '文章分类',
          items: [
            { text: '第一篇文章', link: '/blog/article-1' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username' }
    ],

    // 搜索
    search: {
      provider: 'local'
    }
  }
})
```

### 高级配置

#### 1. 自定义主题色

```typescript
export default defineConfig({
  themeConfig: {
    // ...其他配置
  },

  // 自定义CSS变量
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:color";
            $vp-c-brand: #646cff;
          `
        }
      }
    }
  }
})
```

#### 2. 代码块增强

```typescript
import { mdPlugin } from './plugins/markdown'

export default defineConfig({
  markdown: {
    lineNumbers: true,
    toc: { level: [1, 2, 3, 4] },
    config(md) {
      md.use(mdPlugin)
    }
  }
})
```

## 博客功能实现

### 文章元数据

在文章顶部添加front matter：

```markdown
---
title: 文章标题
date: 2024-01-01
author: 作者
description: 文章描述
tags:
  - 标签1
  - 标签2
---
```

### 目录生成

自动生成文章目录：

```markdown
[[toc]]

# 标题1
## 标题1.1
### 标题1.1.1

# 标题2
## 标题2.1
```

### 代码高亮

支持多种编程语言：

```typescript
// TypeScript
const message: string = 'Hello, VitePress!'
console.log(message)
```

```python
# Python
def greet(name: str) -> str:
    return f'Hello, {name}!'

print(greet('VitePress'))
```

```bash
# Bash
npm run dev
npm run build
```

## 部署到GitHub Pages

### 1. 创建GitHub仓库

```bash
git init
git add .
git commit -m "feat: 初始化VitePress博客"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### 2. 配置GitHub Actions

创建`.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Build with VitePress
        run: pnpm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 3. 配置仓库设置

1. 进入GitHub仓库Settings
2. 选择Pages选项卡
3. Source选择"GitHub Actions"

### 4. 自定义域名（可选）

在`docs/.vitepress/config.ts`中添加：

```typescript
export default defineConfig({
  // ...其他配置
  base: '/your-repo-name/',
  // 或者使用自定义域名
  // base: '/',
  // lastUpdated: true,
})
```

在`public`目录下创建`CNAME`文件：

```
your-domain.com
```

## 优化技巧

### 1. 性能优化

- 使用`vite-plugin-pwa`添加PWA支持
- 配置`vite compression`压缩资源
- 使用`vite-imagetools`优化图片

```bash
npm install -D vite-plugin-pwa
```

### 2. SEO优化

```typescript
// 在config.ts中添加
export default defineConfig({
  head: [
    ['meta', { name: 'description', content: '网站描述' }],
    ['meta', { property: 'og:title', content: '网站标题' }],
    ['meta', { property: 'og:description', content: '网站描述' }]
  ]
})
```

### 3. 分析工具集成

```typescript
export default defineConfig({
  head: [
    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_TRACKING_ID');
    `]
  ]
})
```

## 常见问题

### Q: 如何自定义主题？

A: 可以在`.vitepress/theme`目录下创建自定义主题：

```typescript
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: MyLayout
}
```

### Q: 如何添加评论功能？

A: 可以使用Giscus或Valine：

```html
<!-- 在页面底部添加 -->
<div id="comment"></div>
<script>
  // 初始化评论系统
</script>
```

### Q: 如何实现全文搜索？

A: 使用Algolia DocSearch：

```typescript
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: 'APP_ID',
        apiKey: 'API_KEY',
        indexName: 'INDEX_NAME'
      }
    }
  }
})
```

## 总结

VitePress是一个功能强大且易于使用的静态网站生成器。通过本指南，你应该已经能够：

1. 搭建基础的VitePress博客
2. 配置导航栏和侧边栏
3. 编写和格式化文章
4. 部署到GitHub Pages
5. 优化SEO和性能

继续探索VitePress的更多功能，打造属于你的专属博客！

## 参考资源

- [VitePress官方文档](https://vitepress.vuejs.org/)
- [Vue.js官方指南](https://cn.vuejs.org/)
- [Vite配置指南](https://vitejs.cn/)
