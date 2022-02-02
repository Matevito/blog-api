/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();
let port = process.env.PORT || 3000;

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
app.use("/", (req, res) => {
    res.send("landing page... app is running!")
})
app.use("/apiv1", apiv1router);

// 5. todo: error handler
app.use((err, req, res) => {
    res.status(err.status || 500)
    res.json({
        "error": err,
        "message": "404 error not found"
    })
});

// 6. run app on server
app.listen(port, () => {
    console.log("Blog api listening on port http://localhost:" + port);
})