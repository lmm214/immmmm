---
title: "迁移 FRP 记录"
date: 2024-11-10T11:07:08+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/11/SCR-20241110-kfqf.png.webp
---

（旧文重更：2024/11/10）

服务器到期在即，迁移 FRP 小记，为了把家里的 书库 [talebook](https://hub.docker.com/r/talebook/talebook) 能无障碍在线使用。

群晖拉起 `frpc`，服务器部署 `frps`，路由器端口转发，给个子域名解析，即可实现域名访问服务。

<!--more-->

### 公网服务器部署 frps

项目地址：<https://github.com/stilleshan/frps>

启动 Docker：

```
docker run -d --name=frps --restart=always \
    --network host \
    -v /root/frps/frps.toml:/frp/frps.toml  \
    stilleshan/frps
```

注意，`/root/frps/frps.toml` 可以自行修改这个路径，先创建和修改好配置。

![frp-1](https://r2.immmmm.com/2023/01/frp-1.jpg)

如果是用宝塔和腾讯服务器的话，记得允许这些端口。其中 `vhost_https_port` 是 https 的穿透端口，`dashboard_port` 是面板访问端口；`token` 是之后客户端验证需要。

此时访问: http://服务器IP:7500 弹出要登陆，就OK啦！

### 群晖本地部署 frpc

2024/11/10 注明：群晖注册表正常已无法加载，通过本地 ssh 终端连接，手动 `docker pull xxxxx/xxxx` 拉去镜像搞定。

项目地址：<https://github.com/stilleshan/frpc>

官方教程1：[群晖 NAS docker 安装（支持 docker 的群晖机型首选）](https://www.ioiox.com/archives/26.html)

官方教程2：[群晖 NAS 一键脚本安装（不支持 docker 的群晖机型）](https://www.ioiox.com/archives/6.html)

个人采用的是第一种 Docker 安装。

![frp-2](https://r2.immmmm.com/2023/01/frp-2.jpg)

注册表搜索 `stilleshan/frpc` 下载完成之后，配置 `frpc.ini` 文件。

![frp-3](https://r2.immmmm.com/2023/01/frp-3.jpg)

配置参考（0.61）：

![frp-4](https://r2.immmmm.com/2023/01/frp-4.jpg)

```
serverAddr = "111.xxxxxxx"  # 服务器IP或者地址
serverPort = 7000           # 服务器提供的端口号
auth.method = "token"
auth.token = "usertoken"    # 服务器设定的token

[[proxies]]
name = "nas"                # 唯一标识，不能和服务器端其他配置重名
type = "https"              # https协议
localIP = "192.168.1.1"     # 群晖内网IP.
localPort = 443             # 需路由器端口转发 HTTPS 
customDomains = ["nas.xxx.com"]   # 填写你的域名
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