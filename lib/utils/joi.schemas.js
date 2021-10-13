const Joi = require('@hapi/joi');

//Auth validations
module.exports.signUp = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    first_name: Joi.string(),
    role: Joi.string().valid('user', 'admin'),
    height: Joi.number(),
    weight: Joi.number(),
    last_name: Joi.string(),
    birth_date: Joi.string(),
    gender: Joi.string().valid('male', 'female', 'other')
});

module.exports.login = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

module.exports.addIngredient = Joi.object({
    name: Joi.string().required()
})

module.exports.editIngredient = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required()
})