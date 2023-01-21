---
title: "图片瀑布流折腾记"
date: 2023-01-17T15:49:21+0800
tags: [折腾]
feature: 
---

前两篇实现的图片瀑布流利用的是 [「waterfall.js」](https://github.com/raphamorim/waterfall.js) （1KB 原生 JavaScript 搞定图片瀑布流）和 [「imgStatus」](https://github.com/raphamorim/imgStatus) （855bytes 原生 JavaScript 判断多图加载情况）。

不过，还是需要自己调校下，主要搞定：

- 支持图片 CDN 外链识别。
- 支持多 Gallery 显示。

<!--more-->

### CDN 外链识别

效果如下：

<gallery>![](https://cn.bing.com/th?id=OHR.SessileOaks_EN-US1487454928_768x1280.jpg)![](https://cn.bing.com/th?id=OHR.SessileOaks_EN-US1487454928_1280x768.jpg)![](https://cn.bing.com/th?id=OHR.InscriptionWall_EN-US1392173431_1280x768.jpg)![](https://cn.bing.com/th?id=OHR.DonkeyFeast_EN-US1153850805_1280x768.jpg)![](https://cn.bing.com/th?id=OHR.RumeliHisari_EN-US4800002879_1280x768.jpg)![](https://cn.bing.com/th?id=OHR.Umschreibung_EN-US4693850900_768x1280.jpg)![](https://cn.bing.com/th?id=OHR.HummockIce_EN-US4606231645_768x1280.jpg)![](https://cn.bing.com/th?id=OHR.BisonWindCave_EN-US4537340482_1280x768.jpg)![](https://cn.bing.com/th?id=OHR.Breckenridge_EN-US4460042968_1280x768.jpg)</gallery>

插图格式：

```
<gallery>
    <img src="https://xxxxx.jpg">
    <img src="https://xxxxx.jpg">
    <img src="https://xxxxx.jpg">
</gallery>
```

若插入  markdown 图片格式，则需要调整为 `同一行、一行、一行` 啊！（避免后端转译出别的 p 标签啥的。）

```
<gallery>![](https://xxxxx.jpg)![](https://xxxx)</gallery>
```

### 主题集成流程

#### 加 CSS

```css
.gallery-photos{width:100%;}
.gallery-photo{width:24.9%;position: relative;visibility: hidden;overflow: hidden;}
.gallery-photo.visible{visibility: visible;animation: fadeIn 2s;}
.gallery-photo img{display: block;width:100%;border-radius:0;padding:4px;animation: fadeIn 1s;cursor: pointer;transition: all .4s ease-in-out;}
.gallery-photo span.photo-title,.gallery-photo span.photo-time{background: rgba(0, 0, 0, 0.3);padding:0px 8px;font-size:0.9rem;color: #fff;display:none;animation: fadeIn 1s;}
.gallery-photo span.photo-title{position:absolute;bottom:4px;left:4px;}
.gallery-photo span.photo-time{position:absolute;top:4px;left:4px;font-size:0.8rem;}
.gallery-photo:hover span.photo-title{display:block;}
.gallery-photo:hover img{transform: scale(1.1);}
@media screen and (max-width: 1800px) {
	.gallery-photo{width:33.3%;}
}
@media screen and (max-width: 860px) {
	.gallery-photo{width:49.9%;}
}
@keyframes fadeIn{
	0% {opacity: 0;}
   100% {opacity: 1;}
}
```

#### 加调用功能代码

```html
<script src="https://immmmm.com/waterfall.min.js"></script>
<script src="https://immmmm.com/imgStatus.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  //外链 gallery 标签相册瀑布流
  var photosAll = document.getElementsByTagName('gallery') || '';
  if(photosAll){
    for(var i=0;i < photosAll.length;i++){
      photosAll[i].innerHTML = '<div class="gallery-photos">'+photosAll[i].innerHTML+'</div>'
      var photosIMG = photosAll[i].getElementsByTagName('img')
      for(var j=0;j < photosIMG.length;j++){
        wrap(photosIMG[j], document.createElement('div'));
      }
    }
  }
  function wrap(el, wrapper) {
    wrapper.className = "gallery-photo";
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  //相册瀑布流
  let galleryPhotos = document.querySelectorAll('.gallery-photos') || ''
  if(galleryPhotos){
    imgStatus.watch('.gallery-photo img', function(imgs) {
      if(imgs.isDone()){
        for(var i=0;i < galleryPhotos.length;i++){
          waterfall(galleryPhotos[i]);
          let pagePhoto = galleryPhotos[i].querySelectorAll('.gallery-photo');
          for(var j=0;j < pagePhoto.length;j++){pagePhoto[j].className += " visible"};
        }
      }
    });
    window.addEventListener('resize', function () {
      for(var i=0;i < galleryPhotos.length;i++){
        waterfall(galleryPhotos[i]);
      }
    });
  }
});
</script>
```

搞定！调用代码比官方的多了判断、循环，外链、内链、淡入统统都要！这下彻底舒心咯！

#### 补充说明

官方调用代码：

```JavaScript
<script>
imgStatus.watch('.gallery-photo img', function(imgs) {
    if (imgs.isDone()){
        waterfall('.gallery-photos');
    }
});
</script>
```

对应以下 HTML 结构和已知图片宽度。

```html
<div class="gallery-photos">
    <div class="gallery-photo"><img src=""></div>
    <div class="gallery-photo"><img src=""></div>
    <div class="gallery-photo"><img src=""></div>
</div>
```