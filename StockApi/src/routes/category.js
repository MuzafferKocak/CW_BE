"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/

const router = require("express").Router();
const category = require("../controllers/category");
/* ------------------------------------------------------- */

router.route("/").get(category.list).post(category.create);

router
  .route("/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);

module.exports = router;
