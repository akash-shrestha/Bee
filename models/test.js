const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Test = sequelize.define('test', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false, 
    primaryKey: true
  },
  testName: {
    type: Sequelize.STRING,
    allowNull: false, 
  },
})

module.exports = Test;