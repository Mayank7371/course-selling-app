const { Router } = require("express")
const adminRouter = Router()

adminRouter.post("/signup", (req, res, next) => {
    res.json({
        message: "you have hit the signup endpoint"
    })
})
adminRouter.post("/signin", (req, res, next) => {

})
adminRouter.post("/add-course", (req, res, next) => {

})

module.exports = {
    adminRouter: adminRouter
}
