/*
Last Modified time : 20220210 15:14 by https://immmmm.com
基于 FriendCircle 公共库 API
*/

//默认数据
var fdata = {
  jsonurl: '',
  apiurl: '',
  apipublieurl: 'https://circle-of-friends-simple.vercel.app/', //默认公共库
  initnumber: 20,  //首次加载文章数
  stepnumber: 10,  //更多加载文章数
  article_sort: 'created', //文章排序 updated or created
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
var article_num = '',sortNow='',UrlNow='',friends_num=''
var container = document.getElementById('fcircleContainer');
var createdBtn = document.getElementById('createdBtn')
var updatedBtn = document.getElementById('updatedBtn')
// 获取本地 排序值、加载apiUrl，实现记忆效果
var localSortNow = localStorage.getItem("sortNow")
var localUrlNow = localStorage.getItem("urlNow")
if(localSortNow && localUrlNow){
  sortNow = localSortNow
  UrlNow = localUrlNow
}else{
  sortNow = fdata.article_sort
  if(fdata.jsonurl){
    UrlNow = fdata.apipublieurl+'postjson?jsonlink='+ fdata.jsonurl+"&"
  }else if(fdata.apiurl){
    UrlNow = fdata.apiurl+'all?'
  }else{
    UrlNow = fdata.apipublieurl+'all?'
  }
  console.log("当前模式："+UrlNow)
  localStorage.setItem("urlNow",UrlNow)
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
      <div class="fArticleNum fItem" onclick="clearLocal()">
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
    <div id="fcircleShow1" class="fNewDiv" onclick="closeShow()"></div>
    <div id="fcircleShow" class="fNewDiv"></div>
  `;
  if(container){
    container.insertAdjacentHTML('beforebegin', messageBoard);
    container.insertAdjacentHTML('afterend', loadMoreBtn);
  }
}

// 打印随机一人文章 oneShow
function loadOneShow(one){
  var showHtml = `
  <div class="entity">
	<a href="/item?folder=VxtsWeJtfx7QyAiLdED9&amp;id=zqtVaVeD1BL7pXeqkuGb" class="entity-name">
		<div class="entity-name-left">
			<div class="avatar entity-icon">
        <img class="fArticlelink fAvatar avatar" src="${one.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;" width="48" height="48">
			</div>
			<span class="entity-name-inner">${one.author}</span>
		</div>
		<!---->
		<span class="entity-date" title=""><i class="far fa-calendar-alt">发表于</i>${one.created}</span>
	</a>
	<div class="entity-feed-wrapper">
    <a class="fArticleTitle"  href="${one.link}" target="_blank" rel="noopener nofollow" data-title="${one.title}">${one.title}</a>
  </div>
</div>
`
  document.getElementById('oneShow').innerHTML = showHtml
}
// fetch show
function fetchOneShow(){
  var fetchUrl = UrlNow + "randompost"
  fetch(fetchUrl)
    .then(res => res.json())
    .then(json =>{
      console.log(json)
      var oneData = json;
      loadOneShow(oneData)
    })
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
        <a class="fArticleTitle" href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a>
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
  document.getElementById('fcircleShow').insertAdjacentHTML('beforeend', showHtml);
  document.getElementById('fcircleShow').className = 'fshow';
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
    UrlNow = localStorage.getItem("urlNow")
    var fetchUrl = UrlNow+"rule="+sortNow+"&start="+start+"&end="+end
    //console.log(fetchUrl)
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
  var articleSortData = sortNow+"ArticleData"
  localStorage.removeItem(articleSortData)
  localStorage.removeItem("statisticalData")
  //localStorage.removeItem("sortNow")
  document.getElementById('fcircleMoreBtn').remove()
  window.scrollTo(0,document.getElementsByClassName('fMessageBoard').offsetTop)
}
// 清空本地数据
function clearLocal(){
  localStorage.removeItem("updatedArticleData")
  localStorage.removeItem("createdArticleData")
  localStorage.removeItem("nextArticle")
  localStorage.removeItem("statisticalData")
  localStorage.removeItem("sortNow")
  localStorage.removeItem("urlNow")
  location.reload();
}

function changeEgg(){
  document.querySelectorAll('.fNewDiv').forEach(el => el.remove());
  localStorage.removeItem("updatedArticleData")
  localStorage.removeItem("createdArticleData")
  localStorage.removeItem("nextArticle")
  localStorage.removeItem("statisticalData")
  container.innerHTML = ""
  UrlNow = localStorage.getItem("urlNow")
  //console.log("新"+UrlNow)
  var UrlNowPublic = fdata.apipublieurl+'all?'
  if(UrlNow !== UrlNowPublic){ //非完整默认公开库
    changeUrl = fdata.apipublieurl+'all?'
  }else{
    if(fdata.jsonurl){
      changeUrl = fdata.apipublieurl+'postjson?jsonlink='+ fdata.jsonurl+"&"
    }else if(fdata.apiurl){
      changeUrl = fdata.apiurl+'all?'
    }
  }
  localStorage.setItem("urlNow",changeUrl)
  FetchFriendCircle(sortNow,changeUrl)
}
// 首次加载文章
function FetchFriendCircle(sortNow,changeUrl){
  var end = fdata.initnumber
  var fetchUrl = UrlNow + "rule="+sortNow+"&start=0&end="+end
  if(changeUrl){
    fetchUrl = changeUrl + "rule="+sortNow+"&start=0&end="+end
  }
  //console.log(fetchUrl)
  fetch(fetchUrl)
    .then(res => res.json())
    .then(json =>{
      var statisticalData = json.statistical_data;
      var articleData = eval(json.article_data);
      var articleSortData = sortNow+"ArticleData";
      loadStatistical(statisticalData);
      loadArticleItem(articleData ,0,end)
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
  changeUrl = localStorage.getItem("urlNow")
  //console.log(changeUrl)
  initFriendCircle(sortNow,changeUrl)
}
function openMeShow(event){
  event.preventDefault()
  var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  var meLink = event.currentTarget.dataset.link.replace(parse_url, '$1:$2$3')
  console.log(meLink)
  var fetchUrl = ''
  if(fdata.apiurl){
    fetchUrl = fdata.apiurl + "post?link="+meLink
  }else{
    fetchUrl = fdata.apipublieurl + "post?link="+meLink
  }
  //console.log(fetchUrl)
  if(noClick == 'ok'){
    noClick = 'no'
    fetchShow(fetchUrl)
  }
}
// 关闭 show
function closeShow(){
  document.getElementById('fcircleShow1').className -= 'fshow';
  document.getElementById('fcircleShow').className -= 'fshow';
  document.getElementById('fcircleShow').innerHTML = ''
}
// 点击开往
var noClick = 'ok';
function openToShow(){
  var fetchUrl = ''
  if(fdata.apiurl){
    fetchUrl = fdata.apiurl + "post"
  }else{
    fetchUrl = fdata.apipublieurl + "post"
  }
  //console.log(fetchUrl)
  if(noClick == 'ok'){
    noClick = 'no'
    fetchShow(fetchUrl)
  }
}
// fetch show
function fetchShow(url){
  var closeHtml = `
    <div class="fclose" onclick="closeShow()"></div>
  `
  document.getElementById('fcircleShow1').className = 'fshow';
  document.getElementById('fcircleShow').insertAdjacentHTML('afterbegin', closeHtml);
  console.log("开往"+url)
  fetch(url)
    .then(res => res.json())
    .then(json =>{
      //console.log(json)
      noClick = 'ok'
      var statisticalData = json.statistical_data;
      var articleData = eval(json.article_data);
      loadFcircleShow(statisticalData,articleData)
    })
}

// 初始化方法，如有本地数据首先调用
function initFriendCircle(sortNow,changeUrl){
  var articleSortData = sortNow+"ArticleData";
  var localStatisticalData = JSON.parse(localStorage.getItem("statisticalData"));
  var localArticleData = JSON.parse(localStorage.getItem(articleSortData));
  container.innerHTML = "";
  if(localStatisticalData && localArticleData){
    loadStatistical(localStatisticalData);
    loadArticleItem(localArticleData ,0,fdata.initnumber)
    console.log("本地数据加载成功")
    var fetchUrl = UrlNow + "rule="+sortNow+"&start=0&end="+fdata.initnumber
    fetch(fetchUrl)
    .then(res => res.json())
    .then(json =>{
      var statisticalData = json.statistical_data;
      var articleData = eval(json.article_data);
      //获取文章总数与第一篇文章标题
      var localSnum = localStatisticalData.article_num
      var newSnum = statisticalData.article_num
      var localAtile = localArticleData[0].title
      var newAtile = articleData[0].title
      //判断文章总数或文章标题是否一致，否则热更新
      if(localSnum !== newSnum || localAtile !== newAtile){
        document.getElementById('fMessageBoard').remove()
        document.getElementById('fcircleMoreBtn').remove()
        document.getElementById('fUpdatedTime').remove()
        document.getElementById('fcircleFooter').remove()
        container.innerHTML = "";
        var articleSortData = sortNow+"ArticleData";
        loadStatistical(statisticalData);
        loadArticleItem(articleData ,0,fdata.initnumber)
        localStorage.setItem("statisticalData",JSON.stringify(statisticalData))
        localStorage.setItem(articleSortData,JSON.stringify(articleData))
        console.log("热更新完成")
      }else{
        console.log("API数据未更新")
      }
    })
  }else{
    FetchFriendCircle(sortNow,changeUrl)
    console.log("第一次加载完成")
  }
}
// 执行初始化
initFriendCircle(sortNow)