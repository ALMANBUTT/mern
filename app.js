const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = express();
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("conncetion is created successfully");
  })
  .catch(() => {
    console.log("conncetion is not created successfully");
  });

// middleware
const middleware = (req, res, next) => {
  console.log("hello from middleware");
  next();
};
app.get("/", (req, res) => {
  res.send("Hello from our Home Page");
});
app.get("/about", middleware, (req, res) => {
  console.log("hello after middleware");
  res.send("Hello from our About Page");
});
app.get("/contact", (req, res) => {
  res.send("Hello from our Contact Page");
});
app.get("/signup", (req, res) => {
  res.send("Hello from our Signup Page");
});
app.get("/signin", (req, res) => {
  res.send("Hello from our Login Page");
});
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
