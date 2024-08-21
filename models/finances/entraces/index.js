const Sequelize = require("sequelize");
const connection = require("../../../database/db");
const usersModel = require("../../users");

const financesEntraces = connection.define("financesEntraces", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

financesEntraces.belongsTo(usersModel);
usersModel.hasMany(financesEntraces);
//financesEntraces.sync({ force: true });

module.exports = financesEntraces;
