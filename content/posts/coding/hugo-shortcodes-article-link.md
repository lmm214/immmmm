---
title: "Hugo 文章内链优化显示"
date: 2020-04-05T22:30:27+0800
tags: [折腾]
---

好久好久之前（2年前），写过这功能：[《Bitcron 文章内链自动优化显示》](https://immmmm.com/bitcron-auto-article-refer/)，如下效果：

{{<link "bitcron-auto-article-refer">}}

本文利用 Hugo 的 [Shortcodes](https://gohugo.io/extras/shortcodes/) 功能和 [.GetPage](https://gohugo.io/functions/getpage/) 函数来实现。

<!--more-->

### 功能代码

创建 `/layouts/shortcodes/link.html`：
```html
{{$URL := .Get 0}}
{{ with .Site.GetPage $URL }}
<div class="post-preview">
  <div class="post-preview--meta" style="width:100%;">
    <div class="post-preview--middle">
      <h4 class="post-preview--title">
        <a target="_blank" href="{{ .Permalink }}">{{ .Title }}</a>
      </h4>
      <time class="post-preview--date">{{ .Date.Format ( default "2006-01-02") }}</time>
      {{ if .Params.tags }}
      <small>{{ range .Params.tags }}#{{ . }}&nbsp;{{ end }}</small>
      {{ end }}
      <section style="max-height:105px;overflow:hidden;" class="post-preview--excerpt">
        {{ .Summary | plainify}}
      </section>
    </div>
  </div>
</div>
{{ end }}
```

### 样式代码

样式 CSS 代码需自行调配，个人是复用豆瓣条目的：

{{<link "post-show-douban-item">}}

### 食用方式

```html
\{\{<link "bitcron-auto-article-refer">\}\}
```

文章内去掉反斜杠 `\` 插入即可。

其中 `link` 匹配短代码模板 `link.html` ，之后填的 `bitcron-auto-article-refer` 是文章 md 的文件名。