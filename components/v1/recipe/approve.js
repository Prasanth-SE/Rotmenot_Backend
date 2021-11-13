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
        const body = req.body;

        await db.Recipe.findOneAndUpdate({
            _id: body.id
        },{
            status: "published",
        });

        const recipe = await db.Recipe.findOne({ _id: body.id }).populate("ingredients");

        // let submiter = await db.User.findOne({ _id: recipe.submittedBy });
        // submiter.submit_points += 1;
        // submiter.save();

        return res.success({
            Message: 'Recipe approved successfully',
            recipe
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};