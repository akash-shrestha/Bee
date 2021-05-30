const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Admin = sequelize.define('admins', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false, 
    primaryKey: true
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false, 
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false, 
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}
)

module.exports = Admin;