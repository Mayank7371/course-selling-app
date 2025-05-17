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
adminRouter.put("/course", (req, res) => {
    res.json({
        message: "admin needs to change the courses"
    })
})

module.exports = {
    adminRouter: adminRouter
}
