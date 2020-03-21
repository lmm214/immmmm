---
title: 'Hello Hugo'
date: 2020-03-21
tags: [折腾]
---

哈喽，🐯🐶！（开机声～）

![hugo-2](https://lmm.elizen.me/images/2020/03/hugo-2.png)

主站顺利切换到 [Hugo](https://gohugo.io/) ，直接在 Github Web 端码字，

![hugo-3](https://lmm.elizen.me/images/2020/03/hugo-3.png)

或者本地码好拖进去，自动更新，自动部署，舒心！

就待它的 Github APP 端支持编辑代码咯！

<!--more-->

### 迁移采坑记

文章摘要失效：原来文章 `more` 标签像中间有空格就无效 `<!--  more  -->` 批量替换成  `<!--more-->` 解决。

文章列表排序错乱：原来是文章信息的 `date` 格式不统一导致无法识别，统一修改为年月日 `date: 2020-03-21` 解决。

文章内 html 代码被替换为空：原来 Hugo 0.60 以上默认禁用了，手动在 `config.toml` 添加以下代码。

```
[markup]
[markup.goldmark]
[markup.goldmark.renderer]
  unsafe = true
```

### 感叹

不懂英文，太难了！ 😭










