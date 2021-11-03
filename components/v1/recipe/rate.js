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

         const recipe = await db.Recipe.findOne({ _id: body.id })
         if (recipe){
             let rating = recipe.ratings;
             let count = recipe.ratingCount;
             count++
             const updatedRating = ((rating+body.rating)/count);
             await db.Recipe.findOneAndUpdate({
                 _id: body.id
             },{
                 ratings: updatedRating,
                 ratingCount: count
             });
             return res.success({
                 Message: 'Recipe rated successfully',
                 updatedRating
             });
         }else{
             return res.serverError(400, ErrorHandler("recipe not found"));
         }
     } catch (error) {
         return res.serverError(500, ErrorHandler(error));
     }
 };