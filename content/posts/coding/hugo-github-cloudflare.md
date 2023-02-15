---
title: "Hugo by Github with Cloudflare Pages"
date: 2022-01-25T10:07:28+0800
tags: [折腾]
---

![cf-hugo-10](https://r2.immmmm.com/2022/01/cf-hugo-10.png)

在线预览：<https://lmm.pages.dev>

部署全程 Web 端操作，无需本地安装 Hugo 、配置 Git 、连通 Github 等操作。浏览器OS，飞起！

<!--more-->

### Github 导入仓库

点击导入 <https://github.com/new/import>

![cf-hugo-1](https://r2.immmmm.com/2022/01/cf-hugo-1.png)

```html
https://github.com/lmm214/cloudflare-hugo-theme-stack
```

填入已配置好主题 ( [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack) ) 的仓库，再给自己的取个仓库名，设置公开、私人都可以。

{{< figure "https://r2.immmmm.com/2022/01/cf-hugo-2.png" "https://r2.immmmm.com/2022/01/cf-hugo-3.png" "仓库导入完成">}}

### Cloudflare Pages 创建项目

![cf-hugo-4](https://r2.immmmm.com/2022/01/cf-hugo-4.png)

Cloudflare Dash <https://dash.cloudflare.com/> 点导航栏 `Pages` ，点 `创建项目`，授权刚创建的 Github 仓库。

{{< figure "https://r2.immmmm.com/2022/01/cf-hugo-5.png" "https://r2.immmmm.com/2022/01/cf-hugo-6.png" "修改项目名称">}}

项目名称可以自定义，我改成了 `lmm` ，CF 会分配对应的二级域名供访问。生产分支默认  `main`  即可。

![cf-hugo-7](https://r2.immmmm.com/2022/01/cf-hugo-7.png)

框架预设选择  `Hugo` ，添加环境变量，指定高版本的 `HUGO_VERSION`  为  `0.92.0`  

![cf-hugo-8](https://r2.immmmm.com/2022/01/cf-hugo-8.png)

{{< figure "https://r2.immmmm.com/2022/01/cf-hugo-9.png" "Pages 创建完成">}}

撒花 🎉

### 然后，然后

了解主题配置 <https://docs.stack.jimmycai.com/zh/configuration/> ，修改站点信息。

日常发文在 `content/post` 文件夹下新增 md 文件即可。
