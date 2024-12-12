"use strict";

/*------------------------------------------------
|     //? Express - Personnel Api
-------------------------------------------------*/

const router = require("express").Router();

//* Auth
router.use("/auth", require("./auth"));

//*Token
router.use("/tokens", require("./token"));

//* Personnel
router.use("/personnel", require("./personnel"));

//* department
router.use("/department", require("./department"));

module.exports = router;
