const express = require("express");
const router = express.Router();
const Task = require("../models/TaskModel");

// GET all tasks
router.get("/", async (_req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const { title, tags } = req.body;
    const task = await Task.create({ title, tags });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to toggle task completion
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
