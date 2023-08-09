const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDataBase = async (option = {}) => {
  try {
    await mongoose.connect(mongodbURL, option);
    console.log("connection to db is successfully established");

    mongoose.connection.on("error", error => {
      console.error("DB connection error", error);
    });
  } catch (error) {
    console.error("couldn't connect to DB", error.toString());
  }
};

module.exports = connectDataBase;
