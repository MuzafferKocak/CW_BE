"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MIDDLEWARES
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- *
//? Middleware functions must be has three parameters.
//? Last parameter is for next().

app.get("/", (req, res, next) => {
  console.log("Middleware started.");
  next();
  //   res.send({
  //     message: "middleware"
  //   });
});
app.get("/", (req, res) => {
  console.log("Route Started");

  res.send({
    message: "Welcome",
  });
});

/* ------------------------------------------------------- */
//? Middleware
app.get("/", (req,res,next)=>{
    if(req.query.username == "clarusway"){

        //*req veya res ile data tasima
        //* next() req ve res ile bir sonraki route a aktarilir

        req.username = "clarusway"
        res.message = "Username is Clarusway"

        next() //*dogruysa bir sonraki route gec
    }else {
        res.send({
            message: "Username Wrong"
        })
    }
})

app.get("/", (req,res)=>{
    res.send({
        username:req.username,
        // message: "Username is true"
        message: res.message
    })
})
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
