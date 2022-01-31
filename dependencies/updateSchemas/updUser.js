const Joi = require("@hapi/joi");

const schemaUpdUser = Joi.object({
    firstName: Joi.string().max(100).default("").required().trim(),
    secondName : Joi.string().max(100).default("").trim(),
    bio: Joi.string().default("").trim(),
    picture: Joi.string().default("").trim()
})

module.exports = schemaUpdUser;