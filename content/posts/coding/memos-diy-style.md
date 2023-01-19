---
title: "Memos 自定义代码片段"
date: 2023-01-12T00:03:00+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2023/01/memos-bing.png
---

旧文换新颜。新实现以下功能：

> 调用 Bing 每日背景；
> 
> 加载「霞鹜文楷」在线字体；
>
> 随机 Memos 回顾
> 
> 设置 Favicon 图标为 emoji

<!--more-->

![memos-css](https://pic.edui.fun/images/2023/01/memos-css.png)

### 调用 Bing 每日背景

```css
.page-wrapper{background-image:url('https://bing.immmmm.com/img/bing?region=zh-CN&type=image');width:100%;height:100vh;background-position:center;background-size:cover;background-attachment: fixed;}.page-container{background-color:rgba(244 244 245 / 30%) !important;}.page-container>.memos-wrapper,.page-container>.sidebar-wrapper,.page-header{background-color:rgba(244 244 245 / 60%) !important;}.dark .page-container{background-color:rgba(39 39 42 / 30%) !important;}.dark .page-container>.memos-wrapper,.dark .page-container>.sidebar-wrapper,.dark .page-header{background-color:rgba(39 39 42 / 60%) !important;}.page-header{margin-bottom: 0 !important;}.memos-editor-wrapper{background-color: transparent !important;}
```

### 加载「霞鹜文楷」在线字体

```css
body{font-family: "LXGW WenKai Screen", sans-serif !important;}
```

```javascript
function changeFont() { 
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.6.0/lxgwwenkaiscreen.css";
  document.head.append(link);
};
changeFont()
```

### 随机 Memos 回顾

![memo-random](https://pic.edui.fun/images/2023/01/memo-random.png)

```javascript
function randomMemo(){
  var bbUrl1 = window.location.origin+"/api/user/me";
  fetch(bbUrl1).then(res1 => res1.json()).then( resdata1 =>{
    var creatorId = resdata1.data.id
    var bbUrl2 = window.location.origin+"/api/memo/amount?userId="+creatorId;
    fetch(bbUrl2).then(res2 => res2.json()).then( resdata2 =>{
        let randomNum = Math.floor(Math.random() * ( resdata2.data + 2))
        var bbUrl3 = window.location.origin+"/api/memo?rowStatus=NORMAL&limit=1&offset="+randomNum;
        fetch(bbUrl3).then(res3 => res3.json()).then( resdata3 =>{
          window.location.href =  window.location.origin+"/m/"+resdata3.data[0].id;
        })
    })
  })
}
setTimeout(function() { 
    document.querySelector("button.btn.action-btn").insertAdjacentHTML('afterend', '<button onclick="randomMemo()" class="btn action-btn"><span class="icon">⛳️</span> 随机</button>');
}, 1500)
```

### 设置 Favicon 图标为 emoji

![memos-emoji](https://pic.edui.fun/images/2023/01/memos-emoji.png)

```
function changeFavicon() { 
    var link = document.head.querySelector("link[rel='icon']");
    link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>😸</text></svg>";
};
setTimeout(function() { changeFavicon()}, 500)
```

### 致谢

<https://github.com/Lete114/API-Interface>