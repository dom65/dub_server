// ombd-connector.js
var rp = require('request-promise');

// Find a better place for secret key

var findPosterUrl = function(titolo) {
  return rp({
    uri: 'http://www.omdbapi.com/',
    qs: {
	apikey: '88d536ae',
        t: titolo,
    },
    json: true,
  })
  .then(function(response) {
    return response.Poster;
  })
  .catch(function(error) {
    console.log(titolo);
  });;
};

module.exports = findPosterUrl