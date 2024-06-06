const mongoose = require("mongoose")
const config = require("../utils/config")

const url = config.MONGODB_URL

mongoose.connect(url)
.then(()=>console.log("database connected"))

userSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    hashedPassword:String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.hashedPassword
    }
  })

const User = mongoose.model("User",userSchema)

module.exports = User