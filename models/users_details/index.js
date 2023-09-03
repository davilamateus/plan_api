const Sequelize = require('sequelize');
const connection = require('../../database/db');
const usersModel = require('./../users');

const userDetails = connection.define('usersDetails', {

    photo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city_local: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    city_trip: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    when: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

userDetails.belongsTo(usersModel)
//userDetails.sync({ force: true });

module.exports = userDetails;
