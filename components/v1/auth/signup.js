'use strict';
const {
    ErrorHandler
} = require('../../../lib/utils');
const {
    constants
} = require('../../../config');
const db = require("../../../models");
const passportMiddleWare = require('../../../middlewares/passport.middleware');
const { DateTime } = require("luxon");
const _ = require('lodash')

module.exports = async (req, res, next) => {
    try {

        // Checking if email already exists. To speed up fetch we are just getting the count instead of the whole object
        const sameEmailUserCount = await db.User.findOne({
            email: req.body.user.email
        }).countDocuments();
        if (sameEmailUserCount > 0) {
            return res.serverError(422, ErrorHandler(new Error(constants.error.auth.emailTaken)));
        }

        // Create a new user with date sent from api
        const body = req.body.user;
        body.terms_agreed_at = DateTime.now().toJSDate();
        body.verification_token = Math.floor(1000 + Math.random() * 9000);
        const user = await db.User.create(body);


        let userJSON = user.toJSON();
        //Generate access tokens
        const data = passportMiddleWare.generateSignUpToken(userJSON);
        return res.success(data);
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};