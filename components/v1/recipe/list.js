"use strict";
const {
    ErrorHandler
} = require("../../../lib/utils");
const db = require("../../../models");

module.exports = async (req, res, next) => {
    try {
        // Get user
        const user = req.user;
        const status = req.params.condition;
        const allowed = ['pending', 'published', 'rejected'];
        const index = allowed.indexOf(status);
        if (index === -1) {
            return res.serverError(400, ErrorHandler("invalid status"));
        }
        const recipes = await db.Recipe.find({ status: status }).sort({ "updatedAt": -1 });

        return res.success({
            recipes
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};