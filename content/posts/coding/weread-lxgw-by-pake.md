---
title: "Pake x 微信读书 x 霞鹜文楷"
date: 2024-06-20T21:31:14+0800
tags: [折腾]
feature: https://r2.immmmm.com/2024/06/SCR-20240620-sqap.jpeg.webp
---

利用 [Pake](https://github.com/tw93/Pake) 给 「微信读书」 网页版打包成了 App。

> - 加上了 「霞鹜文楷」在线字体；
> 
> - 覆盖了亮色主题背景色为淡米色；
>
> - 隐藏右侧控制按钮；

下载地址：<https://github.com/lmm214/Pake/releases>

<!--more-->

2024-06-20 更新：支持了双栏。

![](https://r2.immmmm.com/2024/06/SCR-20240620-spwo.jpeg.webp)

### 编译记录

Pake 官方教程 [GitHub Actions 在线编译多系统版本](https://github.com/tw93/Pake/wiki/GitHub-Actions-%E5%9C%A8%E7%BA%BF%E7%BC%96%E8%AF%91%E5%A4%9A%E7%B3%BB%E7%BB%9F%E7%89%88%E6%9C%AC) ：

- Fork 项目
- 启用 Actions
- 修改 app.csv （留下一个）
- 进 Releases 打 tag（版本号必须以大写 V 开头）
- 然后等待 20 分钟左右，到 release 页面下载即可！

备1：自己新写一个需新上传图标，上传图标推荐用 <https://icon-icons.com/zh/> ，生成 .icns、.ico、.png图标；上传 .icns 文件至/src-tauri/icons目录下（必须，打包mac应用）；上传.ico 和.png 文件至 /src-tauri/png目录下（打包windows/linux是需要的）。

备2：[Pake 的高级用法](https://github.com/tw93/Pake/wiki/Pake-%E7%9A%84%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95)

其实简单的加个 css ，插入个 js 代码，完全不用本地部署编译环境。因为编译出来的也仅是当下系统的 App。

比如我自个儿 npm run dev:debug 了半天也就在 `.../src-tauri/src/inject/style.js` 加了以下代码：

```
*{font-family: "LXGW WenKai Screen" !important;}
html body.wr_whiteTheme,
.wr_whiteTheme .navBar_home,
.wr_whiteTheme .app,
.wr_whiteTheme .navBar,
.wr_whiteTheme .readerTopBar,
.wr_whiteTheme .readerChapterContent_container,
.wr_whiteTheme .readerChapterContent,
.wr_whiteTheme .readerContent .app_content{
  background-color: #f9f3e8 !important;
}
.wr_whiteTheme .navBar_input,
.wr_whiteTheme .bookshelf_preview_item,
.wr_whiteTheme .recommend_preview_item,
.readerTopBar,
.readerControls_item,
.wr_whiteTheme .readerControls_fontSize{
    background-color:transparent !important;
}
.readerControls{
    width: 40px !important;
    transform: unset !important;
    bottom:0 !important;
    top: unset !important;
    right:-45px !important;
}
.readerControls_fontSize:not(:first-child), .readerControls_item:not(:first-child){
    margin-top:0 !important;
}
.readerControls_item,.readerControls_fontSize{opacity:0.1 !important;}
.readerControls_item:hover,.readerControls_fontSize:hover{opacity:0.7 !important;}
.wr_whiteTheme .readerControls_item,
.readerControls .readerControls_fontSize{
    box-shadow:none !important;
}
.shelf_download_app,
.readerTopBar_right{
    display:none !important;
}
.wr_bookCover_decor.wr_bookCover_gradientDecor{
    background-image:none !important;
}
.readerTopBar{height:50px !important;margin-bottom:-30px;}
.readerTopBar .readerTopBar_left{margin:0 0 0 26px;}
.wr_bookCover_decor.wr_bookCover_gradientDecor{
    background-image:none !important;
}
```

在 `.../src-tauri/src/inject/custom.js` 加了以下代码：

```
document.addEventListener('DOMContentLoaded', () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://npm.elemecdn.com/lxgw-wenkai-screen-webfont/style.css";
  document.head.append(link);
})
```

其实用个浏览器插件丢入以上css代码即可，前提是本地安装过对应字体。 ✌️