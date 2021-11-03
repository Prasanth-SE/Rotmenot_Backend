"use strict";
 const {
     ErrorHandler
 } = require("../../../lib/utils");
 const db = require("../../../models");
 const Joi = require("@hapi/joi");
 // const constants = require("../../../config/constants");

 module.exports = async (req, res, next) => {
     try {
         // Get user
         const user = req.user;
         const body = req.body;
         let recipeBody = {};

         recipeBody.name = body.name;
         recipeBody.ingredients = body.ingredients;
         recipeBody.isHealthy = body.isHealthy;
         recipeBody.img = body.img;
         recipeBody.calories = body.calories;
         recipeBody.description = body.description;
         recipeBody.ratings = body.ratings;
         recipeBody.cuisineId = body.cuisineId;
         recipeBody.timeToPrepare = body.timeToPrepare;
         recipeBody.cost = body.cost;
         recipeBody.status = "pending";
         recipeBody.submittedBy = user._id;
         recipeBody.comments = body.comments;

         const result = await db.Recipe.create(recipeBody);
         const recipe = await db.Recipe.findOne({ _id: result._id }).populate("ingredients");
         return res.success({
             Message: 'Recipe submitted successfully',
             recipe
         });
     } catch (error) {
         return res.serverError(500, ErrorHandler(error));
     }
 };