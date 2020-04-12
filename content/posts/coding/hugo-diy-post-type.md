---
title: "Hugo 自定义文章样式"
date: 2020-04-12T18:00:27+0800
tags: [折腾]
---

之前 WordPress 推出不同文章样式，如轻博客一样，发一句话、链接或视频有不同的显示效果。之后，用 Hexo、Bitcron 时都以文件夹形式进行文章分类，并以此为判断条件。

效果见：<https://immmmm.com/posts/chat/>

```
content
├── posts
│   ├── chat
│   ├── coding
│   ├── daily
│   ├── reading
```

如 `chat` 目录内的 md 文件是以一句话的模式（头像+时间）显示，怎么实现呢？利用 Hugo 的 [.File.Dir](https://gohugo.io/variables/files/) 和 [replaceRE](https://gohugo.io/functions/replacere/) 正则。

<!--more-->

### 核心代码如下：

```html
{{ $PostCate := .File.Dir | replaceRE "posts/(.*)/" "$1"}}
{{ if eq $PostCate "chat"}}
    <div class="post-meta">
        {{ if .Date }}
            <span class="post-date">{{ .Date.Format | default "2006-01-02" }}</span>
        {{ end }}
    </div>
    <div class="post-content">
        <a href="{{ .Permalink }}"><img loading="lazy" class="avatar" src=https://gravatar.loli.net/avatar/{{ md5 "自己的邮箱" }} ></a>
        {{ .Content }}
    </div>
{{ else }}
    ……正常文章样式
{{ end }}
```

一般修改 `_default/list.html` 和 `_default/single.html`，其中 list 是放在文章列表的 `{{rang ……}}` 循环之中。

```html
{{ range 什么什么 .Pages }}
    ……这里
{{ end }}
```

### 随意说明

`.File.Dir` 是获取当前文章的相对路径 `posts/coding/` ，`replaceRE "posts/(.*)/" "$1"` 是正则到 `coding` 子文件夹名，之后 `{{ if eq $PostCate "chat"}}` 就是判断咯 🤷‍♂️

