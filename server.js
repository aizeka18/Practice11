require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const productsRoutes = require('./routes/products');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});


app.get('/version', (req, res) => {
  res.json({
    version: '1.1',
    updatedAt: '2026-01-18'
  });
});


app.use('/api/products', productsRoutes);


connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
