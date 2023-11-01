const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    console.log(process.env.MONGO_DB_URL);
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("connection to DB failed", error);
  }
};

module.exports = connectDb;
