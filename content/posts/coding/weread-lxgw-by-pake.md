---
title: "Pake x 微信读书 x 霞鹜文楷"
date: 2023-01-08T16:04:08+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/01/pake-wr-2.png
---

利用 [Pake](https://github.com/tw93/Pake) 给 「微信读书」 网页版打包成了 App。

> - 加上了 「霞鹜文楷」在线字体；
> 
> - 增加内容宽度；
> 
> - 覆盖了亮色主题背景色为淡米色；
>
> - 隐藏右侧控制按钮，只保留字体大小按钮；
> 
> - 隐藏底部工具栏，鼠标移动至底部显示。

下载地址：<https://github.com/lmm214/Pake/releases>

<!--more-->

![pake-wr-3](https://r2.immmmm.com/2023/01/pake-wr-3.png)

![pake-wr-4](https://r2.immmmm.com/2023/01/pake-wr-4.png)

### 编译记录

Pake 官方教程 [GitHub Actions 在线编译多系统版本](https://github.com/tw93/Pake/wiki/GitHub-Actions-%E5%9C%A8%E7%BA%BF%E7%BC%96%E8%AF%91%E5%A4%9A%E7%B3%BB%E7%BB%9F%E7%89%88%E6%9C%AC) ：

- Fork 项目
- 启用 Actions
- 修改 app.csv （留下一个）
- 进 Releases 打 tag（版本号必须以大写 V 开头）
- 然后等待 20 分钟左右，到 release 页面下载即可！

备1：自己新写一个需新上传图标，上传图标推荐用 <https://icon-icons.com/zh/> ，生成 .icns、.ico、.png图标；上传 .icns 文件至/src-tauri/icons目录下（必须，打包mac应用）；上传.ico 和.png 文件至 /src-tauri/png目录下（打包windows/linux是需要的）。

备2：[Pake 的高级用法](https://github.com/tw93/Pake/wiki/Pake-%E7%9A%84%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95)

其实简单的加个 css ，差个 js 代码，完全不用本地部署编译环境。因为编译出来的也仅是当下系统的 App。

比如我自个儿 npm run dev:debug 了半天也就在 ``.../src-tauri/src/pake.js` 加了以下代码：

```
// JS 调用在线字体
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://npm.elemecdn.com/lxgw-wenkai-screen-webfont/style.css";
  document.head.append(link);
```

```
// CSS 修改字体
    *{font-family: "LXGW WenKai Screen" !important;}    
//去除 body 滚动条
    body::-webkit-scrollbar{width:0px;height:0px;}
//修改文本两侧边距
    .readerChapterContent {
        margin-left: 2rem;
        margin-right: 2rem;
    }
//字体控制默认透明显示
    .readerControls_fontSize{opacity:0.3 !important;}
    .readerControls_fontSize:hover{opacity:1 !important;}
//修改亮色主题背景颜色及阴影
    .wr_whiteTheme .app_content{box-shadow: 0 8px 32px rgba(0,25,104,.1) !important ;}
    .wr_whiteTheme .app_content.shelf_container{box-shadow: none !important;}
    html body.wr_whiteTheme,
    .wr_whiteTheme .navBar,
    .wr_whiteTheme .navBar_home,
    .wr_whiteTheme .bookshelf_preview_item,
    .wr_whiteTheme .app_content,
    .wr_whiteTheme .readerControls_item,
    .wr_whiteTheme .readerControls_fontSize,
    .wr_whiteTheme .readerTopBar,
    .wr_whiteTheme .readerBottomBar,
    .wr_whiteTheme .readerBottomSettingPanel,
    .wr_whiteTheme .recommend_preview_item{
      background-color: #f9f3e8 !important;
    }
//隐藏控制条，底部 hover 显示
    .readerMemberCardTips,
    .readerTopBar,
    .readerControls_item,
    .navBarOffset {
        display: none !important;
    }
    .readerBottomBar {
        transform: none;
        display: flex !important;
        opacity: 0 !important;
        transition: opacity 400ms ease-out !important;
    }
    .readerBottomBar:hover {
        display: flex !important;
        opacity: 1 !important;
    }
    .readerBottomSettingPanel {
        display: block;
        top: 88% !important;
        height: 7% !important;
    }
```

然后 `src-tauri/tauri.conf.json` 里改了下版本号，打 tag 等待完工！ 🤷‍♂️

### 感谢

微信读书(weread)网页版优化：<https://userstyles.world/style/2089/weread>