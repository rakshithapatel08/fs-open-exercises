const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const BlogTest = require("../testdb")

blogRouter.get("/",async(req,res)=>{
    const blogs = await BlogTest.find({})
    res.json(blogs)
})

blogRouter.post("/",async(req,res)=>{
    const body = req.body
    const newBlog = new BlogTest(body)

    try{
        const result = await newBlog.save()
        res.status(201).json(result)
    }
    catch(error){
        next(error)
    }
})

module.exports = blogRouter