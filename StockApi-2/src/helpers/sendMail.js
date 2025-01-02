"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/

// node i nodemailer
// sendMail(to:string, subject:string, message:string):

const nodemailer = require("nodemailer");

module.exports = function (to, subject, text, html) {
  //* Set Passive:
  // return true

  //? GoogleMail (gmail):
  // Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const mailSettings = {
    service: "gmail",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  };

  //* Connect to mailServer:
  const transporter = nodemailer.createTransport({
    service: mailSettings.service,
    auth: {
      user: mailSettings.user,
      pass: mailSettings.pass,
    },
  });
  //* SendMail:
  transporter.sendMail(
    {
      from: mailSettings.user,
      to: to,
      subject: subject,
      text: text,
      html: html,
    },
    (error, info) => {
      error ? console.log(error) : console.log(info);
    }
  );
};
