"use strict";
/*------------------------------------------------
|     //? Express - Stock Api
-------------------------------------------------*/
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
      // set: passwordEncrypt,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
      // validate: [
      //   (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      //   "Email format is not correct.",
      // ],
    },
    firstName: String,
    lastName: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

UserSchema.pre("save", function (next) {
  // console.log('this is from pre middleware');
  // console.log(this);

  // updateOne: _update, save: this
  const data = this?._update ?? this;

  //* Email Validation:
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    : true;

  if (!isEmailValidated) {
    // throw new Error('Email is not validated');
    next(new Error("Email is not validated"));
  }

  //* Password Validation:
  const isPasswordValidated = data.password
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/.test(
        data.password
      )
    : true;

  if (!isPasswordValidated)
    next(
      new Error(
        "Password must be at least 8 characters long and contain at least one special character and  at least one uppercase character."
      )
    );

  if (data.password) data.password = passwordEncrypt(data.password);

  next();
});

module.exports = mongoose.model("User", UserSchema);
