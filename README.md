<div align="center">

# 🦞 Awesome AI Pedia

**一个以 Markdown 内容为核心、基于 VitePress 构建的 AI 知识库站点**

[🔥 在线访问](https://qdleader.github.io/Awesome-AI-Pedia/) | [🚀 快速开始](#-快速开始) | [📚 维护文档](https://qdleader.github.io/Awesome-AI-Pedia/docs/guide/getting-started/)

</div>

---

## ✨ 项目简介

**Awesome AI Pedia** 是一个面向开发者的 AI 知识库仓库，内容覆盖 Claude Code、Cursor、MCP、Prompt、Rules、Skills、部署与实战经验等多个主题。

当前仓库采用“内容目录在项目根、站点壳在 `docs/`”的组织方式：

- 根目录主题文件夹负责存放 Markdown 内容
- `docs/.vitepress/` 负责站点配置、主题和导航逻辑
- 导航栏与侧边栏会根据内容目录自动生成
- 构建产物输出到 `docs/.vitepress/dist`

---

## 🎯 核心特性

- **内容优先** - 仓库的主要资产是 Markdown 知识内容，而不是业务代码
- **动态导航** - 新增内容目录后，无需手工维护大部分侧边栏和导航配置
- **本地搜索** - 使用 VitePress 本地搜索，适合知识库检索
- **多平台部署** - 已提供 GitHub Pages、Vercel、Netlify 的部署配置

---

## 📂 仓库结构

```text
Awesome-AI-Pedia/
├── docs/                    # 站点壳、首页、维护文档和 VitePress 配置
├── claudeCode/              # Claude Code 主题内容
├── cursor/                  # Cursor 主题内容
├── mcp/                     # MCP 主题内容
├── prompt/                  # Prompt 主题内容
├── rules/                   # Rules 主题内容
├── skills/                  # Skills 主题内容
├── 部署ai/                  # 部署相关内容
├── 常用skills/              # 常用技能集合
├── 其他一级主题目录...      # 其余知识分区
├── .github/workflows/       # GitHub Pages 部署工作流
├── netlify.toml             # Netlify 配置
├── vercel.json              # Vercel 配置
└── start.sh                 # Unix-like 环境启动脚本
```

---

## 🚀 快速开始

### 方式一：直接使用 npm 命令

```bash
git clone https://github.com/qdleader/Awesome-AI-Pedia.git
cd Awesome-AI-Pedia
npm install
npm run dev
```

默认本地访问地址通常为：

```text
http://localhost:5173/Awesome-AI-Pedia/
```

如果 5173 端口被占用，请以终端实际输出为准。

### 方式二：使用启动脚本

适用于 macOS / Linux / WSL：

```bash
chmod +x start.sh
./start.sh
```

---

## 📝 内容维护

### 向现有分类添加文章

直接在现有主题目录中新增 `.md` 文件即可，例如：

```text
claudeCode/我的新文章.md
```

### 添加新的内容分类

在项目根目录创建新的内容文件夹，并放入至少一篇 Markdown：

```text
新分类/
├── index.md
└── 第一篇文章.md
```

说明：

- 侧边栏会自动识别新的内容目录
- 顶部导航只会为“根目录下存在非 `index.md` Markdown 文件”的分类生成入口
- 首页快捷卡片是手工维护的，如果你想把新分类放到首页，需要额外更新首页组件

---

## 📚 进一步阅读

- 维护入口文档：[`docs/guide/getting-started/index.md`](./docs/guide/getting-started/index.md)
- 目录结构说明：[`docs/guide/directory/index.md`](./docs/guide/directory/index.md)
- 部署说明：[`docs/guide/deployment/index.md`](./docs/guide/deployment/index.md)
- 代码库总览：[`CODEBASE.md`](./CODEBASE.md)

---

## 📞 联系方式

微信搜索“硬核Ai社”，回复“加群”，加入 AI 交流群。

---

<div align="center">

**如果这个项目对你有帮助，欢迎给一个 Star。**

Made with ❤️ by [qdleader](https://github.com/qdleader)

</div>
