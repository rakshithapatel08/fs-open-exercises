const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/",async(req,res)=>{
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogRouter.post("/",(req,res)=>{
    const body = req.body
    const newBlog = new Blog(body)

    newBlog.save()
    .then(result => res.status(201).json(result))
})

module.exports = blogRouter