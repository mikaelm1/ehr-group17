var request = require('supertest');
var app = require('../app');
var db = require('../db');

describe('GET /', function(){
	before(function () {
        return db.sequelize.sync();
    });
	
	describe('POST system/new-ehr', function(){
        it('respond without error', function(done){
            request(app)
                .post('/system/new-ehr')
				.send({systemname: "This system", ehrcost: 500000})
                .expect(302)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });
	
	describe('GET /system/new-ehr', function(){
        it('respond with view', function(done){
        request(app)
            .get('/system/new-ehr')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });
    });
	
	describe('GET /system/search-ehr', function(){
        it('respond with view', function(done){
        request(app)
            .get('/system/search-ehr')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done();
            });
        });
    });
	
	describe('POST system/results-ehr', function(){
        it('respond without error', function(done){
            request(app)
                .post('/system/results-ehr')
				.send({systemname: "This system", ehrcost: 500000})
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });
	
	describe('POST system/search-ehr', function(){
        it('respond without error', function(done){
            request(app)
                .post('/system/search-ehr')
				.send({systemname: "This system", ehrcost: 500000})
                .expect(200)
				.expect(/This system/)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST system/new-ehr', function(){
        it('respond without error', function(done){
            request(app)
                .post('/system/new-ehr')
				.send({systemname: "Google", ehrcost: 500})
                .expect(302)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST system/results-ehr', function(){
        it('respond without error', function(done){
            request(app)
                .post('/system/search-ehr')
                .send({})
                .expect(200)
                .end(function(err, res){
                    if (err) return done(err);
                    done();
                });
        });
    });
	
});