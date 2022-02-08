---
title: "Hi,Bitwarden"
date: 2021-02-20T22:39:08+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2021/02/bw-9.png
---

LastPass 一直用着挺舒坦，除了一直提醒要更新，但现在要更改成免费策略，只能单客户端。终于给了自己折腾雪藏已久的 Bitwarden 一个理由！

可以直接注册个账号用，也可自己部署到服务器。选择后者，一搜索真有手把手教程，实在写得太到位，也避免丢失，转载保存！感谢！

以下内容转载自： <https://liubing.me/bt-docker-build-bitwarden.html>

<!--more-->

Bitwarden是一个跨平台的密码管理软件，类似于 1Password、EnPass、LastPass 等。Bitwarden 是免费开源的，可以将服务端部署在自己的服务器上，比如群晖，并且支持 Docker 部署。但官方的镜像要求至少 2G 以上内存，要求比较高。有人用 Rust 实现了 Bitwarden 服务器，项目叫 bitwarden_rs，并且提供了 Docker 镜像，这个实现更进一步降低了对机器配置的要求，并且 Docker 镜像体积很小，部署非常方便。

### 宝塔安装Docker

如果已经安装，可以忽略该步骤，如果没有安装，进入到宝塔面板的软件商店，搜索docker安装即可。

![bw-1](https://pic.edui.fun/images/2021/02/bw-1.png)

### 获取镜像

打开docker管理器，点击获取镜像，输入Bitwarden_rs的官方镜像 `bitwardenrs/server` 后点击获取镜像。

![bw-2](https://pic.edui.fun/images/2021/02/bw-2.png)

### 创建容器

1.点击创建容器按钮
2.填写端口映射中的容器端口：80,服务端口：6666(6666可以自定义)
3.填写目录映射中的服务器目录：/www/wwwroot/bitwarden.liubing.me(该目录可以自定义，我习惯用网址作为目录)，容器目录：/data
4.填写内存配额，根据自己服务器的配置按需填写
5.提交创建容器
6.点击容器名称，修改容器名称为Bitwarden以方便辨认

>**端口映射和目录映射填写完成后一定要点击+号进行添加**
>**端口映射和目录映射填写完成后一定要点击+号进行添加**
>**端口映射和目录映射填写完成后一定要点击+号进行添加**

![bw-3](https://pic.edui.fun/images/2021/02/bw-3.png)

![bw-4](https://pic.edui.fun/images/2021/02/bw-4.png)

### 添加站点

一般可以添加一个二级域名，按自己需要起名字即可，由于我用的cloudflare的服务，所以以这个为演示，阿里云、百度云等其他厂商添加二级域名都是差不多的。

添加一个A记录，名字为bitwarden，指向的IP为你服务器VPS的IP地址，最后的访问地址就是bitwarden.liubing.me了。

![bw-5](https://pic.edui.fun/images/2021/02/bw-5.png)

域名准备好后，在宝塔里面添加一个站点，FTP、数据库均不用创建，PHP版本选择纯静态。

![bw-6](https://pic.edui.fun/images/2021/02/bw-6.png)

网站添加完成后设置SSL，自己准备证书，或者用免费的，我用的一直是cloudflare颁发的证书。设置完毕后开启强制Https

![bw-7](https://pic.edui.fun/images/2021/02/bw-7.png)

最后添加一个反向代理，名称随意填，目标URL为http://127.0.0.1:6666，端口号和上面创建容器时服务端口保持一直。

![bw-8](https://pic.edui.fun/images/2021/02/bw-8.png)

### 完成自建

上述步骤都做完后别忘了在宝塔面板安全-防火墙中放行端口6666。最后不出意外的话访问https://bitwarden.liubing.me就能看到界面了。首次完成安装页面是英文的，自己可以创建一个账号登录进去，在设置-选项-语言中设置语言。

![bw-9](https://pic.edui.fun/images/2021/02/bw-9.png)

![bw-10](https://pic.edui.fun/images/2021/02/bw-10.png)

### 关闭注册
一般自建的服务都是自己用的，所以如果想关闭注册的话可以按照下面的方法做：

1.在docker管理器中点击刚才创建的容器的状态绿色图标，停止容器运行，然后删除容器（删除容器后不会删除数据）

![bw-11](https://pic.edui.fun/images/2021/02/bw-11.png)

2.在VPS中运行下面的命令重新运行容器，其中Bitwarden为容器的名字，SIGNUPS_ALLOWED=false代表禁止注册，/www/wwwroot/bitwarden.liubing.me为上面创建容器时所写的服务器目录,/data为容器目录，6666:80代表上面创建容器时的服务端口:容器端口

```
docker run -d --name Bitwarden \
  -e SIGNUPS_ALLOWED=false \
  -v /www/wwwroot/bitwarden.liubing.me/:/data/ \
  -p 6666:80 \
  bitwardenrs/server:latest
```

运行完成后在容器列表里就又能看到了。然后再去试下创建账号就会出现一个不能创建账号的错误提示。

![bw-12](https://pic.edui.fun/images/2021/02/bw-12.png)

### 其他配置
参考项目的wiki即可：<https://github.com/dani-garcia/bitwarden_rs/wiki>

### 插件及App下载
可以到bitwarden官网自行下载：<https://bitwarden.com/#download>

### 连接自建的服务

以CHrome的插件为例子，如果之前有安装及登录过，可以在设置中退出登录。点击左上角的设置图标，填写自建服务器的URL保存后登录即可。

![bw-13](https://pic.edui.fun/images/2021/02/bw-13.png) ![bw-14](https://pic.edui.fun/images/2021/02/bw-14.png)

### 结语
最后就可以愉快的在浏览器和手机上愉快的使用了，顺便说句：我的密码存储我做主，再也不用害怕密码忘记的事了，也可以记录些银行卡等隐私信息，随时复制。