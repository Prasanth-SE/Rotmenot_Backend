'use strict';
const passport = require('passport');

module.exports = async (req, res, next) => {
  passport.authenticate('verifyRefreshToken', { session: false }, (err, user, info) => {
    if (err || info) return res.unauthorized();
    return res.success(user);
  })(req, res, next);
};
