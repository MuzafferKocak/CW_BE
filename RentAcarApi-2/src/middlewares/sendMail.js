"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const nodemailer = require("nodemailer");

module.exports = function (to, title, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mkojak75@gmail.com",
      pass: "lrpb hqlo hgzi qptd",
    }
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
