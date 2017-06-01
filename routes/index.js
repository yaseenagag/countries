var express = require('express');
var rp = require('request-promise')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var options = {
    uri: 'https://restcountries.eu/rest/v2/all',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(options)
    .then(function(data) {
      res.json(data)
    })
});


module.exports = router;
