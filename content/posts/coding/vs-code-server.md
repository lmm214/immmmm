---
title: "云 VSCode 云编码"
date: 2020-04-19T18:57:10+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2020/04/code-server.png
---


[code-server](https://github.com/cdr/code-server) 云 VSCode 云编码，安装踩坑无数，Docker 一条部署：

```
docker run --name vscodeserver --user root -it -d -p 0.0.0.0:8080:8080 -e PASSWORD='youMiMa' -v "$PWD:/home/coder/project" codercom/code-server:latest
```

此刻 http://ip:8080 输入密码 `youMiMa` ，等等等失败，挂上特殊通道，等等等，成功。

<!--more-->

### 开启 https

以下步骤基于宝塔面板。添加网站，纯静态，开启 ssl Let's Encrypt，添加反响理代：

目标URL： `http://localhost:8080` 发送域名： `$host`

照理这样也就OK了，但就算挂特殊通道还是报错，看教程，在配置文件中加入 `location` 这段代码：

```
……
root /www/wwwroot/e.immmmm.com;
……
location /path/ {
  proxy_pass http://localhost:8080/;
  proxy_redirect http:// https://;
  proxy_set_header Host $host:443/path;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection upgrade;
  proxy_set_header Accept-Encoding gzip;
}
……
```

访问 <https://e.immmmm.com/path/>  ，搞定！

### 疑惑

不懂不懂，不加 `/path/` 为啥不行呢？

### 后续

{{< figure src="https://pic.edui.fun/images/2020/04/code-server-coding.png" caption="Coding Cloud Studio" >}}

原来 Coding 的也已经是 vscode ，每天免费4小时，除了 clone github 仓库好慢好慢，其它省心省心！

🤔️