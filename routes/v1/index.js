let express = require('express');

const authRouter = require('./auth');
 const ingredientRouter = require('./ingredient')
 const recipeRouter = require('./recipe')

 module.exports = {
     authRouter,
     ingredientRouter,
     recipeRouter
 };