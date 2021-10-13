'use strict';
const {ErrorHandler} = require('../../../lib/utils');
const passport = require('passport');

module.exports = async (req, res, next) => {
    try {
        console.log('Calling local auth');
        //Local strategy auth using passport
        passport.authenticate('local', async (err, data, info) => {
            if (err) {
                console.log('err - ');
                console.log(err.message);
                return res.serverError(401, ErrorHandler(err));
            }
            
            return res.success(data);
        })(req, res);
    } catch (error) {
        return res.serverError(500, ErrorHandler(error));
    }
};
