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

         const r = await db.Recipe.deleteOne({
             _id: body.id
         });

         if (r.deletedCount !== 1){
             return res.serverError(400, ErrorHandler("could not delete recipe"));
         }

         return res.success({
             Message: 'Recipe deleted successfully'
         });
     } catch (error) {
         return res.serverError(500, ErrorHandler(error));
     }
 };