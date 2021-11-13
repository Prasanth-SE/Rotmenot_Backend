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

        const adminAccessEmails = ['jmallipeddi@albany.edu', 'jithendramallipeddi8@gmail.com', 'xliu24@albany.edu', 'lxq565710288@gmail.com', 'pnagisetty@albany.edu','prasanthnagisetty1995@gmail.com','mmiryala@albany.edu','manisha.miryala01@gmail.com','shyamnyathani@gmail.com','snyathani@albany.edu','lokhandwalapooja@gmail.com','plokhandwala@albany.edu'];
        for (let i=1; i<100; i++){
            adminAccessEmails.push('admin' + i + '@rotmenot.com');
        }

        // Create a new user with date sent from api
        const body = req.body.user;
        if (adminAccessEmails.indexOf(req.body.user.email) > -1) {
            body.role = "admin";
        }
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