---
title: "熟悉的味道，不一样配方"
date: 2021-01-16T22:26:12+0800
tags: [折腾]
---

⬆ ⬆ ⬆ 效果见首页 ⬆ ⬆ ⬆

多么熟悉啊，遥想当年也算是折腾 WP 必备项，调取啁啾、饭否、TX说说 ~~没微博什么事~~ 的最新一条消息在博客头部显示。

这不，腾讯 Cloudbase 也折腾快个把月，继续薅！

{{<link "bb-by-wechat-pro">}}

既然云函数里用的是 NodeJS 大法，TCB又有足足5G的 `云存储` ，还自带 HTTPS 的 CDN ！想到，索性把**哔哔**转存一份为 `json` 呗！有了json文件前端一句 `$.getjson` 动态加载，太惬意！完全把那庞大地 tcb-js 抛之脑后！

<!--more-->

### 新建转存 JSON 云函数

首先新建个云函数 `bber-talk`，打开 [index.js](https://github.com/lmm214/bber/blob/main/bber-talk/index.js) 代码复制进去保存，新建并打开 [package.json](https://github.com/lmm214/bber/blob/main/bber-talk/package.json) 代码复制进去保存并安装依赖。

### 原云函数添加异步代码

在之前 [bber](https://github.com/lmm214/bber/blob/main/bber/index.js) 的 `index.js` 内添加以上代码，实现异步转存 Json 文件。

![bbtalk-1](https://pic.edui.fun/images/2020/12/bbtalk-1.png)

```javascript
//异步转存json
try {
    await app.callFunction({name: 'bber-talk'}, { timeout: 300 })
} catch (e) {
    console.log('开始异步转存json')
}
```

### 云存储获取链接及缓存设置

进**云存储--json--bber.json**，详情--下载地址，得到下面格式地址：

```html
https://6262-bb-f5c0f-1252354806.tcb.qcloud.la/json/bber.json
```

点击上面的 `缓存设置`，如下设置：

![bbtalk-2](https://pic.edui.fun/images/2020/12/bbtalk-2.png)

### 前端调用代码

```html
<div id="bber-talk"></div>
```

下面 `jsonUrl` 链接改为自己云存储的 

```javascript
//依赖 jQuery 库，其中 jsonUrl 改为自己的
$(document).ready(function(){
  if ( $("#bber-talk").length > 0 ) {
    jsonUrl = "https://6262-bb-f5c0f-1252354806.tcb.qcloud.la/json/bber.json"
    $.getJSON(jsonUrl+"?t="+Date.parse( new Date()),function(res){
      var bberHtml = ''
      $.each(res.data, function(i, item){
        d = new Date(item.date)
        date = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() +' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
        dataTime = '<span class="datatime">'+date+'</span>'
        bberHtml += '<li class="item item-'+(i+1)+'">'+dataTime+'： <a href="https://immmmm.com/bb/">'+item.content+'</a></li>'
      });
      $('#bber-talk').append('<span class="index-talk-icon"><svg viewBox="0 0 1024 1024" width="21" height="21"><path d="M184.32 891.667692c-12.603077 0-25.206154-2.363077-37.809231-7.876923-37.021538-14.966154-59.864615-49.624615-59.864615-89.009231v-275.692307c0-212.676923 173.292308-385.969231 385.969231-385.969231h78.76923c212.676923 0 385.969231 173.292308 385.969231 385.969231 0 169.353846-137.846154 307.2-307.2 307.2H289.083077l-37.021539 37.021538c-18.904615 18.116923-43.323077 28.356923-67.741538 28.356923zM472.615385 195.347692c-178.018462 0-322.953846 144.935385-322.953847 322.953846v275.692308c0 21.267692 15.753846 29.144615 20.48 31.507692 4.726154 2.363077 22.055385 7.876923 37.021539-7.08923l46.473846-46.473846c6.301538-6.301538 14.178462-9.452308 22.055385-9.452308h354.461538c134.695385 0 244.184615-109.489231 244.184616-244.184616 0-178.018462-144.935385-322.953846-322.953847-322.953846H472.615385z"></path><path d="M321.378462 512m-59.076924 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M518.301538 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M715.224615 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153846 0 59.076923 59.076923 0 1 0-118.153846 0Z"></path></svg></span><ul class="talk-list">'+bberHtml+'</ul>')
      Lately({ 'target': '#bber-talk .datatime' });
    });
    function Roll (){
      var list_li = $('.talk-list li'),cur_li = list_li.first(),last_li = list_li.last();
      last_li.after(cur_li);
    };
    setInterval(Roll,3000);
  }
});
```

```css
#bber-talk{display:-webkit-flex;display:flex;width:100%;line-height:2em;height:45px;max-width:760px;text-align:left;padding:5px 15px;margin-bottom:3em;position: relative;background-color: var(--light-header);border-radius:8px;font-size:15px;}
#bber-talk svg{fill: currentColor;vertical-align: middle;display: inline;margin-right:5px;}
.talk-list{margin: 0;max-height: 35px;overflow: hidden;}
.talk-list li {list-style: none;margin-bottom: 10px;width: 100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
```

END.