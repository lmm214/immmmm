---
title: "点击继续，好的"
date: 2022-07-14T10:55:07+0800
tags: [折腾]
---

疫情之下，大多培训变成了“线上+线下”混合模式，这里得嘲讽一下“线上”培训，尤其是要达到一定的「视频时长」这个要求。

看就看吧，还限制多标签、多浏览器、多终端同时看，恶心到点了每隔十几分钟“点击继续”的弹窗才记录观看时长，更恶心的是视频课程质量无下限……

行吧，解锁这点限制 「控制台」几行 JavaScript 大法应该够用！因为这些限制基本上是“本地”限制而非“服务器”验证。

<!--more-->

基本思路是，模拟人工点击、直接调用完成函数、模拟 AJAX 提交。已搞定以下5个站点：

1. jsfzxx.zjedu.gov.cn
2. hdpx-tyxl.webtrn.cn
3. peixun.xueanquan.com
4. tsgc.uteacher.net
5. study.enaea.edu.cn

### 模拟点击1

适用网站：`jsfzxx.zjedu.gov.cn`

实现效果：当弹出“点击继续”按钮时，自动点击！（并让视频从头开始播放，这样1个视频就能一直看。）

![atuo-1](https://r2.immmmm.com/2022/07/atuo-1.jpg)

```JavaScript
function Click(){
    var elE = document.getElementsByClassName("alarmClock-wrapper")[0],disPlay = elE.style.display;
    if(disPlay == 'none'){
        console.log("正常")
    }else{
        elE.click();
        document.querySelector("video").currentTime = 0;
        console.log("自动点击成功!!!!!!")
    }
}
setInterval("Click();",10000);
```

### 模拟点击2

适用网站：`hdpx-tyxl.webtrn.cn`

```JavaScript
function Click(){
    var elE = document.getElementsByClassName("layui-layer-btn0")[0];
    var elEx = !!elE;
    if(!elEx){
        console.log("监测中……")
    }else{
        elE.click();
        console.log("自动点击成功!!!!!!")
    }
}
setInterval("Click();",10000);
```

### 调用完成函数1

适用网站：`hdpx-tyxl.webtrn.cn`

实现效果：秒杀！代码输入回车后，直接完成！点下个视频，走一波！

```JavaScript
var PI=parseInt(duration);SetVideoFinish(PI);
```

### 模拟 AJAX 提交1

适用网站：`tsgc.uteacher.net`

实现效果：秒杀！！！找个大于5分钟的视频，点击播放，丢入代码，完成走人～

```JavaScript
var date=new Date();
var sec=date.getSeconds();
date.setSeconds(sec - video_times + 100);
var y = date.getFullYear();
var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
var f = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
var s = date.getSeconds() < 10 ? ('0' + date.getseconds()) : date.getSeconds();
var formatdate = y+'/'+m+'/'+d + " " + h + ":" + f + ":" + s;
var NowSecond = parseInt(video_times - 100);
var start_time = formatdate;
var sftb = navigator.userAgent.indexOf('Chrome') > -1;
$.ajax({
	url: "/ProjectService/Add_user_train_course_log"
	, type: "Post"
	, async: sftb
	, data: { "project_id": PROJECTID, "class_id": CLASSID, "rw_id": TASKID, "pz_id": PZHIID, "course_id": EXAMID, "vid": video_id, "vtime": video_times, "now_seconds": NowSecond, "timestr": start_time, "upcode": update_code, "course_name": course_name, "video_name": c_video_name }
	, success: function (data) {}
	, error: function (XMLHttpRequest, textStatus, errorThrown) {}
});
```

### 模拟 AJAX 提交2

适用网站：`tsgc.uteacher.net`

实现效果：5倍速完成1080分钟视频课程，同个课程自动播放下一个。

```JavaScript
var i = $('.current').index();
vvp();
function vvp(){document.querySelector("video").pause();}
function Up(){
    $.ajax({
        url: "https://study.enaea.edu.cn/studyLog.do",
        data: {
            id: currPlayCoursecontentId,
            circleId: jsp_circleId,
            studyMins: 5
        },
        dataType: "json",
        type: "post",
        success: function(n) {
            console.log(n.progress);
            if(n.progress == '100'){
                i++;
                if( i < $(".cvtb-MCK-course-content").length){
                    $(".cvtb-MCK-course-content")[i].click();
                    setTimeout(vvp, 2000);
                    console.log("第"+i+"个已完成，自动下一个");
                }else{
                    console.log("本课程已完成");
                }
            }
        }
    })
}
setInterval("Up();",60000);
```

