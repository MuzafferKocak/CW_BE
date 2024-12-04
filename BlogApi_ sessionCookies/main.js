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

/* ------------------------------------------------------- */
//* Routes:

app.use("/blog/category", require("./src/routes/blogCategory.router")); //* blogCategory
app.use("/blog/post", require("./src/routes/blogPost.router")); //* blogPost
app.use("/user", require("./src/routes/user.router")); //* user
app.use("/auth", require("./src/routes/auth.router")); //* Login + Logout
app.all("/", (req, res) => {
  // res.send("WELCOME TO BLOG API");
  console.log("session:",req.session);
  res.send({
    message: "WELCOME TO BLOG API",
    session: req.session
  })
});
/* ------------------------------------------------------- */

app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The Route is NOT FOUND" });
});

//* Catch errors
app.use(require("./src/midlewares/errorHandler"));

/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
