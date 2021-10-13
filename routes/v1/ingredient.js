const express = require('express');
 const router = express.Router();

 const joiMiddleware = require('../../middlewares/joi.middleware');
 const adminMiddleware = require('../../middlewares/admin.middleware');
 const joiSchemas = require('../../lib/utils/joi.schemas');

 const addIngredient = require('../../components/v1/ingredient/add');
 const listAllIngredients = require('../../components/v1/ingredient/listAll');
 const editIngredient = require('../../components/v1/ingredient/edit');

 router.get('/list/all', listAllIngredients);
 router.post('/add', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.addIngredient), addIngredient);
 router.post('/edit', adminMiddleware.isAdmin(), joiMiddleware.joiBodyMiddleware(joiSchemas.editIngredient), editIngredient);