---
title: "你言我语 By Twikoo"
date: 2021-06-21T17:55:51+0800
tags: [折腾]
feature: https://lmm.elizen.me/images/2021/06/yanyu-3.png
---

效果见： <https://immmmm.com/talk/>

主要做了两件事：一是前端魔改，二是后端加API。

<!--more-->

注明：以内样式、功能代码基于 **Twikoo v1.4.5** 

### 前端魔改

`twikoo.js` 里的子评论是否显示 “展开” 是根据高度来判断的 `["tk-replies"].scrollHeight>200` ，这会出现当高度不到 200 时，不会显示 “展开” 这个按钮，如果单纯通过 css 直接隐藏，藏是藏了，没有“展开”给我们点击……

换思路，先直接都给 200 高度，把“展开”骗出来！点击之后，再它个 `class="tk-replies-height"` 恢复其对应的子评论高度。

```css
  .tk-replies .tk-comment{margin:0.5em 0 0!important;height:200px;}
  .tk-replies.tk-replies-height .tk-comment{max-height:none !important;height: auto !important;}
```

完整样式代码如下，最新改动直接查看页面源码：

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
  .tk-expand{margin:-25px 0 0;font-size:1em;font-weight:800;float: right;width: 60px !important;}
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

由此也拾起最陌生的陌生人——原生 JavaScript 

```JavaScript
<script src="https://cdn.jsdelivr.net/npm/twikoo@1.4.5/dist/twikoo.all.min.js"></script>
<script>
  twikoo.init({
    envId: 'twikoo-123456',
    el: '#tcomment',
    onCommentLoaded: function () {
      var myShow = document.querySelector('.tk-comments-title > .tk-icon'),mySubmit = document.querySelector('.tk-comments > .tk-submit')
      if(myShow !== null){
        mySubmit.style.setProperty('display','block','important')
      }else{
        mySubmit.remove()
      }
      var tkMain = document.getElementsByClassName('tk-main'),tkReplies = document.getElementsByClassName('tk-replies');
      for (var i=0;i<tkMain.length;i++){
        tkMain[i].index=i;tkMain[i].onclick = function () {tkReplies[this.index].classList.add("tk-replies-height");}
      }
    }
  })
</script>
```

### 后端API

注：已停更，太复杂，兼容性差……（其实懒）

思路与 「哔哔点啥」 相同，用 `key` 作为验证，传参数 `text` `from` 并调用我们的主角云函数 `twikoo` 发布主评论！

先部署 「talk-twikoo」云函数 <https://github.com/lmm214/talk-twikoo>

再在云函数 `twikoo` 中添加下面两段代码，第一段是三行代码，加了一个 `TAlK_COMMENT_SUBMIT` 事件。

```JavaScript
      case 'GET_RECENT_COMMENTS': // >= 0.2.7
        res = await getRecentComments(event)
        break
      //加入下面三行
      case 'TAlK_COMMENT_SUBMIT':
        res = await talkCommentSubmit(event.talkcontext,event.talkfrom)
        break
      default:
```

第二段直接加在最后，功能函数里是对不同 `from` 设置不同的 UA。

```JavaScript
//加入功能函数
async function talkCommentSubmit (talkcontext,talkfrom) {
  const res = {}
  let talkUA = ''
  if(talkfrom == '微信公众号'){
      talkUA = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; LCTE; rv:11.0)'
  }else if(talkfrom == 'request'){
      talkUA = 'Mozilla/5.0 (X11; Linux i686; rv:21.0) Gecko/20100101 Firefox/21.0'
  }else{
      talkUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11B554a'
  }
  const data = await talkParse(talkcontext,talkUA)
  const comment = await save(data)
  res.id = comment.id
  return res
}
// 将评论转为数据库存储格式
async function talkParse(talkcontext,talkUA) {
  const timestamp = Date.now()
  const commentDo = {
    uid: 'b4dc894b82284197bd4316d707936ea2', //comment数据库里有
    nick: '林木木',
    mail: 'mm@xx.com',
    mailMd5: 'ba83fa02fc4b2ba621514941307e21be', //comment数据库里有
    link: '',
    ua: talkUA,
    ip: '',
    master: true,
    url: '/talk/', //页面路径
    href: 'https://immmmm.com/talk/', //页面路径
    comment: talkcontext,
    isSpam: false,
    created: timestamp,
    updated: timestamp
  }
  return commentDo
}
```

### 正则更新

[bber.js](https://github.com/lmm214/bber/blob/main/bber.js) 内更新正则代码，匹配多种图片标签识别。

```JavaScript
function urlToLink(str) {
  //去除<img>标签，留 src 链接
  var re_forimg =/\<[img|IMG].*?src=[\'|\"](https\:\/\/.*?(?:[\.jpg|\.jpeg|\.png|\.gif|\.bmp]))[\'|\"].*?[\/]?>/g;
  str =str.replace(re_forimg,'$1');
  //去 ![]() 标签，留图片链接
  var re_formd = /^!\[(.*)\]\((.*)\)/g;
  str = str.replace(re_formd,'$2');
  //处理图片链接，添加 a 标签共添加灯箱效果
  var re_forpic =/\bhttps?:[^:<>"]*\/([^:<>"]*)(\.(jpeg)|(png)|(jpg)|(webp))/g;
  str =str.replace(re_forpic,function (imgurl) {
    return '<a href="' + imgurl + '"><img src="' + imgurl + '" /></a>';
  });
  //处理普通链接，添加 a 标签供跳转
  var re =/\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
  str =str.replace(re,function (website) {
    return " <a href='" + website + "'rel='noopener' target='_blank'>↘链接↙</a> ";
  });
  //微信表情
  str = qqWechatEmotionParser(str)
  return str; 
}
```

