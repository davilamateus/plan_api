const Sequelize = require('sequelize');


const connection = new Sequelize('u225794026_lab', 'u225794026_lab', 'Goias123.', {
    host: '153.92.6.103',
    dialect: 'mysql',

});


module.exports = connection;