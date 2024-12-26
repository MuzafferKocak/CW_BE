"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

//* Car Controller:

const Car = require("../models/car");
const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ["Cars"]
        #swagger.summary = "List Cars"
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

    try {
      //* Varsayılan olarak sadece mevcut (isAvailable) araçları listeler.
      let customFilter = { isAvailable: true };

      //* Query parametrelerinden tarihleri al
      const { startDate: getStartDate, endDate: getEndDate } = req.query;

      //* Eğer tarih verilmişse rezervasyon kontrolü yap
      if (getStartDate && getEndDate) {
        const reservedCars = await Reservation.find(
          {
            $nor: [
              { startDate: { $gt: getEndDate } }, //* Tarihler çakışıyor mu?
              { endDate: { $lt: getStartDate } },
            ],
          },
          { _id: 0, carId: 1 }
        ).distinct("carId");

        //* Rezervasyon çakışması olan araçları filtrele
        if (reservedCars.length) {
          customFilter._id = { $nin: reservedCars };
        }
      }

      //* Eğer tarih yoksa tüm uygun araçları getir
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

      //* Sonuçları döndür
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Car, customFilter),
        data,
      });
    } catch (error) {
      //* Hata durumunda mesaj döndür
      res.status(req.errorStatusCode || 500).send({
        error: true,
        message: error.message || "An error occurred while listing cars.",
      });
    }
  },
  create: async (req, res) => {
    /*
        #swagger.tags = ["Cars"]
        #swagger.summary = "Create Car"
         #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Car'
            }
        }
    */

    req.body.createdId = req.user._id;
    req.body.updatedId = req.user._id;

    const data = await Car.create(req.body);

    res.status(201).send({
      error: false,
      message: "User is not authenticated",
      data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ["Cars"]
        #swagger.summary = "Get Single Car"
    */

    const data = await Car.findOne({ _id: req.params.id }).populate([
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
        #swagger.tags = ["Cars"]
        #swagger.summary = "Update Car"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
             schema: {
                $ref: '#/definitions/Car'
            }
        }
    */

    req.body.updatedId = req.user._id;
    let customFilter = { _id: req.params.id };
    const data = await Car.updateOne(customFilter, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Car.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Cars"]
        #swagger.summary = "Delete Car"
    */

    const data = await Car.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
