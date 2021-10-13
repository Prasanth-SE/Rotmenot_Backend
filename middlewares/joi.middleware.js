const {ErrorHandler} = require('../lib/utils');
const {constants} = require('../config');

module.exports.joiQueryMiddleware = (schema, key) => {
    return (req, res, next) => {
        try {
            let requestBody = req.query;
            if (key) {
                requestBody = req.query[key];
            }
            const {error} = schema.validate(requestBody);
            if (error) {
                res.serverError(404, ErrorHandler(error));
            } else
                next();
        } catch (err) {
            console.log('error', ErrorHandler(err));
            res.serverError(404, ErrorHandler(error));
        }
    };
};

module.exports.joiBodyMiddleware = (schema, key) => {
    return (req, res, next) => {
        try {
            let requestBody = req.body;
            if (key) {
                requestBody = req.body[key];
            }
            if (!requestBody) {
                res.serverError(404, ErrorHandler(constants.error.bodyEmpty));
            } else {
                const {error} = schema.validate(requestBody);
                if (error) {
                    res.serverError(404, ErrorHandler(error));
                } else
                    next();
            }
        } catch (err) {
            console.log('error', err);
            res.serverError(404, {error: ErrorHandler(err)});
        }
    };
};
