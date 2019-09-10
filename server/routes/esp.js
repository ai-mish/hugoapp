var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    //console.log('Getting all books');
    let espPromise = require('../sasesp/health.js');
    //let status = esp.health()
    espPromise()
    .then(function(server){
      res.status(200).json({"esphealth":"up"})
      //console.log(server);
    })
    .catch(function(err){
      res.status(200).json({"esphealth":"down"})
      //console.log(err)
    });

});
module.exports = router;
