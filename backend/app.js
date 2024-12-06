const express = require("express");
const bodyParser = require("body-parser");
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
