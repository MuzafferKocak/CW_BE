"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

//* Mongoose
const mongoose = require('mongoose');

/*------------------------------------------------------*/

//* BlogPost Schema

const BlogPostSchema = new mongoose.Schema(
    {
      catogoryId:{
        type:mongoose.Schema.Types.ObjectId(),
        ref:"BlogCategory",
        required: true,

      },
      title: {
        type: String,
        trim: true,
        required: true,
      },
      content: {
        type: String,
        trim: true,
        required: true,
      }
    },
    {
      collation: "blogPosts",
      timestamps: true,
    }
  );
  
  module.exports = {
    BlogPost: mongoose.model("BlogPost", BlogPostSchema),
  };