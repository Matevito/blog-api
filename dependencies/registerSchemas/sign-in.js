const Joi = require("@hapi/joi");

const schemaSignin = Joi.object({
    username: Joi.string().min(3).max(100).required().trim(),
    password: Joi.string().min(5). required().trim(),
    repeat_password: Joi.ref('password'),
    firstName: Joi.string().max(100).default("").trim(),
    secondName : Joi.string().max(100).default("").trim(),
    bio: Joi.string().default("").trim()
})

module.exports = schemaSignin;