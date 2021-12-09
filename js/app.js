    var key="d3979df656135c96a122306d37e8a456";
    let page=1;
    const apiLink="https://api.themoviedb.org/3/movie/"

    const getVideos=(id)=>{
        return apiLink +`${id}/videos?api_key=${key}`
    }
    const getDetail=(id)=>{
        return apiLink +`${id}?api_key=${key}&&language=tr-TR`

    }

    fetch(getVideos(580489)).then(c=>c.json()).then(c=>console.log(c))
    var myApi=function(p){
        return apiLink+`popular?api_key=${key}&language=tr-TR&page=${p}`;
    }
    var imgUrl="https://image.tmdb.org/t/p/";
    const loadBtn=$(".movie-load a")

    function GetMovies(){
    fetch(myApi(page))
    .then((res)=>res.json())
    .then((res)=>{
        for(let movie of res.results){
            $("#myFilm .row").append(`
            <div class="col-lg-3" mb-4> 
            <div class="movie-item" my-id=${movie.id} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img class="img-fluid mt-2" src="${imgUrl}/w500${movie.poster_path}"/>      
            <h5 class="text-primary text-center m-3">${movie.original_title}</h5>
            </div>
            </div>
            `)      
        }
        $(".movie-item").click(function(){
            const movieID=$(this).attr("my-id");
            const title=$(this).find("h5").text()
            fetch(getDetail(movieID))
            .then(d=>d.json())
            .then(det=>{
                console.log(det)

             
                $(".movie-modal .movie-content h5").text(det.original_title)
                $(".movie-modal .movie-content p").text(det.overview);
                $(".movie-modal .movie-content .text-imdb span").text(det.vote_average);
                $(".movie-modal .movie-content .genres span").text(det.genres[0].name);
                $(".movie-modal .movie-content .runtime span").text(det.runtime);
                $(".movie-modal .movie-content .popularity span").text(det.popularity);
            })
            $.ajax({
                url:getVideos(movieID),
                method:"GET",
                type:"JSON",
                success:function(res){
                    $(".movie-modal .movie-poster iframe").attr("src",
                    `https://www.youtube.com/embed/${res.results[0].key}`)
                
                    $(".movie-modal .movie-content h5").text(title)

                }
            })
        })
    });
    }
    GetMovies();

    $(".movie-modal").on('hidden.bs.modal',function(e){
        $(".movie-modal .movie-poster iframe").attr("src","")
    });

    loadBtn.click(function(e){
        e.preventDefault()
        page++;
        GetMovies();   
    });

  