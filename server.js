// Require Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// //Require routes file
var routes = require("./routes/routes.js")
app.use("/", routes)

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on http://localhost" + PORT);
}); 