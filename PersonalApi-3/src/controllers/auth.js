"use strict";

/*------------------------------------------------
|     //? Express - Personnel Api
-------------------------------------------------*/

const Personnel = require("../models/personnel");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  //*Login & Logout

  login: async (req, res) => {
    const { username, password } = req.body; //* bir porsenelin sistem girisi yapmasini saglayacak parametre

    if (username && password) {
      const user = await Personnel.findOne({ username, password });
      if (user && user.isActive) {
        //! Token
        //* token varmidir? killanici _id özelligi her kayit icin benzersiz bir tanimlaciydi Eger  token modelinde userId alani _id esit olan bir kayit bulursa kullanicinin kaydi var demektir
        let tokenData = await Token.findOne({ userId: user._id });

        if (!tokenData) {
          //* tokenData undefined yada null ise
          const tokenKey = passwordEncrypt(user._id + Date.now()); //* burada kullanicinin benzersiz id si ile o anin zamani birlesir elde edilen girdi passwordEncrypt fonksiyonuna verilir ve sonuc olarak benzersiz id olusur
          console.log(tokenKey);
          tokenData = await Token.create({ userId: user._id, token: tokenKey }); //* yeni olusturulan tokenKey kullanicinin id si ile beraber modele göre(modelde vermisti userId ve token) veritabanina eklenir ve bunuda tokenData der. Yani söyle bir somut örnek olabilir tokenData={userId: "12345", token: "12d2f58ds51"}
        }

        res.status(200).send({
          error: false,
          token: tokenData.token,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Yanlis kullanici adi ve sifre");
      }
    } else {
      res.errorStatusCode = 403;
      throw new Error("Lütfen kullanici adi ve sifre giriniz");
    }
  },

  logout: async (req, res) => {
    req.session = null; //* oturum bilgileri temizlendi

    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    let deleted = null;
    if (tokenKey && tokenKey[0] == "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
      res.status(200).send({
        message: "logout token deleted",
        deleted, //* silinen gösterilsin
      });
    }
  },
};


