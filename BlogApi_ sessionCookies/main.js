"use strict"

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

const express = require('express');
//* Catch error from async:
require("express-async-errors")
const app = express() //* Singleton


require("dotenv").config()
const PORT = process.env.PORT || 8000
/* ------------------------------------------------------- */
//* Accept JSON
app.use(express.json())
//* DB Connection with normal Function
require("./src/config/dbConnection")()
//* DB Connection with Class
// require("./src/config/dbConnection");

/* ------------------------------------------------------- */

app.all("/",(req, res)=> {
    res.send("Welcome to Blog Api")
})

/* ------------------------------------------------------- */
//* Routes:


app.use("/blog/category", require("./src/routes/blogCategory.router"));
app.use("/blog/post", require("./src/routes/blogPost.router"));
app.use("/user", require("./src/routes/user.router"));
app.use("/auth", require("./src/routes/auth.router"));
app.all("/", (req, res) => {
  res.send("WELCOME TO BLOG API");
});
/* ------------------------------------------------------- */


app.use("*", (req, res)=>{
    res.status(404).send({isError: true, message: "The Route is NOT FOUND"})
})

//* Catch errors
app.use(require("./src/midlewares/errorHandler"))


/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));