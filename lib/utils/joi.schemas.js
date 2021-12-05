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

module.exports.addRecipe = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items({
        ingredient: Joi.string(),
        quantity: Joi.string()
    }),
    isHealthy: Joi.boolean(),
    img: Joi.string(),
    video: Joi.string(),
    calories: Joi.string(),
    description: Joi.string(),
    ratings: Joi.number(),
    cuisineId: Joi.string(),
    timeToPrepare: Joi.number(),
    cost: Joi.string(),
    comments: Joi.array().items({
        name: Joi.string(),
        comment: Joi.string()
    })
})

module.exports.submitRecipe = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items({
        ingredient: Joi.string(),
        quantity: Joi.string()
    }),
    isHealthy: Joi.boolean(),
    img: Joi.string(),
    video: Joi.string(),
    calories: Joi.string(),
    description: Joi.string(),
    ratings: Joi.number(),
    cuisineId: Joi.string(),
    timeToPrepare: Joi.number(),
    cost: Joi.string(),
    comments: Joi.array().items({
        name: Joi.string(),
        comment: Joi.string()
    })
})

module.exports.editRecipe = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    ingredients: Joi.array().items({
        ingredient: Joi.string(),
        quantity: Joi.string()
    }),
    isHealthy: Joi.boolean(),
    img: Joi.string(),
    video: Joi.string(),
    calories: Joi.string(),
    description: Joi.string(),
    ratings: Joi.number(),
    cuisineId: Joi.string(),
    timeToPrepare: Joi.number(),
    cost: Joi.string(),
    comments: Joi.array().items({
        name: Joi.string(),
        comment: Joi.string()
    })
})

module.exports.approveRecipe = Joi.object({
    id: Joi.string().required()
})

module.exports.rejectRecipe = Joi.object({
    id: Joi.string().required(),
     rejectComment: Joi.string().required()
})

module.exports.rateRecipe = Joi.object({
    id: Joi.string().required(),
    rating: Joi.number()
})

module.exports.searchRecipe = Joi.object({
    name: Joi.string().allow(null)
})