const Sequelize = require('sequelize');
const connection = require('../../database/db');
const userDetails = require('./index');

const user = connection.define('user', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});

//user.sync({ force: true });


module.exports = user;
