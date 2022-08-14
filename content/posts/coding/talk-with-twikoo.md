---
title: "你言我语 By Twikoo"
date: 2022-08-10T00:33:51+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2021/06/yanyu-3.png
---

效果见： <https://immmmm.com/talk/>

主要做了两件事：一是前端魔改，二是首页调用（替代原 bber）。

<!--more-->

注明：以下样式、功能代码基于 **Twikoo v1.6.4** 

### 前端魔改

> “管理面板”按钮同步隐藏输入框。先到twikoo配置里填写“暗号”，暗号匹配前端才会显示。

所以，用 JavaScript 判断是否有那个管理 ⚙️ 图标（有2个 tk-icon 表示是管理员登录状态），则显示默认的评论框，反之移除。

```JavaScript
<script src="https://fastly.jsdelivr.net/npm/twikoo@1.6.4/dist/twikoo.all.min.js"></script>
<script>
  twikoo.init({
    envId: 'https://xxxxxx.com',
    el: '#tcomment',
    onCommentLoaded: function () {
      var myShow = document.getElementsByClassName('tk-icon'),mySubmit = document.querySelector('.tk-submit')
      var myLength= 1;
      for (i = 0; i < myShow.length;i++) {myLength += myLength + i};
      if(myLength > 1){mySubmit.style.setProperty('display','block','important')}else{mySubmit.remove}
      var tkMain = document.getElementsByClassName('tk-main'),tkReplies = document.getElementsByClassName('tk-replies');
      for (var i=0;i<tkMain.length;i++){
        tkMain[i].index=i;tkMain[i].onclick = function () {tkReplies[this.index].classList.add("tk-replies-height");}
      }
    }
  })
</script>
```

同时，精简显示内容。完整样式代码如下，最新改动直接查看页面源码：

```css
<style>
  .tk-comments .tk-submit,.tk-comments-count span:nth-child(2),.tk-comments-container .tk-comment .tk-avatar,.tk-comments-container .tk-comment .tk-nick,.tk-comments-container .tk-replies .tk-comment .tk-time,.tk-extra-text,.tk-replies .tk-meta,.tk-replies .tk-extra,.tk-extras .tk-extra:nth-child(2){display:none !important;}
  .tk-comment .tk-submit,.tk-comments-container .tk-replies .tk-comment .tk-avatar{display:block !important;}
  .tk-comments-container .tk-replies .tk-comment .tk-nick{display:inline-block !important;}
  .tk-comments-count{font-size:15px;}
  .tk-comments-count::before {content:"共 ";}
  .tk-comments-count::after {content:" 条";}
  .tk-time{color: #fafafa;font-size: 0.75em;font-style: italic;background-color: #3b3d42;display: inline-block;padding:0.25em 1em 0.2em 1em;}
  .tk-comment{margin:1em 0 4em !important;}
  .tk-replies .tk-comment{margin:0.5em 0 0!important;height:200px;}
  .tk-content{margin:1em 0 0.5em!important;}
  .tk-content blockquote:before{content:""}
  .tk-replies{max-height:0px !important;}
  .tk-replies .tk-action{position: absolute;right:0;top:20px;}
  .tk-replies.tk-replies-expand{max-height:none !important;}
  .tk-replies.tk-replies-expand.tk-replies-height .tk-comment{max-height:none !important;height: auto !important;}
  .tk-expand{margin:-25px 0 0;font-size:1em;font-weight:600;float: right;width:80px !important;}
  .tk-expand._collapse{margin:0 0 0;}
  .tk-extras{display: flex !important;}
  .tk-replies .tk-avatar{margin:1em 0.5rem 0 0;}
  .tk-avatar.tk-has-avatar{border-radius:50%;}
  .tk-replies .tk-main{font-size:14px !important;position:relative;}
  .tk-replies .tk-content{font-size:1em !important;}
  .tk-row{border-bottom: 1px solid #3b3d42;}
  .tk-submit{margin-bottom:3em;}
  .tk-replies .tk-row,.tk-submit .tk-row{border-bottom:none;}
  .dark-theme .tk-time{color: #aaa;}
  .tk-row.actions{margin-left:0 !important;}
</style>
```

### 首页调用

ctb 的羊毛已撸玩完！索性直接调用 Twikoo 的 [最新评论 API](https://twikoo.js.org/api.html#get-recent-comments) 再在前端 JavaScript 指定 `url` 页面和 `nick` 昵称，实现首页轮播内容的过滤。

代码判断如下，完整版可直接在博客首页查看页面源码。

```JavaScript
  twikoo.getRecentComments({
    ……
  }).then(function (res) {
    var bberHtml = ''
      $.each(res, function(i, item){
        if(item.url == '/talk/' && item.nick == '林木木'){ //只留下 url 为 talk，昵称为 林木木 的评论
          dataTime = '<span class="datatime">'+item.relativeTime+'</span>'
          bberHtml += '<li class="item item-'+(i+1)+'">'+dataTime+'： <a href="https://immmmm.com/talk/">'+urlToLink(item.commentText.substring(0,200))+'</a></li>'
        }
      });
    ……
```

### 后话

有个说话的地，真好！