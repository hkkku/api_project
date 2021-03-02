$(function(){
  let currentPage = 0;

  function getData(page){
    let getDatas = [];
    $.ajax({
      url:"https://yts.mx/api/v2/list_movies.json?sort_by=year&order_by=desc&limit=10&page=1" + page,
      success:function(data){
        // console.log(data.data.movies[0].title);
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
    // currentPage = page;
    console.log(typeof(page));
  }

  $(".numBtns button.pageNum").click(function(){
    let btnValue = Number($(this).attr('value'));
    // string -> number 
    $(".recent-movie-wrap").remove();
    $(".loading").show();
    console.log(btnValue);
    getData(btnValue);
  });
  getData(1);

  $(document).ajaxComplete(function(){
    $(".loading").hide();
  });
});