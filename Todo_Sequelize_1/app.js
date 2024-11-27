"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
$ npm init -y
$ npm i express dotenv express-async-errors
$ echo PORT=8000 > .env
$ npm i sequelize sqlite3
/* ------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//* Accept json data and convert to object
app.use(express.json());
//* Accept FORM data and convert to object
app.use(express.urlencoded({ extended: true }));

//* express-async-errors: catch async-errors and send to errorHandler
require("express-async-errors");

// app.all("/", (req, res) => {
//   res.send("WELCOME TO TODO API");
// });
/* ------------------------------------------------------- */
//? SEQUELIZE

const { Sequelize, DataTypes } = require("sequelize");
const { UPSERT } = require("sequelize/lib/query-types");

//* DB Connection Settings:
// const sequelize = new Sequelize("sqlite:./db.sqlite3")
// const sequelize = new Sequelize("sqlite:" + process.env.SQLITE)
const sequelize = new Sequelize(
  "sqlite:" + process.env.SQLITE || "./db.sqlite3"
);

//* Model:
//? her model veritabaninda bir tabloya karsilik gelir
//? sequelize.define("tableName", {tableDetails})

//? Model isimleri PascalCase:
const Todo = sequelize.define("todos", {
  //* Sequelize da id tanimlamaya gerek yoktur . Otamatik tanimlanir
  //   id: {
  //     type: DataTypes.INTEGER,
  //     allowNull:false, //* default: true
  //     unique: true, //* default: false
  //     comment: "description",
  //     primaryKey: true, //* default: false
  //     autoIncrement: true, //*default: false
  //     field: "cumtom_name",
  //     defaultValue: 0, //* default null

  //   },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  //   description: DataTypes.TEXT,
  priority: {
    //* -1: low, 0: Normal, 1: Yüksek
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  //   createdAt:{},
  //   updatedAt:{},
  //* createdAt ve updatedAt tanimlamaya gerek yoktur sequelize otamatik yönetir
});

//? Syncronization:
//? Modeli veritabanina uygula:
// sequelize.sync() //* Create Table (ilk uygulama)
// sequelize.sync({force: true}) //* Drop table & Create Table (Dikkat!!! Data var ise silinir)
// sequelize.sync({alter: true}) //* To Backup & droptable & create table & from backup
//! sync() methodu 1 kere uygulanır ((modelde değişiklik var ise tekrar uygulanır.)

//? Connect to DB:
sequelize
  .authenticate()
  .then(() => console.log("* DB Connected *"))
  .catch(() => console.log("* DB not Connected *"));

/* ------------------------------------------------------- */
//? Routers:

const router = express.Router();

//? https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

//*List Todos
router.get("/", async (req, res) => {
  // const data = await Todo.findAll()
  // const data = await Todo.findAll({
  //     attributes: ["title", "description"], //* select fields
  //     where: {priority: -1} //* filters
  // })
  const data = await Todo.findAndCountAll();

  res.status(200).send({
    error: false,
    result: data,
  });
});

//* CRUD =>
//* Create Todo:
router.post("/", async (req, res) => {
  // const receivedData = req.body
  // console.log(receivedData);

  // const data =  await Todo.create({
  //     title: receivedData.title,
  //     description: receivedData.description,
  //     priority: receivedData.priority,
  //     isDone: receivedData.isDone,
  // })

  const data = await Todo.create(req.body);

  res.status(201).send({
    error: false,
    result: data,
  });
});

//* READ TODO:

router.get("/:id(\\d+)", async (req, res) => {
  // console.log(req.paramas);
  // console.log(req.paramas.id);

  // const data = await Todo.findOne({where: { id: req.params.id}})
  const data = await Todo.findByPk(req.params.id);

  res.status(200).send({
    error: false,
    result: data,
  });
});

//* UPDATE TODO:

router.put("/:id", async (req, res) => {
  // const data = await Todo.update({...newData},{...where})
  const data = await Todo.update(req.body, { where: { id: req.params.id } });
  // UPSERT: kayit varsa güncelle, yoksa ekle

  // res.status(202).send({
  //   error: false,
  //   result: data,
  //   message: "updated",
  //   new: await Todo.findByPk(req.params.id)
  // })

  res.status(202).send({
    error: false,
    result: await Todo.findByPk(req.params.id),
    message: "updated",
    count: data,
  });
});

//* DELETE TODO:
router.delete("/:id", async (req, res) => {
  // const data = await Todo.destroy({...where:});
  const data = await Todo.destroy(req.body, { where: { id: req.params.id } });

  //* 204: No Content => icerik vermeyebilir
  // res.status(204).send({
  //   error: false,
  //   message: "Deleted",
  //   count: data
  // })

  if (data > 0) { //* kayit silindiyse
    res.sendStatus(204);
  } else { //* silinmediyse
    // res.status(404).send({
    //   error: true,
    //   message: "Can not Deleted. (Maybe Already deleted)",
    // });

    res.errorStatusCode = 404
    throw new Error("Can not Deleted. (Maybe Already deleted)")
  }
});

app.use(router);
/* ------------------------------------------------------- */
const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler worked.");
  res.status(errorStatusCode).send({
    error: true, //* special data
    message: err.message, //* error string message
    cause: err.cause, //* error option cause
    //* stack: err.stack, //* error details
  });
};

app.use(errorHandler);
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
