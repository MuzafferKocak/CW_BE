"use strict";
/*------------------------------------------------
|     //? Express - Pizza Api
-------------------------------------------------*/

const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

//* Order Model:

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
    },
    size: {
      type: String,
      trim: true,
      required: true,
      enum: ["Small", "Medium", "Large", "XLarge"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      //*create
      type: Number,
      default: function () {
        return this.quantity * this.price;
      },
      //* Update:
      transform: function () {
        return this.quantity * this.price;
      },
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

//* Model:
module.exports = mongoose.model("Order", OrderSchema);
