"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const nodemailer = require("nodemailer");

module.exports = function (to, title, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.sendMail(
    {
      from: "mkojak75@gmail.com",
      to: to,
      subject: title,
      text: message,
      html: message,
    },
    function (error, success) {
      success ? console.log("Success:", success) : console.log("Error:", error);
    }
  );
};
