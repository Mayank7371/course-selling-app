// here goes the DB schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "password is required"],
        unique: false
    }
})

const userModel = mongoose.model("users", User)

module.exports = {
    userModel
}