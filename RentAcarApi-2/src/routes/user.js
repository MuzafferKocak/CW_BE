"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */
//* routes/user:

const permission = require("../middlewares/permissions");
const user = require("../controllers/user");

//* URL: /users

router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(permission.isStaffOrAdmin, user.update)
  .patch(permission.isAdmin, user.update)
  .delete(permission.isAdmin, user.delete);

/* ------------------------------------------------------- */
module.exports = router;
