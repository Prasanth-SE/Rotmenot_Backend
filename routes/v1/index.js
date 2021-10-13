let express = require('express');

 const authRouter = require('./auth');
 const ingredientRouter = require('./ingredient')

 module.exports = {
     authRouter,
     ingredientRouter
 };