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

         let ingredientBody = {};
         ingredientBody.name =ingredientName;
         await db.Ingredient.create(ingredientBody);

         return res.success({
             Message: 'Ingredient added successfully'
         });
     } catch (error) {
         return res.serverError(500, ErrorHandler(error));
     }
 }