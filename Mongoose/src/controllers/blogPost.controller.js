"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

//* Call Models:

const { BlogPost } = require("../models/blogPost.model");
const { NotFoundError } = require("../errors/customError");

//* BlogPost Controller:

module.exports.blogPost = {
  list: async (req, res) => {
    const data = await BlogPost.find().populate("categoryId");

    res.send({
      result: data,
    });
  },

  //* CRUD ->

  create: async (req, res) => {
    const result = await BlogPost.create(req.body);

    res.send({
      result,
    });
  },

  read: async (req, res) => {
    const result = await BlogPost.findOne({ _id: req.params.postId });
    if (!result) {
      throw new NotFoundError("No matching documents found");
    }
    res.send({
      isError: false,
      result,
    });
  },

  update: async (req, res) => {},

  delete: async (req, res) => {},
};

/* ------------------------------------------------------- */
