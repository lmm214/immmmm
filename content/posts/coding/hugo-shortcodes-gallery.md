---
title: "Hugo 相册短代码"
date: 2023-01-17T11:38:16+0800
tags: [折腾]
---

{{< gallery "images/2004gd">}}

效果如上 ⬆️

{{< gallery "images/2004gd">}}

调用代码如下（需去掉反斜杠）：

```
\{\{< gallery "images/2004gd">\}\}
```

<!--more-->

表示 Hugo 会调取根目录 `/static/images/2004gd` 内的图片并显示。

### 主题集成

在主题目录内新建 `layouts/shortcodes/gallery.html` 内代码如下：

```
{{ $baseURL := .Site.BaseURL }}
{{- with (.Get 0) -}}
{{- $files := readDir (print "/static/" .) }}
<div class="gallery-photos">
  {{- range (sort $files "Name" "asc") -}}
    {{- if ( .Name | findRE "\\.(gif|jpg|jpeg|tiff|png|bmp|webp|avif|jxl)") }}
    {{- $linkURL := print $baseURL "/" ($.Get 0) "/" .Name | absURL }}
    <div class="gallery-photo">
      <img class="photo-img" loading='lazy' decoding="async" src="{{  $linkURL  }}" alt="{{ .Name }}" />
      <span class="photo-title">{{ .Name | replaceRE "\\..*" ""}}</span>
    </div>
    {{- end }}
  {{- end }}
</div>
{{- end }}
```

当然，以上代码只是实现了调取图片，瀑布流排版啊、灯箱效果啊还得前端加上！

css 参考：

```
.gallery-photos{width:100%;}
.gallery-photo{width:24.9%;position: relative;visibility: hidden;overflow: hidden;}
.gallery-photo.visible{visibility: visible;animation: fadeIn 2s;}
.gallery-photo img{display: block;width:100%;border-radius:0;padding:4px;animation: fadeIn 1s;cursor: pointer;transition: all .4s ease-in-out;}
.gallery-photo span.photo-title,.gallery-photo span.photo-time{background: rgba(0, 0, 0, 0.3);padding:0px 8px;font-size:0.9rem;color: #fff;display:none;animation: fadeIn 1s;}
.gallery-photo span.photo-title{position:absolute;bottom:4px;left:4px;}
.gallery-photo span.photo-time{position:absolute;top:4px;left:4px;font-size:0.8rem;}
.gallery-photo:hover span.photo-title{display:block;}
.gallery-photo:hover img{transform: scale(1.1);}
@media screen and (max-width: 1280px) {
	.gallery-photo{width:33.3%;}
}
@media screen and (max-width: 860px) {
	.gallery-photo{width:49.9%;}
}
@media (max-width: 683px){
	.photo-time{display: none;}
}
@keyframes fadeIn{
	0% {opacity: 0;}
   100% {opacity: 1;}
}
```

js 参考：

```
<script type="text/javascript" src="/waterfall.min.js"></script>
<script type="text/javascript" src="/imgStatus.min.js"></script>
<script type="text/javascript" src="/view-image.js"></script>
<script>
//相册瀑布流
imgStatus.watch('.photo-img', function(imgs) {
  if(imgs.isDone()){
    waterfall('.gallery-photos');
    let pagePhoto = document.querySelectorAll('.gallery-photo');
    for(var i=0;i < pagePhoto.length;i++){pagePhoto[i].className += " visible"};
  }
});
window.addEventListener('resize', function () {
  waterfall('.gallery-photos');
});
//图片灯箱
window.ViewImage && ViewImage.init('.page-photo img')
</script>
```

### 说明

O 啦，与单页相册相比，去除了对文件名命名的要求。默认是按照文件名排序。