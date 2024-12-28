"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

//* Reservation Controller:

const Reservation = require("../models/reservation");
const Car = require("../models/car");
const sendMail = require("../middlewares/sendMail");
const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "List Reservation"
        #swagger.description = `
            You can send query with endpoint for filter[], search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */
    let customFilter = {};
    if (!req.user.isAdmin && !req.user.isStaff) {
      customFilter = { userId: req.user._id };
    }

    const data = await res.getModelList(Reservation, customFilter, [
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
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Create Reservation"
         #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Reservation'
            }
        }
    */
    if ((!req.user.isAdmin && !req.user.isStaff) || req.user?.userId) {
      req.body.userId = req.user._id;
    }

    req.body.createdId = req.user._id;
    req.body.updatedId = req.user._id;

    const userReservationDates = await Reservation.findOne({
      carId: req.body.carId,
      $and: [
        { startDate: { $lt: req.body.endDate } }, //*resevation baslangic tarihi mevcut resarvationun bitis tarihinden büyükse sorun yok
        { endDate: { $gt: req.body.startDate } }, //*reservation bitis tarihi mevcut reservationun baslangic tarihinden kücükse sorun yok
      ],
    });

    if (userReservationDates) {
      res.status(400).send({
        error: true,
        message: "Another reservation exists with overlapping dates.",
        details: userReservationDates,
      });
      return;
    }
    const car = await Car.findById(req.body.carId);
    if (!car) {
      res.status(404).send({
        error: true,
        message: "Car not found",
      });
      return;
    }

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const diferenceInTime = endDate - startDate;
    const differenceInDays = diferenceInTime / (1000 * 60 * 60 * 24);

    if (differenceInDays <= 0) {
      res.status(400).send({
        error: true,
        message: "End date must be after start date",
      });
      return;
    }

    req.body.rentalDays = differenceInDays;
    req.body.amount = Number((differenceInDays * car.pricePerDay).toFixed(3));

    const data = await Reservation.create(req.body);

    //* sendMail
    const user = await User.findById(req.body.userId);
    if (user && user.email) {
      sendMail(
        user.email,
        "Reservation Confirmation",
        `
            <h1>Reservation Confirmed</h1>
            <p>Thank you, ${user.username}, for reserving a car with us!</p>
            <p><b>Car:</b> ${car.brand} ${car.model}</p>
            <p><b>Rental Days:</b> ${differenceInDays} day(s)</p>
            <p><b>Start Date:</b> ${req.body.startDate}</p>
            <p><b>End Date:</b> ${req.body.endDate}</p>
            <p><b>Total Amount:</b> $${req.body.amount}</p>
            <p>We look forward to serving you. Have a safe drive!</p>
        `
      );
    }

    res.status(200).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Get Single Reservation"
    */
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
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Update Reservation"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
             schema: {
                $ref: '#/definitions/Reservation'
            }
        }
    */
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
    /*
        #swagger.tags = ["Reservations"]
        #swagger.summary = "Delete Reservation"
    */
    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
