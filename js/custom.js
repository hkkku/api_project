$(function () {
  const pathname = window.location.pathname;
  if(pathname.includes('index')){
    $(".gnb li").removeClass("active");
    $(".gnb li").eq(0).addClass("active");
  } else if(pathname.includes('recent')){
    $(".gnb li").removeClass("active");
    $(".gnb li").eq(1).addClass("active");}

  function searchMovie() {
    let searchResult = $(".searchInput").val();
    if (!searchResult) {
      alert("검색어를 입력해주세요.");
      return false;
    } else {
      location.href = "/api/search.html?key=" + searchResult;
    }
  }
  $(".sendBtn").click(function () {
    searchMovie();
  });

  //press enter
  document.addEventListener("keydown", function (e) {
    const keyCode = e.keyCode;
    if (keyCode == 13) {
      searchMovie();
    }
  });

  let searchValue = document.location.href.split("=")[1];
  let decodeValue = decodeURI(searchValue);
  console.log(decodeValue);

  $.ajax({
    // $. = 서버와 통신한다
    type: "POST",
    url: "/api/data/api.php",
    data: {
      search_value: decodeValue,
    },
    success: function (data) {
      let obj = JSON.parse(data);
      // console.log(obj);
      // console.log(obj.items[0].title);

      if (obj.items.length == 0) {
        alert("데이터가 존재하지 않습니다.");
        location.href = "/api/index.html";
      }

      let itemContents = [];
      // 비어있는 배열 선언
      $.each(obj.items, function (i, item) {
        // console.log(item.title);
        let itemHTML = `<div class="movie_box">
                          <h2>${item.title}</h2>
                          <img src="${item.image}" alt="" />
                          <p class="director">${item.director} ${item.pubDate}</p>
                          <p class="userRating">★${item.userRating}</p>
                        </div>`;
        itemContents.push($(itemHTML).get(0));
      });
      $(".movie_frame").append(itemContents);
    },
  });
});