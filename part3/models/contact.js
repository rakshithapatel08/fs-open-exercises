const mongoose = require("mongoose")

mongoose.set('strictQuery',false)

const url = process.env.MONGO_URI

console.log("connecting..")

mongoose.connect(url)
.then(()=>console.log("connected successfully"))
.catch((error)=>console.log(error.message))

const contactSchema = new mongoose.Schema({
    name:String,
    number: Number
})

module.exports = mongoose.model("Contact",contactSchema)