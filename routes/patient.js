var express = require('express');
var router = express.Router();
var db = require('../db');
var auth = require('../middleware');

router.get('/register', function(req, res){
    res.render('patients/register');
});

router.post('/register', function(req, res){
    var patient = {};
    patient.email = req.body.email;
    patient.firstName = req.body.first;
    patient.lastName = req.body.last;
    patient.password = req.body.password;
    // console.log("PWD: " + patient.password);
    var valid = true;
    var msg = "";
    if (patient.email === "") {
        valid = false;
        msg += "Email field required.\n";
    }
    if (patient.firstName ===  "" || patient.firstName === undefined) {
        valid = false;
        msg += "First name required.\n";
    }
    if (patient.lastName === "" || patient.lastName === undefined) {
        valid = false;
        msg += "Last name required\n";
    }
    if (patient.password === "" || patient.password === undefined) {

        valid = false;
        msg += "Password required\n";
    }
    if (valid === false) {
        console.log('valid is false');
        res.status(400);
        res.render('patient/register', {errorMsg: msg});
    } else {
        db.patient.create(patient).then(function(p){
            console.log(p.id);
            req.session.patientID = p.id;
            res.redirect('/');
        }, function(err){
            console.log(err);
            // res.redirect('/patient/register');
            res.type('application/json');
            res.status(500);
            res.send('500 - Server error');
        })
    }
});

router.get('/login', function(req, res){
    res.render('patients/login');
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
    if (pwd === undefined || pwd === "") {
        valid = false;
        msg += "Password required\n";
    }
    console.log("PWD: " + pwd);
    if (valid === false) {
        res.status(400)
        res.render('patients/login');
        console.log('Invalid inputs');
    } else {
        console.log('Valid inputs');
        db.patient.findOne({
            where: {
                email: email,
                password: pwd,
            }
        }).then(function(u){
            console.log("Patient: " + u);
            if (u === null) {
                res.status(404)
                res.render('patients/login');
            } else {
                req.session.patientID = u.id;
                res.redirect('/');
            }
        }, function(err) {
            console.log(err);
            res.status(404)
            res.render('patients/login');
        });
    }
});

router.get('/profile', auth.isPatient, function(req, res){
    db.patient.findOne({
        where: {
            id: req.session.patientID,
        }
    }).then(function(u){
        if (u === null) {
            res.status(404);
            res.render('patients/login');
        } else {
            res.render('patients/profile', {patient: u});
        }
    }, function(err){
        console.log(err);
        res.status(500)
        res.render('patints/login');
    })
});

module.exports = router;