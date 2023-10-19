const Sequelize = require('sequelize');


const connection = new Sequelize('u225794026_lab', 'u225794026_lab', 'Goias123.', {
    host: '62.72.62.70',
    dialect: 'mysql',

});


module.exports = connection;