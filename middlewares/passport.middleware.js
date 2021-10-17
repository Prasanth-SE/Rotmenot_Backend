const passport = require("passport");
let passportJwt = require("passport-jwt");

let LocalStrategy = require("passport-local").Strategy;
const CustomStrategy = require("passport-custom").Strategy;
let JWTStrategy = passportJwt.Strategy;
let ExtractJWT = passportJwt.ExtractJwt;
const {
  jwtConfig,
  constants
} = require("../config");
const {
  jwtUtil,
  ErrorHandler
} = require("../lib/utils");
const bcrypt = require("bcrypt");
const db = require("../models");

passport.use(
  new LocalStrategy({
      usernameField: "user[email]",
      passwordField: "user[password]",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // Login Strategy here!
      try {
        let user = await db.User.findOne({
          email: email
        });
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            user = user.toJSON();
            const tokens = generateTokens(user);
            return done(null, {
              user,
              ...tokens
            });
          }
        }
        throw new Error(constants.error.auth.invalidCredentials);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.use(
  new JWTStrategy({
      ...jwtConfig,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secretKey,
    },
    async (jwtPayload, done) => {
      // extract information from payload
      // if user found `return done(null, user);` else `return done(error, null);`
      try {
        console.log(jwtPayload)
        if (jwtPayload.type !== jwtUtil.TokenType.ID_TOKEN) {
          throw new Error(constants.error.auth.invalidToken);
        }
        const user = await db.User.findOne({
          _id: jwtPayload._id,
          // email: jwtPayload.email,
        });
        if (user) {
          return done(null, user);
        } else {
          return done(constants.error.auth.invalidUser, null);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


passport.use(
  "verifyRefreshToken",
  new CustomStrategy(async function (req, done) {
    if (req.headers["x-refreshtoken"]) {
      const refreshToken = req.headers["x-refreshtoken"].toString();
      try {
        const decodedPayload = jwtUtil.verifyToken(refreshToken);
        if (decodedPayload.type !== jwtUtil.TokenType.REFRESH_TOKEN) {
          throw new Error("Invalid token");
        }
        let user = await db.User.findOne({
          _id: decodedPayload._id,
          email: decodedPayload.email,
        });
        let userJSON = user.toJSON()
        const tokens = generateTokens(userJSON);
        return done(null, {
          user:userJSON,
          ...tokens
        });
      } catch (error) {
        return done(error, null);
      }
    }
    done("refresh token missing", null);
  })
);

/**
 * @description Generates idToken & refreshToken
 * @param {JSON Object} payload
 */
function generateTokens(payload) {
  const token = jwtUtil.generate({
    ...payload,
    type: jwtUtil.TokenType.ID_TOKEN,
  });
  const refreshToken = jwtUtil.generateRefreshToken({
    ...payload,
    type: jwtUtil.TokenType.REFRESH_TOKEN,
  });
  return {
    token,
    refreshToken
  };
}

module.exports.generateSignUpToken = function (userJson) {
  const tokens = generateTokens(userJson);
  return {
    user: userJson,
    ...tokens
  };
};

module.exports.jwtAuth = (req, res, next) =>
  passport.authenticate("jwt", {
    session: false
  }, (err, user, info) => {
    if (err && err.name && err.name === "TokenExpiredError") {
      return res.serverError(401, ErrorHandler(err));
    }
    if (info && info.name && info.name === "TokenExpiredError") {
      return res.serverError(401, ErrorHandler(info));
    }
    if (err || info) {
      return res.serverError(400, ErrorHandler(err || info));
    }
    console.log(user)
    req.user = user;
    return next();
  })(req, res, next);