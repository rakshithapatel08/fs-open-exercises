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

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
const BlogTest = mongoose.model('BlogTest', blogSchema)

// const newBlog = new Blog({
//     title:"HTML is easy",
//     author:"ABC",
//     url:"hduwhdajsnxsjansa",
//     likes:3
// })

// newBlog.save()
// .then(()=>console.log("new blog saved"))
// .catch((error)=>console.log(error.message))

module.exports = BlogTest
  

