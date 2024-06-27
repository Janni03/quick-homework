/*
// index.js oder in einer separaten Router-Datei wie tasks.js

const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Sequelize-Instanz erstellen und mit der Datenbank verbinden
const sequelize = new Sequelize('tasksDB', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const app = express();
app.use(bodyParser.json()); // Middleware zum Parsen von JSON-Anfragen

// Task-Modell definieren
const Task = sequelize.define('Task', {
    fach: DataTypes.STRING,
    aufgabe: DataTypes.STRING,
    datum: DataTypes.DATE,
    notizen: DataTypes.TEXT
});

// Synchronisieren des Modells mit der Datenbank
sequelize.sync();

// GET-Anfrage für alle Tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll(); // Alle Tasks aus der Datenbank abrufen
    res.json(tasks); // Tasks als JSON an den Client senden
});

// POST-Anfrage für das Erstellen eines neuen Tasks
app.post('/tasks', async (req, res) => {
    const { fach, aufgabe, datum, notizen } = req.body; // Daten aus dem Anfrage-Body extrahieren
    const newTask = await Task.create({ fach, aufgabe, datum, notizen }); // Neuen Task in der Datenbank erstellen
    res.json(newTask); // Den erstellten Task als JSON an den Client senden
});

// DELETE-Anfrage für das Löschen eines Tasks
app.delete('/tasks', async (req, res) => {
    const { fach, aufgabe, datum, notizen } = req.body; // Daten aus dem Anfrage-Body extrahieren
    await Task.destroy({
        where: { fach, aufgabe, datum, notizen } // Task in der Datenbank anhand der übergebenen Kriterien löschen
    });
    res.json({ message: 'Task deleted' }); // Erfolgsnachricht an den Client senden
});

// Server auf Port 3000 starten
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000'); // Konsolennachricht, dass der Server läuft
});
*/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Statische Dateien servieren
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Routing für Aufgaben
const tasksRouter = require('./tasks');
app.use('/tasks', tasksRouter);

//Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




