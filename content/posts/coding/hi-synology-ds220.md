---
title: "Hi,Synology DS220+"
date: 2021-09-14T21:04:39+0800
tags: [折腾]
---

![ds220-0](https://pic.edui.fun/images/2021/09/ds220-0.png)

说真，激动着一顿操作之后，看到如上“桌面”，茫然 10000 秒！

点哪个，套件？装什么套件？控制？要什么设置？File？让我看个文件，然后呢？DSM说明？嗯，懂了一点点……

可接下来，我先干啥呢？来，一个一个来。

<!--more-->

### 硬盘设置

先插硬盘，采用 Basic 模式。

- 盘1：闲置的三星SSD EVO（120G）。各种套件、Docker、虚拟机都在这跑。
- 盘2: 新买的酷狼（2T）。放图、文、影音等数据。

经测试，无论传大文件或虚拟机启动系统，SSD 完胜机械。

### 控制面板

#### 共享文件夹

![ds220-1](https://pic.edui.fun/images/2021/09/ds220-1.jpeg)

套件 File Station 里只能创建子文件夹，根目录下的文件夹来这儿创建。主要做了2个盘的数据分离，充分利用盘1的SSD性能。

#### 文件服务

启用了 SMB 、AFP 服务。

#### 用户与群组

给当家的创建个ID，这样多用户之间数据独立，各套件数据在 `homes/用户名/` 内，如照片则在 `homes/用户名/Photos` 内。

#### 外部访问

QuickConnect 当然是已启用，但也仅用来 **Connect** ，传输数据不如单车回家。

**而 DDNS 是美丽新世界！**

前提：电信光猫改桥接模式，路由器拨号，并配置端口转发。（电信一个电话搞定！自己折腾获取管理员进后台等等等，一直到凌晨2点，白搭！）开启方法参 [《群晖NAS配置自带DDNS动态域名解析》](https://www.ioiox.com/archives/2.html) ，实现二级域名外网访问 `https://自定义.synology.me:5001/` 

同时，建议到 `控制面板--系统--登录门户--应用程序` 配置快速访问，默认 https 端口如下：

> Audio 8801 || Download 8001 || File 7001 || Note 9351 || Drive 10003 || Photos 5443 || Video 9008 || VMM 14641

这里，记得，**路由器里添加对应的端口转发**！！！

#### 网络

![ds220-3](https://pic.edui.fun/images/2021/09/ds220-3.jpeg)

看 `网络界面`，随机附送的2网线，插上！`新增--创建Bond`，开启双网口的链路聚合！

![ds220-4](https://pic.edui.fun/images/2021/09/ds220-4.jpeg)

>实际体验中，我通过局域网中的2台PC，利用smb同时拷贝群晖中的电影，每一台PC都实现有线网络的满速同时下载群晖中的电影，网速叠加到210-226MB/s，链路聚合确实令网速翻了一倍！---- By [liuspy](https://zhiyou.smzdm.com/member/3990065324/)

看来，多用户多终端，还是有必要开启的。

### 多端访问

内网一切好说，直接局域网群晖IP即可，建议固定。

外网DDNS之后，除了浏览器，还可以以 WebDAV 添加文件夹映射。群晖先安装套件 `WebDAV Server` ，以如下链接添加 `https://自定义.synology.me:5006/` ，详参：[《我如何用WebDAV访问Synology NAS上的文件》](https://kb.synology.cn/zh-cn/DSM/tutorial/How_to_access_files_on_Synology_NAS_with_WebDAV)

移动端APP，已安装：

- 群晖管家：看个状态配置
- DS file：主力文件管理，照片用此同步可指定目录
- DS audio：远程音乐播放器
- Drive：文档中心
- nPlayer/Infuse：影音播放器

### 照片备份

套件：Synology Photos

APP：DS file、Photos Mobile

手机用 DS file 备份到 `homes/用户名/Photos`，第一次7000多张照片和视频，建议 **备份同时「释放空间」**。 

平时，用 Photos Mobile 查看。如照片没显示全，则进入 `Synology Photos --设置--个人--索引--重建索引`。

### 音乐播放

Audio Station 添加 QQ 歌词插件

先下载 [netease_trans_v1.0.aum](https://github.com/LudySu/Synology-LrcPlugin/releases/) ，再打开 Audio Station ，右上角设置--歌词插--新增--选择文件--勾选保存。

### 视频播放

自带的 Video Station 套件可以理解为浏览器端的视频播放器，个人更喜欢客户端形式，比如：nPlayer、Infuse，外网依然丝滑！

### 社群套件

![ds220-11](https://r2.immmmm.com/2022/07/ds220-11.jpg)

套件中心--右上角设置--套件来源--新增，套件中心左侧多了个 「社群」。

```
http://packages.synocommunity.com/
https://spk7.imnks.com/
```
