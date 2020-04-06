---
title: "Hugo 添加相册页面"
date: 2020-04-06T20:42:02+0800
tags: [折腾]
---

效果见： <https://immmmm.com/photos/>

总有那么一瞬间特别特别想发一张照片，但不是以文章形式发布。

实现思路是程序自动遍历指定文件夹内的图片，并展示在一个页面上。有了思路，剩下的就是看文档、看文档、看文档，此功能利用 Hugo 的 [readDir function](https://gohugo.io/templates/files/) 函数达成。

日常更新把图片丢到 `static/photos` 中即可（搭配 Github Action 自动化部署更香）：

```
static
└── photos
    ├── 落樱缤纷.jpeg
    ├── 想象中的自由.jpeg
    └── 儿时登过顶的狮子山.jpeg
```

<!--more-->

### 主题集成

如需集成到自己的主题，一般如下操作，但不保证最终结果：

1.`static/photos` 丢几张命名好的图片先；

2.`content/photos.md` 创建一个md，好让 Hugo 生成页面；内容如下：
```html
---
title: "我的相册"
layout: "photos"
---
```

3.`layouts/_default/photos.html`
```html
{{ define "main" }}
<div class="post">
  <h2 class="post-title">{{.Title}}</h2>
</div>

<div class="page-photos">
  {{ range (readDir "./static/photos") }}
  <figure>
    <img src="https://cdn.jsdelivr.net/gh/lmm214/immmmm@gh-pages/photos/{{ .Name }}" alt="{{ .Name }}" />
    <figcaption>{{ .Name | replaceRE "(.*)[.].*" "$1"}}</figcaption>
  </figure>
  {{ end }}
</div>
{{ end }}
```

图片撸了 jsdelivr CDN 的羊毛，需自行更改，或者指定图片的 src 为本地：

```html
<img src="{{"photos/" | absURL }}{{ .Name }}" alt="{{ .Name }}" />
```

4.样式参考：
```css
.page-photos figure{max-width:80%;margin:0 auto 3rem;}
.page-photos figure img{box-shadow: 0 12px 40px rgba(0,0,0,.15);border-radius: 8px;}
```

### 不了了之

原依据 [os.FileInfo](https://golang.org/pkg/os/#FileInfo) 还加了 `{{ .Modtime }}` 时间显示，本地测试都可以，但同步到线上之后所有图片都一个时间，了之。