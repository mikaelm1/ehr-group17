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

router.get('/new-ehr', auth.isProvider,  function(req, res) {
  res.render('system/new-ehr');
});

router.get('/search-ehr', auth.isProvider,  function(req, res) {
  res.render('system/search-ehr');
});

router.post('/new-ehr', auth.isProvider, function(req, res) {
  var newEhrObject = {};
  newEhrObject.name = req.body.systemname;
  cost = req.body.ehrcost;
  // console.log(req.session);
  db.provider.findOne({
    where: {
      id: req.session.providerID,
    }
  }).then(function(user) {
    // console.log('found user: ' + user.id);
    db.system.findOne({
      where: {
        name: newEhrObject.name,
      }
    }).then(function(s){
      if (s === null) {
        db.system.create(newEhrObject).then(function(p){
          // console.log('First create: ' + p);
          return p.setProviders([user]).then(function() {
            return p.reload();
          }).then(function(p) {
            db.cost.create({systemCost: cost}).then(function(c){
              return p.addCosts([c]).then(function(foo){
                return p.reload();
              }).then(function(bar){
                res.redirect('/');
              })
            }, function(err){
                console.log(err);
                res.status(500);
                res.render('system/new-ehr');
            });
            }, function(err){
                console.log(err);
                res.status(500);
                res.render('system/new-ehr');
            });
          });
      } else {
        return s.setProviders([user]).then(function(){
          return s.reload();
        }).then(function(s){
          db.cost.create({systemCost: cost}).then(function(c){
            return s.addCosts([c]).then(function(foo){
                return s.reload();
              }).then(function(bar){
                res.redirect('/');
              })
          }, function(err){
              console.log(err);
              res.status(500);
              res.render('system/new-ehr');
          })
        }, function(err){
            console.log(err);
            res.status(500);
            res.render('system/new-ehr');
        });
      }
    });
  });
});

router.post('/search-ehr', auth.isProvider, function(req, res) {
  var ehrObject = {};
  ehrObject.name = req.body.systemname;
  ehrObject.cost = req.body.ehrcost;
  // console.log(req.session);
  db.system.findAll({
    where: {
	  name: ehrObject.name,
	  cost: {
	    $lte: ehrObject.cost
	  },
	}			
	}).then(function(p) {
		res.render('system/results-ehr', {systems: p});
	}, function(err){
		console.log(err);
		res.status(500);
		res.render('system/search-ehr');
	})
  });
  
router.post('/results-ehr', auth.isProvider, function(req, res) {
  var ehrObject = {};
  ehrObject.name = req.body.systemname;
  ehrObject.cost = req.body.ehrcost;
  // console.log(req.session);
  db.system.findAll({
    include: [db.cost]
  }).then(function(p) {
    // console.log(p[0].costs);
    // console.log("COUNT: " + p.length);
    for (var i=0; i<p.length; i++) {
      // console.log('INside for loop: ' + i);
      var total = 0;
      for (var j=0; j<p[i].costs.length; j++) {
        if (p[i].costs[j].systemId === p[i].id) {
          total += p[i].costs[j].systemCost;
        }
      }      
      p[i].cost = total / p[i].costs.length;
      console.log("Cost: " + p[i].cost);
    }
      res.render('system/results-ehr', {systems: p});
	}, function(err){
		console.log(err);
		res.status(500);
		res.render('home');
	})
  });


module.exports = router;
