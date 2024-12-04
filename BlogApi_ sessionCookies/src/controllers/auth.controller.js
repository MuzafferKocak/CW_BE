"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

const { User } = require("../models/user.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    //* email ve Password gönderildi
    if (email && password) {
      const user = await User.findOne({ email });
      //* user ok
      if (user) {
        //* Session
        // req.session = {
        //     email: user.email,
        //     password: user.password,
        // }
        //req.session.email = user.email
        req.session._id = user._id;
        req.session.password = user.password;
        //* Session

        //*Cookies
        //* Beni hatirla (remindMe)
        if (re.body?.remindMe) {
          req.session.remindMe = true;
          //* set maxAge to 3 days
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
        }
        //*Cookies

        //* password ok
        if (user.password == passwordEncrypt(password)) {
          res.status(200).send({
            error: false,
            message: "Login Ok",
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("Login parameters are not true.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("This user not found.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },
  logout: async (req, res) => {
    //* Session/Cookie verilerini silmek icin "null" esitlemek yeterli.
    req.session = null;

    res.status(200).send({
      error: false,
      message: "Logout Ok",
    });
  },
};
