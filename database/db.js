require("dotenv").config();
const Sequelize = require("sequelize");
const apiKey = process.env.db;

const connection = new Sequelize("u225794026_lab", "u225794026_lab", apiKey, {
    host: "62.72.62.70",
    dialect: "mysql"
});

module.exports = connection;
