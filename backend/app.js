const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const validator = require("validator");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json());

// Root endpoint for verification
app.get("/", (req, res) => {
  res.send("Node.js Server is running!");
});

// Serve the JSON file
app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, "json/data.json"));
});

// Validation Rules
const validateRegistration = (data) => {
  const errors = {};

  // Name validation
  if (!data.name || data.name.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  // Email validation
  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "A valid email address is required.";
  }

  // Password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.password =
      "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
  }

  return errors;
};

// Route: Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Validate inputs
  const errors = validateRegistration({ name, email, password });
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simulate storing in the database (replace this with your DB logic)
    const newUser = { id: Date.now(), name, email, password: hashedPassword };

    // Respond with success
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
