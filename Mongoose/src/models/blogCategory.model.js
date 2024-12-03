"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

//* Mongoose
const mongoose = require("mongoose");

/*------------------------------------------------------*
const user = {
  firstname: "John",
  lastname: "Bruce",
};
const ModelSchema = new mongoose.Schema({
  fieldName: String, //* type with shorthand
  fieldName1: {
    type: Number,
    default: 4,
    trim: true,
    unique: true,
    required: [true, "This field is Required"],
    enum: [["John", "Bruce"], "BU degerlerden biri olmali"],
    validate:[()=>true, "uyumsuz veri tipi"],
    get: (data)=>data,
    set: (data)=>data,
    index: true
  },
},{
    collation:"tableName", //* Tablo ismi
    timestamps:true
});

const ModelName= mongoose.model("ModelName",ModelSchema)
module.exports={ModelName}
/*------------------------------------------------------*/
//* BlogCategory Schema

const BlogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  //* createdAt // timestamps: true
  //* updatedAt // timestamps: true
  {
    collection: "blogCategories",
    timestamps: true,
  }
);

module.exports = {
  BlogCategory: mongoose.model("BlogCategory", BlogCategorySchema),
};
/*------------------------------------------------------*/
