var Sequelize = require("sequelize");
var path = require("path");
var env = process.env.NODE_ENV || "development";
console.log(env);

if (env === "development") {
    var sequelize = new Sequelize('devdb', 'dev', 'devpwd', {
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        storage: 'devdb.sqlite'
    });
} else {
    var sequelize = new Sequelize('testdb', 'test', 'testpwd', {
        dialect: 'sqlite',
        storage: ':memory:'
    });
}
var sequelize = new Sequelize('devdb', 'dev', 'devpwd', {
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: 'devdb.sqlite'
});

var db = {};
db.system = sequelize.import(__dirname + '/models/system.js');
db.provider = sequelize.import(__dirname + '/models/provider.js');
db.patient = sequelize.import(__dirname + '/models/patient.js');
// db.cost = sequelize.import(__dirname + '/models/cost.js');
db.rating = sequelize.import(__dirname + '/models/rating.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.cost.belongsTo(db.provider);
// db.cost.belongsTo(db.system);
db.system.belongsTo(db.provider);
db.rating.belongsTo(db.provider);
db.rating.belongsTo(db.patient);
db.patient.belongsToMany(db.provider, {through: 'patient_provider'});
db.provider.belongsToMany(db.patient, {through: 'patient_provider'});

module.exports = db;
