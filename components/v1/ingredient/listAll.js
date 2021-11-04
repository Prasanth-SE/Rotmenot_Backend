"use strict";
const {
    ErrorHandler
} = require("../../../lib/utils");
const db = require("../../../models");

module.exports = async (req, res, next) => {
    try {
        // Get user
        const user = req.user;
        const ingredients = await db.Ingredient.find().sort({ "updatedAt": -1 });

        return res.success({
            ingredients
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};