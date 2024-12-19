"use strict";
/*------------------------------------------------
|     //? Express - Pizza Api
-------------------------------------------------*/

const nodemailer = require("nodemailer");

//* sendMail(to, title, message)
module.exports = function (to, title, message) {
  //* Email

  /* ------------------------------------------------------- *
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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mkojak75@gmail.com",
      pass: "",
    },
  });
  transporter.sendMail({
    from: "mkojak75@gmail.com", //* tavsiye: gönderen mail adresinin from içinde belirtilmesidir.
    to: to,
    subject: title,//* Mail başlığı
    text: message, //* Mail içeriği (Düz metin)
    html: message, //* Mail içeriği (Düz metin)
    },
    function (error, success) {
        success ? console.log("Succes:", success) : console.log("Error:", error)
  })
};
