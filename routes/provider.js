var express = require('express');
var router = express.Router();
var db = require('../db');
var auth = require('../middleware');

router.get('/', function(req, res){
    res.send('provider');
});

router.get('/login', function(req, res){
    res.render('provider/login');
});

router.post('/login', function(req, res){
    var email = req.body.email;
    var pwd = req.body.password;
    var valid = true;
    var msg = "";
    if (email === "" || email === undefined) {
        valid = false;
        msg += "Email required\n";
    }
    if (pwd === "" || pwd === undefined) {
        valid = false;
        msg += "Password required\n";
    }
    if (valid === false) {
        res.status(400)
        res.render('provider/login');
    } else {
        db.provider.findOne({
            where: {
                email: email,
                password: pwd,
            }
        }).then(function(u){
            req.session.providerID = u.id;
            res.redirect('/');
        }, function(err) {
            console.log(err);
            res.status(404)
            res.render('provider/login');
        });
    }
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
    // console.log("PWD: " + provider.password);
    var valid = true;
    var msg = "";
    if (provider.email === "") {
        valid = false;
        msg += "Email field required.\n";
    }
    if (provider.firstName ===  "" || provider.firstName === undefined) {
        valid = false;
        msg += "First name required.\n";
    }
    if (provider.lastName === "" || provider.lastName === undefined) {
        valid = false;
        msg += "Last name required\n";
    }
    if (provider.password === "" || provider.password === undefined) {

        valid = false;
        msg += "Password required\n";
    }
    if (provider.employer === "" || provider.employer === undefined) {
        valid = false;
        msg += "Employer required\n";
    }
    if (valid === false) {
        console.log('valid is false');
        res.status(400);
        res.render('provider/register', {errorMsg: msg});
    } else {
        db.provider.create(provider).then(function(p){
            req.session.providerID = p.id;
            res.redirect('/');
        }, function(err){
            console.log(err);
            // res.redirect('/provider/register');
            res.type('application/json');
            res.status(500);
            res.send('500 - Server error');
        })
    }
});

router.get('/profile', auth.isProvider, function(req, res) {
  res.render('provider/profile');
})


module.exports = router;
