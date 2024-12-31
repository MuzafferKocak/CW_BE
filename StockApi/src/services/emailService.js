"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/

const sendEmail = require("../helpers/sendMail");

//* Hoş geldiniz e-postası
const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = "Welcome to Our App!";
  const text = `Hello ${userName}, welcome to our application!`;
  const html = `<h1>Hello ${userName}</h1><p>We're glad to have you on board.</p>`;

  await sendEmail(userEmail, subject, text, html);
};

module.exports = {
  sendWelcomeEmail,
};
