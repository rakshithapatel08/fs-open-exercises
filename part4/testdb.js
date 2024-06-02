const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

mongoose.set("strictQuery",false)

const url = process.env.MONGODB_TEST_URL

console.log("connecting ...")

mongoose.connect(url)
 .then(()=>console.log("mongodb database connected"))
 .catch((error)=>console.log(error.message))

 const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)

const newBlog = new Blog({
    title:"Testing using supertest library is cool",
    author:"DEF",
    url:"hduwhdajsnxsjansa",
    likes:5
})

newBlog.save()
.then(()=>console.log("new blog saved"))
.catch((error)=>console.log(error.message))

module.exports = Blog
  

