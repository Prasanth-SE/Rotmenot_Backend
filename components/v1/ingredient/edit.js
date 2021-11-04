"use strict";
const {
    ErrorHandler
} = require("../../../lib/utils");
const db = require("../../../models");
// const constants = require("../../../config/constants");

module.exports = async (req, res, next) => {
    try {
        // Get user
        const user = req.user;
        const ingredientName = req.body.name;

        await db.Ingredient.findOneAndUpdate({
            _id: req.body.id
        },{
            name: ingredientName
        });
        const ingredients = await db.Ingredient.find().sort({ "updatedAt": -1 });

        return res.success({
            Message: 'Ingredient updated successfully',
            ingredients
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};