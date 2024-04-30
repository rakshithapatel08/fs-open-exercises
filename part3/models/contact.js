const mongoose = require("mongoose");

mongoose.set("strictQuery",false);

const url = process.env.MONGO_URI;

console.log("connecting..");

mongoose.connect(url)
  .then(() => console.log("connected successfully"))
  .catch((error) => console.log(error.message));

const contactSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required:true
  },
  number: {
    type:String,
    minLength:8,
    validate:{
      validator:function(v){
        return /\d{2,3}-\d/.test(v);
      }
    },
    required:true
  }
});

module.exports = mongoose.model("Contact",contactSchema);