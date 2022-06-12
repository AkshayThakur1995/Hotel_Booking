const express = require("express");

const router = express.Router();
const {updateUser} = require("../controllers/userController")
const {deleteUser} = require("../controllers/userController")
const {getUser} = require("../controllers/userController")
const {getAllUsers} = require("../controllers/userController")
const {verifyToken} = require("../utils/verifyToken")
const {verifyUser} = require("../utils/verifyToken")
const {verifyAdmin} = require("../utils/verifyToken")

router.get("/checkauthentication", verifyToken, (req,res,next) => {
    res.send("hello user, you are logged in")
})
router.get("/checkuser/:id",verifyUser,(req,res,next) => {
    res.send("hello you are logged in and you can delete your account")
})

router.put("/:id", verifyUser, updateUser)

// delete
router.delete("/:id",verifyUser, deleteUser)


// get
router.get("/:id",verifyUser, getUser)

// get all
router.get("/",verifyAdmin,getAllUsers)

module.exports =  router 