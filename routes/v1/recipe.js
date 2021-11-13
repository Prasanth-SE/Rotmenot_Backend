const express = require('express');
const router = express.Router();

const joiMiddleware = require('../../middlewares/joi.middleware');
const adminMiddleware = require('../../middlewares/admin.middleware');
const joiSchemas = require('../../lib/utils/joi.schemas');
// buttons
const addRecipe = require('../../components/v1/recipe/add');
const rateRecipe = require('../../components/v1/recipe/rate');
const listAllRecipes = require('../../components/v1/recipe/listAll');
const listRecipes = require('../../components/v1/recipe/list');
const myRecipes = require('../../components/v1/recipe/my');
const editRecipe = require('../../components/v1/recipe/edit');
const submitRecipe = require('../../components/v1/recipe/submit');
const approveRecipe = require('../../components/v1/recipe/approve');
const rejectRecipe = require('../../components/v1/recipe/reject');
const searchRecipes = require('../../components/v1/recipe/search');
const deleteRecipe = require('../../components/v1/recipe/delete');

router.get('/my/collection', myRecipes)
router.post('/search', joiMiddleware.joiBodyMiddleware(joiSchemas.searchRecipe), searchRecipes)
router.post('/submit', joiMiddleware.joiBodyMiddleware(joiSchemas.submitRecipe), submitRecipe);
router.post('/rate', joiMiddleware.joiBodyMiddleware(joiSchemas.rateRecipe), rateRecipe);

// admin routes
router.post('/add', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.addRecipe), addRecipe);
router.post('/edit', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.editRecipe), editRecipe);
router.post('/approve', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.approveRecipe), approveRecipe);
router.post('/reject', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.rejectRecipe), rejectRecipe);
router.get('/list', adminMiddleware.isAdmin(), listAllRecipes);
router.get('/list/:condition', adminMiddleware.isAdmin(), listRecipes)
router.post('/delete', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.rejectRecipe), deleteRecipe)
module.exports = router;