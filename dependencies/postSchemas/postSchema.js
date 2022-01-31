const Joi = require("@hapi/joi");

const schemaPost = Joi.object({
    title: Joi.string().max(200).trim().required(),
    text: Joi.string().trim().required()
})

module.exports = schemaPost;