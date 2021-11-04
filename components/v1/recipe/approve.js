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
            publishedBy: user._id,
            publishedUser: user.first_name
        });

        const recipe = await db.Recipe.findOne({ _id: body.id }).populate("ingredients");

        let submitter = await db.User.findOne({ _id: recipe.submittedBy });
        submitter.submit_points += 1;
        submitter.save();

        return res.success({
            Message: 'Recipe approved successfully',
            recipe
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};