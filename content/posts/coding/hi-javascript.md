---
title: "Hi，原生 JavaScript"
date: 2022-08-11T23:44:34+0800
tags: [折腾]
---

> 移除 jQuery 依赖，移，不移……

很早就想干这个事，可懒，懒得查看各手册语法，毕竟，累。这几天借被迫私有部署评论系统，再次重拾折腾博客的劲，肝，就一个字！

过程，掠过不表。记录一下替换的几个「原生 JavaScript」插件。

### 相对时间

[Lately.js](https://tokinx.github.io/lately/index-zh.html) ：原生 JavaScript，仅 800 字节！却简单、好用的 Timeago 插件

```html
<script src="//tokinx.github.io/lately/lately.min.js"></script>
<script>
    window.Lately && Lately.init({ target: '.post-date' });
</script>
```

<!--more-->

### 图片灯箱

[ViewImage.js](https://tokinx.github.io/ViewImage/) ：Gzip后仅 2kb，小巧卓越的原生JavaScript灯箱插件

```html
<script src="//tokinx.github.io/ViewImage/view-image.min.js"></script>
<script>
    window.ViewImage && ViewImage.init('.post-content img:not(.avatar,.tk-avatar-img)')
</script>
```

### 图片瀑布流

[Waterfall.js](https://raphamorim.io/waterfall.js/) ：1KB，无需任何依赖关系即可工作。

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/waterfall.js/1.0.2/waterfall.min.js"></>
<script>
    var photos = document.querySelector('photos') || '';
    if (photos) {waterfall(photos);}
    window.addEventListener('resize', function () {
      waterfall(photos);
    });
</script>
```

照官方操作上面这样写就OK了，可啪啪打脸！

因为自己是一串图片链接，img + img + img ……，所以 DOM 的查询、包裹、替换……

还有，图片没加载，高度没有，还得加个判断并 setTimeout 等待一下。

```JavaScript
  //相册瀑布流
  var photosAll = document.getElementsByTagName('photos') || '';
  if(photosAll){
    for(var i=0;i < photosAll.length;i++){
      var photosIMG = photosAll[i].getElementsByTagName('img')
      for(var j=0;j < photosIMG.length;j++){
        wrap(photosIMG[j], document.createElement('div'));
      }
    }
  }
  function wrap(el, wrapper) {
    wrapper.className = "photo";
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  isImgLoad(function () {
    var photos = document.querySelector('photos') || '';
    if (photos) {waterfall(photos);}
    window.addEventListener('resize', function () {
      waterfall(photos);
    });
  });
  var t_img,isLoad = true;
  function isImgLoad(callback) {
    var photos = document.querySelector('photos') || '';
    if (photos) {
      var imgHeight = document.querySelector('photos img').height
      if (imgHeight === 0) {isLoad = false;return false;}
      if (isLoad) {clearTimeout(t_img);callback();} else {isLoad = true;t_img = setTimeout(function () { isImgLoad(callback);}, 200);}
    }
  }
```

### 文章内解析豆瓣条目

{{<link "post-show-douban-item">}}

这货肝了一下午，DOM 查询、替换、插入看了好久手册……

但，折腾得够尽兴！

```JavaScript
  //文章内显示豆瓣条目 https://immmmm.com/post-show-douban-item/
  var dbAPI = "https://douban.edui.fun/";  //自建 API ，何时挂不晓得。
  var dbA = document.querySelectorAll(".post-content a[href*='douban.com/subject/']") || '';
  if(dbA){
    for(var i=0;i < dbA.length;i++){
      var _this = dbA[i]
      var dbHref =_this.href
      var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
      var db_type = dbHref.replace(db_reg, "$1");
      var db_id = dbHref.replace(db_reg, "$2").toString();
        if (db_type == 'movie') {
          var this_item = 'movie' + db_id;
          var url = dbAPI + "movies/" + db_id ;
          if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
            fetch(url).then(res => res.json()).then( data =>{
              localStorage.setItem(this_item, JSON.stringify(data));
              movieShow(_this, this_item)
            });
          } else {
            movieShow(_this, this_item)
          }
        }else if (db_type == 'book') {
          var this_item = 'book' + db_id;
          var url = dbAPI + "v2/book/id/" + db_id;
          if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
            fetch(url).then(res => res.json()).then( data =>{
              localStorage.setItem(this_item, JSON.stringify(data));
              bookShow(_this, this_item)
            });
          } else {
            bookShow(_this, this_item)
          }
        }
    }// for end
  }
  function movieShow(_this, this_item) {
    var storage = localStorage.getItem(this_item);
    var data = JSON.parse(storage);
    var str = _this.href;
    var db_star = Math.ceil(data.rating);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.name + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.director + " / 类型：" + data.genre + " / " + data.year + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro.replace(/\s*/g,"") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.img + "></div>"
    var db_div = document.createElement("div");
    _this.parentNode.replaceChild(db_div, _this);
    db_div.innerHTML = db_html
  }
  function bookShow(_this, this_item) {
    var storage = localStorage.getItem(this_item);
    var data = JSON.parse(storage);
    var str = _this.href;
    var db_star = Math.ceil(data.rating.average);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.images.medium + "></div>"
    var db_div = document.createElement("div");
    _this.parentNode.replaceChild(db_div, _this);
    db_div.innerHTML = db_html
  }
```

### 一个小结

把首页的 bber 调用去掉了，没找到好用的滚动插件，也没现成的 json 调取方案。毕竟现在直接拿 Twikoo 的最新评论还是不舒坦！