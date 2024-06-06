const userRouter = require("express").Router()
const bcrypt = require("bcrypt")

const User = require("../models/user")

userRouter.get("/",(req,res)=>{
    User.find({})
    .then((users)=>res.json(users))
    .catch((error)=>console.log(error))
})

userRouter.post("/",async(req,res)=>{
    const {username, name, password} = req.body

    if(!username || !password){
        return res.status(400).json({error:"username and password is must"})
    }

    if(username.length <3 || password.length <3){
        return res.status(400).json({error:"username and password must be atleast 3 characters"})
    }
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({username, name, hashedPassword})
    newUser.save()
    .then((user)=>res.status(201).json(user))
    .catch((error)=>console.log(error))
})

module.exports = userRouter