module.exports = function(sequelize, DataTypes) {
    var cost = sequelize.define('costs', {
        systemCost: {
            type: DataTypes.INTEGER
        }
    });
    return cost;
};