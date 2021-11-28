const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/vaccine_manager", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[server] : Database Connected");
  } catch (error) {
    console.log("[server] : Database Connection Failed");
    console.log("[Error] : ", error);
  }
};
module.exports = connectDB;
