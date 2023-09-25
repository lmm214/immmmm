---
title: "New Mac 101 🎉"
date: 2023-07-14T22:13:52+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/07/mac-101-1.png
---

终于把用了十多年的 iMac（2012）替下，几年前外置 SSD 装系统续命到现在，几个月前开始用 IINA 播放 1080p 快进竟然要卡顿 3 秒，4K 直接 PPT 。

剁手方案： Mac mini M2 16+256 + Studio Display

<!--more-->

总计 ¥15848（¥5049 + ¥10799），实力不足分期败之。之前也考虑过 iMac 24 M1 16+256 （¥11099），但看着 `M1、24寸` 再看看 `M2、27寸`，看着沦为“爱优腾”的老 iMac，再看看 Mac mini 的可拔插，嘿，真香！

以下内容仅为个人备份记录，可略过。

### 个人调配

三指拖移：

![mac-101-2](https://r2.immmmm.com/2023/07/mac-101-2.png)

触控板：轻点来点按

桌面与程序坞：屏幕角

Finder：显示 -- 显示路径栏、状态栏

### 网络设置

`export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890`

### Homebrew

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

提示 `The Xcode Command Line Tools will be installed.` 等了约 5 分钟后，按回车继续。

根据提示输入下面两条命令(小心翼翼一行行输入的)：

```
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/lmm214/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### brew 一波流

Git： `brew install git`

Hugo 博客程序： `brew install hugo`

ffmpeg ：`brew install ffmpeg`

LxgwWenKai 字体：

`brew tap homebrew/cask-fonts && brew install font-lxgw-wenkai`

### App 若干

{{< apps >}}

### 待补税

Adob全家桶：<https://www.yuque.com/yihulaojiu-gsfg9/zz2qv5/vixkf6>

### 秘籍

允许任何来源及修复：

`sudo spctl --master-disable`

`sudo xattr -r -d com.apple.quarantine /Applications/Sublime\ Text.app`

![mac-101-3](https://r2.immmmm.com/2023/07/mac-101-3.png)