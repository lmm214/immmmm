/*
Last Modified time : 20220130 19:14 by https://immmmm.com
基于 FriendCircle 公共库 API
*/

//默认数据
var fdata = {
  apiurl: 'https://circle-of-friends-simple.vercel.app/',
  initnumber: 20,  //首次加载文章数
  stepnumber: 10,  //更多加载文章数
  article_sort: 'updated', //文章排序 updated or created
  error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c'
}
//可通过 var fdataUser 替换默认值
if(typeof(fdataUser) !=="undefined"){
  for(var key in fdataUser) {
    if(fdataUser[key]){
      fdata[key] = fdataUser[key];
    }
  }
}
var article_num = '',sortNow='',friends_num=''
var container = document.getElementById('fcircleContainer');
var createdBtn = document.getElementById('createdBtn')
var updatedBtn = document.getElementById('updatedBtn')
// 获取本地 排序值，实现记忆效果
var localSortNow = localStorage.getItem("sortNow")
if(localSortNow){
  sortNow = localSortNow
}else{
  sortNow = fdata.article_sort
  localStorage.setItem("sortNow",sortNow)
}
// 打印基本信息 fMessageBoard
function loadStatistical(sdata){
  article_num = sdata.article_num
  friends_num = sdata.friends_num
  var messageBoard =`
  <div id="fMessageBoard" class="fNewDiv">
    <div class="fMessageItem">
      <div class="fActiveFriend fItem" onclick="openToShow()">
        <span class="fLabel">订阅</span>
        <span class="fMessage">${sdata.friends_num}</span>
      </div>
      <div class="fErrorSite fItem" onclick="changeEgg()">
        <span class="fLabel">活跃</span>
        <span class="fMessage">${sdata.active_num}</span>
      </div>
      <div class="fArticleNum fItem">
        <span class="fLabel">日志</span>
        <span class="fMessage">${sdata.article_num}</span>
      </div>
    </div>
    <div id="switchRankBtn">
        <span id="createdBtn" data-sort="created" onclick="changeSort(event)" class="${sortNow == 'created' ? 'rankByNow':''}">Created</span> | <span id="updatedBtn" data-sort="updated" onclick="changeSort(event)" class="${sortNow == 'updated' ? 'rankByNow':''}" >Updated</span>
    </div>
  </div>
  `;
  var loadMoreBtn = `
    <div id="fcircleMoreBtn" class="fNewDiv" onclick="loadNextArticle()"><i class="fas fa-angle-double-down"></i></div>
    <div id="fUpdatedTime"  class="fNewDiv">
      <span class="fLabel">更新于：</span><span class="fMessage">${sdata.last_updated_time}</span>
    </div>
    <div id="fcircleFooter" class="fNewDiv">Powered by <a target="_blank" href="https://github.com/Rock-Candy-Tea/hexo-circle-of-friends" target="_blank">FriendCircle</a></div>
    <div id="fcircleShow" class="fNewDiv"></div>
  `;
  if(container){
    container.insertAdjacentHTML('beforebegin', messageBoard);
    container.insertAdjacentHTML('afterend', loadMoreBtn);
  }
}
// 打印文章内容 fArticleItem
function loadArticleItem(datalist,start,end){
  var articleItem = '';
  var articleNum = article_num;
  var endFor = end
  if(end > articleNum){endFor = articleNum}
  if(start < articleNum){
    for (var i = start;i<endFor;i++){
      var item = datalist[i];
      articleItem +=`
      <div class="fArticleItem">
      <div class="fArticleMessage">
        <a class="fArticleTitle"  href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a>
        <span class="fArticleFloor">${item.floor}</span>
        <div class="fArticleAvatar no-lightbox">
          <img class="fArticlelink fAvatar avatar" src="${item.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <a onclick="openMeShow(event)" data-link="${item.link}" class="" target="_blank" rel="noopener nofollow" href="javascript:;"><span class="fArticleAuthor">${item.author}</span></a>
          <span class="fArticleTime">
            <span class="fArticleCreated" style="${sortNow == 'created' ? '':'display:none'}"><i class="far fa-calendar-alt">发表于</i>${item.created}</span>
            <span class="fArticleUpdated" style="${sortNow == 'updated' ? '':'display:none'}"><i class="fas fa-history">更新于</i>${item.updated}</span>
          </span>
        </div>
      </div>
      </div>
      `;
    }
    container.insertAdjacentHTML('beforeend', articleItem);
    // 预载下一页文章
    fetchNextArticle()
  }else{
    // 文章加载到底
    document.getElementById('fcircleMoreBtn').outerHTML = `<div id="fcircleMoreBtn" class="fNewDiv" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>`
  }
}
// 打印个人卡片 fcircleShow
function loadFcircleShow(userinfo,articledata){
  var showHtml = `
        <a href="javascript:;" class="fclose" onclick="closeShow()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></a>
      <div class="fcircleShow">
        <div class="fcircleShowHead">
          <img class="fArticlelink fAvatar avatar" src="${userinfo.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <a class="" target="_blank" rel="noopener nofollow" href="${userinfo.link}">${userinfo.author}</a>
        </div>
        <div class="fcircleShowContent">
  `
  for (var i = 0;i<userinfo.article_num;i++){
    var item = articledata[i];
    showHtml += `
      <p><a class="fArticleTitle"  href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a><span>${item.created}</span></p>
    `
  }
  showHtml += '</div></div>'
  document.getElementById('fcircleShow').innerHTML = showHtml
}

