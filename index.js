const express = require('express')
const { userRouter } = require("./routes/user.js")
const { adminRouter } = require("./routes/admin.js")
const { courseRouter } = require("./routes/course.js")
const router = express.Router() // express library provies you someting called router
const mongoose = require("mongoose")
require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { z } = require("zod")
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use("/api/v1/user", userRouter) // anytime a req comes to /api/v1/user the req will be handles by userRouter
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables.');
    process.exit(1);
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database is now connected...`);
    } catch (error) {
        console.error(`FATAL ERROR: error in connecting to the database, exiting... `, error);
        process.exit(1)
    }
}
connectDB();

app.get('/status', (req, res) => {
    res.send('Hello World!')
})
app.post('user/signup', (req, res) => {
})
app.post('user/signin', (req, res) => {
})
app.get('/browse-courses', (req, res) => {
})
app.post('user/purchased-courses', (req, res) => {

})
app.post('/course/purchase', (req, res) => {

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
