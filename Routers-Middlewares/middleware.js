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

/* ------------------------------------------------------- *
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
/* ------------------------------------------------------- *
//? Multiple Middleware
app.get("/", (req, res, next) => {
  req.message1 = "middleware-1 started";
  next();
});
app.get("/", (req, res, next) => {
  req.message2 = "middleware-2 started";
  next();
});
app.get("/", (req, res, next) => {
  req.message3 = "middleware-3 started";
  next();
});
app.get("/", (req, res, next) => {
  req.message4 = "middleware-4 started";
  next();
});
app.get("/", (req, res, next) => {
  req.message5 = "middleware-5 started";
  next();
});
app.get("/", (req, res) => {
  res.send({
    message1: req.message1,
    message2: req.message2,
    message3: req.message3,
    message4: req.message4,
    message5: req.message5,
    message: "Finished",
  });
});

/* ------------------------------------------------------- */
const middleFunc1 = (req, res, next)=>{
    console.log("MiddleFunc1 run");
    req.message1 = "middleFunc1 run"
    next()
}

const middleFunc2 = (req, res, next)=>{
    console.log("MiddleFunc2 run");
    req.message2 = "middleFunc2 run"
    next()
}
//* Use Middleware
// app.use("/", middleFunc1)
//app.use(middleFunc1) //* URL yazilmaz ise tümü icin gecerli olur
//app.use(middleFunc2) //* URL yazilmaz ise tümü icin gecerli olur

//? Alternative
// app.use(middleFunc1,middleFunc2)

// app.use([middleFunc1,middleFunc2]) //* all method
// app.get("/home", [middleFunc1,middleFunc2]) //* get method (url must)

app.get("/home", (req, res) => {
    res.send({
      message1: req.message1,
      message2: req.message2,
      message: "Finished",
    });
  });

/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
