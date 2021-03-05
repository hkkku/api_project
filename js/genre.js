$(function(){

  function getGenre(gen, box, slideID){
    let getGenres = [];
    $.ajax({
      url :' https://yts.mx/api/v2/list_movies.json?genre='+ gen +'&page=1&limit=25',
      success : function(data){
        console.log(data);
        for(let i = 0 ; i < data.data.movies.length; i ++){
          let genreHTML = `<div class="slide-box">
                            <div>
                              <img src="${data.data.movies[i].medium_cover_image}" alt="" onError="this.src='/api/img/replace.jpg';"/>
                              <div class="slide-txt">
                                <h3>${data.data.movies[i].title}</h3>
                                <p class="rating">★${data.data.movies[i].rating}</p>
                              </div>
                              <a class="detailBtn" href="/api/detail.html?id=${data.data.movies[i].id}">Detail View</a>
                            </div>
                          </div>`;
                          getGenres += genreHTML;
        }



        
        $(box).append(getGenres);

        $(slideID).lightSlider({
        
          item:5,
          slideMove:1,
          auto:true,
          loop:true,
          speed:400,
          responsive : [
            {
                breakpoint:800,
                settings: {
                    item:3,
                    slideMove:1,
                    slideMargin:6,
                  }
            },
            {
                breakpoint:480,
                settings: {
                    item:2,
                    slideMove:1
                  }
            }
        ]
      
        });

  
      }
    });
  
  };
 
  getGenre('action' , '.action-contents', '#actionSlide');
  getGenre('romance' , '.romance-contents', '#romanceSlide');
  getGenre('drama' , '.drama-contents', '#dramaSlide');
  getGenre('comedy' , '.comedy-contents', '#comedySlide');
  getGenre('mystery' , '.mystery-contents', '#mysterySlide');


  $(".genre-tab .tab").click(function(){
    let index = $(this).index();

    $(".genre-tab .tab").removeClass('active');
    $(this).addClass('active');
    $(".genre-section>div").hide();
    $(".genre-section>div").eq(index).show();
  });

  // $(".genre-tab .tab").eq(0).trigger("click");
});