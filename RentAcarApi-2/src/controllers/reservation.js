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
  read: async (req, res) => {
    let customFilter = {};

    if (!req.user.isAdmin && !req.user.isStaff) {
      customFilter = { userId: req.user._id };
    }
    const data = await Reservation.findOne({
      _id: req.params.id,
      ...customFilter,
    }).populate([
      { path: "userId", select: "username fistName lastName" },
      { path: "carId" },
      { path: "createdId", select: "username" },
      { path: "updatedId", select: "username" },
    ]);

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    if (!req.user.isAdmin) {
      delete req.body.userId;
    }

    req.body.updatedId = req.user._id;
    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
