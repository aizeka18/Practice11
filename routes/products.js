const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const products = await getDB().collection('products').find().toArray();
  res.json(products);
});

// GET product by ID
router.get('/:id', async (req, res) => {
  const product = await getDB()
    .collection('products')
    .findOne({ _id: new ObjectId(req.params.id) });

  res.json(product);
});

// POST product
router.post('/', async (req, res) => {
  const result = await getDB()
    .collection('products')
    .insertOne(req.body);

  res.status(201).json(result);
});

// PUT product
router.put('/:id', async (req, res) => {
  const result = await getDB()
    .collection('products')
    .updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

  res.json(result);
});

// DELETE product
router.delete('/:id', async (req, res) => {
  const result = await getDB()
    .collection('products')
    .deleteOne({ _id: new ObjectId(req.params.id) });

  res.json(result);
});

module.exports = router;
