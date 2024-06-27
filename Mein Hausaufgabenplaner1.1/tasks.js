

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const tasksFilePath = path.join(__dirname, 'aufgaben.json');

// Hilfsfunktion zum Lesen der JSON-Datei
const readTasksFromFile = () => {
    if (!fs.existsSync(tasksFilePath)) {
        return [];
    }
    const data = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(data);
};

// Hilfsfunktion zum Schreiben in die JSON-Datei
const writeTasksToFile = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// GET: Alle Aufgaben abrufen
router.get('/', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

// POST: Neue Aufgabe hinzufügen
router.post('/', (req, res) => {
    const { fach, aufgabe, datum, notizen } = req.body;
    const tasks = readTasksFromFile();
    const newTask = { id: Date.now(), fach, aufgabe, datum, notizen };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.json(newTask);
});

// DELETE: Aufgabe löschen
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let tasks = readTasksFromFile();
    tasks = tasks.filter(task => task.id != id);
    writeTasksToFile(tasks);
    res.json({ message: 'Task deleted' });
});

module.exports = router;



