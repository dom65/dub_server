// tmbd-connector.js
var rp = require('request-promise');

var config_path = 'http://image.tmdb.org/t/p/w300';
// Find a better place for secret key

var findFotoAttore = function(attore) {

  return rp({
    uri: 'https://api.themoviedb.org/3/search/person',
    qs: {
	    api_key: 'cbfe0e6fdbf1414cad536ece062620ec',
      query: attore,
      //language: 'it',
    },
    json: true
  })
  .then(function(response) {
    return response.results ? config_path + response.results[0].profile_path : undefined;
  })
  .catch(function(error) {
    console.log(error);
    return undefined;
  });;
};

var findDescAttore = function(attore) {

  return rp({
    uri: 'https://api.themoviedb.org/3/search/person',
    qs: {
	    api_key: 'cbfe0e6fdbf1414cad536ece062620ec',
      query: attore,
      //language: 'it',
    },
    json: true
  })
  .then(function(response) {
    return response.results ? lookupPerson(response.results[0].id) : undefined;
  })
  .catch(function(error) {
    console.log(error);
    return undefined;
  });
};

function lookupPerson(id) {
  return rp({
    uri: 'https://api.themoviedb.org/3/person/' + id,
    qs: {
	     api_key: 'cbfe0e6fdbf1414cad536ece062620ec',
       //language: 'it',
    },
    json: true
  })
  .then(function(response) {
    return response.biography;
  })
  .catch(function(error) {
    console.log(error);
    return undefined;
  });
}

var findPosterTitolo = function(titolo, originale) {

  return rp({
    uri: 'https://api.themoviedb.org/3/search/movie',
    qs: {
	     api_key: 'cbfe0e6fdbf1414cad536ece062620ec',
       query: originale ? originale : titolo,
       //language: 'it',
    },
    json: true
  })
  .then(function(response) {
    return response.results ? config_path + response.results[0].poster_path : undefined;
  })
  .catch(function(error) {
    console.log(error);
    return undefined;
  });
};

var findDescTitolo = function(titolo, originale) {

  return rp({
    uri: 'https://api.themoviedb.org/3/search/movie',
    qs: {
	     api_key: 'cbfe0e6fdbf1414cad536ece062620ec',
       query: originale ? originale : titolo,
       //language: 'it',
    },
    json: true
  })
  .then(function(response) {
    return response.results ? lookupTitle(response.results[0].id) : undefined;
  })
  .catch(function(error) {
    console.log(error);
    return undefined;
  });
};

function lookupTitle(id) {
  return rp({
    uri: 'https://api.themoviedb.org/3/movie/' + id,
    qs: {
	     api_key: 'cbfe0e6fdbf1414cad536ece062620ec',
       //language: 'it',
    },
    json: true
  })
  .then(function(response) {
    return response.overview;
  })
  .catch(function(error) {
    console.log(error);
    return undefined;
  });
}

module.exports = {findFotoAttore, findDescAttore, findPosterTitolo, findDescTitolo}
