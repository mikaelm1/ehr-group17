var Sequelize = require("sequelize");

var sequelize = new Sequelize('devdb', 'dev', 'devpwd', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: 'devdb.sqlite'
});

module.exports = sequelize;