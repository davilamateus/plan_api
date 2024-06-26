const Sequelize = require('sequelize');
const connection = require('../../database/db');

const confirmEmail = connection.define('confirmEmail', {

    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valid: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

});

//ConfirmEmail.sync({ force: true });


module.exports = confirmEmail;
