'use strict';
const {constants} = require('../config');
module.exports = (req, res, next) => {
    res.success = data => {
        return res.status(200).json({success: true, ...data});
    };
    res.serverError = (code, data) => {
        return res.status(code).json({success: false, message: data});
    };
    res.unauthorized = () => res.status(401).json({success: false, message: constants.error.auth.unauthorized});
    next();
};
