const { Router } = require("express")
const courseRouter = Router()

courseRouter.get("/browse", (req, res, next) => {
    res.json({
        message: "you have hit the browse endpoint"
    })
})
courseRouter.post("/purchase", (req, res, next) => {

})
courseRouter.post("/view-purchased", (req, res, next) => {

})

module.exports = {
    courseRouter: courseRouter
}
