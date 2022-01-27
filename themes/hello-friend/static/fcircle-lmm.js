// 排序算法
function quickSort(arr, keyword){
  if(arr.length == 0){return [];}
  var left = [],right = [],selectItem = arr[0];
  for(var i = 1; i < arr.length; i++){if(arr[i][keyword] > selectItem[keyword]){left.push(arr[i]);}else{right.push(arr[i]);}}
  return quickSort(left, keyword).concat(selectItem, quickSort(right, keyword));
}
// 打印友链基本信息
function loadStatistical(sdata){
  var container = document.getElementById('fcircleContainer');
  container.innerHTML = "";
  var messageBoard =`
  <div id="fMessageBoard">
    <div class="fUpdatedTime">
      <span class="fLabel">更新于：</span><span class="fMessage">${sdata.last_updated_time}</span>
    </div>
    <div class="fMessageItem">
      <div class="fActiveFriend fItem">
        <span class="fLabel">活跃数</span>
        <span class="fMessage">${sdata.active_num}/${sdata.friends_num}</span>
      </div>
      <div class="fErrorSite fItem">
        <span class="fLabel">冻结数</span>
        <span class="fMessage">${sdata.error_num}/${sdata.friends_num}</span>
      </div>
      <div class="fArticleNum fItem">
        <span class="fLabel">已存数</span>
        <span class="fMessage">${sdata.article_num}/${Math.ceil(Number( sdata.article_num) / 100) * 100}</span>
      </div>
    </div>
  </div>
  `;
  var loadMoreBtn = `
    <div id="fcircleMoreBtn" onclick="loadMoreArticle()"><i class="fas fa-angle-double-down"></i></div>
  `;
  if(container){
    container.insertAdjacentHTML('beforebegin', messageBoard);
    container.insertAdjacentHTML('afterend', loadMoreBtn);
  }
}
// 打印友链信息和内容
function loadArticleItem(datalist,start,end){
  var container = document.getElementById('fcircleContainer');
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
// 初始化方法
function initFriendCircle(){
  if (fdata){
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
}
//执行初始化方法
initFriendCircle()