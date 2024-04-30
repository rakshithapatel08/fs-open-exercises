const express = require("express")
const dotenv = require("dotenv").config()
const Blog = require("./models/blog")

const app = express()
app.use(express.json())

app.get("/",(req,res) => {
    res.send("blog application backend")
})

app.get("/api/blogs",(req,res)=>{
    Blog.find({})
    .then(blogs => res.json(blogs))
})

app.post("/api/blogs",(req,res)=>{
    const body = req.body
    const newBlog = new Blog(body)

    newBlog.save()
    .then(result => res.status(201).json(result))
})

const PORT = process.env.PORT || 3003
app.listen(PORT,()=>{
    console.log(`server running successfully at ${PORT}`)
})