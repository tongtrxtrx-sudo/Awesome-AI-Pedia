# Codebase Overview

## 概述

Awesome AI Pedia 是一个以 Markdown 内容为主、以 VitePress 作为站点外壳的知识库仓库。

这个仓库的重点不是复杂业务逻辑，而是：

- 管理多个 AI 主题内容目录
- 将根目录内容动态接入站点
- 使用统一的 VitePress 配置生成静态站点
- 通过 GitHub Pages、Vercel、Netlify 等平台发布

当前仓库更接近“内容仓 + 轻量站点壳”的组合，而不是典型前端应用。

## 目录结构

### 站点外壳

- `docs/index.md`
  - 首页入口
- `docs/.vitepress/config.ts`
  - VitePress 主配置
- `docs/.vitepress/theme.ts`
  - 主题扩展和全局组件注册
- `docs/.vitepress/utils/sidebar.ts`
  - 根目录内容扫描、导航生成、侧边栏生成
- `docs/.vitepress/components/`
  - 首页装饰组件、导航卡片、文章元信息等
- `docs/guide/`
  - 维护文档
- `docs/blog/`
  - 补充说明类页面

### 内容分区

项目根目录下的大多数一级目录都是内容目录，例如：

- `claudeCode/`
- `cursor/`
- `mcp/`
- `prompt/`
- `rules/`
- `skills/`
- `部署ai/`
- `常用skills/`
- 以及其他专题目录

这些目录中的 `.md` 文件会被 VitePress 直接视为页面。

### 部署与工程文件

- `.github/workflows/blank.yml`
  - GitHub Pages 自动部署
- `netlify.toml`
  - Netlify 配置
- `vercel.json`
  - Vercel 配置
- `package.json`
  - npm 脚本和依赖
- `start.sh`
  - Unix-like 环境快速启动脚本

## 主执行流程

### 本地开发

执行：

```bash
npm run dev
```

流程如下：

1. VitePress 从 `docs/` 目录读取配置
2. `config.ts` 通过 `srcDir: '../'` 把项目根目录纳入内容源
3. `config.ts` 调用 `generateNav(projectRoot)` 和 `generateAllSidebars(projectRoot)`
4. `sidebar.ts` 扫描根目录内容文件夹并生成导航结构
5. 主题层加载首页组件和文档增强逻辑

### 构建

执行：

```bash
npm run build
```

构建产物输出到：

```text
docs/.vitepress/dist
```

## 路由与导航规则

### 内容来源

当前主内容不局限于 `docs/`，而是来自整个项目根目录。

### 侧边栏规则

- 扫描根目录一级内容文件夹
- 递归收集该目录中的 Markdown 文件和子目录
- 忽略 `index.md` 作为正文项，但允许其作为目录入口页存在

### 顶部导航规则

- 首页永远固定存在
- 只有当一级内容目录下存在至少一篇根级非 `index.md` Markdown 时，才会生成导航入口
- 导航默认跳到该目录按字母序排序后的第一篇文章
- 如果导航项过多，超出的项目会被放入“更多”

### 固定分区

`docs/blog` 和 `docs/guide` 不是通过根目录动态发现，而是在 `sidebar.ts` 中单独配置。

## 关键文件说明

### `docs/.vitepress/config.ts`

这是全站最重要的配置文件，负责：

- 设置站点标题、描述、语言
- 指定 `srcDir`
- 配置 `base`
- 挂接动态导航与侧边栏
- 设置搜索、编辑链接、目录、页脚等

### `docs/.vitepress/utils/sidebar.ts`

这是仓库内容发现逻辑的核心：

- `getProjectRoot()`
  - 定位项目根目录
- `generateAllSidebars()`
  - 为根目录内容生成完整侧边栏配置
- `generateNav()`
  - 生成顶部导航
- `generateDynamicSidebarItems()`
  - 递归收集目录内容

### `docs/.vitepress/theme.ts`

负责：

- 扩展默认主题
- 注册首页组件
- 插入文档页脚元信息
- 在路由切换后自动展开第一个侧边栏折叠项

### `docs/.vitepress/components/NavigationCards.vue`

首页快捷卡片组件。它是手工维护的，不会自动跟随内容目录变化，因此新增重点分类时需要同步维护。

## 内容维护方式

### 向现有分类加内容

直接在现有目录中新增 `.md` 文件即可。

### 增加新分类

在项目根目录创建新的一级目录，并放入至少一篇根级非 `index.md` Markdown。这样：

- 侧边栏通常会自动生成
- 顶部导航也能自动出现入口

如果只有子目录没有根级文章，顶部导航不会生成。

### 首页展示位

首页卡片和装饰组件不是自动生成的。如果希望新分类出现在首页，需要额外更新对应组件。

## 构建与部署

### GitHub Pages

当前默认发布方式。工作流监听 `master` 分支，并将 `docs/.vitepress/dist` 推送到 `gh-pages`。

### Vercel / Netlify

仓库已内置配置文件，但仍要注意它们的输出目录都应该指向：

```text
docs/.vitepress/dist
```

### Base 路径

当前配置固定为：

```ts
base: '/Awesome-AI-Pedia/'
```

这意味着：

- GitHub Pages 场景是匹配的
- 如果换成根域名或改仓库名，必须同步调整该配置

## 验证方式

仓库当前没有测试框架，也没有 lint 脚本。默认验证方式是：

```bash
npm run build
```

如果构建通过，通常说明：

- 内容文件至少没有阻塞 VitePress 构建
- 动态导航和侧边栏逻辑没有明显运行时错误

但这并不等于所有页面内容都正确，尤其不能覆盖：

- 手工维护链接是否失效
- 首页卡片是否指向正确路径
- 内容命名是否导致难看的 URL

## 风险与维护注意事项

### 1. 路径直接依赖真实目录名

当前实现不会做拼音化、别名映射或路径清洗。目录名和文件名会直接影响 URL。

影响：

- 大小写变化会影响链接
- 空格会进入 URL
- 重命名目录会导致历史链接失效

### 2. 首页卡片是手工维护的

首页卡片不会自动跟随内容目录变化，是最容易出现“内容已经存在但首页仍然指错地址”的地方。

### 3. 文档容易与实现漂移

仓库经历过从旧内容组织方案迁移到当前动态扫描方案的过程，因此维护文档需要持续与真实配置对齐。

### 4. 没有自动化回归测试

当前主要依赖构建成功作为验证信号。对链接正确性、导航展示正确性和内容可达性，需要额外人工抽查。

## 建议的维护顺序

当你修改仓库结构时，建议按这个顺序检查：

1. 调整内容目录或页面
2. 检查 `docs/.vitepress/utils/sidebar.ts` 是否仍符合预期
3. 检查首页卡片是否需要同步更新
4. 执行 `npm run build`
5. 本地启动 `npm run dev` 抽查关键页面

## 术语说明

- **站点外壳**
  - 指 `docs/` 和 `.vitepress` 内的配置、首页和主题组件
- **内容分区**
  - 指项目根目录下承载 Markdown 内容的一级文件夹
- **动态导航**
  - 指运行时基于目录扫描生成的顶部导航和侧边栏
- **base**
  - 指 VitePress 站点部署前缀，当前是 `/Awesome-AI-Pedia/`
