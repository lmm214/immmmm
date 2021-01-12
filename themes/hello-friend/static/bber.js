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
        $('html,body').animate({ scrollTop: $('.timeline.page-'+page).offset().top - 20 }, 800)
        if(page*per >= count){
          $('.load').remove()
          return
        }
        page++
        $(".bber a[rel!=link]:has(img)").slimbox();//图片灯箱效果，需
        $.lately({ 'target': '.datatime' });
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
  var re_forpic =/\bhttps?:\/\/.*?(\.gif|\.jpeg|\.png|\.jpg|\.bmp|\.webp)/g;
  str =str.replace(re,function (website) {
    return " <a href='" + website + "'rel='noopener' target='_blank'>↘链接↙</a> ";
  });
  str =str.replace(re_forpic,function (imgurl) {
    return '<a href="' + imgurl + '"><img src="' + imgurl + '" /></a>';
  });
  str = qqWechatEmotionParser(str)
  return str;
}