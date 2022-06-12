
const User = require("../models/user.model")

const updateUser = async(req,res,next) => {
    try {
        const updatedHotel = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async(req,res,next) => {
    try {
         await User.findByIdAndDelete(req.params.id)
         res.send(200).json("Hotel has been deleted")

    } catch (error) {
        next(error)
    }
}

const getUser = async(req,res,next) => {
    try {
        const hotel = await User.findById(req.params.id)
        res.status(200).json(hotel)

    } catch (error) {
        next(error)
    }
}

const getAllUsers = async(req,res, next) => {
    try {
        const hotels = await User.find()
        res.status(200).json(hotels)

    } catch (error) {   
        next(error)
    }
}
module.exports = {updateUser, deleteUser, getUser, getAllUsers}