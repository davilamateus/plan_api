const Sequelize = require('sequelize');
const connection = require('../../database/db');
const usersModel = require('./../users');

const userDetails = connection.define('userDetail', {

    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city_local: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    state_local: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    country_local: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    city_trip: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    state_trip: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    country_trip: {
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
