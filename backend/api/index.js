const express = require("express");
const dotenv = require("dotenv")
const app = express()
const mongoose = require("mongoose")
const authRoute = require("./Routes/auth.js")
const authHotels = require("./Routes/hotels.js")
const authUsers = require("./Routes/users.js")
const authRooms = require("./Routes/rooms.js")
const cookieParser = require("cookie-parser")
const cors = require("cors")
dotenv.config()
app.use(cors())
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")    
    } catch (error) {
        throw error
    }
}

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRoute)
app.use("/hotels", authHotels)
app.use("/users", authUsers)
app.use("/rooms", authRooms)

// error handling middleware
app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errormessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errormessage,
        stack: err.stack,
    })
})


app.listen(8000, () => {
    connect()
    console.log("connected to backend")
}) 