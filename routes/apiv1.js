const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/log-in", authController.login_post);

router.post("/sign-in", authController.signin_post);

module.exports = router;