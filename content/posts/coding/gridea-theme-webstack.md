---
title: 'Gridea Theme WebStack'
date: 2020-01-11
tags: [折腾]
published: true
hideInList: false
feature: https://pic.edui.fun/images/logos/webstack-1.png
isTop: false
---
@Jackie 同学留言推荐了一个网站导航项目 [WebStackPage](https://github.com/WebStackPage/WebStackPage.github.io) ，样式不错，尝试了纯静态，不得不佩服原作者，这一大段一大段的循环代码静态手工 html ，服！之后尝试了 Laravel、Docker，失败……

哎，一个“链接页面”折腾成这样，自己造一个得叻！

<!--more-->

效果预览：<https://edui.fun/>

![webstack-1](https://pic.edui.fun/images/logos/webstack-1.png)

仓库下载：<https://github.com/lmm214/gridea-theme-webstack>

### 主题目录

```
├── assets
│   ├── media
│   │   ├── css
│   │   │   ├── fonts
│   │   │   │   ├── icomoon.eot
│   │   │   │   ├── icomoon.svg
│   │   │   │   ├── icomoon.ttf
│   │   │   │   └── icomoon.woff
│   │   │   ├── icomoon.css
│   │   │   └── main.css
│   │   ├── images
│   │   │   ├── favicon.png
│   │   │   └── logo-collapsed@2x.png
│   │   └── js
│   │       ├── bootstrap.min.js
│   │       ├── jquery-1.11.1.min.js
│   │       ├── lozad.js
│   │       ├── xenon-custom.js
│   │       └── xenon-toggles.js
│   └── styles
│       └── main.less //空文件
├── config.json
└── templates
    ├── archives.ejs //空文件
    ├── index.ejs
    ├── post.ejs //空文件
    ├── tag.ejs //空文件
    └── tags.ejs //空文件
```

### 使用说明

- 如果已有 Gridea 博客，务必新建一个文件夹作为 **站点源文件夹**，然后把主题丢进去；
- 默认添加了4个分类，修改名称或增删类别，需手工改动 `config.json` 和 `index.ejs`；
- 分类图标名见 `icomoon.css`;
- 如果一定要集成到现在的主题中，那把 `assets/media` 放到自己主题中，把 `config.json` 与现主题合并代码，把 `index.ejs` 重命名；
- ……（耗时2小时，手工去除了N多css、js……）

### 更多教程

<https://wherelse.cc/post/Setup-your-own-navigation-website-by-Gridea+Github-Pages/>

### 欢迎打赏

<figure>
    <img src="https://pic.edui.fun/wx.jpg" alt="微信打赏" />
    <figcaption>微信打赏</figcaption>
</figure>







