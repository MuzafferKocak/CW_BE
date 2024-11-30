"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

const mongoose = require("mongoose");
const { customError, CustomError } = require("../errors/customError");

/* ------------------------------------------------------- */
const dbConnection = () => {
  if (!process.env.MONGODB_URI) {
    throw new CustomError("mongodb_uri is necessary");
  }

  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection is successfull");
  } catch (error) {
    console.log("Database cennection error");
  }
};
/* ------------------------------------------------------- *
//* Class
class DatabaseConnection {
  constructor() {
    this.#_connect();
  }
  #_connect() {
    if (!process.env?.MONGODB)
      throw new CustomError("mongodb uri is necessary", 500);
    mongoose
      .connect(process.env?.MONGODB)
      .then(() => {
        console.log("Database connection successfull");
      })
      .catch((err) => {
        console.log("Database connection error");
      });
  }
}
module.exports = new DatabaseConnection();
/* ------------------------------------------------------- */
module.exports = dbConnection;
