const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;

// Use a promise callback to handle the connection success and error
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection is created successfully");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
