require('dotenv').config()
const mongoose = require('mongoose');
const mongodb = require('mongodb');
// const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.MONGO_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const connectDB = async() => {
    console.log("connectDB called..."); 
    console.log("MongoDB URI:", uri ? "✓ Set" : "✗ Not set");
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
  console.error("FULL ERROR:");
  console.error(error);
}
}

module.exports = connectDB