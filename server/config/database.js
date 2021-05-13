const { Sequelize } = require('sequelize');

module.exports = new Sequelize('LearningManagementSystem', 'clemens', '', {
  host: '127.0.0.1',
  dialect: 'mariadb'
});
