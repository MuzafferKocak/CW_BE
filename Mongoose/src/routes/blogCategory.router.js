"use strict";
/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/
const router = require("express").Router();
const { blogCategory } = require("../controllers/blogCategory.controller");

//* Call Controlers:

//* /blog/category
router.route("/category").get(blogCategory.list).post(blogCategory.create);

//* /blog/category/id
router
  .route("/category/:categoryId")
  .get(blogCategory.read)
  .put(blogCategory.update)
  .patch(blogCategory.update)
  .delete(blogCategory.delete);

  module.exports=router
