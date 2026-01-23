require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const productsRoutes = require('./routes/products');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Products API
app.use('/api/products', productsRoutes);

// Start server after DB connection
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
