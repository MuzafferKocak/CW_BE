"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "userId": "65343222b67e9681f937f001",
    "carId": "65352f518a9ea121b1ca5001",
    "startDate": "2023-10-10",
    "endDate": "2023-10-16"
}
{
    "userId": "65343222b67e9681f937f002",
    "carId": "65352f518a9ea121b1ca5002",
    "startDate": "2023-10-14",
    "endDate": "2023-10-20"
}
/* ------------------------------------------------------- */
// Reservation Model:

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    amount: {
      type: Number,
      required: true,
      default: function () {
        if (this.startDate && this.endDate) {
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          const differenceInTime = end - start; //* Milliseconds difference
          const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24); //* Convert to days

          if (differenceInDays <= 0) {
            throw new Error("End date must be after start date.");
          }

          return differenceInDays;
        }
        
        return 0;
      },
    },
    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "reservations",
    timestamps: true,
  }
);
module.exports = mongoose.model("Reservation", ReservationSchema);
