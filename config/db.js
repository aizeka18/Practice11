const { MongoClient } = require('mongodb');

let db;

const connectDB = async (uri) => {
  const client = await MongoClient.connect(uri);
  db = client.db();
  console.log('MongoDB connected');
};

const getDB = () => db;

module.exports = { connectDB, getDB };
