---
title: "Hi，Ghost"
date: 2022-01-01T19:04:39+0800
tags: [折腾]
---

![ghost-1](https://r2.immmmm.com/2022/01/ghost-1.png)

群晖 Docker 里开了个 [Ghost](https://github.com/TryGhost/Ghost)，证书端口一顿猛操作发给 [Elizen](https://elizen.me/) 才发现处在内网YY许久的我。

<!--more-->

Reset……reset……reset…… 好吧，那就加端口访问吧。整个折腾发现中文教程几乎为零，搜索工具与优质内容一去不复返。唯一一篇[（这里）](https://quickapp.lovejade.cn/ghost-open-source-blog-platform/)推荐一看，基本说清了 Ghost 的特性。

### 喜欢 Ghost 几个点

- 内置的主题 [Ruby](https://ruby.ghost.io/) 颜值在线。
- 后台编辑器支持相册排版，对理科生友好。

### Docker 镜像几个设置

![ghost-2](https://r2.immmmm.com/2022/01/ghost-2.png) ![ghost-3](https://r2.immmmm.com/2022/01/ghost-3.png)

- 自定义文件内容路径 `/var/lib/ghost/content` ，方便群晖文件管理。
- 通过增加环境变量 `url` 修改首页网址，不然默认是 `localhost:2368`

### Ghost 后台几个设置

- `settings > labs` Delete all content，清空自带文章数据
- `settings > members` Subscription access 改为 Nobody，去除“广告块”
- `settings > general` Publication Language 填入 "zh-CN"，系统相对时间自动显示为中文，其他中文会优先匹配主题 `/locales/zh-CN.json`

### 与题无关

一早醒来，隔壁区又一确诊，真是心有戚戚焉……2022，望大家一切安好，守住身边美好！

### 更多折腾

#### 文章列表动态加载

https://infinite-scroll.com/options.html#history

`history: 'push'`

#### 新增归档页

参考：https://quickapp.lovejade.cn/how-to-add-archives-for-ghost-blog/

### 更多教程

http://www.jerrymei.cn/tag/ghost-theme/