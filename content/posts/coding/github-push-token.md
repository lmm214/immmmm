---
title: "修复 Github Push 时的两个报错"
date: 2021-08-17T14:50:03+0800
tags: [折腾]
---

拖到再不解决就要弃博的状态，都有网络有关！

### Personal Access Token 错误 

大半年前每次 `push` 更新都会收到 GitHub 邮件，提示什么什么到期，但不影响提交。直到前几天跳出：

> remote: Password authentication is temporarily disabled as part of a brownout. Please use a personal access token instead.

搜索一圈教程都是说怎么获取 `token`，就没有然后了。终于按照此文（[这里](https://segmentfault.com/a/1190000040418898)）搞定，使用的其第三种方法。

<!--more-->

个人是直接在 vscode 内 `在集成终端内` 运行 `git config --edit`，然后将在远程仓库的位置上指定用户名与token。（多个项目需要分别设置。）

```javascript
[remote "origin"]
        url = https://githubusername:youtoken@github.com/yunzhiclub/repositoryname
        fetch = +refs/heads/*:refs/remotes/origin/*
```

**如果配置了 GitHub Action 记得也更改 Token** 

### SSL_connect 443 错误

> LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443

万分确定网络已全球通，但就是 push 不了，提示 SSL 错误！可，多提交几次，也总能成功。网上很多教程佛系有效，直到按照此文（[这里](https://www.jianshu.com/p/07e509844481)）把 https 代理改成 socks 代理:

`vim ~/.gitconfig`

```
[http]
	sslBackend = openssl
	proxy = socks5://127.0.0.1:1080
```

瞬间丝滑！

### 更 or 不更新

何曾几时，一切系统软件一有更新立即跟进。当下如今，只要能用，就好！