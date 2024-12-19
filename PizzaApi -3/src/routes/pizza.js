"use strict";
/*------------------------------------------------
|     //? Express - Pizza Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */
//* routes/pizza:

const pizza = require("../controllers/pizza");

/* ------------------------------------------------------- */
//* Uploading Multer
const multer = require("multer");

//* upload middleware:
const upload = multer({
  // dest: "./upload",
  storage: multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, returnCallback) {
      console.log(file);
      // returnCallback(error, fileName);
      // returnCallback(null, file.originalname)
      returnCallback(null, Date.now() + "_" + file.originalname);
    },
  }),
});
/* ------------------------------------------------------- */

//* URL: /pizzas

router
  .route("/")
  .get(pizza.list)
  // .post(pizza.create);
  // .post(upload.single("image"), pizza.create); //* tek dosya
.post(upload.array('image'), pizza.create) //* Cok dosya (tavsiye)
// .post(upload.any(), pizza.create) //* cok dosya fieldname önemsiz

router
  .route("/:id")
  .get(pizza.read)
  .put(pizza.update)
  .patch(pizza.update)
  .delete(pizza.delete);

/* ------------------------------------------------------- */
module.exports = router;
