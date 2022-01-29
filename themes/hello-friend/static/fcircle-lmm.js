/*
Last Modified time : 20220130 00:14 by https://immmmm.com
基于 FriendCircle API v4.1.2
*/
var fdata = {
  apiurl: 'https://hexo-friendcircle-api.vercel.app/api',
  initnumber: 20,
  stepnumber: 10,
  article_sort: 'updated', //updated or created
  error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c'
}
if(typeof(fdataUser) !=="undefined"){
  for(var key in fdataUser) {
    if(fdataUser[key]){
      fdata[key] = fdataUser[key];
    }
  }
}
var container = document.getElementById('fcircleContainer');
var createdBtn = document.getElementById('createdBtn')
var updatedBtn = document.getElementById('updatedBtn')
var local_sortNow = localStorage.getItem("sortNow")
var article_num = ''
if(local_sortNow){
  sortNow = local_sortNow
}else{
  var sortNow = fdata.article_sort
  localStorage.setItem("sortNow",sortNow)
}
container.innerHTML = "";
// 排序算法
function quickSort(arr, keyword){
  if(arr.length == 0){return [];}
  var left = [],right = [],selectItem = arr[0];
  for(var i = 1; i < arr.length; i++){if(arr[i][keyword] > selectItem[keyword]){left.push(arr[i]);}else{right.push(arr[i]);}}
  return quickSort(left, keyword).concat(selectItem, quickSort(right, keyword));
}
// 打印基本信息
function loadStatistical(sdata){
  article_num = sdata.article_num
  var messageBoard =`
  <div id="fMessageBoard" class="fNewDiv">
    <div class="fMessageItem">
      <div class="fActiveFriend fItem">
        <span class="fLabel">订阅</span>
        <span class="fMessage">${sdata.friends_num}</span>
      </div>
      <div class="fErrorSite fItem">
        <span class="fLabel">活跃</span>
        <span class="fMessage"  onclick="changeEgg()">${sdata.active_num}</span>
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
    <div id="fcircleMoreBtn" class="fNewDiv" onclick="loadMoreArticle()"><i class="fas fa-angle-double-down"></i></div>
    <div id="fUpdatedTime"  class="fNewDiv">
      <span class="fLabel">更新于：</span><span class="fMessage">${sdata.last_updated_time}</span>
    </div>
    <div id="fcircleFooter" class="fNewDiv">Powered by <a target="_blank" href="https://github.com/Rock-Candy-Tea/hexo-circle-of-friends" target="_blank">FriendCircle</a></div>
  `;
  if(container){
    container.insertAdjacentHTML('beforebegin', messageBoard);
    container.insertAdjacentHTML('afterend', loadMoreBtn);
  }
}
// 打印友链信息和内容
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
        <span class="fArticleFloor">${i+1}</span>
        <div class="fArticleAvatar flink-item-icon">
          <img class="fArticlelink fAvatar avatar" src="${item.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <a class="" target="_blank" rel="noopener nofollow" href="${item.link}"><span class="fArticleAuthor">${item.author}</span></a>
          <span class="fArticleTime">
            <span class="fArticleCreated" style="${sortNow == 'created' ? '':'display:none'}"><i class="far fa-calendar-alt">发表于</i>${item.created}</span>
            <span class="fArticleUpdated" style="${sortNow == 'updated' ? '':'display:none'}"><i class="fas fa-history">更新于</i>${item.updated}</span>
          </span>
        </div>
      </div>
      </div>
      `;
    }
    if(container){
      container.insertAdjacentHTML('beforeend', articleItem);
    }
  }else{
    document.getElementById('fcircleMoreBtn').outerHTML = `<div id="fcircleMoreBtn" class="fNewDiv" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>`
  }
}
// 加载更多文章
function loadMoreArticle(){
  var currentArticle = document.getElementsByClassName('fArticleItem').length;
  var createdList = JSON.parse(localStorage.getItem("createdList"));
  var updatedList = JSON.parse(localStorage.getItem("updatedList"));
  if(sortNow == 'updated'){
    loadArticleItem(updatedList,currentArticle,currentArticle + fdata.stepnumber)
  }else{
    loadArticleItem(createdList,currentArticle,currentArticle + fdata.stepnumber)
  }
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
//切换按钮
function changeSort(event){
  console.log(event.currentTarget.dataset.sort)
  sortNow = event.currentTarget.dataset.sort
  localStorage.setItem("sortNow",sortNow)
  document.querySelectorAll('.fNewDiv').forEach(el => el.remove());
  container.innerHTML = "";
  initFriendCircle(sortNow)
}
function changeEgg(){
  document.querySelectorAll('.fNewDiv').forEach(el => el.remove());
  container.innerHTML = "";
  FetchFriendCircle(sortNow,true)
}
function FetchFriendCircle(sortNow,egg){
  var fetchUrl = fdata.apiurl
    if(egg){fetchUrl = 'https://hexo-friendcircle-api.vercel.app/api'}
    fetch(fetchUrl)
    .then(res => res.json())
    .then(json =>{
      var statistical_data = json.statistical_data;
      var article_data = eval(json.article_data);
      var article_sortcreated = quickSort(article_data,'time');
      var article_sortupdated = quickSort(article_data,'updated');
      loadStatistical(statistical_data);
      if(sortNow == 'updated'){
        loadArticleItem(article_sortupdated ,0,fdata.initnumber)
      }else{
        loadArticleItem(article_sortcreated ,0,fdata.initnumber)
      }
      localStorage.setItem("statisticalData",JSON.stringify(statistical_data))
      localStorage.setItem("createdList",JSON.stringify(article_sortcreated))
      localStorage.setItem("updatedList",JSON.stringify(article_sortupdated))
    })
}
// 初始化方法
function initFriendCircle(sortNow){
    var statisticalData = JSON.parse(localStorage.getItem("statisticalData"));
    var createdList = JSON.parse(localStorage.getItem("createdList"));
    var updatedList = JSON.parse(localStorage.getItem("updatedList"));
    if(statisticalData && updatedList && createdList){
      loadStatistical(statisticalData);
      if(sortNow == 'updated'){
        loadArticleItem(updatedList ,0,fdata.initnumber)
        console.log("updated 本地数据，更新排序")
      }else{
        loadArticleItem(createdList ,0,fdata.initnumber)
        console.log("created 本地数据，发布排序")
      }
      fetch(fdata.apiurl)
      .then(res => res.json())
      .then(json =>{
        var statistical_data = json.statistical_data;
        var article_data = eval(json.article_data);
        var article_sortcreated = quickSort(article_data,'time');
        var article_sortupdated = quickSort(article_data,'updated');
        var local_createdList = createdList[0].title,new_createdList = article_sortcreated[0].title
        var local_updatedList = updatedList[0].title,new_updatedList = article_sortupdated[0].title
        if(local_createdList !== new_createdList || local_updatedList !== new_updatedList){
          console.log("已更新")
          document.querySelectorAll('.fNewDiv').forEach(el => el.remove());
          container.innerHTML = "";
          loadStatistical(statistical_data);
          if(sortNow == 'updated'){
            loadArticleItem(article_sortupdated ,0,fdata.initnumber)
          }else{
            loadArticleItem(article_sortcreated ,0,fdata.initnumber)
          }
        }else{
          console.log("API数据未更新")
        }
        localStorage.setItem("statisticalData",JSON.stringify(statistical_data))
        localStorage.setItem("createdList",JSON.stringify(article_sortcreated))
        localStorage.setItem("updatedList",JSON.stringify(article_sortupdated))
      })
    }else{
      FetchFriendCircle(sortNow)
      console.log("第一次加载完成")
    }
}
//执行初始化方法
initFriendCircle(sortNow)