const Joi = require("@hapi/joi");

const schemaPost = Joi.object({
    title: Joi.string().max(200).trim(),
    text: Joi.string().trim()
})

module.exports = schemaPost;