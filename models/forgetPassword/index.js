const Sequelize = require("sequelize");
const connection = require("../../database/db");

const ForgetPassword = connection.define("forgetPassword", {
	token: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	userId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	valid: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	expiresAt: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

//ForgetPassword.sync({ force: true });

module.exports = ForgetPassword;
