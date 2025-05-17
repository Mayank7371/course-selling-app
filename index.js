const express = require("express");
const connectDB = require("./db/connection.js")
const { userRouter } = require("./routes/user.js");
const { adminRouter } = require("./routes/admin.js");
const { courseRouter } = require("./routes/course.js");

require("dotenv").config();
// Initialize Express app
const app = express();
connectDB(app);

// Middleware setup
app.use(express.json());
app.use("/api/v1/user", userRouter); // anytime a req comes to /api/v1/user the req will be handles by userRouter
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
app.get("/status", (req, res) => {
  res.send("Server is now online")
})



