---
title: "Memos 自定义代码片段"
date: 2023-01-12T00:03:00+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2023/01/memos-bing.png
---

旧文重发。实现以下两个功能：

> 调用 Bing 每日背景；
> 
> 加载「霞鹜文楷」在线字体；
>
> 修改多图显示样式（不是一行显示）；

<!--more-->

![memos-css](https://pic.edui.fun/images/2023/01/memos-css.png)

```css
body{font-family: "LXGW WenKai Screen", sans-serif !important;}
.page-wrapper{background-image:url('https://bing.immmmm.com/img/bing?type=image');width:100%;height:100vh;background-position:center;background-size:cover;background-attachment: fixed;}.page-container{background-color:rgba(244 244 245 / 30%) !important;}.page-container>.memos-wrapper,.page-container>.sidebar-wrapper{background-color:rgba(244 244 245 / 60%) !important;}.dark .page-container{background-color:rgba(39 39 42 / 30%) !important;}.dark .page-container>.memos-wrapper,.dark .page-container>.sidebar-wrapper{background-color:rgba(39 39 42 / 60%) !important;}
.resource-wrapper>.images-wrapper.row{display:grid;grid-template-rows:auto;gap:4px;grid-template-columns:repeat(3,1fr);}
.resource-wrapper>.images-wrapper.row>.memo-resource>img{border-radius:4px;height:180px !important;width:180px !important;object-fit: cover;}
```

```javascript
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://cdn.staticfile.org/lxgw-wenkai-screen-webfont/1.6.0/lxgwwenkaiscreen.css";
  document.head.append(link);
```

### 致谢

<https://github.com/Lete114/API-Interface>