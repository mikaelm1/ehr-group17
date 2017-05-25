module.exports = function(sequelize, DataTypes) {
    var rating = sequelize.define('ratings', {
        ratingValue: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return rating;
};