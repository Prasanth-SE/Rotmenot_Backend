const express = require('express');
const router = express.Router();
const joiMiddleware = require('../../middlewares/joi.middleware');
const joiSchemas = require('../../lib/utils/joi.schemas');

const signUpComponent = require('../../components/v1/auth/signup');
const loginComponent = require('../../components/v1/auth/login');
const refreshTokenComponent = require('../../components/v1/auth/refresh.token');

router.post('/login', joiMiddleware.joiBodyMiddleware(joiSchemas.login, 'user'), loginComponent);
router.post('/signup', joiMiddleware.joiBodyMiddleware(joiSchemas.signUp, 'user'), signUpComponent);
router.post('/refreshtoken', refreshTokenComponent);

module.exports = router;