---
title: "懒到现在才安上肥羊 allinone"
date: 2025-03-08T16:27:31+0800
tags: [日常]
feature: https://r2.immmmm.com/2025/03/iptv-fixed.png.webp
---

IPTV 直播源年前已废，包括用了很久的 ip6 的源。

这不，偶尔想起，饭点来个背景音，缺无法播放，一点小难受。

开干，怎么干其实也知道个大概。

<!--more-->

以下内容，流水记录。

### 群晖，终端 SSH 进后台拉取 Docker

```
ssh myid@192.168.0.1 -p 22
sudo -i
```

群晖里的注册表已废，加上一通测试可用的镜像代理 `image.cloudlayer.icu/` 

拉下肥羊 allinone 镜像 `youshandefeiyang/allinone:latest`

```
docker pull image.cloudlayer.icu/youshandefeiyang/allinone:latest
```

访问 <https://imgtool.v1.mk/allinone.html>

生成密钥，按照提示把这个密钥丢给电报机器人获取 `userid` `token` ，填回网页，获取部署命令，如：

记得把生成的部署命令里的 `youshandefeiyang/allinone` 前加上镜像代理地址。

```
docker run -d --restart=always --net=host --privileged=true --name allinone image.cloudlayer.icu/youshandefeiyang/allinone -tv=true -aesKey=123123 -userid=123123 -token=123123123
```

### 路由器添加端口 35455 转发，放行

略

### Apple TV 添加直播源

个人使用的是 「IPTV」 这个 APP

```
# IPTV聚合
http://IP:35455/tv.m3u
# 虎牙一起看
http://IP:35455/huyayqk.m3u
# BiliBili 生活
http://IP:35455/bililive.m3u
# 斗鱼一起看
http://IP:35455/douyuyqk.m3u
# YY轮播
http://IP:35455/yylunbo.m3u
```
