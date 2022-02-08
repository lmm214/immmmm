---
title: "哔哔 Pro"
date: 2020-12-28T23:39:12+0800
tags: [折腾]
feature: https://pic.edui.fun/images/2020/12/bbpro-5.jpeg
---

### Pro N0.1

前端支持链接、图片显示。发哔哔的时候插入图片链接或网址链接，会自动识别显示。核心代码来自 [@黑石](https://www.heson10.com/) :

```javascript
function urlToLink(str) {
  var re =/\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
  var re_forpic =/\bhttps?:\/\/.*?(\.gif|\.jpeg|\.png|\.jpg|\.bmp|\.webp)/g;
  str =str.replace(re,function (website) {
    return "<a href='" + website + "' target='_blank'> <i class='iconfont icon-lianjie-copy'></i>链接 </a>";
  });
  str =str.replace(re_forpic,function (imgurl) {
    return "<img src='" + imgurl + "'  /> ";
  });
  return str;
}
```

完整代码参考本主题 [bb.html](<https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/_default/bb.html>) ，主要加了上面的过滤正则 `urlToLink(item.content)` 。

### Pro N0.2

接入 [去不图床](https://7bu.top/) ，注册之后访问：

`https://7bu.top/api/token?email=你的邮箱&password=你的密码` 记下 `token` 值。

[图片上传API](https://7bu.top/index/api.html) 异常直接，post `https://7bu.top/api/upload` ，header 带上自己的 `token`，不带则匿名上传。用表单的请求参数 `image` 提交 `File`。

相关教程：[去不图床PicGo上传插件的使用](https://dusays.com/241/)、[uPic 图床配置教程 - 自定义](https://blog.svend.cc/upic/tutorials/custom/)

### Pro N0.3

iOS 快捷指令上传图片后返回链接，到哔哔输入框。

<photos>![bbpro-1](https://pic.edui.fun/images/2020/12/bbpro-1.jpeg)![bbpro-2](https://pic.edui.fun/images/2020/12/bbpro-2.jpeg)![bbpro-3](https://pic.edui.fun/images/2020/12/bbpro-3.png)![bbpro-4](https://pic.edui.fun/images/2020/12/bbpro-4.png)</photos>

甚至用“快捷指令调用其他指令”实现同步发哔哔和Flomo。

![bbpro-5](https://pic.edui.fun/images/2020/12/bbpro-5.jpeg)

具体其他平台发布方式，改日改日再琢磨～