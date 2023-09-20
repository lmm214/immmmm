document.addEventListener("DOMContentLoaded", () => {
//头部 bb
var bbDom = document.querySelector('#bber-talk') || '';
if(bbDom){memoTalks();}
function memoTalks(){
var bbUrl = "https://me.edui.fun/api/v1/memo?creatorId=101&rowStatus=NORMAL&limit=10"
fetch(bbUrl).then(res => res.json()).then( resdata =>{
    var result = '',resultAll="",data = resdata
    for(var i=0;i < data.length;i++){
        var bbTime = new Date(data[i].createdTs * 1000).toLocaleString()
        var bbCont = data[i].content
        var newbbCont = bbCont.replace(/!\[.*?\]\((.*?)\)/g,' <a href="$1" target="_blank">🌅</a> ').replace(/\[(.*?)\]\((.*?)\)/g,' <a href="$2" target="_blank">$1 🔗</a> ')
        result += `<li class="item"><span class="datetime">${bbTime}</span>： <a href="/bb/">${newbbCont}</a></li>`;
    }
    var bbBefore = `<span class="index-talk-icon"><svg viewBox="0 0 1024 1024" width="21" height="21"><path d="M184.32 891.667692c-12.603077 0-25.206154-2.363077-37.809231-7.876923-37.021538-14.966154-59.864615-49.624615-59.864615-89.009231v-275.692307c0-212.676923 173.292308-385.969231 385.969231-385.969231h78.76923c212.676923 0 385.969231 173.292308 385.969231 385.969231 0 169.353846-137.846154 307.2-307.2 307.2H289.083077l-37.021539 37.021538c-18.904615 18.116923-43.323077 28.356923-67.741538 28.356923zM472.615385 195.347692c-178.018462 0-322.953846 144.935385-322.953847 322.953846v275.692308c0 21.267692 15.753846 29.144615 20.48 31.507692 4.726154 2.363077 22.055385 7.876923 37.021539-7.08923l46.473846-46.473846c6.301538-6.301538 14.178462-9.452308 22.055385-9.452308h354.461538c134.695385 0 244.184615-109.489231 244.184616-244.184616 0-178.018462-144.935385-322.953846-322.953847-322.953846H472.615385z"></path><path d="M321.378462 512m-59.076924 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M518.301538 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M715.224615 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153846 0 59.076923 59.076923 0 1 0-118.153846 0Z"></path></svg></span><div class="talk-wrap"><ul class="talk-list">`
    var bbAfter = `</ul></div>`
    resultAll = bbBefore + result + bbAfter
    if(bbDom){
      bbDom.innerHTML = resultAll;
    }
    //相对时间
    window.Lately && Lately.init({ target: '.datetime' });
});
setInterval(function() {
    for (var s, n = document.querySelector(".talk-list"), e = n.querySelectorAll(".item"), t = 0; t < e.length; t++)
    setTimeout(function() {
      n.appendChild(e[0])
    },1000)
},2000)
}
//memos 相册
var albumDom = document.querySelector('#album') || '';
var memoUrl = "https://me.edui.fun/"
if(albumDom){memoAlbum(6);}
function memoAlbum(numb){
    let limit = numb || 8;
    var galleryUrl = memoUrl+"api/v1/memo?creatorId=101&rowStatus=NORMAL&limit="+limit+"&tag=相册"
    var localalbumUpdated = JSON.parse(localStorage.getItem("albumUpdated")) || '';
    var localalbumData = JSON.parse(localStorage.getItem("albumData")) || '';
    if(localalbumData){
      loadAlbum(localalbumData,limit)
      console.log("memoAlbum 本地数据加载成功")
    }else{
      localStorage.setItem("albumUpdated","")
    }
    fetch(galleryUrl).then(res => res.json()).then( resdata =>{
      var albumUpdated = resdata[0].updatedTs
      if(albumUpdated && localalbumUpdated != albumUpdated){
        var albumData = resdata
        albumDom.innerHTML = "";
        loadAlbum(albumData,limit)
        localStorage.setItem("albumUpdated",JSON.stringify(albumUpdated))
        localStorage.setItem("albumData",JSON.stringify(albumData))
        console.log("memoAlbum 热更新完成")
      }else{
        console.log("memoAlbum API 数据未更新")
      }
    });
}
function loadAlbum(albumData,limit){
  var result = '',resultAll="",nowNum = 1;
        for(var i=0;i < albumData.length;i++){
            var galleryTitle = albumData[i].content.replace("#相册 ",'')
            var imgs = galleryTitle.match(/\!\[(.*?)\s*(.*?)\]\((.*?)\)/g)
            //解析 content 内 md 格式图片
            if(imgs){
              imgs.forEach(item => {
                if(nowNum < limit ){
                  nowNum ++
                  let img = item.replace(/!\[.*?\]\((.*?)\)/g,'$1'),
                      time, title, tmp = item.replace(/!\[(.*?)\]\(.*?\)/g,'$1');
                  if (tmp.indexOf(' ') != -1) {
                      time = tmp.split(' ')[0];
                      title = tmp.split(' ')[1];
                  } else title = tmp
                  result += `<div class="memos-photo"><img class="photo-img" loading='lazy' decoding="async" src="${img}"></a>`;
                  title ? result += `<span class="photo-title">${title}</span>` : '';
                  time ? result += `<span class="photo-time">${time}</span>` : '';
                  result += `</div>`;
                }
              });
            }
            //解析内置资源文件
            if(albumData[i].resourceList && albumData[i].resourceList.length > 0){
              var resourceList = albumData[i].resourceList;
              for(var j=0;j < resourceList.length;j++){
                var galleryTime = new Date(resourceList[j].createdTs * 1000).toLocaleString()
                var restype = resourceList[j].type.slice(0,5);
                var resexlink = resourceList[j].externalLink
                var resLink = '',fileId=''
                if(resexlink){
                  resLink = resexlink
                }else{
                  fileId = resourceList[j].publicId || resourceList[j].filename
                  resLink = memoUrl+'o/r/'+resourceList[j].id+'/'+fileId
                }
                if(restype == 'image' && nowNum <= limit ){
                    nowNum ++
                    result += '<div class="memos-photo"><img class="photo-img" loading="lazy" decoding="async" src="'+resLink+'"/><span class="photo-title">'+galleryTitle+'</span><span class="photo-time">'+galleryTime+'</span></div>'
                }
              }
            }
        }
        var galleryBefore = `<div class="memos-photo-wrapper">`
        var galleryAfter = `</div>`
        resultAll = galleryBefore + result + galleryAfter
        if(albumDom){
          albumDom.innerHTML = resultAll
        }
        //相对时间
        window.Lately && Lately.init({ target: '.photo-time'});
}
//有圈
var friendDom = document.querySelector('#friArticle') || ''
if(friendDom){MyFriends();}
function MyFriends(){
  var fetchNum = 20;
  var fetchUrl = "https://cf.edui.fun/all?rule=created&end="+fetchNum;
  var localfriendUpdated = localStorage.getItem("friendUpdated") || ''
  var localfriendData = JSON.parse(localStorage.getItem("friendData")) || '';
  if(localfriendData && localfriendUpdated){
    loadFriend(localfriendData,fetchNum)
    console.log("MyFriends 本地数据加载成功")
  }else{
    localStorage.setItem("friendUpdated","")
  }
  fetch(fetchUrl).then(res => res.json()).then(resdata =>{
    var friendUpdated = resdata.statistical_data.last_updated_time
    if(friendUpdated && localfriendUpdated != friendUpdated){
      var friendData = resdata.article_data;
      friendDom.innerHTML = "";
      loadFriend(friendData,fetchNum)
      localStorage.setItem("friendUpdated",friendUpdated)
      localStorage.setItem("friendData",JSON.stringify(friendData))
      console.log("MyFriends 热更新完成")
    }else{
      console.log("MyFriends API 数据未更新")
    }
  })
}
function loadFriend(friendData,fetchNum){
  var error_img="https://gravatar.loli.net/avatar/57d8260dfb55501c37dde588e7c3852c",articleItem = '';
  for (var i = 0;i<fetchNum;i++){
    var item = friendData[i];
    articleItem +=`
    <div class="fri-item">
      <img class="fri-avatar avatar" src="${item.avatar}" alt="${item.author}" onerror="this.src='${error_img}';this.onerror = null;">
      <div class="fri-cont">
        <div class="fri-title"><a target="_blank" rel="noopener nofollow" href="${item.link}">${item.title}</a></div>
        <div class="fri-updated">${item.updated}</div>
      </div>
    </div>
    `;
  }
  friendDom.innerHTML = articleItem
  //相对时间
  window.Lately && Lately.init({ target: '.fri-updated'});
}

});