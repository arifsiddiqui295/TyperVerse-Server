const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then((result) => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
