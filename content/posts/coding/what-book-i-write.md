---
title: "已写完了哪本书？"
date: 2022-01-30T23:02:01+0800
tags: [折腾]
feature: https://r2.immmmm.com/2022/01/wb-1.png
---

> 统计你输入了多少字，然后告诉你相当于写了本啥书，哈哈  ———— [「博客全站总字数统计」](https://www.jdeal.cn/152.html) 
 
如果博客是 Typecho 可以直接去拿，自己改写成 Hugo 的条件判断……

<!--more-->

加到了这里 [footer.html](https://github.com/lmm214/immmmm/blob/master/themes/hello-friend/layouts/partials/footer.html)

```javascript
{{$scratch := newScratch}}
{{ range (where .Site.Pages "Kind" "page" )}}
    {{$scratch.Add "total" .WordCount}}
{{ end }}
{{$totalWord := $scratch.Get "total" }}
{{ $wowWord := div $totalWord 10000}}
{{ $wowBook := "还在努力更新中..</br>加油！加油啦！"}}
{{ if ge $wowWord 40 }}{{$wowBook = "写完一本我国著名的</br>四大名著了！"}}
{{ else if ge $wowWord 35 }}{{$wowBook = "写完一本 东野圭吾 的</br>《白夜行》了！"}}
{{ else if ge $wowWord 34 }}{{$wowBook = "写完一本 雨果 的</br>《巴黎圣母院》了！"}}
{{ else if ge $wowWord 32 }}{{$wowBook = "写完一本 艾米莉·勃朗特 的</br>《呼啸山庄》了！"}}
{{ else if ge $wowWord 31 }}{{$wowBook = "写完一本 阿来 的</br>《尘埃落定》了！"}}
{{ else if ge $wowWord 30 }}{{$wowBook = "写完一本 茅盾 的</br>《子夜》了！"}}
{{ else if ge $wowWord 28 }}{{$wowBook = "写完一本 张炜 的</br>《古船》了！"}}
{{ else if ge $wowWord 25 }}{{$wowBook = "写完一本 钱钟书 的</br>《围城》了！"}}
{{ else if ge $wowWord 23 }}{{$wowBook = "写完一本 简·奥斯汀 的</br>《傲慢与偏见》了！"}}
{{ else if ge $wowWord 22 }}{{$wowBook = "写完一本 莫泊桑 的</br>《一生》了！"}}
{{ else if ge $wowWord 21 }}{{$wowBook = "写完一本 东野圭吾 的</br>《解忧杂货店》了！"}}
{{ else if ge $wowWord 20 }}{{$wowBook = "写完一本 巴金 的</br>《寒夜》了！"}}
{{ else if ge $wowWord 19 }}{{$wowBook = "写完一本 亚米契斯 的</br>《爱的教育》了！"}}
{{ else if ge $wowWord 18 }}{{$wowBook = "写完一本 沈从文 的</br>《边城》了！"}}
{{ else if ge $wowWord 17 }}{{$wowBook = "写完一本 马克·吐温 的</br>《汤姆·索亚历险记》了！"}}
{{ else if ge $wowWord 16 }}{{$wowBook = "写完一本 曹禺 的</br>《日出》了！"}}
{{ else if ge $wowWord 15 }}{{$wowBook = "写完一本 伯内特 的</br>《秘密花园》了！"}}
{{ else if ge $wowWord 14 }}{{$wowBook = "写完一本 史铁生 的</br>《宿命的写作》了！"}}
{{ else if ge $wowWord 13 }}{{$wowBook = "写完一本 曹禺 的</br>《雷雨》了！"}}
{{ else if ge $wowWord 12 }}{{$wowBook = "写完一本 余华 的</br>《活着》了！"}}
{{ else if ge $wowWord 11 }}{{$wowBook = "写完一本 鲁迅 的</br>《彷徨》了！"}}
{{ else if ge $wowWord 10 }}{{$wowBook = "写完一本 马克·吐温 的</br>《王子与乞丐》了！"}}
{{ else if ge $wowWord 9 }}{{$wowBook = "写完一本 林海音 的</br>《城南旧事》了！"}}
{{ else if ge $wowWord 7 }}{{$wowBook = "写完一本 鲁迅 的</br>《呐喊》了！"}}
{{ else if ge $wowWord 5 }}{{$wowBook = "写完一本 埃克苏佩里 的</br>《小王子》了！"}}
{{ end }}
```

```javascript
共 {{$totalWord }} 字 <br/> {{$wowBook | safeHTML }}
```
