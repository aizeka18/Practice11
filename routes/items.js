const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const items = await getDB().collection('items').find().toArray();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const item = await getDB()
      .collection('items')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;

    
    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const result = await getDB().collection('items').insertOne({
      name,
      price
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const result = await getDB().collection('items').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, price } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const result = await getDB().collection('items').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await getDB()
      .collection('items')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

module.exports = router;
