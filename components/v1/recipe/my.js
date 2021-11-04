"use strict";
const {
    ErrorHandler
} = require("../../../lib/utils");
const db = require("../../../models");

module.exports = async (req, res, next) => {
    try {
        // Get user
        const user = req.user;
        const recipes = await db.Recipe.find({ submittedBy: user._id }).sort({ "updatedAt": -1 });

        return res.success({
            recipes
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};