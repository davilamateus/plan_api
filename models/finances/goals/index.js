const Sequelize = require('sequelize');
const connection = require('../../../database/db');
const usersModel = require('../../users');

const financesGoals = connection.define('financesGoals', {

    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.INTEGER,
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

financesGoals.belongsTo(usersModel);
usersModel.hasMany(financesGoals)
financesGoals.belongsTo(usersModel);
//financesGoals.sync({ force: false });

module.exports = financesGoals;
