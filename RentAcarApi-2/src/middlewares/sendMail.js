"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const nodemailer = require("nodemailer");

module.exports = function (to, title, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: "mkojak75@gmail.com",
    pass: "",
  });

  transporter.sendMail(
    {
      from: "mkojak75@gmail.com",
      to: to,
      text: message,
      html: message,
    },
    function (error, success) {
      success ? console.log("Success:", success) : console.log("Error:", error);
    }
  );
};
