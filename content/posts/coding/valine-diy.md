---
date: 2019-07-15
title: 'Valine 评论框美化及功能优化'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

以下修改不涉及 Valine 源码的改动，防止后续官方更新还得再来一边。因此，相关 css、js 代码得放在调取 `valine.min.js` 之后。

### 评论框美化：

![评论框美化：](https://pic.edui.fun/images/2019/07/plk.jpg)

```css
.v .vwrap{padding: 0 0 44px;}.v .veditor{min-height:7rem;resize:none;}.v .vwrap .vedit{padding-top:0}.v .vwrap .vheader{width: 80%;bottom:0;position: absolute;background: #f7f7f7;}.v .vinput{padding:10px 15px;}.v .vwrap .vheader .vinput{border-bottom:0px}.v .vwrap .vedit .vctrl{margin-top:-44px;right:0;position:absolute;margin-right:-3px;}.v .vwrap .vcontrol{    position:absolute;right:0;bottom:0;width:20%;padding-top:0px;}.v .vwrap .vcontrol .col.col-80{width: 100%;}.v .vbtn.vsubmit{border-radius: 0;padding: 0;color: #fff;line-height: 44px;width:100%;border: none;background:#1abc9c;}.v .vwrap .vedit .vctrl span.vpreview-btn,.v .vwrap .vcontrol .col.col-20,.v .vlist .vcard .vhead .vsys{display:none;}
@media screen and (max-width: 520px){
	.v .vwrap .vheader .vinput{width: 33.33%;padding:10px 5px;}
}
```

<!--more-->

### 点击回复直接评论

官方版本点击回复时都是跳回到页面上方的评论框进行回复，评论框是固定不动的。比较合理的是：点哪条的回复，评论框就显示在此条评论下方。避免页面跳上跳下。

相关 jQuery 代码：

```javascript
$(document).ready(function(){
	$('.vemoji-btn').text('😀');
	$("#vcomments").on('click', 'span.vat',function(){
		$(this).parent('div.vmeta').next("div.vcontent").after($("div.vwrap"));
		$('textarea#veditor').focus();
	})
})
```

短短几行，折腾了一个深夜加一个下午，主要是卡在点击事件得使用动态绑定事件，还有卡在移动dom后页面滚动定位错误，前者使用 on 解决，后者加个 focus 解决。

### 自定义邮件回复样式

![自定义邮件回复样式](https://pic.edui.fun/images/2019/07/mail-re1.jpg)

分享给已成功使用了 Valine Admin 的同学。

`MAIL_TEMPLATE` 代码，自行替换logo图片地址：

```html
<div style="padding:2em 10%;color:#b3b3b1;width:420px;margin:0 auto;font-size:14px";>
	<img style="display:block;width:50px;margin:0 auto" src="https://图片地址/logo.png">
	<p style="text-align:center;">Hi，<span style="color:#3eae5f"> ${PARENT_NICK} </span></p>
	<p style="font-size:13px;text-align:center;">有人回复了您在 <strong style="font-weight:bold"> ${SITE_NAME} </strong> 上的评论</p>
	<hr style="width:64px;border:0;border-bottom:1px solid #e5e5e5;margin:24px auto;">
	<div style="color:#333;overflow:hidden;">
		<p style="display:inline-block;float:left;"><span style="color:#3eae5f;font-weight:bold"> 您 </span><span>说：</span></p>
		${PARENT_COMMENT}
	</div>
	<div style="color:#333;overflow:hidden;">
		<p style="display:inline-block;float:left;"><span style="color:#3eae5f;font-weight:bold"> ${NICK} </span><span>说：</span></p>
		${COMMENT}
	</div>
	<p><a style="color:#ffffff;text-decoration:none;display:inline-block;min-height:28px;line-height:28px;padding:0 13px;outline:0;background:#3eae5f;font-size:13px;text-align:center;font-weight:400;border:0;border-radius:999em" href="${POST_URL}" target="_blank">点击查看</a></p>
	<hr style="width:64px;border:0;border-bottom:1px solid #e5e5e5;margin:24px auto;">
	<p><a style="display:block;color:#b3b3b1;text-decoration:none;text-align:center;" href="${SITE_URL}" target="_blank">${SITE_NAME}</a></p>
</div>
``` 

`MAIL_TEMPLATE_ADMIN` 通知博主邮件模板代码：

```html
<div style="line-height:24px;font-size:13px;">
    <p><span style="color:#3eae5f"> ${NICK} </span> 说：</p>
    <p >${COMMENT}</p>
    <p style="font-size:12px;line-height:12px;"><a style="color:#b3b3b1;text-decoration:none;" href="${POST_URL}" target="_blank">${POST_URL}</a></p>
</div>
```