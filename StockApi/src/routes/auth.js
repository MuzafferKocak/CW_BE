"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/
const router = require("express").Router();
/* ------------------------------------------------------- */
//* routes/auth:
const auth = require("../controllers/auth");


//* URL: /auth

router.post("/login", auth.login);
router.post("/refresh", auth.refresh);
router.get("/logout", auth.logout);

/* ------------------------------------------------------- */
module.exports = router;