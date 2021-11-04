"use strict";
const {
    ErrorHandler
} = require("../../../lib/utils");
const db = require("../../../models");

module.exports = async (req, res, next) => {
    try {
        // Get user
        const user = req.user;
        const body = req.body;
        let where = {};
        where.status = "published";
        if (body.name){
            where.name = new RegExp(body.name);
        }
        console.log(where)
        const recipes = await db.Recipe.find(where).sort({ "updatedAt": -1 });

        return res.success({
            recipes
        });
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};