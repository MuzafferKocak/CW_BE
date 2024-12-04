"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

//* Check user-data from session
const { User } = require("../models/user.model");

module.exports = async (req, res, next) => {
  console.log("session", req.session);

  //* login olan user datasini buraya kaydedecegiz
  req.user = null;

  if (req.session?._id) {
    const { _id, password } = req.session;
    const user = await User.findone({ _id });

    if (user && user.password == password) {
      //* Login basarili
      //* Session icindeki login datasi basarili ise user verisini req.user'a ata
      req.user = user;
    } else {
      //*Sessionda hatali veriler varsa
      req.session = null;
    }
  }

  next();
};
