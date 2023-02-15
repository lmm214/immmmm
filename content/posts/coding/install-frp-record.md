---
title: "重装 FRP 记录"
date: 2023-01-05T14:25:32+0800
tags: [折腾]
---

被逼无奈，服务器系统重装，恢复服务比预想的简单。

因为主站采用 [Github + Cloudflare Pages](https://immmmm.com/hi-cloudflare/) 不需要自己的服务器，只是博客里的评论、豆瓣引用、Memos 引用跑在服务器上，这些都 Docker 部署，一行命令拉起一行域名解析即可。

唯有 FRP 这货，是自己不知所以搞定的。现在对于 FRP ，只是稍微厘清了一些思路。所以，以下内容不保证没问题，有问题我也搞不定。

> 1. 公网服务器部署 `frps`
> 2. 本地服务部署 `frpc`
> 3. 本地内网穿透
> 4. 服务器域名解析

<!--more-->

硬件环境：群晖 220+、腾讯轻量云服务器、路由器拨号；

实现效果：群晖 docker 拉起内部服务后，服务器绑定一个子域名即可外网访问服务。

### 公网服务器部署 frps

项目地址：<https://github.com/stilleshan/frps>

安装命令：

```
wget https://github.ioiox.com/stilleshan/frps/raw/branch/master/frps_linux_install.sh && chmod +x frps_linux_install.sh && ./frps_linux_install.sh
```

根据提示输入命令:

```
vi /usr/local/frp/frps.ini
```

按 `i` 进入编辑模式 `frps.ini`，移动光标修改配置：

![frp-1](https://r2.immmmm.com/2023/01/frp-1.jpg)

如果是用宝塔和腾讯服务器的话，记得允许这些端口。其中 `vhost_https_port` 是 https 的穿透端口，`dashboard_port` 是面板访问端口；`token` 是之后客户端验证需要。

修改好之后按 `esc` 再输入 `:wq` 退出编辑模式并保存。最后输入命令，重启服务：

```
sudo systemctl restart frps
```

此时访问: http://服务器IP:7500 弹出要登陆，就OK啦！

备，卸载脚本：

```
wget https://github.ioiox.com/stilleshan/frps/raw/branch/master/frps_linux_uninstall.sh && chmod +x frps_linux_uninstall.sh && ./frps_linux_uninstall.sh
```

### 群晖本地部署 frpc

项目地址：<https://github.com/stilleshan/frpc>

官方教程1：[群晖 NAS docker 安装（支持 docker 的群晖机型首选）](https://www.ioiox.com/archives/26.html)

官方教程2：[群晖 NAS 一键脚本安装（不支持 docker 的群晖机型）](https://www.ioiox.com/archives/6.html)

个人采用的是第一种 Docker 安装。

![frp-2](https://r2.immmmm.com/2023/01/frp-2.jpg)

注册表搜索 `stilleshan/frpc` 下载完成之后，配置 `frpc.ini` 文件。

![frp-3](https://r2.immmmm.com/2023/01/frp-3.jpg)

配置参考：

![frp-4](https://r2.immmmm.com/2023/01/frp-4.jpg)

```
[common]
server_addr = frp.freefrp.net     # 服务器IP或者地址
server_port = 7000                # 服务器提供的端口号
token = freefrp.net               # 服务器提供的token

[web1_xxxxxx]                     # 为避免错误,一定需更改为比较特殊的名称,不能和服务器端其他配置重名.
type = https                      # https协议
local_ip = 192.168.1.5            # 填写群晖内网IP.
local_port = 443                 # 需路由器端口转发 HTTPS 
custom_domains = nas.ioiox.com    # 填写你的域名
```

启动镜像，勾选使用高权限执行容器；高级设置，添加文件指定到你  frpc.ini 所在的位置。勾选使用与Docker Host相同的网络。完成。

![frp-6](https://r2.immmmm.com/2023/01/frp-6.jpg)

### 群晖内网穿透

利用路由器的端口转发和群晖自带反代功能，方便多服务穿透，做以下设置：

![frp-7](https://r2.immmmm.com/2023/01/frp-7.jpg)

路由器直接转发所有 443 到群晖，然后群晖反代如下设置： 

![frp-5](https://r2.immmmm.com/2023/01/frp-5.jpg)

这样，本地 docker 20010 端口跑的 talebook 服务就顺利穿出去啦～

### 服务器域名解析

直接加了一个 `*` 泛解析，方便绑定子域名解析。

![frp-9](https://r2.immmmm.com/2023/01/frp-9.jpg)

若宝塔面板：新建网站，添加域名，申请 SSL 证书，修改配置文件。

![frp-8](https://r2.immmmm.com/2023/01/frp-8.jpg)

```
    #frp
    location / {
        resolver 8.8.8.8;
        proxy_ssl_server_name on;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host:$server_port;
        proxy_pass https://$host:8443; # 8443 是 frps.ini 里配置的 https 端口
    }
```

如服务出现样式显示问题，则把配置文件下面那段缓存代码删了。

最后，重载/重启 Nginx 服务，搞定！

### 致谢及推荐

IOIOX：<https://www.ioiox.com/>

《卸载腾讯云对服务器的监控》：<https://www.prkblog.cn/p/uninstall-tencent-cloud-monitor.html>