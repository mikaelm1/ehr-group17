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
  // console.log(req.session);
  db.provider.findOne({
    where: {
      id: req.session.providerID,
    }
  }).then(function(user) {
    // console.log('found user: ' + user.id);
    db.system.create(newEhrObject).then(function(p){
      // console.log('First create: ' + p);
      return p.setProvider(user).then(function() {
        return p.reload();
      }).then(function(p) {
        res.redirect('/provider/profile');
      })
    }, function(err){
        console.log(err);
        res.status(500);
        res.render('system/new-ehr');
    })
  });
});


module.exports = router;
