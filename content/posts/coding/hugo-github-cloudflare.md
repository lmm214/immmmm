---
title: "Hugo by Github with Cloudflare Pages"
date: 2022-01-25T10:07:28+0800
tags: [折腾]
---

![cf-hugo-10](https://lmm.elizen.me/images/2022/01/cf-hugo-10.png)

全程 Web 端操作，无需本地安装 Hugo 、配置 Git 、联通 Github 等操作。

整体思路：Github 放有主题的 Hugo 程序、

### Github 导入仓库

点击 <https://github.com/new/import>

![cf-hugo-1](https://lmm.elizen.me/images/2022/01/cf-hugo-1.png)

```html
https://github.com/lmm214/cloudflare-hugo-theme-stack
```

填入已配置好主题 ( hugo-theme-stack ) 的仓库，再取个仓库名。设置公开或私人都可以。

{{< figure "https://lmm.elizen.me/images/2022/01/cf-hugo-2.png" "https://lmm.elizen.me/images/2022/01/cf-hugo-3.png" "Github 导入完成">}}

### Cloudflare Pages 创建项目

![cf-hugo-4](https://lmm.elizen.me/images/2022/01/cf-hugo-4.png)

Cloudflare Dash <https://dash.cloudflare.com/> 导航栏 `Pages` ，点 `创建项目`，授权 Github 项目。

{{< figure "https://lmm.elizen.me/images/2022/01/cf-hugo-5.png" "https://lmm.elizen.me/images/2022/01/cf-hugo-6.png" "修改项目名称">}}

项目名称可以自定义

![cf-hugo-7](https://lmm.elizen.me/images/2022/01/cf-hugo-7.png)

![cf-hugo-8](https://lmm.elizen.me/images/2022/01/cf-hugo-8.png)

HUGO_VERSION 0.92.0

![cf-hugo-9](https://lmm.elizen.me/images/2022/01/cf-hugo-9.png)

