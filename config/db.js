// --------------------------------------------------------------
// ------------- Conexión a MongoDB usando Mongoose -------------
// --------------------------------------------------------------

const mongoose = require("mongoose");
require('dotenv').config()

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Database connected successfully! ✅");
  } catch (error) {
    console.error(" 🚫 Error connecting to database:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
