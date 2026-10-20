# DYJ 个人作品集 · GitHub Pages 发布包

React + Vite。包含网站源代码、已压缩音视频及展示用 PDF；不包含原始作品文件夹、本地缓存、依赖和服务器凭据。

## 发布

1. 创建公开仓库，名称必须是 `你的GitHub用户名.github.io`。如果该仓库已经存在，先检查已有内容，勿覆盖。
2. 用 GitHub Desktop 或 Git 将本文件夹内容推送至仓库 main 分支。不要将 ZIP 文件本身上传。注意 .github 隐藏目录也必须上传。
3. 仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions。
4. Actions → Deploy portfolio to GitHub Pages → Run workflow。完成后在 Pages 查看网址。

这个发布包使用根路径资源，只适用于 `用户名.github.io` 根站点，不能直接用于带仓库名子路径的项目站点。

免费账户采用公开仓库，源码和作品文件可被他人下载。当前媒体最大文件约 27 MB，建议使用 Git/GitHub Desktop 推送，不要用网页逐个上传。

## 本地运行

安装 Node.js 22 和 pnpm 10，然后运行 `pnpm install --ignore-scripts`、`pnpm dev`。
构建运行 `pnpm build`，结果在 dist。

## 后续更新

继续在原项目修改，再同步 src、public 和构建配置到本仓库，提交 main 后自动发布。发布不会修改阿里云服务器或 dongyejia.cn。
