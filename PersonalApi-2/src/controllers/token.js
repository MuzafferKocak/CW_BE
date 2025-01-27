"use strict";

/*------------------------------------------------
|     //? Express - Personnel Api
-------------------------------------------------*/

const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Token);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Token),
    });
  },
  create: async (req, res) => {
    const data = await Token.create(req.body);
    res.status(201).send({ error: false, data });
  },
  read: async (req, res) => {
    data = await Token.findOne({ _id: req.params.id });
    res.status(200).send({ error: false, data });
  },
  update: async (req, res) => {
    const data = await Token.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Token.findOne({ _id: req.params.id }), //* updateOne metodu bize güncellediği veriyi döndürmez. Başka detaylar verir, Bundan mütevellit tekrardan yeni veriyi görmek için okuma işlemi yaparız
    });
  },
  delete: async (req, res) => {
    const data = await Token.deleteOne({ _id: req.params.id });
    res
      .status(data.deletedCount ? 204 : 404)
      .send({ error: !deletedCount, data });
  },
};
