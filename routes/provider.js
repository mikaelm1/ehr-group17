var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res){
    res.send('provider');
});

router.get('/register', function(req, res){
    res.render('provider/register');
});

router.post('/register', function(req, res){
    var provider = {};
    provider.email = req.body.email;
    provider.firstName = req.body.first;
    provider.lastName = req.body.last;
    provider.password = req.body.password;
    provider.employer = req.body.employer;
    db.provider.create(provider).then(function(p){
        // console.log(p);
        res.redirect('/');
    }, function(err){
        console.log(err);
        res.redirect('/provider/register');
    })
    // res.render('provider/register');
});


module.exports = router;