const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`Hello world from the server rotuer js`);
});

router.post("/register", (req, res) => {
  console.log(req.body);
   // Send a JSON response to the client with a message
   res.json({ message: "Registration successful" });;
});

module.exports = router;
