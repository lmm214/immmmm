jQuery(document).ready(function ($) {
  $("photos img").each(function () {
    var _a = $("<a></a>").attr("href", this.src);
    $(this).wrap("<div class='photo'></div>").wrap(_a);
  })
  isImgLoad(function () {
    var photos = document.querySelector('photos');
    if (photos) {
      waterfall(photos);
    }
    $(window).resize(function () {
      if (photos) {
        waterfall(photos);
      }
    });
  });
  var t_img;
  var isLoad = true;
  function isImgLoad(callback) {
    $('photos img').each(function () {
      if (this.height === 0) {
        isLoad = false;
        return false;
      }
    });
    if (isLoad) {
      clearTimeout(t_img);
      callback();
    } else {
      isLoad = true;
      t_img = setTimeout(function () {
        isImgLoad(callback);
      }, 500);
    }
  }
});

jQuery(document).ready(function ($) {
  //灯箱
  $(".post-content img:not(.avatar)").each(function () {
    var _b = $("<a></a>").attr("href", this.src);
    $(this).wrap(_b);
  })
  $(".post-content a[rel!=link]:has(img)").slimbox();
  //相对时间
  Lately({ 'target': '.post-date' });
  //文章toc固定
  var nav = $(".tocify");
  if (nav.length > 0) {
    nav.removeClass("hide");
    var navTop = $(".post-content").offset().top;
    var w = $(window).width() / 2 + 400;
    nav.css("left", w);
    nav.css("top", navTop);
    $(window).scroll(function () {
      var scrolls = $(this).scrollTop();
      if (scrolls > navTop) {
        nav.css({ "top": 0, "position": "fixed" });
      } else {
        nav.css({ "top": navTop, "position": "absolute" });
      };
    });
  }
  //外链新窗口
  var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  var location_href = window.location.href.replace(parse_url, '$3');
  $('.post-content a:not(:has(img),a.read-more),.author-name a,.links-item a').hover(function () {
    var this_href = $(this).attr('href');
    var replace_href = this_href.replace(parse_url, '$3');
    if (this_href != replace_href && location_href != replace_href) { $(this).attr('target', '_blank'); }
  });
  //豆瓣图书电影条目
  $(".post-content a[href*='douban.com/subject/']").each(function () {
    var _this = $(this);
    var str = _this.attr("href");
    var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
    if (db_reg.test(str)) {
      var db_type = str.replace(db_reg, "$1");
      var db_id = str.replace(db_reg, "$2").toString();
      var db_api = "https://bm.weajs.com/api/";
      if (db_type == 'movie') {
        var ls_item = 'movie' + db_id;
        var url = db_api + "movies/" + db_id + "/";
        if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) == 'undefined') {
          $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            success: function (data) {
              localStorage.setItem(ls_item, JSON.stringify(data));
              moiveShow(_this, ls_item)
            }
          });
        } else {
          moiveShow(_this, ls_item)
        }
      } else if (db_type == 'book') {
        var ls_item = 'book' + db_id;
        var url = db_api + "books/" + db_id;
        if (localStorage.getItem(ls_item) == null || localStorage.getItem(ls_item) == 'undefined') {
          $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
              localStorage.setItem('book' + db_id, JSON.stringify(data));
              bookShow(_this, ls_item)
            }
          });
        } else {
          bookShow(_this, ls_item)
        }
      }
    }
  });
  function moiveShow(_this, ls_item) {
    var storage = localStorage.getItem(ls_item);
    var data = JSON.parse(storage);
    var str = _this.attr("href");
    //console.log(data)
    var db_star = Math.ceil(data.rating);
    $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.directors + " / 类型：" + data.genres + " / " + data.pubdate + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img loading='lazy' class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this);
  }
  function bookShow(_this, ls_item) {
    var storage = localStorage.getItem(ls_item);
    var data = JSON.parse(storage);
    var str = _this.attr("href");
    ///console.log(data)
    var db_star = Math.ceil(data.rating);
    $("<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + str + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro + "</section></div></div><img loading='lazy' class='post-preview--image' src=" + data.cover + "></div>").replaceAll(_this);
  }
});

$(document).ready(function(){
  if ( $("#bber-talk").length > 0 ) {
    jsonUrl = "https://6262-bb-f5c0f-1252354806.tcb.qcloud.la/json/bber.json"
    $.getJSON(jsonUrl+"?t="+Date.parse( new Date()),function(res){
      var bberHtml = ''
      $.each(res.data, function(i, item){
        d = new Date(item.date)
        date = d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate() +' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
        dataTime = '<span class="datatime">'+date+'</span>'
        bberHtml += '<li class="item item-'+(i+1)+'">'+dataTime+'： <a href="https://immmmm.com/bb/">'+item.content+'</a></li>'
      });
      $('#bber-talk').append('<span class="index-talk-icon"><svg viewBox="0 0 1024 1024" width="21" height="21"><path d="M184.32 891.667692c-12.603077 0-25.206154-2.363077-37.809231-7.876923-37.021538-14.966154-59.864615-49.624615-59.864615-89.009231v-275.692307c0-212.676923 173.292308-385.969231 385.969231-385.969231h78.76923c212.676923 0 385.969231 173.292308 385.969231 385.969231 0 169.353846-137.846154 307.2-307.2 307.2H289.083077l-37.021539 37.021538c-18.904615 18.116923-43.323077 28.356923-67.741538 28.356923zM472.615385 195.347692c-178.018462 0-322.953846 144.935385-322.953847 322.953846v275.692308c0 21.267692 15.753846 29.144615 20.48 31.507692 4.726154 2.363077 22.055385 7.876923 37.021539-7.08923l46.473846-46.473846c6.301538-6.301538 14.178462-9.452308 22.055385-9.452308h354.461538c134.695385 0 244.184615-109.489231 244.184616-244.184616 0-178.018462-144.935385-322.953846-322.953847-322.953846H472.615385z"></path><path d="M321.378462 512m-59.076924 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M518.301538 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M715.224615 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153846 0 59.076923 59.076923 0 1 0-118.153846 0Z"></path></svg></span><ul class="talk-list">'+bberHtml+'</ul>')
      Lately({ 'target': '#bber-talk .datatime' });
    });
    function Roll (){
      var list_li = $('.talk-list li'),cur_li = list_li.first(),last_li = list_li.last();
      last_li.after(cur_li);
    };
    setInterval(Roll,3000);
  }
});