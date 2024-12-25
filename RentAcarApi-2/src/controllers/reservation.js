"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

//* Reservation Controller:

const Reservation = require("../models/reservation");
const user = require("./user");

module.exports = {
  list: async (req, res) => {
    let customFilter = {};
    if (!req.user.isAdmin && !req.user.isStaff) {
      customFilter = { userId: req.user._id };
    }

    const data = await getModelList(Reservation, customFilter, [
      { path: "userId", select: "username fistName lastName" },
      { path: "carId" },
      { path: "createdId", select: "username" },
      { path: "updatedId", select: "username" },
    ]);

    const details = await res.getModelListDetails(Reservation, customFilter);
    res.status(200).send({
      error: false,
      details,
      data,
    });
  },
  create: async (req, res) => {
    const userReservationDates = await Reservation.findOne({
      userId: req.body.userId,
      $nor: [
        { startDate: { $gt: req.body.endDate } }, //*resevation basöangic tarihi mevcut resarvationun bitis tarihinden büyükse sorun yok
        { endDate: { $lt: req.body.startDate } }, //*reservation bitis tarihi mevcut reservationun baslangic tarihinden kücükse sorun yok
      ],
    });

    if (userReservationDates) {
      res.errorStatusCode = 400;
      throw new Error(
        "It can not be aded because is another reservation with the same date"
      );
      {
        cause: {
          userReservationDates: userReservationDates;
        }
      }
    } else {
      const data = await Reservation.create(req.body);

      res.status(200).send({
        error: false,
        data,
      });
    }
  },
  read: async (req, res) => {},
  update: async (req, res) => {},
  delete: async (req, res) => {},
};
