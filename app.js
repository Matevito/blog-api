const express = require("express");
require("dotenv").config();

// 1. routes.

// 2. create express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 3. connenct app to database
require("./dependencies/mongoConfig");

// 4. set up app routes


// error handler
app.use((req, res, next) => {
    console.log("Error handling Middleware called.");
    console.log("Path:", req.path);
    next(res.status(404));
});

//  run app on server
app.listen(3000, console.log("App listening at http://localhost:3000."));