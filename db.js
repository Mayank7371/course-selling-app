const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
            lowercase: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
            minlength: [6, "Password must be at least 6 characters long"],
            select: false // Password will not be returned by default in queries
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },

    },
    { timestamps: true }
);

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: [true, "Course price is required"],
            min: [0, "Price cannot be negative"],
        },
        imageUrl: {
            type: String,
            trim: true,
        },
        creatorId: {
            type: Types.ObjectId,
            required: [true, "Course creator is required"],
        },
    },
    { timestamps: true }
);

const adminSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
            minlength: [6, "Password must be at least 6 characters long"],
            select: false // Password will not be returned by default in queries
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
    },
    { timestamps: true }
);



const userModel = mongoose.model("User", userSchema);
const courseModel = mongoose.model("Course", courseSchema);
const adminModel = mongoose.model("Admin", adminSchema); // Since Admin schema is defined, it should be compiled and exported

// Exporting all defined models.
// If you later consolidate Admin into User with a 'role', you would remove Admin model and export only User and Course.
module.exports = { userModel, courseModel, adminModel };