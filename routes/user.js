const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { userModel, courseModel, adminModel } = require("../db/db.js")
const userRouter = Router(); // router is basically a function
// any req coming to /user/anything will be handled by this router

userRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({             //idhar zod use kiye hai..jisse woh teen input lega jo ki teeno string hone chahiye 
    email: z.string().min(3).max(100).email(),                     //zod ka schema yeh hai here we multiple input validation things..this one tell ki minimum 3 characters hone chahiye max 100 and a email should be there
    username: z.string().min(3).max(100),
    password: z.string().min(3).max(100)
  })
  const parsedDataSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataSuccess.success) {                     //If data is not correct then yeh response return kr do
    res.json({
      message: "Incorrect Format",
      error: parsedDataSuccess.error              //yeh return kr dega ki user jis format mein input kr rha uspe error kya hai...jisse woh resignin/signup kre sahi format mein
    })
    return
  }

  const { username, email, password } = req.body;
  const existingUser = await userModel.findOne({
    email: email,
  })
  if (existingUser) {
    res.json({
      errorMessage: "User is already registered, sign in to continue..."
    })
    return
  }

  let errorThrown = false;
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

  } catch (err) {
    console.error("Error adding user to the database", err);
    errorThrown = true
    res.status(500).json({ message: "Internal Server Error" });
  }
  if (!errorThrown) {
    console.log("User was added to the database.");
    res.status(201).json({ message: "User registered successfully." });
  }
});
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await userModel.findOne({
    email,
  })
  if (!foundUser) {
    res.json({
      message: "You are not registered, sign in to continue.."
    })
  } else {
    const passwordMatch = await bcrypt.compare(password, foundUser.password)
    if (passwordMatch) {
      const token = jwt.sign({
        userId: foundUser._id.toString()
      }, JWT_KEY)
      res.json({
        token,
      })
    } else {
      res.json({
        message: "you have provided the incorrect credentials"
      })
    }

  }
});

// Route for user logout
userRouter.post("/logout", (req, res) => {

  res.status(200).json({ message: "User logged out successfully" });
});

userRouter.post("/purchases", (req, res) => { });

module.exports = {
  userRouter: userRouter,
};
