---
title: 'Hugo + Github Actions 实现自动化部署'
date: 2020-03-19
tags: [折腾]
---
不折腾点东西总觉得浑浑噩噩，折腾点东西搞得脑袋晕晕乎乎！

### 折腾需求

为更新 <https://edui.fun/> 导航站能随手些，造了 [Gridea Theme WebStack](https://immmmm.com/gridea-theme-webstack/) 。每次得源文件切换加载，但只为加几行代码，等等等；

折腾一天，已实现直接在 GitHub  `master` 添加代码，`Github Actions ` 自动构建 `Hugo` 静态文件到 `gh-pages` 分支，外加同步 webhook 到自己的服务器。

再也不用 git 来 git 去！

<!--more-->

### 上传 Hugo 源文件

（注：如已把 Hugo 程序 push 到 GitHub 上，直接跳过看下一步。）

点击下载：<https://github.com/lmm214/edui/archive/master.zip>

GitHub 上新建一个 repo，并只需保留以下文件上传到 `master` ，同时随手建个 `gh-pages` 分支：

```
├── archetypes
│   └── default.md
├── config.toml  //Hugo 程序配置文件
├── content
│   ├── about.md
├── data
│   └── links.toml //导航数据，一个文件搞定
└── themes
    └── webstack  //Hugo 主题
        ├── layouts
        │   └── home.html  //主页
        └── theme.toml  //主题配置文件
```

### 添加 Github Actions 代码：

实现效果，直接网页上修改 `data/links.toml` 或任意文件，触发 Actions 自动化运行 Hugo 程序生成静态文件并推送到 `gh-pages` 分支上，等待几十秒可看到更新 <https://lmm214.github.io/edui/> 

具体操作：

![tokens-1](https://pic.edui.fun/images/2020/03/tokens-1.png) 

![tokens-2](https://pic.edui.fun/images/2020/03/tokens-2.png)

- 点 <https://github.com/settings/tokens> 新建一个，勾选 `repo` 和 `workflow` ,暂存；

![secrets](https://pic.edui.fun/images/2020/03/secrets.jpeg)

- 进项目 `settings/secrets` 新建标题为 `personal_token` ，内容是刚创建的 `tokens` ;

- 回项目，点 `Actions -- New wordflow -- Set up a workflow yourself` ，添加如下代码：

```
name: Deploy Hugo # 任君喜欢

on:
  push:
    branches:
      - master   # master 更新触发

jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v1

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: latest

      - name: Build 
        run: hugo

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          personal_token: ${{ secrets.personal_token }} # personal_token 这里新建一个 https://github.com/settings/tokens
          PUBLISH_BRANCH: gh-pages  # 推送到当前 gh-pages 分支
          PUBLISH_DIR: ./public  # hugo 生成到 public 作为跟目录
          commit_message: ${{ github.event.head_commit.message }}
```

👌 等，3、2、1，看看 `Actions` 顺利不，再看看 `gh-pages` 静态文件更新了不，最终打开 Pages ，祝贺！

日志？主题？统统 GitHub 网页端搞定！当然，调试主题什么的还是建议本地进行。

### 同步到服务器

完整源文件 [【这里】](https://github.com/lmm214/edui/blob/master/.github/workflows/main.yml) ，还有一段代码，实现同步推送到自己的服务器。

```
      - name: Webhook
        uses: distributhor/workflow-webhook@v1
        env:
          webhook_url: ${{ secrets.WEBHOOK_URL }}
          webhook_secret: ${{ secrets.WEBHOOK_SECRET }}
```

`WEBHOOK_URL` 和 `WEBHOOK_SECRET` 是进项目 `settings/secrets` 新建添加，构建成宝塔面板的 webhook 链接（进面板-软件商店-装“webhook”），如：

`WEBHOOK_URL` 设为：`http://1.1.1.1/hook?access_key=密钥`;

`WEBHOOK_SECRET` 设为 `&param=immmmm.com`;这样合并成：

```
http://1.1.1.1/hook?access_key=密钥&param=immmmm.com
```

ip 和域名需需改，同时宝塔后台的 webhooks 添加同步代码，需修改本地路径、github 项目路径，代码如下：

```
#!/bin/bash
echo ""
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "Start"

#修改本地路径、github 项目路径
gitPath="/www/wwwroot/immmmm.com"
gitHttp="https://github.com/lmm214/immmmm.git"

echo "Web站点路径：$gitPath"
if [ -d "$gitPath" ]; then
        cd $gitPath
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                git clone -b gh-pages $gitHttp gittemp
                mv gittemp/.git .
                rm -rf gittemp
        fi
        git reset --hard gh-pages
        git pull
        chown -R www:www $gitPath
        echo "End"
        exit
else
        echo "该项目路径不存在"
        echo "End"
        exit
fi
```


### 后话一点点 🤏

听闻 Hugo 大名也有好几个月，一直没尝试，之后也沉浸在 Gridea 中，不得不夸夸 Gridea 客户端体检真是优雅！

但一直有一点点遗憾，更新只能启动客户端，点击【同步】。

而 Hugo 生成静态文件摔 Hexo 几光年，部署安装无依赖，试用门槛较低。看着官方文档，程序、主题自定义也比较强悍。

搜遍全网教程，要不就是太详细，一长串代码加注释，供大于求，要不略过。幸好，也算折腾成功！ ✌️

### 感谢

- 官方 Hugo Templates： <https://gohugo.io/templates/>
- 中文系列教程翻译： <https://www.rectcircle.cn/series/hugo/>
- Hugo 中文帮助文档：<https://hugo.aiaide.com/>
