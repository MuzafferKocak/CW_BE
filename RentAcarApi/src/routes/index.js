"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const router = require("express").Router();

//* URL
router.use("/auth", require("./auth"));
router.use("/users", require("./user"));
router.use("/cars", require("./car"));
// router.use("/reservation", require("/reservation"))
router.use("/tokens", require("./token"))
// router.use("/document", require("/document"))

module.exports = router;
