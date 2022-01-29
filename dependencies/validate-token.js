/* eslint-disable no-undef */
require("dotenv").config({ path: '../' })
const jwt = require("jsonwebtoken");

// middleware to validate protected routes.

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    
    if (!token) {
        return res.status(401).json({
            error: "Access denied"
        })
    }

    try {
        // check the token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch (err) {
        res.status(400).json({
            error: "Invalid token"
        })
    }
}

module.exports = verifyToken;