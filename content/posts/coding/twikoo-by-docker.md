---
title: "宝塔 Docker 部署 Twikoo 评论系统"
date: 2022-08-10T17:12:47+0800
tags: [折腾]
---

数据导出部分推荐阅读：[《Twikoo腾讯云函数部署转移到私有部署》](https://blog.zhheo.com/p/99d020fe.html)。此文记录下私有部署步骤顺序，相关配图也可参考上文。

### 一、新建网站

顺利改为：先开 SSL 再加反代。因为加了反代后开不了 SSL，之后的证书续期也同样操作，先关反代再续。具体略，参考上文。

### 二、拉取镜像

（宝塔的软件商店 “Docker 管理器” 装一下，方便后续可视化管理。）

![twk-1](https://r2.immmmm.com/2022/08/twk-1.jpg)

进入网站目录，点击终端丢入下句命令，以此，**在这个目录里拉起镜像** 。好处是相关的评论数据都会在此路径下的 `data` 文件夹里，如果拉起多个 docker ，那就搞定了数据隔离。

<!--more-->

```
docker run -e TWIKOO_THROTTLE=1000 -p 8765:8080 -v ${PWD}/data:/app/data -d imaegoo/twikoo
```

其中 `TWIKOO_THROTTLE=1000` 是把 IP 请求限流增加到 1000，`8765` 是自定义了端口，这两点不改也OK。

访问绑定的子域名，见以下信息则部署成功：

```
{"code":100,"message":"Twikoo 云函数运行正常，请参考 https://twikoo.js.org/quick-start.html#%E5%89%8D%E7%AB%AF%E9%83%A8%E7%BD%B2 完成前端的配置","version":"1.6.5"}
```

### 三、版本更新

1.Docker 管理器，直接删除容器

![twk-2](https://r2.immmmm.com/2022/08/twk-2.jpg)

2.终端拉取最新镜像

```
docker pull imaegoo/twikoo
```

3.进入网站目录拉起新版本

```
docker run -e TWIKOO_THROTTLE=1000 -p 8765:8080 -v ${PWD}/data:/app/data -d imaegoo/twikoo
```

最后，前端的 cdn 链接版本也可更新一下。