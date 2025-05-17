const { Router } = require("express");
const userRouter = Router(); // router is basically a function
// any req coming to /user/anything will be handled by this router

userRouter.post("/signup", (req, res, next) => {
  res.json({
    message: "you have hit the signup endpoint",
  });
});
userRouter.post("/signin", (req, res, next) => {});

// Route for user logout
userRouter.post("/logout", (req, res) => {
  // For JWT, logout is primarily a client-side action (clearing the token).
  // This endpoint can confirm the logout request.
  res.status(200).json({ message: "User logged out successfully" });
});

userRouter.post("/purchases", (req, res, next) => {});

module.exports = {
  userRouter: userRouter,
};
