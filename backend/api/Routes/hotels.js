const express = require("express");

const router = express.Router();
const {createHotel, countByCity} = require("../controllers/hotelController")
const  {updateHotel} = require("../controllers/hotelController")
const  {deleteHotel} = require("../controllers/hotelController")
const  {getHotel} = require("../controllers/hotelController")
const  {getAllHotels} = require("../controllers/hotelController")
const {verifyAdmin} = require("../utils/verifyToken")
// create

router.post("/", verifyAdmin, createHotel)

// update
router.put("/:id",verifyAdmin, updateHotel)

// delete
router.delete("/find/:id",verifyAdmin, deleteHotel)


// get
router.get("/:id", getHotel)

// get all
router.get("/",getAllHotels)

router.get("/find/countByCity", countByCity)
router.get("/countByType", getAllHotels)

module.exports =  router