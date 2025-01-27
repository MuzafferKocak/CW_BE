"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const router = require("express").Router();
const car = require("../controllers/car");
const permission = require("../middlewares/permissions");
const upload = require("../middlewares/upload");
/* ------------------------------------------------------- */
//* routes/car:

router
  .route("/")
  .get(car.list)
  .post(upload.array("images"), permission.isStaffOrAdmin, car.create);

router
  .route("/:id")
  .get(car.read)
  .put(permission.isStaffOrAdmin, car.update)
  .patch(permission.isStaffOrAdmin, car.update)
  .delete(permission.isAdmin, car.delete);

module.exports = router;
