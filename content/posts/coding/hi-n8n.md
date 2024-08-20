---
title: "我应该是最后一个才知道有 n8n 这个东西的人吧"
date: 2024-08-01T15:09:55+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/08/SCR-20240801-mgzr.png.webp
---

借用 [@heo](https://blog.zhheo.com/) 某篇文章的句式，表达一下对 [n8n](https://n8n.io/) 的惊叹之感！不搜不知道，一搜吓一跳。

[小众软件](https://www.appinn.com/n8n-io/)19年10月、少数派 [@珪璋](https://sspai.com/prime/story/automation-n8n) 去年5月、[@OSEN](https://ai-news.bullet.site/ai-reader-n8n-build/)今年1月、[@lcomplete](https://tech.codelc.com/docs/tools/n8n.html) 今年4月，以及我最最后才从 @汐笺 知道的 [n8n 中文教程](https://n8n.akashio.com/welcome)。

<!--more-->

简单来说，n8n 可以看成 ifttt 的“超替”版，强大的工作流程自动化软件，免费开源支持 Docker 部署，可视化编辑，自定义 Code 等，入手门槛较快，拖来拖去一个自动化应用能做好。

如头图就实现了我 **心心念念** 大半年的功能：自动化AI总结关注的公众号更新。

其实，做一个自动化应用，最大的困难来自于：**理清自己的需求**。

![](https://r2.immmmm.com/2024/08/SCR-20240801-mozz.png.webp)

### 入门推荐

n8n 中文教程：<https://n8n.akashio.com/welcome>

建议先看这两篇：[《学习低代码的正确思路》](https://n8n.akashio.com/article/the-way-to-learn-n8n)、[《学会单步调试与撰写测试用例》](https://n8n.akashio.com/article/test-case-for-n8n)，万分认同以下观点。

> 学习 n8n 的目的是为了让有需求但是没有编程能力的人快速实现自动化的效果，学习 n8n 本身其实说不上有多有趣，如果没有明确的诉求，有时间看这个教程，不如出门和朋友吃个饭。

#### 宝塔面板部署步骤

1.创建个网址，开启 ssl，放行端口 `5678` 并反代，创建数据文件夹并复制路径，如：`/www/wwwroot/n8n.edui.fun/n8n`

2.拉取 Docker 镜像有问题的话如下设置：

- 设置、配置文件修改 `https://docker.1panel.live`；
- 本地镜像、从仓库中拉取、输入镜像名 `n8nio/n8n:latest`；
- 容器、创建容器、命令创建

```
docker run \
 --name n8n \
 -d --restart always \
 -p 5678:5678 \
 -e GENERIC_TIMEZONE="Asia/Shanghai" \
 -e TZ="Asia/Shanghai" \
 -v /www/wwwroot/n8n.edui.fun/n8n:/home/node/.n8n \
 n8nio/n8n:latest
```

![](https://r2.immmmm.com/2024/08/SCR-20240802-kogq.jpeg)
![](https://r2.immmmm.com/2024/08/SCR-20240802-kpml.jpeg)
![](https://r2.immmmm.com/2024/08/SCR-20240802-krvg.jpeg)

### 折腾心得

#### 1. Filter 过滤节点

可视化编辑，三列清清楚楚：`INPUT` 输入、中间数据或逻辑处理、`OUTPUT` 输出。简单粗暴关键词匹配，过滤标题党、软文硬广，开心。

中间数据处理支持 `or` 或 `and` 过滤，而且支持正则匹配，舒服至极。

![](https://r2.immmmm.com/2024/08/SCR-20240801-mzgd.png.webp)

#### 2. Markdown 转换节点

支持 md 与 html 互相转化。`Options`还支持直接过滤 html 标签，但效果不佳。

![](https://r2.immmmm.com/2024/08/SCR-20240801-nbxf.jpeg.webp)

#### 3. Edit Fields 结构设置节点

没事，上 JavaScript 大法，正则 `replaceAll` 替换，`substring(0,6000)` 截取最大字符数。

而且可以修改输出的字段名称，而而且还能：供其它节点调用，就算不在一条线上，对，甚至没有线连接的其它节点调用这里的 out 数据。

```
{{ $json.data.replaceAll(/规则问AI/g,'').substring(0,6000) }}
```

![](https://r2.immmmm.com/2024/08/SCR-20240801-neaz.jpeg.webp)

#### 4. Compare Datasets 数据对比节点

AI日报最后上线的流程图加入了很多对比判断，只为节省些 Token，只让新文章过 AI 通道。

其实有关 RSS 还有个 RSS Trigger 内置节点，虽然用了它 feed 已更新就能自动触发流程，但实际并无需要为1个feed更新而跑整个流程，对，如果 feed 更新了 3 篇文章，那会跑 3次……幸福的负担。

![](https://r2.immmmm.com/2024/08/SCR-20240801-njot.png.webp)

#### 5. Read/Write Files from Disk 储存文件节点

`-v /www/wwwroot/n8n.edui.fun/n8nfile:/home/node/n8nfile \`

拉起 Docker 时，我们做了数据持久化，也就是把容器内的配置运行数据都映射到指定文件夹。

同样，如果要顺利使用这个储存节点也需要自己映射一下，不然文件都在容器内部。

![](https://r2.immmmm.com/2024/08/SCR-20240810-kebd.png.webp)

#### 6. 调试技巧，省钱秘籍：固定（Pin）数据

一般 http、AI 等获取数据的节点都有一定限制或成本，而为了调试一般都是不停的 test、test、test，所以可以跑一次后，把这样的节点上的“开关小按钮”点一下将节点 Deactive 关闭，同时在这个节点后面的数据如下 Pin 固定。

![](https://r2.immmmm.com/2024/08/SCR-20240807-taix.png.webp)


### 更多阅读

[使用自动化工作流聚合信息摄入和输出](https://reorx.com/blog/sharing-my-footprints-automation/)：将 Twitter, YouTube, GitHub, Douban 等服务的动态同步到 Telegram Channel，实现个人数字生活的信息聚合。