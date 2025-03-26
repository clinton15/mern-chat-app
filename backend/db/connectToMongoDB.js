const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
  } catch (error) {
    console.log("Error connecting to DB ", error.message);
  }
};

module.exports = connectToDb;
