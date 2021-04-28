const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Teachers = db.define('Teachers', {
  teacher_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(40)
  },
  email: {
    type: DataTypes.STRING(40)
  }
}, {
  freezeTableName: true
});


module.exports = Teachers;