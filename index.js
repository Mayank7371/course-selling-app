const express = require("express");
const connectDB = require("./db/connection.js")
const { userRouter } = require("./routes/user.js");
const { adminRouter } = require("./routes/admin.js");
const { courseRouter } = require("./routes/course.js");
const { userModel, courseModel, adminModel } = require("./db/db.js")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;
connectDB(app);

// Middleware setup
app.use(express.json());
app.use("/api/v1/user", userRouter); // anytime a req comes to /api/v1/user the req will be handles by userRouter
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

// Status endpoint
app.get("/status", (req, res) => {
  res.send("Hello World!");
});

// Placeholder route for user signup
app.post("user/signup", (req, res) => { });
// Placeholder route for user signin
app.post("user/signin", (req, res) => { });
// Placeholder route for browsing courses
app.get("/browse-courses", (req, res) => { });
// Placeholder route for user purchased courses
app.post("user/purchased-courses", (req, res) => { });
// Placeholder route for purchasing a course
app.post("/course/purchase", (req, res) => { });


