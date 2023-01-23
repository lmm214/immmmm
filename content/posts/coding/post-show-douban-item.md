---
title: "文章内显示豆瓣条目"
date: 2022-03-24T23:16:34+0800
tags: [折腾]
---

小众豆瓣已成刚需，电影、图书看完都会标记下，写日志时常会提到，老想着在文章内「优雅」地展示，官方 API 已废，~~幸好还有给力的 [@mufeng](https://mufeng.me/) 兄，以下功能就使用其提供的轮子。~~

换用轮子：<https://github.com/cxfksword/douban-api-rs> 

### 效果如下

{{< douban "https://movie.douban.com/subject/34953719/">}}

{{< douban "https://book.douban.com/subject/35254632/">}}

<!--more-->

### 使用方式

如果是md的话之间输入以下格式，其他输入a标签链接，注意链接以 `/` 斜杠结尾。

```html
<https://movie.douban.com/subject/34953719/>
<https://book.douban.com/subject/35254632/>
```

### 相关代码

head 头部添加 meta ：

```html
<meta name="referrer" content="no-referrer">
```

基于 jQuery 的功能代码，内置自建 API 不保证稳定（瞬间被502，哎……）：

```javascript
//豆瓣图书电影条目
$(".post-content a[href*='douban.com/subject/']").each(function(){var _this=$(this);var str=_this.attr("href");var db_reg=/^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;if(db_reg.test(str)){var db_type=str.replace(db_reg,"$1");var db_id=str.replace(db_reg,"$2").toString();var db_api="https://douban.edui.fun/";if(db_type=='movie'){var ls_item='movie'+db_id;var url=db_api+"movies/"+db_id;if(localStorage.getItem(ls_item)==null||localStorage.getItem(ls_item)=='undefined'){$.ajax({url:url,type:'GET',dataType:"json",success:function(data){localStorage.setItem(ls_item,JSON.stringify(data));moiveShow(_this,ls_item)}})}else{moiveShow(_this,ls_item)}}else if(db_type=='book'){var ls_item='book'+db_id;var url=db_api+"v2/book/id/"+db_id;if(localStorage.getItem(ls_item)==null||localStorage.getItem(ls_item)=='undefined'){$.ajax({url:url,type:'GET',dataType:'json',success:function(data){localStorage.setItem('book'+db_id,JSON.stringify(data));bookShow(_this,ls_item)}})}else{bookShow(_this,ls_item)}}}});function moiveShow(_this,ls_item){var storage=localStorage.getItem(ls_item);var data=JSON.parse(storage);var str=_this.attr("href");console.log(data)var db_star=Math.ceil(data.rating);$("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='"+str+"'>《"+data.name+"》</a></h4><div class='rating'><div class='rating-star allstar"+db_star+"'></div><div class='rating-average'>"+data.rating+"</div></div><time class='post-preview--date'>导演："+data.director+" / 类型："+data.genre+" / "+data.year+"</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>"+data.intro.replace(/\s*/g,"")+"</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src="+data.img+"></div>").replaceAll(_this)}function bookShow(_this,ls_item){var storage=localStorage.getItem(ls_item);var data=JSON.parse(storage);var str=_this.attr("href");var db_star=Math.ceil(data.rating.average);$("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='"+str+"'>《"+data.title+"》</a></h4><div class='rating'><div class='rating-star allstar"+db_star+"'></div><div class='rating-average'>"+data.rating.average+"</div></div><time class='post-preview--date'>作者："+data.author+" </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>"+data.summary.replace(/\s*/g,"")+"</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src="+data.images.medium+"></div>").replaceAll(_this)}
```

样式代码：

```css
.post-preview{max-width:780px;height:210px;margin:1em auto;position:relative;display:flex;background:#fff;border-radius:4px;box-shadow:0 1px 2px rgba(0,0,0,.25),0 0 1px rgba(0,0,0,.25);}.post-preview--meta{width:75%;padding:25px;overflow:hidden;}.post-preview--middle {line-height:28px;}.post-preview--title {font-size:18px;margin:0!important;}.post-preview--title a{text-decoration:none;}.post-preview--date{font-size:14px;color:#999;}.post-preview--excerpt{font-size:14px;line-height:1.825;}.post-preview--excerpt p{display: inline;margin: 0;}  .post-preview--image {height:210px!important;width:auto;float:right;border-top-right-radius: 2px!important;border-bottom-right-radius:2px!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important;}
@media (max-width:550px) {.post-preview {width:95%;}.post-preview--excerpt{display:none;}.post-preview--middle {line-height:19px;}}
.rating{display:block;line-height:15px;}.rating-star{display:inline-block;width:75px;height:15px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAClCAYAAAAUAAAYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5xJREFUeNrs3T9rFEEcxvG7qEQIglaCICKkin9AUEtBKxU7wS61VlYivgWj70TtNFj5BqzE7qxEWwsxKIoYn4UtluFmbm8nczvzm+/BjxyuDwNzu3uXD0+46f7LC5PA45Hm+WTYw1x2LRDc0jzTXB+wqMlsaLPutz8fDFjYZHYauAz3NBvt83XNnyUWNpn1nVm3OsHmsb3EomazzZnVXKMPNcc0xzUnNKc0Rzv/77fms+Z7O3vt9b1eU7bZrNN68l5zcolX4ofmsuZXTdnmMvyi2dR86Bmcac62P6vKrnVubpc0bxYE32nOab45N8YqsvPeDfcD4SOav4HjprPuu+H5BTt9LXDMfNbdLPfT678Fx6vKupt1o/O8+R3pkOaJ5/iktqx7z/qp+aq5q/nY+fczmheaK03Gs7D5rLtZdzSvA6/Ebc2u55j57HQB0TzW7AzkjiKzny6+2hlKNE8juMNcFqKBaIZndRlCNBBNgmx7ZkE0fbLtZkE0EA1EM17WuQwhGogGooFoss6296y52cNO+J6HLJoPaFdbsvA9zGerIxrPh85eWYgGooFoDiQbuAxp0UA0EVmdWbRo+ma1WbRoIBqIZtzsnHdDWjQQDUQD0WSbde5ZS2UhmtqJJtSEiVkXooFoIJre2VATJmZdiKZ2ogk1YSb8oVMvDeUPnSAaiCaPJkzMuhANRAPRQDQpsqEmTMy6EI11oolpwkA0EA1EcyDZmCYMRAPR+LMxTZjqiCamCQPRQDQQzehNGIgGooFoIJpVZ2OaMBBN7USTqgkD0UA0EE3vbKomDERTO9GkasKYJJpUTRiIBqKBaEZvwkA0EA1EA9GkyKZqwkA01olmrCYMRAPRQDR9LkO+0QmiKbAJUyTRjNWEgWggGohm9CYMRAPRQDQQzZDsWE0YiMYC0eTYhIFoIJrKiCbHJgxEY4FocmzCZEs0OTZhIBqIpjKiybEJA9FANBANROPL5tiEgWhKIJoSmzAQDURjjGhKbMJANCUQTYlNmNGIpsQmDEQD0RgjmhKbMBANRAPR1Es0JTZhIJpciMZaEwaigWgKJBprTRiIJheisdaESUo01powEA1EUyDRWGvCQDQQDURjm2isNWEgmlURzWw2q4pZIBqIJkOiCVyGJpkFolkV0ejMMvel28mIRptl7ku3IRqIpjCimfNuaJpZIBqIBqIpm2ice5Z5ZonJupvVkMRu4JW4qXnrOWY++1+AAQBw9BJSCTeN9wAAAABJRU5ErkJggg==);overflow:hidden;}.allstar10{background-position:0px 0px;}.allstar9{background-position:0px -15px;}.allstar8{background-position:0px -30px;}.allstar7{background-position:0px -45px;}.allstar6{background-position:0px -60px;}.allstar5{background-position:0px -75px;}.allstar4{background-position:0px -90px;}.allstar3{background-position:0px -105px;}.allstar2{background-position:0px -120px;}.allstar1{background-position:0px -135px;}.allstar0{background-position:0px -150px;}.rating-average{color:#777;display:inline-block;font-size:13px;margin-left:10px;}
```

### 其它 api 收集


<https://github.com/iiiiiii1/douban-imdb-api>