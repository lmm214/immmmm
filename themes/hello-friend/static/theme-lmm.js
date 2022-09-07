  //相对时间
  window.Lately && Lately.init({ target: '.post-date'});
  //图片灯箱
  window.ViewImage && ViewImage.init('.post-content img:not(.avatar,.tk-avatar-img)')
  //相册瀑布流
  var photosAll = document.getElementsByTagName('photos') || '';
  if(photosAll){
    for(var i=0;i < photosAll.length;i++){
      var photosIMG = photosAll[i].getElementsByTagName('img')
      for(var j=0;j < photosIMG.length;j++){
        wrap(photosIMG[j], document.createElement('div'));
      }
    }
  }
  function wrap(el, wrapper) {
    wrapper.className = "photo";
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  isImgLoad(function () {
    var photos = document.querySelector('photos') || '';
    if (photos) {waterfall(photos);}
    window.addEventListener('resize', function () {
      waterfall(photos);
    });
  });
  var t_img,isLoad = true;
  function isImgLoad(callback) {
    var photos = document.querySelector('photos') || '';
    if (photos) {
      var imgHeight = document.querySelector('photos img').height
      if (imgHeight === 0) {isLoad = false;return false;}
      if (isLoad) {clearTimeout(t_img);callback();} else {isLoad = true;t_img = setTimeout(function () { isImgLoad(callback);}, 200);}
    }
  }
  //随机日志
  function randomPost() {
    fetch('/sitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        let locationHref,locSplit;
        do {
            locationHref = ls[Math.floor(Math.random() * ls.length)].innerHTML
            locSplit = locationHref.split('/')[3] || ''
        } while (locSplit == '' || locSplit == 'tags' || locSplit == 'posts'); 
        location.href = locationHref
    })
  }
  //文章内显示豆瓣条目 https://immmmm.com/post-show-douban-item/
  var dbAPI = "https://douban.edui.fun/";
  var dbA = document.querySelectorAll(".post-content a[href*='douban.com/subject/']") || '';
  if(dbA){
    for(var i=0;i < dbA.length;i++){
      var _this = dbA[i]
      var dbHref =_this.href
      var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
      var db_type = dbHref.replace(db_reg, "$1");
      var db_id = dbHref.replace(db_reg, "$2").toString();
        if (db_type == 'movie') {
          var this_item = 'movie' + db_id;
          var url = dbAPI + "movies/" + db_id ;
          if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
            fetch(url).then(res => res.json()).then( data =>{
              localStorage.setItem(this_item, JSON.stringify(data));
              movieShow(_this, this_item)
            });
          } else {
            movieShow(_this, this_item)
          }
        }else if (db_type == 'book') {
          var this_item = 'book' + db_id;
          var url = dbAPI + "v2/book/id/" + db_id;
          if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
            fetch(url).then(res => res.json()).then( data =>{
              localStorage.setItem(this_item, JSON.stringify(data));
              bookShow(_this, this_item)
            });
          } else {
            bookShow(_this, this_item)
          }
        }
    }// for end
  }
  function movieShow(_this, this_item) {
    var storage = localStorage.getItem(this_item);
    var data = JSON.parse(storage);
    var str = _this.href;
    var db_star = Math.ceil(data.rating);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.name + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.director + " / 类型：" + data.genre + " / " + data.year + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro.replace(/\s*/g,"") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.img + "></div>"
    var db_div = document.createElement("div");
    _this.parentNode.replaceChild(db_div, _this);
    db_div.innerHTML = db_html
  }
  function bookShow(_this, this_item) {
    var storage = localStorage.getItem(this_item);
    var data = JSON.parse(storage);
    var str = _this.href;
    var db_star = Math.ceil(data.rating.average);
    var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.images.medium + "></div>"
    var db_div = document.createElement("div");
    _this.parentNode.replaceChild(db_div, _this);
    db_div.innerHTML = db_html
  }