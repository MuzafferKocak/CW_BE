"use strict";
/*------------------------------------------------
|     //? Express - Personnel Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */

const personnel = require("../controllers/personnel.controller");
const idValidation = require("../middlewares/idValidation");

// URL: /personnels
//http://localhost:8000/personnels/login

router.post("/login", personnel.login);
router.all("/logout", personnel.logout);

router.route("/").get(personnel.list).post(personnel.create);

router
  .route("/:id")
  .get(personnel.read)
  .put(personnel.update)
  .patch(personnel.update)
  .delete(personnel.delete);

/* ------------------------------------------------------- */
module.exports = router;
