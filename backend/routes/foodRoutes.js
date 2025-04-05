const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// POST new food item
router.post('/', async (req, res) => {
    try {
        const food = new FoodItem(req.body);
        const saved = await food.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all food items
router.get('/', async (req, res) => {
    try {
        const items = await FoodItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
