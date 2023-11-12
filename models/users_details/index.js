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
    currency_local: {
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
    currency_trip: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    country_code: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    country_lat: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    country_lon: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    when: {
        type: Sequelize.BIGINT,
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
