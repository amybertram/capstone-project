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
    to: 20
  }
  $.getJSON(edamamURL, query, callback);
}

function getDataFromSpotifyApi(searchTerm, callback) {
  var authURL = 'https://accounts.spotify.com/authorize';
  var spotifyURL = 'https://api.spotify.com/v1/search?type=playlist';
  var header = {
    client_id: 'b8220b60db40488f90c40aec46f8b63f',
    response_type: 'token',
    redirect_uri: spotifyURL
  }
  var query = {
    type: 'playlist',
    q: searchTerm
  }
  $.getJSON(spotifyURL, query, callback);
}

function displayRecipeResults(data){
  var results = data.hits.map(function(item, index) {
    return renderRecipeResult(item);
  });
  $('.js-recipe-results').html(results);
}

function displaySpotifyResults(data){
  var results = data.tracks.map(function(item, index) {
    return renderSpotifyResult(item);
  });
  $('.js-playlist-results').html(results);
}


//Render Functions
function renderRecipeResult(result) {
  var resultHTML =  
    `<h4>${result.recipe.label}</h4>
    <a href="${result.recipe.url}" target="_blank"> <img src="${result.recipe.image}" alt="${result.recipe.label}"> </a>`
  return resultHTML; 
}

function renderSpotifyResult(result) {
  var resultHTML =  
    `<h4>${result.images}</h4>`
  return resultHTML; 
}


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
    getDataFromRecipeApi(state.query, displaySpotifyResults);
  });
}
  

$(function(){
  watchSearch();
}); 
