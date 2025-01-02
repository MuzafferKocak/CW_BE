"use strict";

const { mongo, default: mongoose } = require("mongoose");

/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/

const router = require("express").Router();
const brand = require("../controllers/brand");
const upload = require("../middlewares/upload");
/* ------------------------------------------------------- */

router.route("/").get(brand.list).post(upload.array("images"), brand.create);

router
  .route("/:id")
  .get(brand.read)
  .put(upload.array("images"), brand.update)
  .patch(upload.array("images"), brand.update)
  .delete(brand.delete);

module.exports = router;
