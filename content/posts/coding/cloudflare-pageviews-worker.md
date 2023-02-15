---
title: "嘿，Cloudflare 来个站点计数！"
date: 2022-01-26T10:08:59+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/01/cf-kv.png
---

给：

[cloudflare-pageviews-worker](https://github.com/willin/cloudflare-pageviews-worker)：统计每个页面和整个站点的访问量。 —— by [@willin](https://willin.wang/)

部署完毕后寻思怎么前端调用，想起wx好友的有位大神 willin，真是同一位！立马让我“删了 busuanzi 的js，html代码不需要改”。

<!--more-->

看了看 js ，理解了好久，优雅！

```javascript
var viewsSlug=window.location.host;
var viewsUrl='https://pageviews.edui123.com/pv?slug='+viewsSlug;
fetch(viewsUrl,{method:'PUT'})
    .then((res)=>res.json())
    .then(({result})=>{
        document.getElementById('busuanzi_value_site_pv').innerHTML=result.pv;document.getElementById('busuanzi_container_site_pv').style='display:inline';
    });
```

### 前端调用

同 [「不蒜子」](https://busuanzi.ibruce.info/) 

> 两行代码 搞定计数

```html
<script async type="text/javascript" src="/pageviews.js"></script>
<span id="busuanzi_container_site_pv" style="display:inline;">本站总访问量 <span id="busuanzi_value_site_pv">0</span> 次</span>
    
```

### 后话

每日 100,000 次调用限额，应该，足够了吧？

### 后后话

每日 10W 是调用，而 put 修改的话是 1000次/日…本地调试个主题都不够刷新的…

弃！
