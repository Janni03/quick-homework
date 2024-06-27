// models/task.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tasksDB', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'tasks',
    timestamps: false
});

sequelize.sync()
    .then(() => {
        console.log('Tasks table has been synced');
    })
    .catch(err => {
        console.error('Unable to sync the database:', err);
    });

module.exports = Task;
