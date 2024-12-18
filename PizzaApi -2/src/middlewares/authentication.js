"use strict";
const { JsonWebTokenError } = require("jsonwebtoken");
/*------------------------------------------------
|     //? Express - Pizza Api
-------------------------------------------------*/

const Token = require("../models/token");
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null; //* Token ...token...|| Bearer ...accessToken...
  const tokenKey = auth ? auth.split(" ") : null; //*["Token", ..token..] || [Bearer, ...accessToken...]

  if (tokenKey) {

    if (tokenKey && tokenKey[0] == "Token") {
      //*Simple Token
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      // console.log(tokenData);
      if (tokenData) req.user = tokenData.userId;

    } else if (tokenKey[0] == "Bearer") {
      //*JWT
      jwt.verify(
        tokenKey[1],
        process.env.ACCESS_KEY,
        function (error, accessData) {
          console.log(accessData);
          if (accessData) req.user = accessData;
        }
      );
    }
  }

  // console.log(req.user);

  next();
};
