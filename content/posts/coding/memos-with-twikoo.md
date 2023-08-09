---
title: "Memos x Twikoo"
date: 2023-04-20T23:38:20+0800
tags: [折腾]
feature: https://r2.immmmm.com/2023/04/memos-twikoo.png
---

欢迎在线围观：<https://me.edui.fun/m/1532>

受 [@Damon](https://hanyu.cool/) 启发，给 Memos 增加了 Twikoo 评论。不过与之不同的是集成到自己的「自定义脚本」里。

<!--more-->

v2023.04.21：新增 `/explore` 页添加评论图标（但非常不优雅，用了定时器来动态插 dom ）。

v2023.08.09：更新 twikoo.init 中的 path 正则


### 自定义脚本

```
//添加 twikoo 评论 v2023.07.29
var twikooENV = 'https://metk.edui.fun/'
function addTwikooJS() { 
  var memosTwikoo = document.createElement("script");
  memosTwikoo.src = `https://cdn.staticfile.org/twikoo/1.6.16/twikoo.all.min.js`;
  var tws = document.getElementsByTagName("script")[0];
  tws.parentNode.insertBefore(memosTwikoo, tws);
};
function addComIcon(){
  var memoTwIcons = document.querySelectorAll('.time-text') || '';
  if(memoTwIcons){
    for(var i=0;i < memoTwIcons.length;i++){
      //if(memoTwIcon[i].hasChildNodes == false){
        memoTwIcons[i].insertAdjacentHTML('afterbegin', '<div class="twicon"><svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M896 138.667H128c-38.4 0-64 25.6-64 64v544c0 38.4 25.6 64 64 64h128v128c83.2 0 166.4-44.8 256-128h384c38.4 0 64-25.6 64-64v-544c0-38.4-25.6-64-64-64zm0 608H486.4l-19.2 19.2c-51.2 51.2-102.4 83.2-147.2 96v-115.2H128v-544h768v544z" fill="#8a8a8a"/><path d="M256 477.867a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM448 477.867a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM640 477.867a64 64 0 1 0 128 0 64 64 0 1 0-128 0z" fill="#8a8a8a"/></svg></div>');
      //}
    }
  }
};
function startTwikoo() {
  startTW = setInterval(function(){ //定时执行 1秒/次
    var nowHref = window.location.href;
    var twikooDom = document.querySelector('#twikoo') || '';
    if( nowHref.replace(/^.*\/(m)\/.*$/,'$1') == "m"){//单条页面
      if(!twikooDom){
        //console.log('评论未加载');
        addTwikooJS() //加载评论 js
        setTimeout(function() { //延迟 1秒 执行
          var memoTw = document.querySelector('.memo-wrapper') || '';
          memoTw.insertAdjacentHTML('afterend', '<div id="mtcomment"></div>');
          twikoo.init({
            envId: twikooENV,
            el: '#mtcomment',
            path: nowHref.replace(/^.*=?(http.*\/m\/[0-9]+).*$/,'$1'), //v2023.08.09 正则更新
            onCommentLoaded: function () {
              startTwikoo()
              //console.log('再次开启定时执行');
            }
          })
        }, 900)
      }else{
        //console.log('清除定时执行');
        clearInterval(startTW)
      }
    }
    
    if(nowHref.replace(/^.*\/(explore).*$/,'$1') == "explore" || nowHref.replace(/^.*\/(u).*$/,'$1') == "u"){
      var memoTwIcons = document.querySelectorAll('.time-text .twicon') || '';
      memoTwIcons.forEach(memoTwIcon => {memoTwIcon.remove();});
      addComIcon()
      //console.log('图标添加成功');
    }
  }, 2000)
}
startTwikoo();
```

### 自定义样式

```
#twikoo{padding: 1rem;background-color: rgb(63,63,70);margin: 1rem 0;border-radius: .5rem;color: #fff !important;}
.twicon{position: absolute;right: 1rem;}
.btns-container.space-x-2{margin-right:1.5rem;}
.action-button-container{color: #e5e7eb;}
.action-button-container a{display:none !important;}
```
### 后记

真是新奇的体验～