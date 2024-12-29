"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  {
    collection: "brands",
    timestamps: true,
  }
);
module.exports = mongoose.model("Brand", BrandSchema);
