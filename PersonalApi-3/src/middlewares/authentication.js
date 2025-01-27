"use strict";

/*------------------------------------------------
|     //? Express - Personnel Api
-------------------------------------------------*/

const Token = require("../models/token");

module.exports = async (req, res, next) => {
  //*Authorizatin: Token...
  //*Authorizatin: ApiKey...
  //*Authorizatin: Bearer...
  //- bu middlaware "Token..." formatinda gelen headerlari kontrol eder

  const auth = req.headers?.authorization || null; //* Token ....tokenKey....
  const tokenKey = auth ? auth.split(" ") : null; //* ["Token", "....TokenKey..."]

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    );
    console.log(tokenData);
    if (tokenData) req.user = tokenData.userId;

    console.log(req.user);
  }
  next();
};
