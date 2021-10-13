exports.allowCrossDomainRequests = function (req, res, next) {
  // intercept OPTIONS method
  // const corsWhitelist = [
  //   'http://localhost:3000',
  //   'https://my-stage.espres.so'
  // ];
  // if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    if (req.method === "OPTIONS") {
      res.header('Access-Control-Allow-Origin', "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, x-refreshtoken, Access-Control-Allow-Headers, Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      );
      res.header("Access-Control-Allow-Credentials", true);
      res.sendStatus(204);
    } else {
      res.header('Access-Control-Allow-Origin', "*");
      res.header("Access-Control-Allow-Credentials", true);
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, x-refreshtoken, Access-Control-Allow-Headers, Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      );
      next();
    }
  // }
};