var request = require('supertest');
var app = require('../app');
var db = require('../db');

describe('GET /', function(){
    before(function () {
        return db.sequelize.sync();
    });
    it('respond with json', function(done){
        request(app)
        .get('/')
        .expect(/Home/)
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            // console.log(res);
            done()
        });
    });

    describe('GET /provider/register', function(){
        it('respond with view', function(done){
        request(app)
            .get('/provider/register')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });
    });

    describe('POST /provider/register', function(){
        it('respond with error status', function(done){
            request(app)
                .post('/provider/register')
                .send({email: ''})
                .expect(400)
                .end(function(err, res){
                    //console.log(err);
                    //console.log(res);
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /provide/register', function(){
        it('respond with password error', function(done){
            request(app)
                    .post('/provider/register')
                    .send({email: 'example@yahoo.com'})
                    .expect(400)
                    .expect(/Password required/)
                    .end(function(err, res){
                        if (err) return done(err);
                        done();
                    });
            });
    });

    describe('POST /provide/register', function(){
        it('respond with name error', function(done){
            request(app)
                .post('/provider/register')
                .send({email: 'kjrn', password: 'wkrjge'})
                .expect(400)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /provide/register', function(){
        it('respond without error', function(done){
            request(app)
                .post('/provider/register')
                .send({email: 'kjrn@yahoo.com', password: 'wkrjge', first: 'bob', last: 'smith', employer: 'abc'})
                .expect(302)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /provide/login', function(){
        it('respond without error', function(done){
            request(app)
                .get('/provider/login')
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
                .post('/provider/login')
                .expect(400)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

});
