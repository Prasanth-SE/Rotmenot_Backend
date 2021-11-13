const mongoose = require('mongoose');
const {fa} = require("faker/lib/locales");
const Schema = mongoose.Schema;
// Db attributes
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
    publishedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
     submittedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    publishedUser: {
        type: String
    },
     submittedUser: {
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