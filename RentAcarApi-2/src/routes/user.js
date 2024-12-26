"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */
//* routes/user:

const permissions = require("../middlewares/permissions");
const user = require("../controllers/user");

//* URL: /users

router
  .route("/")
  .get( user.list)
  .post(user.create);

router
  .route("/:id")
  .get( user.read)
  .put(permissions.isStaffOrAdmin, user.update)
  .patch(permissions.isAdmin, user.update)
  .delete(permissions.isAdmin, user.delete);

/* ------------------------------------------------------- */
module.exports = router;
