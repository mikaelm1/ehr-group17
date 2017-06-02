var request = require('supertest');
var app = require('../app');
var db = require('../db');

describe('Patient /', function(){
    before(function () {
        return db.sequelize.sync();
    });

    describe('GET /patient/register', function(){
        it('respond with view', function(done){
        request(app)
            .get('/patient/register')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });
    });

    describe('POST /patient/register', function(){
        it('respond with error status', function(done){
            request(app)
                .post('/patient/register')
                .send({email: ''})
                .expect(400)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /patient/register', function(){
        it('respond with error status', function(done){
            request(app)
                .post('/patient/register')
                .send({email: 'test@example.com', password: 'pass', first: 'test', last: 'pass'})
                .expect(302)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /patient/login', function(){
        it('respond without error', function(done){
            request(app)
                .get('/patient/login')
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /provide/login', function(){
        it('respond without error', function(done){
            request(app)
                .post('/patient/login')
                .expect(400)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /patient/login', function(){
        it('respond without error', function(done){
            request(app)
                .post('/patient/login')
                .send({email: 'test@example.com', password: 'pass'})
                .expect(302)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /patient/login', function(){
        it('respond with error', function(done){
            request(app)
                .post('/patient/login')
                .send({email: 'test@example.com'})
                .expect(400)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /patient/login', function(){
        it('respond with error', function(done){
            request(app)
                .post('/patient/login')
                .send({email: 'test@example.com', password: 'wrong'})
                .expect(404)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /patient/profile', function(){
        it('respond with error', function(done){
            request(app)
                .get('/patient/profile')
                .expect(404)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

});