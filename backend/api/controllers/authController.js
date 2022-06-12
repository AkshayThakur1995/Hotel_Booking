const User = require("../models/user.model.js")
var bcrypt = require('bcryptjs');
const createError = require("../utils/error")
const jwt = require("jsonwebtoken")
const register = async(req,res, next) => {
    try {
        
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        await newUser.save()
        res.status(201).send("user has been created")
    } catch (error) {
        next(error)
    }
}

const login = async (req,res,next) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user){
            return next(createError(400, "user not found"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) {
            return next(createError(400, "incorrectpassword"))
        }

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SECRET)
        const {password, isAdmin, ...otherDetails} = user._doc;

        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails})

    } catch (error) {
        next(error)
    }
}

module.exports = {register, login}