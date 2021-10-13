const {constants} = require('../config');
const {ErrorHandler} = require('../lib/utils');

module.exports.isAdmin = () => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (userRole === constants.userRole.admin) {
            next();
        } else
            res.serverError(400, ErrorHandler(new Error(constants.error.accessDenied)));
    };
};