"use strict";
/* -------------------------------------------------------
    EXPRESSJS - ROUTING
------------------------------------------------------- */

//* express.Router()
// const express = require('express')
// const router = express.Router()
const router = require('express').Router()

// router.get('/', (req, res) => { res.send({ message: 'Welcome' }) })
// router.post('/', (req, res) => { res.send({ message: 'Post' }) })
// router.put('/', (req, res) => { res.send({ message: 'Put' }) })
// router.delete('/', (req, res) => { res.send({ message: 'Delete' }) })

// router.all('/', (req, res) => { res.send({ message: 'All' }) })

router.route('/')
    .get((req, res) => { res.send({ message: 'Get' }) })
    .post((req, res) => { res.send({ message: 'Post' }) })
    .put((req, res) => { res.send({ message: 'Put' }) })
    .delete((req, res) => { res.send({ message: 'Delete' }) })

module.exports = router

/* ------------------------------------------------------- */