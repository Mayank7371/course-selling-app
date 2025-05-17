const { Router } = require("express")
const courseRouter = Router()

courseRouter.get("/browse", (req, res) => {
    res.json({
        message: "you have hit the browse endpoint"
    })
})
courseRouter.post("/purchase", (req, res) => {

})
courseRouter.post("/view-purchased", (req, res) => {

})

module.exports = {
    courseRouter: courseRouter
}
