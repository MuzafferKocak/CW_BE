"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

const express = require("express");
//* Catch error from async:
require("express-async-errors");
const app = express(); //* Singleton

require("dotenv").config();
const PORT = process.env.PORT || 8000;
/* ------------------------------------------------------- */
//* Accept JSON
app.use(express.json());
//* DB Connection with normal Function
require("./src/config/dbConnection")();
//* DB Connection with Class
// require("./src/config/dbConnection");

/* ------------------------------------------------------- */

app.all("/", (req, res) => {
  res.send("Welcome to Blog Api");
});

/* ------------------------------------------------------- */
//* Session & Cookies
//* npm i cookie-session

const session = require("cookie-session");
//* Run with general settings
app.use(
  session({
    secret: process.env.SECRET_KEY, //*Cookie datasini sifreleme anahtari
    // maxAge: 1000 * 60 * 60 * 24 * 3, //*milliSeconds //3 days
  })
);

/* ------------------------------------------------------- *

//* Check user-data from session
const { User } = require("./src/models/user.model");

app.use(async (req, res, next) => {
  console.log("session", req.session);

  //* login olan user datasini buraya kaydedecegiz
  req.user = null

  if (req.session?._id) {
    const { _id, password } = req.session;
    const user = await User.findone({ _id });

    if (user && user.password == password) {
      //* Login basarili
      //* Session icindeki login datasi basarili ise user verisini req.user'a ata
      req.user = user
    } else {
      //*Sessionda hatali veriler varsa 
      req.session = null;
    }
  }

  next();
});
//* Move the file

/* ------------------------------------------------------- */
//* MIDDLEWARE Filter Search Sort Pagination
app.use(require("./src/middlewares/findSearchSortPage"))
/* ------------------------------------------------------- */
//* Routes:

app.use(require("./src/middlewares/userControl")); //* user data
app.use("/blog/category", require("./src/routes/blogCategory.router")); //* blogCategory
app.use("/blog/post", require("./src/routes/blogPost.router")); //* blogPost
app.use("/user", require("./src/routes/user.router")); //* user
app.use("/auth", require("./src/routes/auth.router")); //* Login + Logout
app.all("/", (req, res) => {
  // res.send("WELCOME TO BLOG API");
  // console.log("session:", req.session);
  res.send({
    message: "WELCOME TO BLOG API",
    user: req.user, //* logined user data
    session: req.session,
  });
});
/* ------------------------------------------------------- */

app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The Route is NOT FOUND" });
});

//* Catch errors
app.use(require("./src/middlewares/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
//* Test verisi içindir. Bir kez çalıştır.
// require('./sync')()
