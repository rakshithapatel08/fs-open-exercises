const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const BlogTest = require("../testdb")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

//authentication function to get the token
const getTokenFrom = (request)=>{
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
      }
      return null
}

blogRouter.get("/",async(req,res)=>{
    const blogs = await Blog.find({}).populate("user",{ username:1, id:1, name:1 })
    res.json(blogs)
})

// creating new blogs only by logged in users
blogRouter.post("/",async(req,res,next)=>{
    let body = req.body 

    const decodedToken = jwt.verify(getTokenFrom(req),process.env.SECRET)

    if(!decodedToken.id){
        return res.status(401).json({error:"Invalid token"})
    }
    
    let user = await User.findById(decodedToken.id)
    if(!body.likes){
        body.likes = 0
    }
    if(!body.title || !body.url){
        return res.status(400).json({message:"title or url is missing"})
    }
    try{
        const newBlog = new Blog({
            title: body.title,
            author: body.author,
            url:body.url,
            likes:body.likes, 
            user:user.id
        })
        const result = await newBlog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        res.status(201).json(result)
    }
    catch(error){
        next(error)
    }
})

blogRouter.delete("/:id",async(req,res,next)=>{
    const id = req.params.id
    try{
        await Blog.findByIdAndDelete(id)
        res.status(204).end()
    }
    catch(error){
        next(error)
    }
})

blogRouter.put("/:id",async(req,res,next)=>{
    const id = req.params.id
    const updatedBlog = req.body
    try{
        const newBlog = await Blog.findByIdAndUpdate(id,updatedBlog,{new:true})
        res.status(200).json(newBlog)
    }
    catch(error){
        next(error)
    }
})

module.exports = blogRouter