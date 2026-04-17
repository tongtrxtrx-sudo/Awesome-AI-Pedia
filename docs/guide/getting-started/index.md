---
title: 快速开始
description: 了解如何快速上手 Awesome AI Pedia，并按照当前仓库结构维护内容
---

# 快速开始指南

本指南面向仓库维护者，内容基于当前真实实现，而不是早期的博客模板结构。

## 系统要求

在开始之前，请确保你的系统已安装以下软件：

- Node.js >= 18
- npm >= 8
- Git

## 本地运行

### 1. 克隆仓库

```bash
git clone https://github.com/qdleader/Awesome-AI-Pedia.git
cd Awesome-AI-Pedia
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 访问网站

默认本地地址通常为：

```text
http://localhost:5173/Awesome-AI-Pedia/
```

如果端口被占用，请以终端实际输出为准。

## 添加新文章

### 1. 向现有分类添加内容

当前仓库的主要内容不放在 `docs/blog/`，而是直接放在项目根目录的主题文件夹中，例如：

```text
claudeCode/我的新文章.md
prompt/开发类提示词/新的提示词.md
```

### 2. 编写 Markdown

Markdown 文章可以包含 Front Matter，但不是所有字段都强制要求。推荐保留最基本的标题和描述信息：

```markdown
---
title: 文章标题
description: 文章描述
---

# 文章内容

在这里编写你的文章内容...
```

### 3. 新建内容分类

如果你要新增一个一级分类，请在项目根目录创建新文件夹，并至少放入一篇非 `index.md` 文章：

```text
新分类/
├── index.md
└── 第一篇文章.md
```

说明：

- 侧边栏会自动扫描新的一级分类
- 顶部导航只会为“根目录下存在非 `index.md` Markdown 文件”的分类生成入口
- 首页快捷卡片不是自动生成的，如需在首页展示，需要额外更新组件

## 当前目录结构

```text
Awesome-AI-Pedia/
├── docs/
│   ├── .vitepress/                # VitePress 配置、主题和组件
│   ├── guide/                     # 维护文档
│   ├── blog/                      # 补充说明类页面
│   └── index.md                   # 首页
├── claudeCode/                    # 内容分区
├── cursor/                        # 内容分区
├── mcp/                           # 内容分区
├── prompt/                        # 内容分区
├── rules/                         # 内容分区
├── skills/                        # 内容分区
├── 其他一级主题目录...
├── .github/workflows/             # GitHub Pages 部署工作流
├── package.json                   # npm 脚本和依赖
└── CODEBASE.md                    # 代码库说明
```

## 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建静态站点
npm run build

# 预览构建产物
npm run serve
```

## 下一步

- 阅读[目录结构说明](../directory/)
- 阅读[部署指南](../deployment/)
- 阅读仓库根目录的 `CODEBASE.md`

## 获取帮助

如果你遇到问题，可以：

1. 先运行 `npm run build` 检查是否能正常构建
2. 检查 `docs/.vitepress/config.ts` 和 `docs/.vitepress/utils/sidebar.ts`
3. 提交 Issue：
   `https://github.com/qdleader/Awesome-AI-Pedia/issues`
