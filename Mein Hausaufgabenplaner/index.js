// index.js

const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Verbindung zur SQL-Datenbank
const sequelize = new Sequelize('tasksDB', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Verbindung testen
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Middleware für JSON-Parser
app.use(express.json());

// Routing einbinden und weiterleiten
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
