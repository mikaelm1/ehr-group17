var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var bodyParser = require("body-parser");
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var flash = require('express-flash');
var app = express();
// var sequelize = require('./db');
var systemRoutes = require('./routes/system');
// var models = require('./models/models');
var db = require('./db');

app.set('port', 8000);
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
    db.cost.findAll({
    }).then(function(s){
        console.log(s);
        res.render('home');  
    }, function(e){
        console.log(e);
        res.render('home');
    });
});

app.use('/system', systemRoutes);

db.sequelize.sync({
	force: true
}).then(function() {
	app.listen(app.get('port'), function(){
        console.log("Server started on port " + app.get('port'));
        console.log("Press Ctrl-C to terminate");
    });
});