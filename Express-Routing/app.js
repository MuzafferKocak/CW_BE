"use strict"
/* -------------------------------------------------------
    EXPRESSJS
------------------------------------------------------- */

/**
 * npm init -y
 * npm i express dotenv
 * echo PORT=8000 > .env
 * npm nodemon ....js
 * 
 */

const express = require("express") //* express assigned
const app = express() //*express started

//*Dotenv
require("dotenv").config() //* .env icindeki degiskenler => process.env ye atandi
const HOST = process.env.HOST || "127.0.0.1" //* local IP
const PORT = process.env.PORT || 8000

/* ------------------------------------------------------- */

//? app.listen(PORT, ()=>{console.log(`Running: http://127.0.0.1:8000`)})
//?app.listen(PORT, HOST, ()=>{console.log(`Running: http://${HOST}:${PORT}`)}) //* tavsiye edilmez

app.listen(PORT, ()=>{console.log(`Running: http://${HOST}:${PORT}`)})






/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */