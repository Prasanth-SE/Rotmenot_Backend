const mongoose = require('mongoose');
const {fa} = require("faker/lib/locales");
const Schema = mongoose.Schema;

const Recipe = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [{
        ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient'
        },
        quantity: {
            type: String
        }
    }],
    isHealthy: {
        type: Boolean,
        default: false
    },
    img: {
        type: String
    },
    calories: {
        type: String
    },
    description: {
        type: String
    },
    ratings: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    cuisineId: {
        type: String
    },
    timeToPrepare: {
        type: Number
    },
    cost: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "published", "rejected"],
        default: "pending"
    },
    publishedBy: {
        type: String
    },
    submittedBy: {
        type: String
    },
    comments: [{
        name: String,
        comment: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', Recipe);