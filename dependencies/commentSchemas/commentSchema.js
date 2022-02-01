const Joi = require("@hapi/joi");

const schemaComment = Joi.object({
    text: Joi.string().max(1000).required().trim()
})

module.exports = schemaComment;