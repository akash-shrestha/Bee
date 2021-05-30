const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserTestsResult = sequelize.define('user-tests-results', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false, 
    primaryKey: true
  },
  correctAnswers: Sequelize.INTEGER,
  wrongAnswers: Sequelize.INTEGER,
  result: Sequelize.STRING
})

module.exports = UserTestsResult;