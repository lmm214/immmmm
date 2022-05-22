---
title: "Hugo 显示指定文件夹内图片"
date: 2020-04-10T20:38:16+0800
tags: [折腾]
path: 2004gd
---

效果见文章底部，这些图片非手动一张张插入，文章头部一句 `path: 2004gd` 搞定！

直接看代码：

```
{{ if .Params.path }}
    {{$Path := .Params.path}}
    {{- range (readDir (printf "%s%s" "./static/images/" $Path )) -}}<img loading='lazy' src="{{(printf "/images/%s/%s" $Path .Name ) | absURL}}" />{{- end -}}
{{ end }}
```

当文章中写了 `path: 2004gd` 表示 Hugo 遍历根目录 `/static/images/2004gd` 内的图片并显示。

<!--more-->

这功能其实之前 Bitcron 的主题里就有，太符合老年人的需求了，一句话，一堆图片，一篇文章搞定！

当然，如果使用 Github 托管，随手羊毛撸起，`lmm214/immmmm@gh-pages` 需自行更改：

```
{{ if .Params.path }}
    {{$Path := .Params.path}}
    {{- range (readDir (printf "%s%s" "./static/images/" $Path )) -}}<img loading='lazy' src="{{(printf "https://fastly.jsdelivr.net/gh/lmm214/immmmm@gh-pages/images/%s/%s" $Path .Name ) | absURL}}" />{{- end -}}
{{ end }}
```

注：代码仅实现功能，灯箱效果什么的需要自行适配主题。