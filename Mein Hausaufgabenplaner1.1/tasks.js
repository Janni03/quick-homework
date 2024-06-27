const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const tasksFilePath = path.join(__dirname, 'aufgaben.json');

router.get('/all', (req, res) => {
    let tasks = readTasksFromFile();
    res.json(tasks);
});

router.post('/add', (req, res) => {
    const newTask = req.body;
    let tasks = readTasksFromFile();
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.json(newTask);
});

router.put('/update', (req, res) => {
    const updatedTask = req.body;
    let tasks = readTasksFromFile();
    tasks = tasks.map(task => {
        if (task.fach === updatedTask.fach && task.aufgabe === updatedTask.aufgabe) {
            return { ...task, ...updatedTask };
        }
        return task;
    });
    writeTasksToFile(tasks);
    res.json(updatedTask);
});

router.delete('/delete', (req, res) => {
    const { fach, aufgabe } = req.query;
    let tasks = readTasksFromFile();
    tasks = tasks.filter(task => !(task.fach === fach && task.aufgabe === aufgabe));
    writeTasksToFile(tasks);
    res.json({ fach, aufgabe });
});

function readTasksFromFile() {
    try {
        const data = fs.readFileSync(tasksFilePath, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Fehler beim Lesen der Aufgaben:', error);
        return [];
    }
}

function writeTasksToFile(tasks) {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Fehler beim Schreiben der Aufgaben:', error);
    }
}

module.exports = router;




