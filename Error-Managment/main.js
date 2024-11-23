"use strict";

/* -------------------------------------------------------
    EXPRESSJS - ERROR MANAGEMENT
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/*-------------------------------------------*
//? olmasi gereken
app.get("/user/:id",  (req, res) => {
    res.status(200).send({userId: 1, userName: "John"})
})

/*-------------------------------------------*
//? iki farkli send
app.get("/user/:id?",  (req, res) => {
    res.status(200).send({userId: 1, userName: "John"})
    res.status(200).send({userId: 2, userName: "Steve"})
})


/*-------------------------------------------*
//? default hata ciktisi
app.get("/user/:id?",  (req, res) => {
    req.params.id.toString()
    res.send({userId: 1, userName: "John"})
})
/*-------------------------------------------*
//? throw error
app.get("/user/:id?",  (req, res) => {
    throw Error("Hata olustu")
    res.send({userId: 1, userName: "John"})
})
/*-------------------------------------------*/
//? try Catch
app.get("/user/:id?", (req, res) => {
  try {
    req.params.id.toString();
    res.send({ userId: 1, userName: "John" });
  } catch (error) {
    // throw error(" id must be string")
    // req.status(400).send("id must be string")
    req.status(400).send({ isError: true, message: "id must be string" });
  }
});
/*-------------------------------------------*/
/*-------------------------------------------*/

app.use("*", (req, res) => {
  res.status(404).send("The route is not found");
});
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
