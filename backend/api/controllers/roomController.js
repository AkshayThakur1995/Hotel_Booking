const Room = require("../models/rooms.model")
const Hotel = require("../models/hotels.model")
const createError = require("../utils/error")

const createRoom = async(req,res,next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push:{rooms: savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }

}

const updateRoom = async(req,res,next) => {
    try {
        const updatedRoom = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

const deleteRoom = async(req,res,next) => {
    const hotelId = req.params.hotelid;
    try {
         await Room.findByIdAndDelete(req.params.id)
         try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull:{rooms: req.params.id}})
        } catch (error) {
            next(error)
        }
         res.send(200).json("Hotel has been deleted")

    } catch (error) {
        next(error)
    }
}

const getRoom = async(req,res,next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)

    } catch (error) {
        next(error)
    }
}

const getAllRooms = async(req,res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)

    } catch (error) {   
        next(error)
    }
}

module.exports = {createRoom,updateRoom,deleteRoom,getRoom, getAllRooms}