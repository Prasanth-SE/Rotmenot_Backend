const express = require('express');
const router = express.Router();
const joiMiddleware = require('../../middlewares/joi.middleware');
 const adminMiddleware = require('../../middlewares/admin.middleware');
 const joiSchemas = require('../../lib/utils/joi.schemas');

 const addRecipe = require('../../components/v1/recipe/add');
 const listAllRecipes = require('../../components/v1/recipe/listAll');
 const editRecipe = require('../../components/v1/recipe/edit');

 router.get('/list/all', listAllRecipes);
 router.post('/add', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.addRecipe), addRecipe);
router.post('/edit', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.editRecipe), editRecipe);
module.exports = router;