const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Course_Events = require('./Course_Events');


const Sessions = db.define('Sessions', {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_start: {
    type: DataTypes.DATE
  },
  session_end: {
    type: DataTypes.DATE
  },
  course_event_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Course_Events,
      key: 'course_event_id'
    }
  }
}, {
  freezeTableName: true
});


Sessions.belongsTo(Course_Events, {foreignKey: 'course_event_id'});
Course_Events.hasMany(Sessions, {foreignKey: 'course_event_id', sourceKey: 'course_event_id', onDelete: 'CASCADE'});

module.exports = Sessions;