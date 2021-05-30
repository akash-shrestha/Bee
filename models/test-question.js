const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Test = sequelize.define('test-qusetions', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false, 
    primaryKey: true
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false, 
  },
  optionA: Sequelize.STRING,
  optionB: Sequelize.STRING,
  optionC: Sequelize.STRING,
  correctAnswer: Sequelize.STRING,
})

module.exports = Test;