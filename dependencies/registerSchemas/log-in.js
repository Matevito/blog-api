const Joi = require("@hapi/joi");

const SchemaLogin = Joi.object({
    username: Joi.string().min(3).max(100).required().trim(),
    password: Joi.string().min(5). required().trim(),
});

module.exports = SchemaLogin;