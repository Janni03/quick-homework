// routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET: Alle Aufgaben abrufen
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Neue Aufgabe erstellen
router.post('/', async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Aufgabe aktualisieren
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Aufgabe löschen
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Deleted task' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
