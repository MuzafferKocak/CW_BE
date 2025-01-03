"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const FirmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      
    },
    images: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "firms",
    timestamps: true,
  }
);
module.exports = mongoose.model("Firm", FirmSchema);
