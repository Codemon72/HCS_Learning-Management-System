const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');


const Course_Modules = db.define('Course_Modules', {
  course_module_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(40)
  },
  hours: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});

module.exports = Course_Modules;