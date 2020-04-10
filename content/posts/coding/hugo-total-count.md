---
title: "Hugo 总文章数和总字数"
date: 2020-04-10T14:46:43+0800
tags: [折腾]
---

前者在某个大神主题中翻到，一句代码：

```
共 {{ len (where .Site.RegularPages "Section" "posts") }} 篇文章
```

总字数没有现成参数，官方手册看到 [.Scratch.Add](https://gohugo.io/functions/scratch/) 瞎折腾完成:

```
{{$scratch := newScratch}}
{{ range (where .Site.Pages "Kind" "page" )}}
    {{$scratch.Add "total" .WordCount}}
{{ end }}
```
新建了个参数累加所有文章的 `.WordCount` 字数，一般放 footer 头几行，下面是调用代码：

```
总计 {{$scratch.Get "total" }} 字
```