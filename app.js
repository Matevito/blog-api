const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();

// 1. routes.
const apiv1router = require("./routes/apiv1");

// 2. create express app
const app = express();
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 3. connenct app to database
require("./dependencies/mongoConfig");

// 4. set up app routes
app.use("/apiv1", apiv1router);

// 5. todo: error handler
app.use((err, req, res) => {
    console.log("Error handling Middleware called.");
    console.log("Path:", req.path);
    res.json({
        "error": err,
        "message": "error handling request."
    })
});

// 6. run app on server
app.listen(3000, console.log("App listening at http://localhost:3000"));