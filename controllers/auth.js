/* eslint-disable no-undef */
require("dotenv").config({ path: '../' })
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const schemaSignin = require("../dependencies/registerSchemas/sign-in");
const schemaLogin = require("../dependencies/registerSchemas/log-in");

exports.login_post = async (req, res) => {
    // validate user
    const { error } = schemaLogin.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    // check user password
    const validPassword = await user.checkPassword(req.body.password);
    if (!validPassword) {
        return res.status(400).json({
            error: "Invalid password"
        })
    }

    // create token and send it!
    const userData = {
        id: user._id,
        username: user.username,
    }
    const secret = process.env.TOKEN_SECRET;
    const opts = { expiresIn: "14d" };
    const token = jwt.sign(userData, secret, opts);

    res.header('auth-token', token).json({
        error: null,
        message: "validation succesfull",
        token
    })
};

exports.signin_post = async (req, res) => {
    
    // validate user
    const { error } = schemaSignin.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    // checking if user already exist!
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) {
        return res.status(400).json(
            { error: "user with the same username already registered!"}
        )
    }

    // save user
    const new_user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName || "",
        secondName : req.body.secondName || "",
        bio: req.body.bio || "",
    })

    try {
        await new_user.save();
        res.json({
            error: null,
            message: "User created successfully"
        })

    } catch (err) {
        res.status(400).json({err})
    }
};
