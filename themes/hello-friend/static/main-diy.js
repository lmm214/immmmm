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
        bberHtml += '<li class="item item-'+(i+1)+'">'+dataTime+'： <a href="https://immmmm.com/bb/">'+urlToLink(item.content)+'</a></li>'
      });
      $('#bber-talk').append('<span class="index-talk-icon"><svg viewBox="0 0 1024 1024" width="21" height="21"><path d="M184.32 891.667692c-12.603077 0-25.206154-2.363077-37.809231-7.876923-37.021538-14.966154-59.864615-49.624615-59.864615-89.009231v-275.692307c0-212.676923 173.292308-385.969231 385.969231-385.969231h78.76923c212.676923 0 385.969231 173.292308 385.969231 385.969231 0 169.353846-137.846154 307.2-307.2 307.2H289.083077l-37.021539 37.021538c-18.904615 18.116923-43.323077 28.356923-67.741538 28.356923zM472.615385 195.347692c-178.018462 0-322.953846 144.935385-322.953847 322.953846v275.692308c0 21.267692 15.753846 29.144615 20.48 31.507692 4.726154 2.363077 22.055385 7.876923 37.021539-7.08923l46.473846-46.473846c6.301538-6.301538 14.178462-9.452308 22.055385-9.452308h354.461538c134.695385 0 244.184615-109.489231 244.184616-244.184616 0-178.018462-144.935385-322.953846-322.953847-322.953846H472.615385z"></path><path d="M321.378462 512m-59.076924 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M518.301538 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153847 0 59.076923 59.076923 0 1 0-118.153847 0Z"></path><path d="M715.224615 512m-59.076923 0a59.076923 59.076923 0 1 0 118.153846 0 59.076923 59.076923 0 1 0-118.153846 0Z"></path></svg></span><ul class="talk-list">'+bberHtml+'</ul>')
      Lately({ 'target': '#bber-talk .datatime' });
    });
    function urlToLink(str) {
      var re =/\bhttps?:\/\/(?!\S+(?:jpe?g|png|bmp|gif|webp|gif))\S+/g;
      var re_forpic =/\bhttps?:\/\/.*?(\.gif|\.jpe?g|\.png|\.bmp|\.webp)/g;
      str =str.replace(re,function (website) {
        return '<svg viewBox="0 0 1025 1024" width="21" height="21"><path d="M333.06186 733.061768c-58.347896 52.210106-97.040127 49.051159-136.467091 9.492188l-45.156456-48.462758c-39.427988-39.541575-39.427988-103.667058 0-143.226029l193.260585-193.848986c39.426965-39.558971 103.355973-39.558971 142.78396 0l35.679617 35.794228c30.457686 30.555923 37.398772 75.762521 20.801768 112.997564l86.286202 66.040089c59.149145-59.33027 59.149145-155.517983 0-214.830857L523.162476 249.600755c-59.133795-59.33027-155.010423-59.33027-214.160591 0L44.350342 515.071965c-59.133795 59.313897-59.133795 155.50161 0 214.830857l107.08797 107.415428c59.133795 59.313897 155.026796 59.313897 214.176964 0l102.161774-105.647155-72.980151-70.034053L333.06186 733.061768zM987.196021 285.394982 880.1234 177.979554c-59.149145-59.33027-155.026796-59.33027-214.176964 0 0 0 4.223185-1.064238-57.988716 61.343113l71.113641 68.167542 31.604812-34.877345c39.427988-39.541575 103.356996-39.541575 142.78396 0l35.69599 35.8106c39.427988 39.541575 39.427988 103.667058 0 143.226029L714.818517 632.847345c-39.427988 39.541575-103.340623 39.541575-142.768611 0l-29.395494-48.462758c-61.883419-46.25344-42.865273-57.317427-37.611619-88.544639L426.548044 418.130076c-59.150168 59.33027-59.150168 155.517983 0 214.830857l107.072621 107.432825c59.149145 59.312874 155.026796 59.312874 214.176964 0l239.398392-240.166895C1071.582967 402.924769 987.196021 285.394982 987.196021 285.394982z"></path></svg>';
      });
      str =str.replace(re_forpic,function (imgurl) {
        return '<svg viewBox="0 0 1024 1024" width="21" height="21"><path d="M821.6 120.93333333H195.4c-74.1 0-134.2 60.1-134.2 134.2v492c0 74.1 60.1 134.2 134.2 134.2h626.2c74.1 0 134.2-60.1 134.2-134.2v-492c0-74.1-60.1-134.2-134.2-134.2zM251.3 255.13333333c30.9 0 55.9 25 55.9 55.9s-25 55.9-55.9 55.9-55.9-25-55.9-55.9 25-55.9 55.9-55.9z m614.6 559.1H153.3c-37.3 0-58.2-43.1-35.1-72.4L302.1 508.33333333c17.9-22.7 52.4-22.7 70.3 0l76.5 97.2 148.6-260c17.2-30.1 60.5-30.1 77.7 0L904.8 747.33333333c17 29.8-4.5 66.9-38.9 66.9z"></path></svg>';
      });
      return str;
    }
    function Roll (){
      var list_li = $('.talk-list li'),cur_li = list_li.first(),last_li = list_li.last();
      last_li.after(cur_li);
    };
    setInterval(Roll,3000);
  }
});