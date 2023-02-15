---
title: "Hi，Docsify"
date: 2022-08-14T14:48:32+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/08/edui123.jpg
---

> [Docsify](https://docsify.js.org/#/zh-cn/) 快速生成文档网站，无需后端构建，即可渲染 markdown 文件。

已部署一串站点：[小学数学教学助手](https://edui123.com/ebook/xxsx/#/)、[小学语文教学助手](https://edui123.com/ebook/xxyw/#/)、[语文课程标准](https://edui123.com/ywkb/#/)、[数学课程标准](https://edui123.com/sxkb/#/)、[英语课程标准](https://edui123.com/yykb/#/)等。

<!--more-->

部署教程网络已太多太多，自己主要折腾了下面几点：

### 图片灯箱效果

ViewImage.js ： <https://tokinx.github.io/ViewImage/>

```html
<script src="//tokinx.github.io/ViewImage/view-image.min.js"></script>
```

由于 markdown 内的图片也是前端渲染为 html 后才加载的，如果直接使用下面的调用代码，大概率无效，想想也是，图都没出来，灯箱效果肯定绑不上。

```html
<script>
    window.ViewImage && ViewImage.init('.ebook img,a.zoom');
</script>
```

### 加载评论系统

Twikoo ：<https://twikoo.js.org>

```html
<div id="tcomment"></div>
<script src="https://cdn.staticfile.org/twikoo/1.6.5/twikoo.all.min.js"></script>
<script>
twikoo.init({
  envId: '您的环境id', // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
  el: '#tcomment', // 容器元素
  // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
  // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
  // lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
})
</script>
```

若采用 Twikoo 官方调用方式，那得手动把这些代码插入到一个个 markdown 文件内，而且还会遇到 path 只能获取到首页，因为默认的 `location.pathname` 会忽略 `#` 后面的路径。

就算 path 设置好，评论内容不会随着页面动态跳转而动态更新（页面无刷新）。

搜了好几轮、试了好几圈办法，最终以 docsify 的插件形式调用。核心代码如下：

```html
<script type="text/javascript">
  window.$docsify = {
    name: '',
    ……
    ,
    plugins: [
      function(hook, vm) {
        // 绑定灯箱效果
        hook.afterEach(function(html) {
          window.ViewImage && ViewImage.init('.ebook img,a.zoom');
        });
        // 动态插入 div#tcomment 的 dom 
        hook.mounted(function () {
          var a = Docsify.dom;
          var n = a.create("div");
          n.id = "tcomment";
         a.appendTo(a.find(".content"), n);
        })
        // 调用 twikoo 评论，正则 path，刷新当前评论
        hook.doneEach(function () {
          twikoo.init({
              envId: 'https://xxxxxx.xxxx/',
              el: '#tcomment',
              path: location.pathname+location.hash.replace(/\?.*/,''),
              onCommentLoaded: function () {
                window.ViewImage && ViewImage.init('.tk-content img:not(.avatar,.tk-avatar-img,.tk-owo-emotion),.ebook img,a.zoom');
              }
           }).then(function () {
            console.log('Twikoo 加载完成');
            setTimeout(function() {
              // 通过点击刷新按钮，获取当前页评论
              let tk_icon = document.getElementsByClassName("tk-icon")[0];
              tk_icon ? tk_icon.click() : undefined;
             },700)
          });
        })
      }
    ]
  }
</script>
<script src="/vue.global.prod.js"></script>
<script src="/docsify.min.js"></script>
<script src="/view-image.js"></script>
<script src="/twikoo.min.js"></script>
```

当然，相关的 JS 还是得挂上。

### Template 调用

自己有个需求，在 md 中插入大量图片，若直接写 HTML 也行，可实在太肝……

```
<img src="https://xxxx.xxxx/images/xxsx1a/2.webp" />
<img src="https://xxxx.xxxx/images/xxsx1a/3.webp" />
……
```

查询手册后，采用 Template 来实现。

```html
<script>
  window.$docsify = {
    name: '',
    ……
    ,
    vueComponents: {
      'Ebook': {
        props: ['grade','pages','paged'],
        template: `<ul class="ebook" view-image>
          <li v-for="(n, index) in paged-pages+1" :key="index">
            <img :src="'https://r2.immmmm.com/'+grade+'/'+(n+pages-1)+'.webp'" >
            <span><small>第 {{n+pages-1}} 页</small></span>
          </li>
        </ul>`
      },
    },
  }
</script>
```

这样，只需在 md 中写一行搞定！优雅！

```html
<Ebook grade="xxsx1a" :pages="2" :paged="32" ></Ebook>
```

### 后记

vue 很多插件都以本地 import 导入，这就需要部署本地 vue 环境，自己执念直接挂功能 js 搞定，被劝退N次，可喜，还是折腾有成果！