const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv").config()
const Contact = require("./models/contact")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

//logs the body for post requests
morgan.token("body",(req,res)=>{
    if(req.method === "POST"){
        return JSON.stringify(req.body)
    }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/",(req,res)=>{
    res.send("<h1>phonebook backend</h1>")
})

app.get("/api/persons",(req,res)=>{
    Contact.find({}).then(persons => res.json(persons))    
})

app.get("/api/info",(req,res)=>{
    const requestTime = new Date();
    Contact.find({}).then(persons => 
    res.send(`<div><p>The phonebook has info of ${persons.length} people</p><br>${requestTime}</div>`))
})

app.get("/api/persons/:id",(req,res)=>{
    const id = req.params.id
    Contact.findById(id)
    .then(person => res.json(person))
    .catch(()=>res.status(404).send("Person not found"))    
})

app.delete("/api/persons/:id",(req,res)=>{
    const id = req.params.id
    Contact.findByIdAndDelete(id)
    .then((result)=>console.log(result,"deleted successfully"))
    .catch((error)=>console.log(error))
})

app.post("/api/persons",(req,res)=>{
    // the name, number is received from req.body
    const person = req.body
    console.log(person)
    if(!person.name){
        return res.status(400).json({error:"Name is missing"})
    }
    if(!person.number){
       return res.status(400).json({error:"Number is missing"})
    }
    // if(existingPerson){
    //    return res.status(400).json({error:"Name must be unique"})
    // }
    else{
        const newPerson = new Contact({
            name:person.name,
            number:person.number
        })
        newPerson.save().then(savedPerson =>res.json(savedPerson))
    }  
})

const unknownEndpoint = (req,res)=>{
    res.status(404).send({error:"Unknown Endpoint"})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`server running successfully at ${PORT}`)
})