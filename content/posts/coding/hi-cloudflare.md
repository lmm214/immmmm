---
title: "Hi , Cloudflare Pages"
date: 2022-01-24T00:38:32+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/01/cf-1.png
---

其实 Github Actions + Pages 真的好用，可惜被关小黑屋。只能曲线，拉到自己的服务器或第三方托管平台，比如昨晚折腾的 Cloudflare Pages ，目前感觉良好。

> Cloudflare Pages 的免费政策：每月 500 次提交、不限站点、请求、带宽，每个项目最多 10 个自定义域名、每个站点最多 20000 个文件、单个文件最大 25 MB，同一时间只能部署一个 Pages（实测大概是 2~3 分钟）

放几个博客、静态站点，绰绰有余！

<!--more-->

### 启用

启用也非常简便，[Cloudflare Dash](https://dash.cloudflare.com/) 导航栏 `Pages` ，点 `创建项目`，授权 Github 项目。

![cf-2](https://r2.immmmm.com/2022/01/cf-2.png)

部署方式 「二选一」 即可！

#### 部署设置一：

![cf-3](https://r2.immmmm.com/2022/01/cf-3.png)

`生产环境` 直接选为 `gh-pages` 分支，构建命令选 `none`。

同时去 Github 项目里去除 `.github/workflows/main.yml` 里推送到服务器的 webhook 钩子。

这样仍然保留 Github Action ，CF 只是拉取静态文件。

#### 部署设置二：

删掉 `gh-pages` 分支，删除 `.github/workflows/main.yml`， 让 CF 构建 Hugo ，这里需要加个环境变量，指定高版本 `HUGO_VERSION` 为 `0.92.0`

![cf-5](https://r2.immmmm.com/2022/01/cf-5.png)

![cf-4](https://r2.immmmm.com/2022/01/cf-4.png)

#### 部署一二差别

前者几乎不用动 Github 但 CF 会默认构建所有分支（gh-pages 和 marter），所以更新一次要等 3min x2 时间才构建完成。

![cf-6](https://r2.immmmm.com/2022/01/cf-6.png)

后者完全抛弃了 Github Actions + Pages ，算省下 1/500 的免费构建次数？主要是省下一个 3min 。


### 参考

迁移到Cloudflare Pages，再见Github Pages ： <https://aozaki.cc/migrating-from-github-pages-to-cloudflare-pages>

使用Cloudflare Pages部署静态网站 ： <https://wbuntu.com/deploy-static-site-with-cloudflare-pages/>