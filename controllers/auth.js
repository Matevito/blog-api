// eslint-disable-next-line no-unused-vars
const User = require("../models/user");

const schemaSignin = require("../dependencies/registerSchemas/sign-in.js");


exports.login_post = (req, res) => {
    res.json({
        error: null,
        data: "aca va la data"
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
        picture: req.body.picture
    })

    try {
        const savedUser = await new_user.save();
        res.json({
            error: null,
            data: savedUser
        })

    } catch (err) {
        res.status(400).json({err})
    }
};
