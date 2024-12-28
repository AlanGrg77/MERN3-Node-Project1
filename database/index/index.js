require('dotenv').config();
const mongoose = require("mongoose");


const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database successfully!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDatabase;
