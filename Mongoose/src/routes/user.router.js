"use strict";

/*------------------------------------------------
|     //? Express - Blog Project with Mongoose
-------------------------------------------------*/

const mongoose = require("mongoose")

//* User Schema

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"], //* required: true
    },
    password:{
        type:String,
        trim: true,
        required: [true, "Password is requiered"], //* required: true
        set:(password)=>passwordEncypt(password)
        //set: passwordEncypt
    },
    firstname: String,
    lastname: String,
},{
    collation: "users",
    timestamps:true,
})