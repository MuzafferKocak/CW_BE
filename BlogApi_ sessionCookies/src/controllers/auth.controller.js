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
        //* password ok
        if (user.password == passwordEncrypt(password)) {
          res.status(200).send({
            error: false,
            message: "login Ok",
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
  logout: async (req, res) => {},
};
