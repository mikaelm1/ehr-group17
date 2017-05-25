var express = require('express');
var router = express.Router();
var models = require('../models/models');

router.get('/', function(req, res){
    var system = models.System.findAll();
    var provider = models.Provider.findAll();
    console.log(provider);
    var rating = models.Rating.findAll();
    console.log(rating);
    var cost = models.Cost.findAll();
    console.log(cost);
    res.send("Systems: " + system);
});


module.exports = router;