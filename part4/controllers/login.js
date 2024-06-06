const User = require("../models/user")
const loginRouter = require("express").Router()
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")

//post request for generating the token
loginRouter.post("/",async(req,res)=>{
    // get username and password from request body
    const {username, password} = req.body

    // checks if the user is already present in the database or need to signup first-create user
    const user = await User.findOne({username})

    // checks the password match with existing password hash in database
    const validUser = user === null
    ? false
    : bcrypt.compare(password,user.hashedPassword)

    if(!user || !validUser){
        return res.status(401).json({error:"Invalid username or password"})
    }

    // creating the object for token generation
    const userForToken = {
        username :user.username,
        id:user._id
    }

    // creating the token for the login user
    const token = jwt.sign(userForToken,process.env.SECRET,{expiresIn:60*60})

    // send back the token along with the response username
    res.status(200).send({token,username:user.username,name:user.name})
})

module.exports = loginRouter