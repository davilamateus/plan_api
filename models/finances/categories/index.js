const Sequelize = require('sequelize');
const connection = require('../../../database/db');
const usersModel = require('../../users');

const financesCategories = connection.define('financesCategories', {

    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    icon: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    color: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

financesCategories.belongsTo(usersModel);
//financesCategories.sync({ force: true });

module.exports = financesCategories;
