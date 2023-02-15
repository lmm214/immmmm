---
title: "群晖 Docker 使用记录"
date: 2023-01-03T19:44:04+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/01/ds-docker-2.png
---

{{< link hi-synology-ds220 >}}

自从21年9月败入群晖 DS220+，折腾尝试了不少套件和镜像，目前稳定在跑的只剩这5个，还有2个镜像被 [狂神SPK套件](https://spk7.imnks.com/) 一键安装所替代。（CloudDrive、AdGuardHome）。

<!--more-->

### frpc 内网穿透

为了拥有这基础服务，特意去TX云买了轻量服务器，无奈中注册了新域名还备了案。

### Talebook

![ds-docker-5](https://r2.immmmm.com/2023/01/ds-docker-5.jpg)

> 基于 Calibre 简单的个人图书管理系统，各方面都比 calibre-web 好用。

项目地址：<https://github.com/talebook/talebook>

因为 Talebook 镜像可以直接读取书籍数据库，所以日常通过本地 Calibre 连接 NAS 管理书籍。通过 frpc 穿透绑上域名，供好友自取。

刚利用其 opds 功能，在 iPhone 用 [KyBooks3](http://kybook-reader.com/) APP 顺利添加上，实现 APP 内检索下载阅读。

### qinglong

![ds-docker-3](https://r2.immmmm.com/2023/01/ds-docker-3.png)

> 攒豆豆，抵 NAS 电费。

脚本地址：<https://github.com/6dylan6/jdpro>

1.青龙部署。

2.修改青龙config.sh配置，差不多在17行（特别注意，没有修改此配置，任务拉不全，一键部署忽略此处）

```
RepoFileExtensions="js py"修改为 RepoFileExtensions="js py sh ts"
```

3.到订阅管理，添加订阅新建拉库任务，并执行，刷新浏览器即可看到添加的任务。

```
ql repo https://ghproxy.com/https://github.com/6dylan6/jdpro.git "jd_|jx_|jddj_" "backUp" "^jd[^_]|USER|JD|function|sendNotify"
```

4.添加CK环境变量，多CK不要写在一起，每个都新建JD_COOKIE变量；

### vaultwarden

Bitwarden 自部署镜像。云服务啊，主密码啊，一拖敞亮……

### Ghost

![ds-docker-6](https://r2.immmmm.com/2023/01/ds-docker-6.jpg)

> 又一个博客程序。

项目地址：<https://ghost.org/>

哈，纯晒图，记录日常逛吃逛吃，基本上是整理照片时，随手丢上去更新一下。回头翻翻，把美好瞬间记录也是件美好的事。

注意：停留在 5.8.3 版本，因为这是 sqlite3 的最高版本，再高需要另外部署 MySQL 8。

### 后续 Docker 镜像更新

【注册表】搜索镜像，确认点击下载；【容器】选择运行中的镜像，点关闭，再点操作“重置”；稍等一会儿，重启即可。

![ds-docker-4](https://r2.immmmm.com/2023/01/ds-docker-4.png)

注意：重置数据而不丢失的数据的前提是 **已把容器的存储映射到 NAS 指定文件夹中** ！！！

## 后记

昨晚码了一半，发现服务器流量异常，持续四小时满带宽。做了以下小白排查：

> 重启宝塔面板、重启服务器，依旧
> 
> 关闭网站镜像，依旧
> 
> 关闭 Nginx，流量断崖归零，Bingo！
> 
> 开启所有镜像网站服务，流量无异常
> 
> 开启 Nginx ，流量暴涨。
> 
> 想到原始办法，翻查站点 log ，Bingo！
> 
> 现学终端命令查看当前运行进程，看不出异常。
> 
> 原始办法，禁止 ssh 、修改面板和服务器密码，重启。
> 
> 问题依旧……关闭服务器，准备睡觉！
> 
> 开机，流量终于正常，估计是那位大佬也睡了吧……
>
> 苦，今早一看，日志继续秒增秒增，服务器关闭一天 ……
>
> 服务器系统重装中……

新年第一篇折腾中也充满了无奈，2023愿不好的都散去、散去、散去吧！