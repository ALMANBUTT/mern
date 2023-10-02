const express = require("express");
const router = express.Router();
const User = require("../models/user_Schema");

// Route for registration
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    // If any field is missing, return an error response
    return res.json({ error: "Please fill in all fields carefully" });
  }

  try {
    // Check if a user with the same email already exists
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.json({ message: "Email already exists" });
    }

    // Create a new user instance
    const user = new User({ name, email, phone, work, password, cpassword });

    // Save the user to the database
    await user.save();

    // Send a JSON response to the client with a success message
    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for user login 
router.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "Invalid Data" });
    }

    // Check if a user with the provided email exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.json({ error: "Invalid password" });
    }

    // If both checks pass, user login is successful
    res.json({ message: "User sign-in successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
