const Bug = require('../models/bugModel');
const { validateBugPayload } = require('../utils/validation');

async function createBug(req, res, next) {
  try {
    const { valid, errors } = validateBugPayload(req.body);
    if (!valid) return res.status(400).json({ errors });

    const bug = await Bug.create(req.body);
    return res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
}

async function getBugs(req, res, next) {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    return res.json(bugs);
  } catch (err) {
    next(err);
  }
}

async function updateBug(req, res, next) {
  try {
    const { id } = req.params;
    const { valid, errors } = validateBugPayload(req.body);
    if (!valid) return res.status(400).json({ errors });

    const updated = await Bug.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Bug not found' });
    return res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteBug(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Bug.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Bug not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBug, getBugs, updateBug, deleteBug };
