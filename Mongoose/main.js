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
app.use(express.)

/* ------------------------------------------------------- */

app.all("/",(req, res)=> {
    res.send("Welcome to Blog Api")
})

/* ------------------------------------------------------- */
//? Routes:
/* ------------------------------------------------------- */


app.use("*", (req, res)=>{
    res.status(404).send({isError: true, message: "The Route is NOT FOUND"})
})

//* Catch errors
app.use(require())


/* ------------------------------------------------------- */

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));