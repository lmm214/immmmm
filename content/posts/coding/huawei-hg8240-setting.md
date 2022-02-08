---
date: 2013-11-11
title: '华为 HG8240 光猫路由设置方法'
tags: [折腾]
published: true
hideInList: false
isTop: false
---

开通了电信光纤入户，送的光猫是“华为 HG8240”，明明自带路由（可开机就自动拨号），可默认却隐藏了。高手在民间，以下方法来自网络，已试可用：

<h3>一、设置本地连接属性。</h3>

IP地址：<code>192.168.100.2</code>（从 192.168.100.2~192.168.100.254 都可以），子网掩码：<code>255.255.255.0</code>，默认网关：<code>192.168.100.1</code>，DNS空着。

<h3>二、查询 VLAN ID （portvid） 和 802.1p（PortPri）。</h3>


![huawei-1](https://pic.edui.fun/images/2013/11/huawei-1.jpg)

方法： <code>Win+R</code> 输入 <code>cmd</code> 回车，再输入 <code>telnet 192.168.100.1</code> 回车，等待出现“user：”输入 <code>root</code> 回车，出现“password：”输入 <code>admin</code> ，出现 ”WAP&gt;“输入 <code>get port config portid 1</code> 回车，得到端口1的 ”VLAN ID （portvid）“ 和 ”802.1p（PortPri）“值。

<!--more-->

<h3>三、登录HG8240，设置可用 LAN 端口。</h3>

浏览器输入 <code>192.168.100.1</code> ，选中文，输入用户名 <code>telecomadmin</code>，密码 <code>admintelecom</code> 。

![huawei-2](https://pic.edui.fun/images/2013/11/huawei-2.jpg)

头部导航 ”LAN“项内，勾选 <code>LAN1，LAN3，LAN4</code>，点应用。（话说 LAN2 是 iTV 服务专用，未测试。）

<h3>四、设置 PPPoE 自动拨号。</h3>

![huawei-3](https://pic.edui.fun/images/2013/11/huawei-3.jpg)

头部导航”WAN“项内，点击：新建，勾选”使能WAN连接“，链接类型”路由“，服务列表”INTERNET“，勾选”使能VLAN“，VLAN ID 输入查询到的 <code>portvid</code>，802.1p 输入之前查询到的 <code>PortPri</code>，获取IP方式选择”PPPoE“，MRU默认，勾选”使能NAT“，输入宽带的”用户名及密码“，拨号方式”自动“，绑定项勾选”LAN1、3、4“。

最后点击”应用“，关开光猫电源，重启。

<h3>五、确认一下。</h3>

![huawei-4](https://pic.edui.fun/images/2013/11/huawei-4.jpg)

头部导航”状态“项，看到”已连接“，IP地址也获取到了，表示成功！现在光猫已自动拨号网络已连接了，而且 LAN1、3、4 都可直接网线接出。