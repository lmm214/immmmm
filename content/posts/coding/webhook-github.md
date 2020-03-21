---
title: '曲线救“静”'
date: 2019-11-24
tags: [折腾]
published: true
hideInList: false
feature: 
isTop: false
---

Coding 快但抽，GitHub 慢但稳。本想着静态能安安静静的码字、更新、查阅。其实忍忍也就接受了，毕竟也没多人在意。 自己这关不过去，折腾了主题，寻求了博友，求助了 @罗伊 ，开好了 vps 放静态！ 

流程：本地 Gridea 同步至 Github，Github 通过 webhook 告诉主机有更新，主机利用 git 拉取最新版仓库。

<!--more-->

说来简单，折腾 vps 还是第一遭。所幸有现成代码、现成教程，几乎就是 one by one，搞定！以下仅为记录留存：

### 装宝塔面板

开终端，连主机：
```
ssh root@x.x.x.x
```
centos 系统装宝塔面板：
```
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh
```

等待几分钟，得到：

```
Bt-Panel: http://...
username: xxx
password: xxx
```

### 域名配置

域名配置，A记录到主机IP，宝塔-网站，安装nginx，一键https部署。

### 宝塔调配 webhook

进面板-软件商店-装“webhook”，编辑 shell 命令：

`gitHttp="https://github.com/lmm214/blog.git"` 需自行修改

```
#!/bin/bash
echo ""
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "Start"
#判断宝塔WebHook参数是否存在
if [ ! -n "$1" ];
then
          echo "param参数错误"
          echo "End"
          exit
fi
#git项目路径
gitPath="/www/wwwroot/$1"
#git 网址
gitHttp="https://github.com/lmm214/blog.git"

echo "Web站点路径：$gitPath"

#判断项目路径是否存在
if [ -d "$gitPath" ]; then
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                git clone $gitHttp gittemp
                mv gittemp/.git .
                rm -rf gittemp
        fi
        #拉取最新的项目文件
        git reset --hard origin/master
        git pull
        #设置目录权限
        chown -R www:www $gitPath
        echo "End"
        exit
else
        echo "该项目路径不存在"
        echo "End"
        exit
fi
```

### GitHub 存钩子

宝塔webhook查密钥记录下，GitHub 仓库 settings 钩子：

`密钥` 和 `i.immmmm.com` 需自行修改

```
http://x.x.x.x:8888/hook?access_key=密钥&param=i.immmmm.com
```

参考文章：[宝塔面板中通过GitHub同步博客仓库并通过webhook勾子拉取更新](https://1078503.org/2019/11/4/)