const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const bcrypt = require('bcryptjs'); // Assuming you will install and use bcryptjs

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
            match: [/.+\@.+\..+/, "Please fill a valid email address"],
        },
        // Consider adding a role if you consolidate User and Admin
        // role: {
        //     type: String,
        //     enum: ['user', 'admin'],
        //     default: 'user'
        // },
        purchasedCourses: [
            {
                type: Types.ObjectId,
                ref: "Course",
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

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
            ref: "User",
            required: [true, "Course creator is required"],
        },
        published: { type: Boolean, default: false }
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
            match: [/.+\@.+\..+/, "Please fill a valid email address"],
        },
    },
    { timestamps: true }
);

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Admin = mongoose.model("Admin", adminSchema); // Since Admin schema is defined, it should be compiled and exported

// Exporting all defined models.
// If you later consolidate Admin into User with a 'role', you would remove Admin model and export only User and Course.
module.exports = { User, Course, Admin };