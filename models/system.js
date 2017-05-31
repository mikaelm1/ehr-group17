module.exports = function(sequelize, DataTypes) {
    var system = sequelize.define('systems', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return system;
};
