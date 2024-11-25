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

//* express-async-errors: catch async-errors and send to errorHandler
require("express-async-errors");

app.all("/", (req, res) => {
  res.send("WELCOME TO TODO API");
});
/* ------------------------------------------------------- */
//? SEQUELIZE

const { Sequelize, DataTypes } = require("sequelize");

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
});

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
