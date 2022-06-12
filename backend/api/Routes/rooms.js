const express = require("express");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } = require("../controllers/roomController");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom)

// update
router.put("/:id",verifyAdmin, updateRoom)

// delete
router.delete("/:id",verifyAdmin, deleteRoom)


// get
router.get("/:id/:hotelid", getRoom)

// get all
router.get("/",getAllRooms)

module.exports =  router