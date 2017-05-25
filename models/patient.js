module.exports = function(sequelize, DataTypes) {
    var patients = sequelize.define('patients', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return patients;
};