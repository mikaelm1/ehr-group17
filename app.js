var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var bodyParser = require("body-parser");
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var flash = require('express-flash');
var app = express();
// var sequelize = require('./db');
var systemRoutes = require('./routes/system');
var providerRoutes = require('./routes/provider');
// var models = require('./models/models');
var db = require('./db');

app.set('port', 5000);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'SuperSecretPassword',
    cookie: {maxAge: 3600000},
}));

app.get('/', function(req, res){
    if (req.session.providerID) {
        res.locals.providerID = req.session.providerID;
    }
    res.render('home');
});

app.use('/system', systemRoutes);
app.use('/provider', providerRoutes);

db.sequelize.sync({
	force: true
}).then(function() {
    var p = {
        email: 'admin@example.com',
        firstName: 'admin',
        lastName: 'bossman',
        password: 'pass',
        employer: 'acme'
    }
	app.listen(app.get('port'), function(){
        db.provider.create(p).then(function(p){
            console.log('admin created');
        }, function(err){
            console.log(err);
        })
        console.log("Server started on port " + app.get('port'));
        console.log("Press Ctrl-C to terminate");
    });
});


// app.listen(app.get('port'), function(){
//     console.log("Server started on port " + app.get('port'));
//     console.log("Press Ctrl-C to terminate");
// });

module.exports = app;
