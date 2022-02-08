---
title: "启用 Twikoo 评论系统"
date: 2020-11-21T21:36:33+0800
tags: [折腾]
---

感谢 [@iMaeGoo](https://www.imaegoo.com/) 大神用爱发电，顺利启用 Twikoo 评论系统，并完美迁移 Valine 评论数据。

下午在 [@大大的小蜗牛 ](https://eallion.com/) 博客看到评论系统右下角竟然不是 Valine 哦，赫然显示这 Twikoo，啥？！

原来是基于腾讯云开发的评论系统，换！

<!--more-->

### 相关教程：

- Twikoo 中文文档：<https://twikoo.js.org/>
- Valine 到 Twikoo 迁移脚本：<https://github.com/imaegoo/twikoo-import-tools>
- Typecho 到 Twikoo 迁移脚本：<https://github.com/Android-KitKat/twikoo-import-tools-typecho>

### 优化新评论邮件通知

以下内容基于 0.2.3 版本,进入云函数 `twikoo -- index.js`

`if (config.SC_SENDKEY) return`，开启了微信通知，则停用“新评论邮件通知”。

相关位置如下：

```javascript
// 博主通知
async function noticeMaster (comment) {
  if (!transporter) if (!await initMailer()) return
  //若设置了微信通知，则不发邮件
  if (config.SC_SENDKEY) return
  if (config.BLOGGER_EMAIL == comment.mail) return
  const SITE_NAME = config.SITE_NAME
```

### 分享邮件通知模板HTMl

{{< figure "https://pic.edui.fun/images/2020/11/twikooC1.png" "https://pic.edui.fun/images/2020/11/twikooC2.png" "评论回复通知模板">}}

建议等后续版本更新，改的话也是进云函数 `twikoo -- index.js` 内替换。

// 博主通知模板
```html
<div style="line-height:24px;font-size:13px;">     <p><span style="color:#3eae5f"> ${NICK} </span> 说：</p>     <p >${COMMENT}</p>     <p style="font-size:12px;line-height:12px;"><a style="color:#b3b3b1;text-decoration:none;" href="${POST_URL}" target="_blank">${POST_URL}</a></p> </div>
```

// 评论回复通知模板
```html
<div style="padding:2em 10%;color:#b3b3b1;width:420px;margin:0 auto;font-size:14px";> 	<p style="text-align:center;">Hi，<span style="color:#3eae5f"> ${PARENT_NICK} </span></p> 	<p style="font-size:13px;text-align:center;">有人回复了您在 <strong style="font-weight:bold"> ${SITE_NAME} </strong> 上的评论</p> 	<hr style="width:64px;border:0;border-bottom:1px solid #e5e5e5;margin:24px auto;">     <div style="color:#333;overflow:hidden;">     	<p style="display:inline-block;float:left;"><span style="color:#3eae5f;font-weight:bold"> 您 </span><span>说：</span></p>     	${PARENT_COMMENT}     </div>     <div style="color:#333;overflow:hidden;">      	<p style="display:inline-block;float:left;"><span style="color:#3eae5f;font-weight:bold"> ${NICK} </span><span>说：</span></p>      	${COMMENT}     </div>     <p><a style="color:#ffffff;text-decoration:none;display:inline-block;min-height:28px;line-height:28px;padding:0 13px;outline:0;background:#3eae5f;font-size:13px;text-align:center;font-weight:400;border:0;border-radius:999em" href="${POST_URL}" target="_blank">点击查看</a></p>     <hr style="width:64px;border:0;border-bottom:1px solid #e5e5e5;margin:24px auto;">     <p><a style="display:block;color:#b3b3b1;text-decoration:none;text-align:center;" href="${SITE_URL}" target="_blank"> ${SITE_NAME} </a></p> </div>
```

### 评论样式自定义

主要匹配了暗黑样式和评论管理页面改为全屏，效果对比：

{{< figure "https://pic.edui.fun/images/2020/11/Twikoo-1.png" "https://pic.edui.fun/images/2020/11/Twikoo-2.png" "Twikoo">}}

```css
.dark-theme .tk-tag{background-color: #4a4b50 !important;border-color:#434a56 !important;display: inline !important;padding: 2px 4px !important;}
.dark-theme .tk-expand{background:linear-gradient(rgba(38,42,56,0),#3b3d42) !important;}
.dark-theme .el-button,.dark-theme .el-input__inner, .dark-theme .el-textarea__inner, .dark-theme .tk-tag-green{color: silver !important;background-color: #252627 !important;border-color: #4a4b50 !important;}
.dark-theme .tk-meta-input .el-input .el-input-group__prepend{color: silver !important;background-color: #4a4b50 !important;border-color: #4a4b50 !important;}
.dark-theme .el-button--primary.is-disabled,.dark-theme .el-button--primary.is-disabled:active,.dark-theme .el-button--primary.is-disabled:focus,.dark-theme .el-button--primary.is-disabled:hover{color: #FFF !important;background-color: #252627 !important;border-color: #4a4b50 !important;}
.dark-theme .el-button.tk-preview{border:none;}
.dark-theme .tk-action-icon svg,.dark-theme .tk-comments-title .tk-icon svg{fill: #ccc !important;}
.dark-theme .tk-action-count{color: #ccc !important;}
.tk-extras,.tk-row.actions .tk-action-icon,.tk-preview{display: none !important;}
.tk-content p{margin: 0;}
.tk-admin{position:fixed !important;}
.tk-admin-comment table col[name=el-table_1_column_1]{width:5%;}
.tk-admin-comment table col[name=el-table_1_column_2],.tk-admin-comment table col[name=el-table_1_column_3]{width:10%;}
.tk-admin-comment table col[name=el-table_1_column_4]{width:55%;}
.tk-admin-comment table col[name=el-table_1_column_5]{width:15%;}
```