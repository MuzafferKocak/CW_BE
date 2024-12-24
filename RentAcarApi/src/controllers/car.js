"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

//* Car Controller:

const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {
    let customFilter = { isAvailable: true };
    const data = await res.getModelList(Car, customFilter, [
      {
        path: "createdId",
        select: "username",
      },
      {
        path: "updatedId",
        select: "username",
      },
    ]);
    res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Car, customFilter)
    })
  },
  create: async (req, res) => {

    req.body.createdId = req.user._id
    req.body.updatedId = req.user._id

    const data = await Car.create(req.body)

    res.status(201).send({
        error: false,
        data,
    })
  },
  read: async (req, res) => {},
  update: async (req, res) => {},
  delete: async (req, res) => {},
};
