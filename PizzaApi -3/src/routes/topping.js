"use strict";
/*------------------------------------------------
|     //? Express - Pizza Api
-------------------------------------------------*/

const router = require("express").Router();
/* ------------------------------------------------------- */
//* routes/topping:

const topping = require("../controllers/topping");

//* URL: /toppings

router.route("/").get(topping.list).post(topping.create);

router
  .route("/:id")
  .get(topping.read)
  .put(topping.update)
  .patch(topping.update)
  .delete(topping.delete);

/* ------------------------------------------------------- */
module.exports = router;
