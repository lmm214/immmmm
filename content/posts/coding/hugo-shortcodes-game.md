---
title: "Hugo 游戏卡片短代码"
date: 2023-02-01T09:51:09+0800
tags: [折腾]
---



效果如上 ⬆️

轮子来自于 @JoeZhao 同学的 [《在 hugo 中插入游戏信息卡片》](https://fun2ex.com/posts/game-info-show-api/) ，👍

<!--more-->

### Hugo 主题集成

把 [game.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/shortcodes/game.html) 另存为 html 之后丢入主题 `/layouts/shortcodes/` 内。

文章内如下插入即可（需去掉反斜杠，链接末尾无斜杠）：

```
\{\{< game "https://www.yystv.cn/g/36">\}\}
```

相关 css 见这里 [theme-20230123.css](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/static/theme-20230123.css) ，搜索 `post-preview`。

### 说明

Hugo  `getJSON` 函数获取远程 API 数据可能失败，导致整个站点构建失败，所以可以在 `config.toml` 加一句：

```
ignoreErrors = ["error-remote-getjson"]
```