// 预载下一页文章，存为本地数据 nextArticle
function fetchNextArticle(){
  var start = document.getElementsByClassName('fArticleItem').length
  var end = start + fdata.stepnumber
  var articleNum = article_num;
  if(end > articleNum){
    end = articleNum
  }
  if(start <  articleNum){
    var fetchUrl = fdata.apiurl+"api?rule="+sortNow+"&start="+start+"&end="+end
    fetch(fetchUrl)
      .then(res => res.json())
      .then(json =>{
        var nextArticle = eval(json.article_data);
        console.log("已预载"+"?rule="+sortNow+"&start="+start+"&end="+end)
        localStorage.setItem("nextArticle",JSON.stringify(nextArticle))
    })
  }else if(start = articleNum){
      document.getElementById('fcircleMoreBtn').outerHTML = `<div id="fcircleMoreBtn" class="fNewDiv" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>`
  }
}
// 显示下一页文章，从本地缓存 nextArticle 中获取
function loadNextArticle(){
  var nextArticle = JSON.parse(localStorage.getItem("nextArticle"));
  var articleItem = ""
    for (var i = 0;i<nextArticle.length;i++){
      var item = nextArticle[i];
      articleItem +=`
      <div class="fArticleItem">
      <div class="fArticleMessage">
        <a class="fArticleTitle"  href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a>
        <span class="fArticleFloor">${item.floor}</span>
        <div class="fArticleAvatar flink-item-icon">
          <img class="fArticlelink fAvatar avatar" src="${item.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <a onclick="openMeShow(event)" data-link="${item.link}" class="" target="_blank" rel="noopener nofollow" href="${item.link}"><span class="fArticleAuthor">${item.author}</span></a>
          <span class="fArticleTime">
            <span class="fArticleCreated" style="${sortNow == 'created' ? '':'display:none'}"><i class="far fa-calendar-alt">发表于</i>${item.created}</span>
            <span class="fArticleUpdated" style="${sortNow == 'updated' ? '':'display:none'}"><i class="fas fa-history">更新于</i>${item.updated}</span>
          </span>
        </div>
      </div>
      </div>
      `;
    }
    container.insertAdjacentHTML('beforeend', articleItem);
    // 同时预载下一页文章
    fetchNextArticle()
}
// 没有更多文章
function loadNoArticle(){
  localStorage.removeItem("createdList")
  localStorage.removeItem("updatedList")
  localStorage.removeItem("statisticalData")
  localStorage.removeItem("sortNow")
  document.getElementById('fcircleMoreBtn').remove()
  window.scrollTo(0,document.getElementsByClassName('fMessageBoard').offsetTop)
}
function changeEgg(){
  document.querySelectorAll('.fNewDiv').forEach(el => el.remove());
  container.innerHTML = "";
  FetchFriendCircle(sortNow,true)
}
// 首次加载文章
function FetchFriendCircle(sortNow,egg){
  var end = fdata.initnumber
  var fetchUrl = fdata.apiurl + "api?rule="+sortNow+"&start=0&end="+end
  if(egg){fetchUrl = 'https://circle-of-friends-simple.vercel.app/api?rule='+sortNow+"&start=0&end="+end}
  console.log(fetchUrl)
  fetch(fetchUrl)
    .then(res => res.json())
    .then(json =>{
      var statisticalData = json.statistical_data;
      var articleData = eval(json.article_data);
      loadStatistical(statisticalData);
      loadArticleItem(articleData ,0,end)
      var articleSortData = sortNow+"ArticleData"
      localStorage.setItem("statisticalData",JSON.stringify(statisticalData))
      localStorage.setItem(articleSortData,JSON.stringify(articleData))
    })
}
// 点击切换排序
function changeSort(event){
  sortNow = event.currentTarget.dataset.sort
  localStorage.setItem("sortNow",sortNow)
  document.querySelectorAll('.fNewDiv').forEach(el => el.remove());
  container.innerHTML = "";
  initFriendCircle(sortNow)
}
// 点击开往
var noClick = 'ok';
function openToShow(){
  var fetchUrl = fdata.apiurl + "post"
  if(noClick == 'ok'){
    noClick = 'no'
    fetchShow(fetchUrl)
  }
}
function openMeShow(event){
  event.preventDefault()
  var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  var meLink = event.currentTarget.dataset.link.replace(parse_url, '$1:$2$3')
  console.log(meLink)
  var fetchUrl = fdata.apiurl + "post?link="+meLink
  if(noClick == 'ok'){
    noClick = 'no'
    fetchShow(fetchUrl)
  }
}
// 关闭 show
function closeShow(){
  document.getElementById('fcircleShow').className -= 'fshow';
}
// fetch show
function fetchShow(url){
  fetch(url)
    .then(res => res.json())
    .then(json =>{
      console.log(json)
      noClick = 'ok'
      var statisticalData = json.statistical_data;
      var articleData = eval(json.article_data);
      loadFcircleShow(statisticalData,articleData)
      document.getElementById('fcircleShow').className = 'fshow';
    })
}

// 初始化方法，如有本地数据首先调用
function initFriendCircle(sortNow){
  var articleSortData = sortNow+"ArticleData"
  var statisticalData = JSON.parse(localStorage.getItem("statisticalData"));
  var articleData = JSON.parse(localStorage.getItem(articleSortData));
  container.innerHTML = "";
  if(statisticalData && articleData){
    loadStatistical(statisticalData);
    loadArticleItem(articleData ,0,fdata.initnumber)
    console.log("本地数据加载成功")
  }else{
    FetchFriendCircle(sortNow)
    console.log("第一次加载完成")
  }
}
// 执行初始化
initFriendCircle(sortNow)