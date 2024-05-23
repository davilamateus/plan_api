const Sequelize = require('sequelize');
const connection = require('../../database/db');
const usersModel = require('./../users');

const trip = connection.define('trip', {

    currentCity: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    currentState: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    currentCountry: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    currentCountrySlug: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    currentCurrency: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tripCity: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tripState: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    tripCountry: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tripCountrySlug: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tripCurrency: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tripLon: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tripLat: {
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

trip.belongsTo(usersModel)
//trip.sync({ force: true });

module.exports = trip;
