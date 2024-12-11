"use strict";
/*------------------------------------------------
|     //? Express - Personnel Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */

const department = require("../controllers/department");
const permissions = require("../middlewares/permissions");

/* ------------------------------------------------------- */
router
  .route("/")
  .get(department.list)
  .post(permissions.isAdmin, department.create);

router
  .route("/:id")
  .get(permissions.isLogin, department.read)
  .put(permissions.isAdmin, department.update)
  .patch(permissions.isAdmin, department.update)
  .delete(permissions.isAdmin, department.delete);

//* /department/:id/personnel

router.get("/:id/personnel", department.personnels);

module.exports = router;
