---
title: "Hugo 添加相册页面"
date: 2023-01-16T20:42:02+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/01/hugo-photos-1.png
---

旧文更新，效果见： <https://immmmm.com/photos/>

总有那么一瞬间特别特别想发一张照片，但不是以文章形式发布。

实现思路是程序自动遍历指定文件夹内的图片，并展示在一个页面上。有了思路，剩下的就是看文档、看文档、看文档，此功能利用 Hugo 的 [readDir function](https://gohugo.io/templates/files/) 函数达成。

<!--more-->

日常更新把图片（需按格式：日期+空格+图片名）丢到 `static/photos` 中即可（搭配 Github Action 自动化部署更香）：

```
static
└── photos
    ├── 2022-12-31 象山珠山顶.jpeg
    ├── 2022-10-10 笼里笼外.jpeg
    ├── 2022-07-01 东钱湖消暑.jpeg
    └── ……
``` 

### 主题集成

如需集成到自己的主题，一般如下操作，但不保证最终结果：

1.`static/photos` 丢几张命名好的图片（需按格式：日期+空格+图片名）先；

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
<div class="gallery-photos page">
  {{ range (sort (readDir "./static/photos") "Name" "desc")}}
    {{ if ( .Name | findRE "\\.(gif|jpg|jpeg|tiff|png|bmp|webp|avif|jxl)") }}
    <div class="gallery-photo">
      <img class="photo-img" loading='lazy' decoding="async" src="/photos/{{ .Name }}" alt="{{ .Name }}" />
      <span class="photo-title">{{ .Name | replaceRE "^[0-9 -]+(.*)[.].*" "$1"}}</span><span class="photo-time">{{ .Name | replaceRE "^([0-9-]+).*[.].*" "$1" }}</span>
    </div>
    {{ end }}
  {{ end }}
</div>

<style>
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
</style>
<script src="https://immmmm.com/waterfall.min.js"></script>
<script src="https://immmmm.com/imgStatus.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
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
});
</script>
<script src="https://immmmm.com/view-image.js"></script>
<script src="https://immmmm.com/lately.min.js"></script>
<script>
  window.Lately && Lately.init({ target: '.photo-time'});
  window.ViewImage && ViewImage.init('.gallery-photo img')
</script>
{{ end }}
```

### 搞定：不了了之

~~原依据 [os.FileInfo](https://golang.org/pkg/os/#FileInfo) 还加了 `{{ .Modtime }}` 时间显示，本地测试都可以，但同步到线上之后所有图片都一个时间，了之.~~

文件名前手动添加日期！

同时加了瀑布流排版和相对时间。


### 更新预告

短代码文章内插入指定文件夹内图片。

```
\{\{< gallery "images/2004gd">\}\}
```


{{< gallery "images/2004gd">}}