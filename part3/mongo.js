const mongoose = require("mongoose")

const password = process.argv[2]  //abcd1234 password for db user

const url = `mongodb+srv://rakshithapatel0807:${password}@cluster0.zmrdmwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name:String,
    number: Number
})

const Contact = mongoose.model("Contact",contactSchema)

if(process.argv[3]){
    const contact = new Contact({
        name:process.argv[3],
        number:process.argv[4]
    })
    
    contact.save().then(result=>{
        console.log(`added ${result.name} number ${result.number} to the phonebook`)
        mongoose.connection.close()
    })
}

else{
    Contact.find({}).then((result)=>{
        result.map(contact=>{
            console.log(contact.name +" " + contact.number)
        })
        mongoose.connection.close()
    })
}











