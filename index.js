// Import necessary modules
const express = require("express");
const { userRouter } = require("./routes/user.js");
const { adminRouter } = require("./routes/admin.js");
const { courseRouter } = require("./routes/course.js");
const { userModel, courseModel, adminModel } = require("./db.js")
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use("/api/v1/user", userRouter); // anytime a req comes to /api/v1/user the req will be handles by userRouter
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

// Check for MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

// Function to connect to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database is now connected...`);
    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error(
      `FATAL ERROR: error in connecting to the database, exiting... `,
      error
    );
    process.exit(1);
  }
}
// Establish database connection
connectDB();

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


