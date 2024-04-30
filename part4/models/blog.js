const mongoose = require("mongoose")

mongoose.set("strictQuery",false)

const url = process.env.MONGODB_URL

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

module.exports = Blog
  

