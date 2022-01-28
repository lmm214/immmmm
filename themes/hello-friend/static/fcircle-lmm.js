/*
Last Modified time : 20220128 13:08
*/
var FriendCircleVersion = "4.1.1"
var fdata = {
  apiurl: 'https://hexo-friendcircle-api.vercel.app/api',
  initnumber: 20,
  stepnumber: 10,
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
  var messageBoard =`
  <div id="fMessageBoard" class="fNewDiv">
    <div class="fUpdatedTime">
      <span class="fLabel">更新于：</span><span class="fMessage">${sdata.last_updated_time}</span>
    </div>
    <div class="fMessageItem">
      <div class="fActiveFriend fItem">
        <span class="fLabel">订阅</span>
        <span class="fMessage">${sdata.friends_num}</span>
      </div>
      <div class="fErrorSite fItem">
        <span class="fLabel">活跃</span>
        <span class="fMessage">${sdata.active_num}</span>
      </div>
      <div class="fArticleNum fItem">
        <span class="fLabel">日志</span>
        <span class="fMessage">${sdata.article_num}</span>
      </div>
    </div>
  </div>
  `;
  var loadMoreBtn = `
    <div id="fcircleMoreBtn" class="fNewDiv" onclick="loadMoreArticle()"><i class="fas fa-angle-double-down"></i></div>
    <div id="fcircleFooter" class="fNewDiv">Powered by <a target="_blank" href="https://github.com/Rock-Candy-Tea/hexo-circle-of-friends" target="_blank">FriendCircle</a> ${FriendCircleVersion}</div>
  `;
  if(container){
    container.insertAdjacentHTML('beforebegin', messageBoard);
    container.insertAdjacentHTML('afterend', loadMoreBtn);
  }
}
// 打印友链信息和内容
function loadArticleItem(datalist,start,end){
  var articleItem = '';
  for (var i = start;i<end;i++){
    var item = datalist[i];
    articleItem +=`
      <div class="fArticleItem">
      <div class="fArticleAvatar">
        <a class="fArticlelink fAvatar" target="_blank" rel="noopener nofollow" href="${item.link}">
          <img src="${item.avatar}" alt="avatar"  onerror="this.src='${fdata.error_img}'; this.onerror = null;">
        </a>
        <div class="fArticleAuthor">
          ${item.author}
        </div>
      </div>
      <div class="fArticleMessage">
        <a class="fArticleTitle"  href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">
          ${item.title}
        </a>
        <div class="fArticleTime">
          <span class="fArticleUpdated"><i class="fas fa-history">更新于</i>${item.updated}</span>
        </div>
      </div>
      </div>
    `;
  }
  if(container){
    container.insertAdjacentHTML('beforeend', articleItem);
  }
}
// 加载更多文章
function loadMoreArticle(){
  var currentArticle = document.getElementsByClassName('fArticleItem').length;
  var article_sortupdated = JSON.parse(localStorage.getItem("updatedList"));
  loadArticleItem(article_sortupdated,currentArticle,currentArticle + fdata.stepnumber)
  
}
function FetchFriendCircle(){
    fetch(fdata.apiurl)
    .then(res => res.json())
    .then(json =>{
      var statistical_data = json.statistical_data;
      var article_data = eval(json.article_data);
      var article_sortupdated = quickSort(article_data,'updated');
      loadStatistical(statistical_data);
      loadArticleItem(article_sortupdated ,0,fdata.initnumber,statistical_data)
      localStorage.setItem("statisticalList",JSON.stringify(statistical_data))
      localStorage.setItem("updatedList",JSON.stringify(article_sortupdated))
    })
}
// 初始化方法
function initFriendCircle(){
    var statisticalList = JSON.parse(localStorage.getItem("statisticalList"));
    var updatedList = JSON.parse(localStorage.getItem("updatedList"));
    if(statisticalList && updatedList){
      loadStatistical(statisticalList);
      loadArticleItem(updatedList ,0,fdata.initnumber,statisticalList)
      console.log("本地数据")
      fetch(fdata.apiurl)
      .then(res => res.json())
      .then(json =>{
        var statistical_data = json.statistical_data;
        var article_data = eval(json.article_data);
        var article_sortupdated = quickSort(article_data,'updated');
        //获取本地与API中的第1、2两篇文章标题
        var local_updatedList1 = updatedList[0].title,new_updatedList1 = article_sortupdated[0].title
        var local_updatedList2= updatedList[1].title,new_updatedList2 = article_sortupdated[1].title
        if(local_updatedList1 !== new_updatedList1 || local_updatedList2 !== new_updatedList2){
          console.log("已更新")
          document.querySelectorAll('.fNewDiv').forEach(el => el.remove());
          container.innerHTML = "";
          loadStatistical(statistical_data);
          loadArticleItem(article_sortupdated ,0,fdata.initnumber,statistical_data)
        }else{
          console.log("API数据未更新")
        }
        localStorage.setItem("statisticalList",JSON.stringify(statistical_data))
        localStorage.setItem("updatedList",JSON.stringify(article_sortupdated))
      })
    }else{
      FetchFriendCircle()
      console.log("第一次加载完成")
    }
}
//执行初始化方法
initFriendCircle()