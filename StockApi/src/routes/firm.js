"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/

const router = require("express").Router();
const firm = require("../controllers/firm");
const upload = require("../middlewares/upload");
/* ------------------------------------------------------- */

router.route("/").get(firm.list).post(upload.array("images"), firm.create);

router
  .route("/:id")
  .get(firm.read)
  .put(upload.array("images"), firm.update)
  .patch(upload.array("images"), firm.update)
  .delete(firm.delete);

module.exports = router;
