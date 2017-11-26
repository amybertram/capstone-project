var state = {
  query:""
}

//Modification Functions
function getDataFromRecipeApi(searchTerm, callback) {
  var edamamURL = 'https://api.edamam.com/search';
  var query = {
    app_key:'c2c79c8caa7613660d44323b66a41f0d',
    app_id: '58a559c5',
    q: searchTerm,
    from: 0,
    to: 15
  }
  $.getJSON(edamamURL, query, callback);
}

function getDataFromYoutubeApi(searchTerm, callback) {
  var youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
  var query = {
    part: 'snippet',
    key:'AIzaSyBKraYE20XvQW71WAVGhFnmOqEOYFfvQDc',
    q: searchTerm + "music",
    maxResults: 15,
  }
  $.getJSON(youtubeURL, query, callback);
}

function displayRecipeResults(data){
  var results = data.hits.map(function(item, index) {
    return renderRecipeResult(item);
  });
  $('.js-recipe-results').html(results);
}

function displayPlaylistResults(data){
  var results = data.items.map(function(item, index) {
    return renderPlaylistResult(item);
  });
  $('.js-playlist-results').html(results);
}


//Render Functions
function renderRecipeResult(result) {
  var resultHTML =  
    `<div class="recipe-result">
      <h4 class="recipe-label">${result.recipe.label}</h4>
      <img src="${result.recipe.image}" alt="${result.recipe.label}" class="js-recipe-selection">
      <div class="selected-recipe hidden">
        <p>Yield: ${result.recipe.yield}</p>
        <button><a href="${result.recipe.url}" target="_blank">View Full Recipe</a></button>
      </div>
    </div>`
    // <div class="selected-recipe">
    //   <p>${result.recipe.ingredients.food}</p>
    // </div>`
  return resultHTML; 
}


function renderPlaylistResult(result) {
  var resultHTML =  
    `<div class="music-result" data-video-id=${result.id.videoId}>
      <h4 class="music-label">${result.snippet.title}</h4>
      <img src="${result.snippet.thumbnails.medium.url}" class="js-music-selection">
    </div>`
  return resultHTML; 
}
//<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"></a>

//Event Listeners
function watchSearch() {
  $('.search-button').click(function(event) {
    event.preventDefault();
    var queryTarget = $('#js-query');
    state.query = queryTarget.val();
    //state.query = queryTarget.val("");// clear out the input
    $('.welcome-page').addClass("hidden");
    $('.search-results').removeClass("hidden");
    getDataFromRecipeApi(state.query, displayRecipeResults);
    getDataFromYoutubeApi(state.query, displayPlaylistResults);
  });

  // SHOW RECIPE DETAILS AND HYPERLINK ON CLICK
  $('.js-recipe-results').on("click", '.js-recipe-selection', function(event){
    $(this).addClass("hidden")
    $('.selected-recipe').removeClass("hidden")
  });

  // EMBED MUSIC SELECTION ON CLICK
  $('.js-playlist-results').on("click", '.music-result', function(event){
    //$(this).addClass("js-flip")
    var videoId = $(this).attr("data-video-id");
    console.log(videoId)
    $(this).html(`
       <iframe 
         width="392" 
         height="220.5" 
         src="https://www.youtube.com/embed/${videoId}" 
         frameborder="0" 
         allowfullscreen>
      </iframe>`)
  });

  //When Click on Banner, go back to home page, everything else hides
}
  

$(function(){
  watchSearch();
}); 
