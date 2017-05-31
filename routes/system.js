var express = require('express');
var router = express.Router();
var models = require('../models/models');
var auth = require('../middleware');
var db = require('../db');

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

router.get('/new-ehr', auth,  function(req, res) {
  res.render('system/new-ehr');
});

router.post('/new-ehr', auth, function(req, res) {
  var newEhrObject = {};
  newEhrObject.name = req.body.systemname;
  newEhrObject.cost = req.body.ehrcost;
  console.log(req.session);
  db.provider.findOne({'where': {id: req.session.providerID}}.then(function(user) {
    db.system.create(newEhrObject).then(function(p){
      user.addSystem(p).then(function() {
        return p.reload();
      }).then(function(p) {
        res.redirect('/system/profile');
      })
    }, function(err){
        console.log(err);
        res.type('application/json');
        res.status(500);
        res.send('500 - Server error');
    })
  }));

});


module.exports = router;
