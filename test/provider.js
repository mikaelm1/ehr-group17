var request = require('supertest');
var app = require('../app');

describe('GET /', function(){
    before(function () {
        return require('../db').sequelize.sync();
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

});
