const { Router } = require("express")
const userRouter = Router() // router is basically a function
// any req coming to /user/anything will be handled by this router

userRouter.post("/signup", (req, res, next) => {
    res.json({
        message: "you have hit the signup endpoint"
    })
})
userRouter.post("/signin", (req, res, next) => {

})
userRouter.post("/purchases", (req, res, next) => {

})
// we are exporting a 
module.exports = {
    userRouter: userRouter
}
