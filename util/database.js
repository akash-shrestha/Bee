const Sequelize = require('sequelize');

const sequelize = new Sequelize('audio-bee', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
