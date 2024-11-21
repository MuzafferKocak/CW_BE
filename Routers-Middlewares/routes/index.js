"use strict";

/* -------------------------------------------------------
    EXPRESSJS - ROUTING
------------------------------------------------------- */

/* ------------------------------------------------------- */

//? express.Router()
// const express = require("express")
// const router = express.Router()
const router = require('express').Router()



// router.get("/", (req, res)=>{res.send({message: "Welcome"})})
// router.post("/", (req, res)=>{res.send({message: "post"})})
// router.put("/", (req, res)=>{res.send({message: "put"})})
// router.delete("/", (req, res)=>{res.send({message: "delete"})})

// router.all("/", (req, res)=>{res.send({message: "All"})})

router.route('/')
    .get((req, res) => { res.send({ message: 'Get' }) })
    .post((req, res) => { res.send({ message: 'Post' }) })
    .put((req, res) => { res.send({ message: 'Put' }) })
    .delete((req, res) => { res.send({ message: 'Delete' }) })


module.exports = router


/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
