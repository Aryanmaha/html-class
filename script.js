// api key = 45db54b719c5fbddd3268a480d8a917a
// popular url = https://api.themoviedb.org/3/movie/popular?api_key=45db54b719c5fbddd3268a480d8a917a&poster_path&images
// trending url = https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// search url = https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
//Discover url = https://api.themoviedb.org/3/discover/movie?api_key={api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
const apikey = '45db54b719c5fbddd3268a480d8a917a';
const imgPath = 'https://image.tmdb.org/t/p/w500/';
const trending_Movies = document.querySelector('.trending_movie_Card');
const discover_Movies = document.querySelector('.discover_movie_Card');
const popular_Movies = document.querySelector('.popular_movie_Card');
const popup_Container = document.querySelector('#popup');

// function for pop-up
function click_to_cards(cards){
  cards.forEach(cards => {
    cards.addEventListener("click",() => show_popup(cards));
  });
}
// get the movie genre
async function get_Movie_Genre(id){
  const resp = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=45db54b719c5fbddd3268a480d8a917a&language=en-US')
  const respData = await resp.json();
  respData.genres.map(Data =>{
    if (Data.id == id){
      console.log(Data);
      return Data.name;

    }
  });

}

// get_Movie_Genre();
// get the trending movie
async function get_Trending_Movies(){
  const resp = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + apikey)
  const respData = await resp.json();
  posts = respData.results.slice(0,6);
  posts.map(posts => {  //how to get genre ID from the api and display
    trending_Movies.innerHTML += `
    <div class="movies_card">
    <img src="${imgPath + posts.poster_path}">
    <h3>${posts.title}</h3>
    <div class= "movie_card_details">
    <h3>${posts.title}</h3>
    <h2><span>Release data : </span>${posts.release_date}</h2>
    <span><span>language available </span>: ${posts.original_language}</span>
    <h4><span>${get_Movie_Genre("18")}</span> <span>genre</span><span> genre</span></h4>
    <p><span>Sypnosis: </span>${posts.overview}</p>
    </div>
    </div>
    `;
  });
  const cards = document.querySelectorAll('.movies_card');
	click_to_cards(cards);
}
get_Trending_Movies();

// getting movies to discover
async function get_Discover_Movies(){
  const resp = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + apikey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
  const respData = await resp.json();
  posts = respData.results.slice(0,6);
  posts.map(posts => {
    discover_Movies.innerHTML += `
    <div class="movies_card">
    <img src="${imgPath + posts.poster_path}">
    <h3>${posts.title}</h3>
    <div class= "movie_card_details">
    <h3>${posts.title}</h3>
    <h2><span>Release data : </span>${posts.release_date}</h2>
    <span><span>language available </span>: ${posts.original_language}</span>
    <h4><span>${posts.genre_ids}</span> <span>genre</span><span> genre</span></h4>
    <p><span>Sypnosis: </span>${posts.overview}</p>
    </div>
    </div>
    `;
  });
}
get_Discover_Movies()
// getting popular movies
async function get_popular_movies(){
  const resp = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apikey + '&poster_path&images')
  const respData = await resp.json();
  posts = respData.results.slice(6,12);
  posts.map(posts => {
    popular_Movies.innerHTML += `
    <div class="movies_card">
    <img src="${imgPath + posts.poster_path}">
    <h3>${posts.title}</h3>
    <div class= "movie_card_details">
    <h3>${posts.title}</h3>
    <h2><span>Release data : </span>${posts.release_date}</h2>
    <span><span>language available </span>: ${posts.original_language}</span>
    <h4><span>genre</span> <span>genre</span><span> genre</span></h4>
    <p><span>Sypnosis: </span>${posts.overview}</p>
    </div>
    </div>
    `;
  });
}
get_popular_movies()

function show_popup(cards){
  popup_Container.classList.add('.show_popup');
};
// show_popup();
