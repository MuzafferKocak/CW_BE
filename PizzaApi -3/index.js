"use strict";
/*------------------------------------------------
|     //? Express - Pizza Api
-------------------------------------------------*/
/* ------------------------------------------------------- *
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
/* ------------------------------------------------------- */
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
//* Required Modules:

//* envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

//* asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
//* Configrations:

//* Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
//* Middlewares:

//* Accept JSON:
app.use(express.json());

//* Logger:
app.use(require("./src/middlewares/logger"));

//! Auhentication:
//* app.use(require("./src/middlewares/authentication"));

//* findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- *
//* Email
const nodemailer = require("nodemailer");

//*Create a new Test Account (fake email)
// nodemailer.createTestAccount().then((data) => console.log(data));

// {
//   user: 'mbpvfrm7hckl2ksq@ethereal.email',
//   pass: '4vvr1g8e7b9mhthD6r',
//   smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//   imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//   pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//   web: 'https://ethereal.email',
//   mxEnabled: false
// }

//* Connection to MAilServer/SMTP:
const transporter = nodemailer.createTransport({
  //*SMTP
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "mbpvfrm7hckl2ksq@ethereal.email",
    pass: "4vvr1g8e7b9mhthD6r",
  }
})
// console.log(transporter);

//* Send Mail
transporter.sendMail({
  from: "mbpvfrm7hckl2ksq@ethereal.email", //*yazilmasi mecburi degil
  to: "mek@cw.com",
  subject: "Hello", //* mail basligi
  text: "Hello There. How are you?", //* Mail icerigi düz metin
  html: "<h1>Hello There</h1><p>How are you?</p>", //* Mail icerigi düz metin
}, function(error, success){
  success ? console.log("Succes:", success) : console.log("Error:", error);
})
/* ------------------------------------------------------- *
//* GoogleMail (gmail.com)
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mkojak75@gmail.com",
    pass: "",
  },
});
transporter.sendMail(
  {
    from: "mbpvfrm7hckl2ksq@ethereal.email",
    to: "mkojak75@gmail.com",
    subject: "Hello",
    text: "Hello There. How are you?",
    html: "<h1>Hello There</h1><p>How are you?",
  },
  function (error, success) {
    success ? console.log("Succes:", success) : console.log("Error:", error);
  }
);
/* ------------------------------------------------------- */
//* Routes:

//*Static Files
// app.use("./URL", express.static("./folder"))
app.use("./upload", express.static("./upload"))

//! routes/index.js:
app.use("/", require("./src/routes/"));

/* ------------------------------------------------------- *
//* auth:
app.use("/auth", require("./src/routes/auth"));
//* user:
app.use("/user", require("./src/routes/user"));
//* token:
app.use("/token", require("./src/routes/token"));

//* order:
app.use("/order", require("./src/routes/order"));
//* pizza:
app.use("/pizza", require("./src/routes/pizza"));
//* topping:
app.use("/topping", require("./src/routes/topping"));

//* document:
app.use("/documents", require("./src/routes/document"));

/* ------------------------------------------------------- */
//* HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

/* ------------------------------------------------------- */

//* errorHandler:
app.use(require("./src/middlewares/errorHandler"));

//* RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
//* Syncronization (must be in commentLine):
// !!! It clear database.
//* require("./src/helpers/sync")();
