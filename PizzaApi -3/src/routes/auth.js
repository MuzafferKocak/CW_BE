"use strict";
/*------------------------------------------------
|     //? Express - Pizza Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */
//* routes/auth:
const auth = require("../controllers/auth");


//* URL: /auth

//* Login/logout:
router.post("/login", auth.login);
//*Refresh
router.post("/refresh", auth.refresh);
//* router.all('/logout', auth.logout)
router.get("/logout", auth.logout);

/* ------------------------------------------------------- */
module.exports = router;
