"use strict";
/* -------------------------------------------------------
    EXPRESSJS
------------------------------------------------------- */

/**
 * npm init -y
 * npm i express dotenv
 * echo PORT=8000 > .env
 * npm nodemon ....js
 */

const express = require("express"); //* express assigned
const app = express(); //*express started

//*Dotenv
require("dotenv").config(); //* .env icindeki degiskenler => process.env ye atandi
const HOST = process.env.HOST || "127.0.0.1"; //* local IP
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *

app.get("/",(req, res)=>{

    //? run res.send() for print-out
    //*res.send("Welcome to express")
    res.send({
        message: "welcome to express"
    })


})
app.post("/",(req, res)=>{

    res.send({
        message: " run post"
    })


})
app.put("/",(req, res)=>{

    res.send({
        message: " run put"
    })


})
app.delete("/",(req, res)=>{

    res.send({
        message: " run delete"
    })


})
/* ------------------------------------------------------- *
//* Bütün metodlara izin ver all()
app.all("/",(req, res)=>{

    res.send({
        message: " run all"
    })


})
/* ------------------------------------------------------- *

app
  .route("/route")
  .get((req, res) => {
    res.send({ message: "get" });
  })
  .post((req, res) => {
    res.send({ message: "post" });
  })
  .put((req, res) => {
    res.send({ message: "put" });
  })
  .delete((req, res) => {
    res.send({ message: "delete" });
  });
/* ------------------------------------------------------- */
//? URL (Path) options

app.get("/", (req, res)=>res.send("/ = root (home)")) //* Anasayfa icin / yeterlidir
app.get("/", (req, res)=>res.send("/ = root (path)")) //* Sansaki  slash(/) önemsizdir
//? express-url supported JokerChars (?) (+) (*)
app.get("/abc(x)?123", (req,res)=> res.send("/abc(x)123") ) //*abc123 or abcx123
app.get("/abc(x)+123", (req,res)=> res.send("/abc(x)+123") ) //*abcx123 or abcx.....x123
app.get("/abc*123", (req,res)=> res.send("/abc*123") ) //*abc123 or abc(ANY)123


/* ------------------------------------------------------- */
/* ------------------------------------------------------- */

//? app.listen(PORT, ()=>{console.log(`Running: http://127.0.0.1:8000`)})
//?app.listen(PORT, HOST, ()=>{console.log(`Running: http://${HOST}:${PORT}`)}) //* tavsiye edilmez

app.listen(PORT, () => {
  console.log(`Running: http://${HOST}:${PORT}`);
});

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
