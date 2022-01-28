// eslint-disable-next-line no-unused-vars
const User = require("../models/user");

exports.login_post = (req, res) => {
    res.json({
        error: null,
        data: "aca va la data"
    })
};

exports.signin_post = async (req, res) => {
    

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
