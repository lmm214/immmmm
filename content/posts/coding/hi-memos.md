---
title: "Hi，Memos"
date: 2022-09-05T23:14:52+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/09/memos.jpg
---

> An open source, self-hosted knowledge base that works with a SQLite db file.

官网：<https://usememos.com/>

可以说是支持 Docker 自部署的 flomo ，而且有 API 调取数据和发 Memos 。

<!--more-->

### 部署及更新代码

推荐使用 `docker-compose.yml` 部署，方便制定数据储存位置及更新版本，其中使用 `${PWD}` 指定路径为当前文件夹。

```
version: "3.0"
services:
  memos:
    image: neosmemo/memos:latest
    container_name: memos
    volumes:
      - ${PWD}/.memos/:/var/opt/memos
    ports:
      - 5230:5230
```

![memos-1](https://r2.immmmm.com/2022/10/memos-1.jpg)

宝塔为例：新建网站，新建 yml，开终端，丢代码。

```
docker-compose up -d
```

版本更新也是 **一行代码** 搞定：

```
docker-compose pull && docker-compose up -d --force-recreate
```

当然，也可以官方的一句拉起 Docker。之后更新需要先去 docker 管理器里删除镜像，再输入下句拉起服务。

```
docker run -d --name memos -p 5230:5230 -v ${PWD}/.memos/:/var/opt/memos neosmemo/memos:latest
```

注意不定时备份网址目录下的 `.memos` 文件夹，所有数据都在这。

### 折腾记录

#### 首页头部轮播

API 调用最新 10条 memos 在博客首页轮播显示。具体折腾看页面源码吧～

#### 浏览器扩展

<https://chrome.google.com/webstore/detail/memos-bber/cbhjebjfccgchgbmfbobjmebjjckgofe/>

{{<link "chrome-extensions-memos-bber">}}

#### 单页前端渲染

{{<link "bb-by-memos">}}

#### 多站点前端渲染

{{<link "bbs-by-memos">}}

### 使用心得

- #tag 后面必须有个空格才能创建tag

### 文章推荐：

- 使用 iOS 快捷指令录入笔记：<https://github.com/usememos/memos/discussions/52>
- 开源 Memos 在群晖上部署：<https://life97.top/synology-memos.html>