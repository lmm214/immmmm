app.auth({
    persistence: "none" //避免与同实例冲突
}).anonymousAuthProvider().signIn().then(() => {
    var bbClass = '#bber'
    $(bbClass).after('<div class="load"><button class="load-btn button-load">加载中……</button></div>')
    const db = app.database()
    const collection = db.collection('talks')
    var count=0, per = 9,page = 1
    collection.count(function(err,res){
      count = res.total
      $(bbClass).append('<p class="count">共 <span class="count-data">'+count+'</span> 条</p>')
      getList()
    })
    function getList(){
      if((page-1)*per >= count){
        return
      }
      var d,date,resCont=''
      collection.limit(per).skip((page-1)*per).orderBy('date','desc').get(function(err, res) {
        (res.data).forEach(item => {
          d = item.date,data = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() +' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
          dataTime = '<p class="datatime">'+data+'</p>'
          dataCont = '<p class="datacont">'+urlToLink(item.content)+'</p>'
          dataFrom = item.from ? '<p class="datafrom"><small>#'+item.from+'</small></p>' : ''
          resCont += '<li class="item"><div>'+dataTime+dataCont+dataFrom+'</div></li>'
        }); 
        $(bbClass).append('<section class="timeline page-'+page+'"><ul><div class="list">'+resCont+'</div></ul></section>')
        $('button.button-load').text('加载更多')
        $('html,body').animate({ scrollTop: $('.timeline.page-'+page).offset().top - 20 }, 500)
        if(page*per >= count){
          $('.load').remove()
          return
        }
        page++
        Lately({ 'target': '#bber .datatime' });
        $("#bber a[rel!=link]:has(img)").slimbox();//图片灯箱效果
      });
    }
    $('.button-load').click(function(){
      $('.button-load').text('加载中……')
      getList()
    })
}).catch(err => {
    console.log(err)
});
function urlToLink(str) {
  var re =/\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
  var re_forpic =/\bhttps?:[^:<>"]*\/([^:<>"]*)(\.(jpeg)|(png)|(jpg)|(webp))/g;
  str =str.replace(re_forpic,function (imgurl) {
    return '<a href="' + imgurl + '"><img src="' + imgurl + '" /></a>';
  });
  str =str.replace(re,function (website) {
    return " <a href='" + website + "'rel='noopener' target='_blank'>↘链接↙</a> ";
  });
  str = qqWechatEmotionParser(str)
  return str; 
}
/*
 MIT License - http://www.opensource.org/licenses/mit-license.php
 For usage and examples, visit:
 https://tokinx.github.io/lately/
 Copyright (c) 2017, Biji.IO
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(b){var g=0;return function(){return g<b.length?{done:!1,value:b[g++]}:{done:!0}}};$jscomp.arrayIterator=function(b){return{next:$jscomp.arrayIteratorImpl(b)}};$jscomp.makeIterator=function(b){var g="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return g?g.call(b):$jscomp.arrayIterator(b)};
(function(b,g){var p=function(h){var d=h.lang||{second:"\u79d2",minute:"\u5206\u949f",hour:"\u5c0f\u65f6",day:"\u5929",month:"\u4e2a\u6708",year:"\u5e74",ago:"\u524d",error:"NaN"};h=$jscomp.makeIterator(document.querySelectorAll(h.target||".time"));for(var c=h.next();!c.done;c=h.next()){c=c.value;var a=c.dateTime;var e=c.title,f=c.innerHTML;if(!a||isNaN(new Date(a=a.replace(/(.*)[a-z](.*)\+(.*)/gi,"$1 $2").replace(/-/g,"/"))))if(e&&!isNaN(new Date(e=e.replace(/-/g,"/"))))a=e;else if(f&&!isNaN(new Date(f=
f.replace(/-/g,"/"))))a=f;else break;c.title=a;a=new Date(a);a=((new Date).getTime()-a.getTime())/1E3;e=a/60;f=e/60;var k=f/24,l=k/30,m=l/12;c.innerHTML=(1<=m?Math.floor(m)+d.year:1<=l?Math.floor(l)+d.month:1<=k?Math.floor(k)+d.day:1<=f?Math.floor(f)+d.hour:1<=e?Math.floor(e)+d.minute:1<=a?Math.floor(a)+d.second:d.error)+d.ago}};var n=function(){return this||(0,eval)("this")}();"Lately"in n||(n.Lately=p)})();