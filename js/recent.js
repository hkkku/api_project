$(function(){
  let currentPage = 1;
  const pageNumLength = $(".numBtns button.pageNum").length;

  function getData(page){
    let getDatas = [];
    $.ajax({
      url:"https://yts.mx/api/v2/list_movies.json?sort_by=year&order_by=desc&limit=10&page=1" + page,
      success:function(data){
        console.log(data.data.movies[0]);
        if(data.data.movies.title == ''){
          data.data.movies.title = 'No Title';
        }
        for(let i = 0; i < data.data.movies.length; i++){
          let recentHTML =  `<div class="recent-movie-wrap">
                              <div class="recent-movies">
                                <div class="movie-img">
                                  <img src="${data.data.movies[i].medium_cover_image}" alt="" />
                                </div>
                                <h3 class="movie-title">${data.data.movies[i].title}</h3>
                              </div>
                            </div>`
                            getDatas += recentHTML;
        }
        $(".container").append(getDatas);
      }
    });
    currentPage = page;
    console.log(typeof(page));
  }

  $(".numBtns button.pageNum").click(function(){
    let btnValue = Number($(this).attr('value'));
    // string -> number 
    $(".recent-movie-wrap").remove();
    $(".loading").show();
    console.log(btnValue);
    getData(btnValue);

    let btnIdx = $(this).index();

    $(".numBtns button").removeClass("active");
    $(".numBtns button").eq(btnIdx).addClass("active");
  });

  function goToPrevNext(a, b){
    if(currentPage == a){
      // 바뀌는 부분만 변수처리
      return false;
    } else {
      $(".recent-movie-wrap").remove();
      getData(b);
      $(".loading").show();
      $(".numBtns button").removeClass("active");
      $(".numBtns button").eq(currentPage).addClass("active");
    }
  }

  $(".numBtns button.prev").click(function(){
    goToPrevNext(1, currentPage - 1);
    // 변수에 바뀐 부분을 대입해서 공통화된 함수를 넣어준다.
  });

  $(".numBtns button.next").click(function(){
    goToPrevNext(pageNumLength, currentPage + 1);
  });

  $(".numBtns button").eq(1).trigger("click");
  // getData(1);

  $(document).ajaxComplete(function(){
    $(".loading").hide();
  });
});