"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

//* Call Models:

const { BlogPost } = require("../models/blogPost.model");
const { NotFoundError } = require("../errors/customError");

//* BlogPost Controller:

module.exports.blogPost = {
  list: async (req, res) => {
    //* FILTERING - SEARCHING - SORTING - PAGINATION *//

    //* FILTERING:

    //- URL?filter[fieldName]=value1&filter[fieldName2]=value2
    const filter = req.query?.filter || {};
    // console.log(filter);

    //* SEARCHING
    //- URL?search[fieldName]=value1&search[fieldName2]=value2
    const search = req.query?.search || {};
    //? https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    //- { userId: { $regex: "6751e0e727ae5347fc01afd7", $options: "i" } }
    for (let key in search) {
      // search[key]= {$regex: search[key], $options: ""} //* Case-sensative
      search[key] = { $regex: search[key], $options: "i" }; //* CAse- insensative
    }

    //* SORTING
    //- URL?sort[fieldName]=asc&sort[fieldName2]=desc (asc: A-Z, desc: Z-A)
    const sort = req.query?.sort || {};

    //*PAGINATION
    //- URL?page=3&limit=20
    //* LIMIT
    let limit = Number(req.query?.limit);
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
    console.log(limit);

    const data = await BlogPost.find({ ...filter, ...search })
      .sort(sort)
      .limit(limit);
    // const data = await BlogPost.find().populate("categoryId");
    console.log(data);

    res.send({
      result: data,
    });
  },

  //* CRUD ->

  create: async (req, res) => {
    //* Login olmussa userId'yi req.user'dan alalim (session)
    if (req.user) req.body.userId = req.user._id;

    const result = await BlogPost.create(req.body);

    res.send({
      result,
    });
  },

  read: async (req, res) => {
    const result = await BlogPost.findOne({ _id: req.params.postId });
    if (!result) {
      throw new NotFoundError("No matching documents found");
    }
    res.send({
      isError: false,
      result,
    });
  },

  update: async (req, res) => {
    const result = await BlogPost.updateOne(
      { _id: req.params.postId },
      req.body
    );

    //* güncellenmek istenen veri yoksa
    if (result.matchedCount === 0) {
      throw new NotFoundError("No matching documents found");
      return res.status(404).send("No matching documents found");
    }
    //* güncellenmek istenen veri ama güncelleme yapılmadı
    if (result.matchedCount > 0 && result.modifiedCount === 0) {
      return res.status(200).send({ message: "Document already up-to-date." });
    }
    res.status(202).send({
      isError: false,
      result,
      new: await BlogPost.findOne({ _id: req.params.postId }),
    });
  },
  //*

  delete: async (req, res) => {
    const result = await BlogPost.deleteOne({ _id: req.params.postId });
    console.log(result);
    //deletedCount
    if (result.deletedCount === 0) {
      throw new NotFoundError("No matching documents found");
      // return res.status(404).send("No matching documents found");
    }
    res.status(204).send({
      result,
    });
  },
};

/* ------------------------------------------------------- */
