---
title: 目录结构说明
description: 详细了解 Awesome AI Pedia 当前的目录组织方式和路由生成规则
---

# 目录结构说明

本文档描述的是仓库当前真实结构，而不是早期的模板式博客目录。

## 项目根目录

```text
Awesome-AI-Pedia/
├── docs/                      # 站点壳、首页、维护文档和 VitePress 配置
├── claudeCode/                # 根目录主题内容
├── cursor/                    # 根目录主题内容
├── mcp/                       # 根目录主题内容
├── prompt/                    # 根目录主题内容
├── rules/                     # 根目录主题内容
├── skills/                    # 根目录主题内容
├── 其他一级主题目录...
├── .github/                   # GitHub Actions
├── package.json               # npm 脚本和依赖
├── README.md                  # 对外说明
└── CODEBASE.md                # 代码库总览
```

## 结构总览

这个项目采用“双层结构”：

- `docs/` 提供 VitePress 站点壳
- 项目根目录下的主题文件夹提供主要内容

也就是说，当前站点不是只渲染 `docs/` 内的内容，而是通过 `srcDir: '../'` 把项目根目录纳入内容源。

## docs/ 目录

`docs/` 目录主要承担站点框架职责：

```text
docs/
├── .vitepress/
│   ├── config.ts              # 站点主配置
│   ├── theme.ts               # 主题扩展
│   ├── components/            # 首页与主题组件
│   ├── styles/                # 自定义样式
│   └── utils/sidebar.ts       # 动态导航与侧边栏生成逻辑
├── guide/                     # 维护文档
├── blog/                      # 补充说明类页面
├── public/                    # 静态资源
└── index.md                   # 首页
```

### `docs/.vitepress/config.ts`

负责：

- 站点元数据（标题、描述、语言）
- 根目录内容接入（`srcDir: '../'`）
- 构建时排除目录
- `base`、搜索、编辑链接等站点行为
- 调用动态导航和侧边栏生成函数

### `docs/.vitepress/utils/sidebar.ts`

负责：

- 扫描项目根目录的内容文件夹
- 为每个内容文件夹生成侧边栏
- 生成顶部导航
- 为 `docs/blog` 和 `docs/guide` 提供固定入口

### `docs/index.md`

首页文件，实际内容由多个 Vue 组件拼装。

## 根目录内容目录

根目录下的大多数一级文件夹都是内容分区，例如：

```text
claudeCode/
cursor/
mcp/
prompt/
rules/
skills/
部署ai/
常用skills/
...
```

这些目录中的 Markdown 会被当作站点页面直接渲染。

### 路由规则

- 目录名和文件名会直接参与生成 URL
- 一级目录的 URL 前缀就是目录名本身
- `index.md` 会生成该目录的入口页
- 非 `index.md` 文件会变成正文页面
- 大小写、空格和中文会原样进入路径

### 顶部导航生成规则

- 一级内容目录如果在根目录下至少有一篇非 `index.md` Markdown，顶部导航就会自动生成一项
- 这项导航默认会链接到该目录按字母序排序后的第一篇文章
- 如果一级目录只有子目录、没有根级文章，侧边栏可以生成，但顶部导航不会出现

## 常见问题

### Q: 如何添加新分类？

A: 直接在项目根目录创建新文件夹，并放入至少一篇非 `index.md` Markdown。侧边栏通常不需要手工维护。

### Q: 为什么有些页面在 `/docs/...`，有些页面在 `/claudeCode/...`？

A: 因为仓库同时存在两类内容：

- `docs/` 下的是站点壳和维护说明
- 根目录主题文件夹下的是主知识内容

### Q: 新建分类后为什么顶部导航没有出现？

A: 因为顶部导航只会读取一级目录中“直接位于该目录下”的非 `index.md` Markdown 文件。仅有子目录时不会生成导航入口。

### Q: 为什么某些路径包含空格或大小写？

A: 当前路由策略会直接使用真实目录名和文件名，所以路径对大小写和命名风格敏感。

## 参考位置

- 仓库根目录：`CODEBASE.md`
- 站点主配置：`docs/.vitepress/config.ts`
- 导航生成逻辑：`docs/.vitepress/utils/sidebar.ts`
