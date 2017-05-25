module.exports = function(sequelize, DataTypes) {
    var providers = sequelize.define('providers', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employer: {
            type: DataTypes.STRING,
        },
    });
    return providers;
};