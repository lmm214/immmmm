---
title: Valine 懒加载
date: 2020-03-23
tags: [折腾]
---

博客都已静态，想再提速，要么换国内云服，要么优化一个个 JS 加载。立竿见影办法是使用 CDN 来加载，或者前端延迟加载，甚者后端判断按需加载。

在需要加载的一串 JS 里，找来找去，Valine 这货最强大 💪

```html
47.5KB --> https://fastly.jsdelivr.net/npm/leancloud-storage/dist/av-min.js
75KB   --> https://fastly.jsdelivr.net/npm/valine@1.3.10/dist/Valine.min.js
6.4KB  --> https://js.fundebug.cn/fundebug.1.9.0.min.js
```

撸起袖子，月干！

<!--more-->

代码来自：[hugo-theme-meme/valine.html](https://github.com/reuixiy/hugo-theme-meme/blob/master/layouts/partials/third-party/valine.html)，好使！ 👍

```js
<script type="text/javascript">
loadComments();
function loadComments() {
  if (typeof Valine === 'undefined') {
    var getScript = (options) => {
      var script = document.createElement('script');
      script.defer = true;
      script.crossOrigin = 'anonymous';
      Object.keys(options).forEach((key) => {
          script[key] = options[key];
      });
      document.body.appendChild(script);
    };
    getScript({
      src: 'https://fastly.jsdelivr.net/npm/valine@1.3.10/dist/Valine.min.js',
      onload: () => {
        newValine();
      }
    });
  } else {
    newValine();
  }
}
function newValine() {
  new Valine({
    //原配置
  });
}
</script>
```

🎉
