/*
Last Modified time : 20230615 07:15 by https://immmmm.com
*/
if (typeof Lately === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://fastly.jsdelivr.net/gh/Tokinx/Lately/lately.min.js';
  script.onload = () => {
      window.Lately && Lately.init({ target: '.forever-updated' });
  };
  document.head.appendChild(script);
} else {
  window.Lately && Lately.init({ target: '.forever-updated' });
}

document.addEventListener("DOMContentLoaded", () => {
  var foreverDom = document.querySelector('#foreverblog') || ''
  var ForeverCSS = "#foreverblog{display:flex;flex-wrap:wrap;justify-content:center;margin:1.5rem 0 2rem;padding:0 20px;}.forever-avatar{border-radius:50%;height:38px;width:38px;max-width:none;margin-right:10px;}.forever-item{max-height:49px;border-radius:3rem;background:#fff;padding:5px 2rem 5px 7px;margin:0 0.6rem 1rem 0;display:inline-block;display:flex;box-shadow:0 1px 2px rgba(0,0,0,.05);}.dark .forever-item{background: #3b3d42}.forever-cont{line-height:1rem;display: inline-block;font-size: 1rem;}.forever-title{line-height: 24px;white-space: nowrap;max-width:350px;text-overflow:ellipsis;overflow:hidden;}.forever-title a,.douban h3 a,.home h3 a{text-decoration:none;}.forever-updated{font-style: italic;font-size: small;}@media (min-width: 550px) and (max-width:899px) {.forever-cont{width: 100%;}.forever-title{width:calc(100% - 50px);}.forever-item{width:48%;}.forever-item:nth-child(n+15){display:none;}}@media (max-width:549px) {#foreverblog{display: block;}.forever-cont{width: 100%;}.forever-title{width:calc(100% - 50px);}.forever-item{width:100%;}.forever-item:nth-child(n+7){display:none;}}"
  
  if(foreverDom){loadCss(ForeverCSS);ForeverFeeds();}
  function loadCss(css){
      var style = document.createElement('style');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.appendChild(document.createTextNode(css));
      var head = document.getElementsByTagName('head')[0];
      head.appendChild(style);
  }
  function ForeverFeeds(){
    var fetchUrl = "https://www.foreverblog.cn/api/v1/blog/feeds?page=1";
    var localforeverData = JSON.parse(localStorage.getItem("foreverData")) || '';
    if(localforeverData){
      loadforever(localforeverData)
      console.log("Myforevers 本地数据加载成功")
    }else{
      localStorage.setItem("foreverLink","")
    }
    fetch(fetchUrl).then(res => res.json()).then(resdata =>{
      var foreverData = resdata.data
      var foreverLink = foreverData.data[0].link
      var localLink = localStorage.getItem("foreverLink")
      if(foreverData && foreverLink != localLink){
        foreverDom.innerHTML = "";
        loadforever(foreverData)
        localStorage.setItem("foreverData",JSON.stringify(foreverData))
        localStorage.setItem("foreverLink",foreverLink)
        console.log("Myforevers 热更新完成")
      }else{
        console.log("Myforevers API 数据未更新")
      }
    })
  }
  function loadforever(foreverData){
    var foreverArticle = '';
    for (var i = 0;i<20;i++){
      var item = foreverData.data[i];
      foreverArticle +=`
      <div class="forever-item">
        <img class="forever-avatar avatar" src="https://gravatar.loli.net/avatar/${item.email}" alt="${item.author}">
        <div class="forever-cont">
          <div class="forever-title"><a target="_blank" rel="noopener nofollow" href="${item.link}">${item.title}</a></div>
          <div class="forever-updated">${item.created_at}</div>
        </div>
      </div>
      `;
    }
    foreverDom.innerHTML = foreverArticle
    //相对时间
    Lately.init({ target: '.forever-updated'});
  }
})