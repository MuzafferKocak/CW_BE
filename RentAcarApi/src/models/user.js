"use strict";
/*------------------------------------------------
|     //? Express - Rent a Car Api
-------------------------------------------------*/

const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "username": "test",
    "password": "1234",
    "email": "test@site.com",
    "isActive": true,
    "isStaff": false,
    "isAdmin": false
}
/* ------------------------------------------------------- */
//* User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
      // selected:false
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email field must be required"],
      unique: [true, "There is this email. Email field must be unique"],
      // validate: [
      //     (email) => email.includes('@') && email.includes('.'),
      //     'Email type is not correct.'
      // ]
      // email regex /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      // regexr.com for test
      validate: [
        // (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
        // 'Email type is not correct.'
        (email) => {
          const regexEmailCheck =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return regexEmailCheck.test(email);
        },
        "Email type is not correct.",
      ],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isStaffOrAdmin: (req, res, next) => {
      if (
        req.user &&
        req.user.isActive &&
        (req.user.isAdmin || req.user.isStaff)
      ) {
        next();
      } else {
        res.errorStatusCode = 403;
        throw new Error("NoPermission: ");
      }
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

/* ------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);