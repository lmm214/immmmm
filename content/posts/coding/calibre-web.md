---
title: 'Calibre Web 搭建笔记'
date: 2019-11-30
tags: [折腾]
published: true
hideInList: false
feature: https://pic.edui.fun/images/2019/11/calibre-web.jpg
isTop: false
---

![折腾效果](https://pic.edui.fun/images/2019/11/calibre-web.jpg)

### 调配记录

官方说明：<https://github.com/janeczku/calibre-web/wiki/Configuration>

1.修改用户名和密码，界面修改为中文

<!--more-->

![](https://pic.edui.fun/images/2019/11/calibre-web-1.png)

2.设置--UI配置--查看配置--主题：选择dark模式。

3.设置--基本配置--特性配置：勾选启用上传+启用匿名浏览。

4.基于宝塔面板，绑定域名+开启SSL，以下内容参考：<https://www.floraer.com/index.php/20191027/cid=14.html>

![](https://pic.edui.fun/images/2019/12/calibre-web-3.png)

新建一个网站，站点修改：申请SSL证书，设置反向代理，输入你的 `http://IP:8083`

### 安装记录

以下内容来源：<https://www.qinayu.cn/posts/8172de42.html>

安装Docker

```
yum install -y docker-latest
```

先创建文件夹 `calibre-web` 在其中创建 `app` 、`books` 、`kindlegen` 、`config`

```
mkdir calibre-web && calibre-web/app calibre-web/books calibre-web/kindlegen calibre-web/config
```

再创建容器

```
docker create --name=calibre-web --restart=always -v /usr/local/calibre-web/books:/books -v /usr/local/calibre-web/app:/calibre-web/app -v /usr/local/calibre-web/kindlegen:/calibre-web/kindlegen -v /usr/local/calibre-web/config:/calibre-web/config -e USE_CONFIG_DIR=true -e SET_CONTAINER_TIMEZONE=true -e CONTAINER_TIMEZONE=Asia/Shanghai -e PGID=0 -e PUID=0 -p 8083:8083 technosoft2000/calibre-web
```

启动容器

```
docker start calibre-web
```

其他扩展命令

```
docker stop calibre-web #停止
docker restart calibre-web #重启
docker logs -f calibre-web #启动日志
docker rm calibre-web #删除容器
```

日志中警告 No write access at /books - new ‘metadata.db’ and books can’t be stored at this directory,Please check and modify the permissions of the directory

这个问题会导致修改书本的一些信息无效，因为无法写入books文件夹中数据。解决办法：给calibre-web/books文件夹修改权限，使用以下命令修改:

```
chmod 777 /usr/local/calibre-web/books
```

安装完成后的配置，输入公网 IP + 端口号 会自动进入配置页面，第一项的 书库配置 填成 `/books` ，然后点击提交，登录即可。默认用户为 `admin` 密码为 `admin123`

在安装后，输入公网 `IP` + 端口号 会自动进入配置页面，第一项的 `书库配置` 下的 `Calibre 数据库位置` 填成 `/books` ，然后点击提交，登录即可。默认用户为 `admin `密码为 `admin123`