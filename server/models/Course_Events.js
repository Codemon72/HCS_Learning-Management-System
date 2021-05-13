const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Course_Modules = require('./Course_Modules');
const Teachers = require('./Teachers');

const Course_Events = db.define('Course_Events', {
  course_event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_start_date: {
    type: DataTypes.DATEONLY
  },
  course_end_date: {
    type: DataTypes.DATEONLY
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Teachers,
      key: 'teacher_id'
    }
  },
  course_module_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Course_Modules,
      key: 'course_module_id'
    }
  }
}, {
  freezeTableName: true
});

Course_Events.belongsTo(Teachers, {foreignKey: 'teacher_id'});
Course_Events.belongsTo(Course_Modules, {foreignKey: 'course_module_id'});

module.exports = Course_Events;