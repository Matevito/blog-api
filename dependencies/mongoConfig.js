/* eslint-disable no-undef */
const mongoose = require("mongoose");
require("dotenv").config({ path: '../.env' });

const mongoDb = process.env.DEV_DB;
mongoose.connect(mongoDb);
/* use when the app is ready for deploy
mongoose.connect(mongoDb, { useNewUrlParse: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
*/
