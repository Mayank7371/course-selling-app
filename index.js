const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("dotenv").config();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { z } = require("zod")
const app = express()
const port = process.env.PORT || 5000

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
