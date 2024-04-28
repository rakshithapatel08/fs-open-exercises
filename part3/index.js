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
morgan.token("body", (req, res) => {
    if (req.method === "POST") {
        return JSON.stringify(req.body)
    }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

app.get("/", (req, res) => {
    res.send("<h1>phonebook backend</h1>")
})

app.get("/api/persons", (req, res) => {
    // contacts retreived from database
    Contact.find({}).then(persons => res.json(persons))
})

app.get("/api/info", (req, res) => {
    const requestTime = new Date();
    Contact.find({}).then(persons =>
        res.send(`<div><p>The phonebook has info of ${persons.length} people</p><br>${requestTime}</div>`))
})

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    // response contains required fields only
    Contact.findById(id)
        .then(person => {
            const responseData = {
                name:person.name,
                id:person._id,
                number:person.number
            }
            if (person) {
                res.json(responseData)
            }
            else {
                res.status(404).end()
            }
        }
        )
        .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
    // handling delete route -- contact is deleted from database
    const id = req.params.id
    Contact.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch((error) => next(error))
})

app.put("/api/persons/:id",(req,res,next)=>{
    // handling update contacts
    const id = req.params.id
    const newContact = req.body

    const updatedContact = {
        name:newContact.name,
        number:newContact.number
    }
    Contact.findByIdAndUpdate(id,updatedContact,{new:true,runValidators:true,context:"query"})
    .then(person => res.status(200).json(person))
    .catch(error => next(error))
})

app.post("/api/persons", (req, res,next) => {
    //contacts added to database
    // the name, number is received from req.body
    const person = req.body
    // console.log(person,req.body)
    if (!person.name) {
        return res.status(400).json({ error: "Name is missing" })
    }
    if (!person.number) {
        return res.status(400).json({ error: "Number is missing" })
    }
    // if(existingPerson){
    //    return res.status(400).json({error:"Name must be unique"})
    // }
    else {
        const newPerson = new Contact({
            name: person.name,
            number: person.number
        })
        newPerson.save()
        .then(savedPerson => res.json(savedPerson))
        .catch((error)=>next(error))
    }
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "Unknown Endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error,req,res,next) =>{
    console.log(error)
    if(error.name === "CastError"){
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if(error.name === "ValidationError"){
        return res.status(400).send({ error : error.message})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running successfully at ${PORT}`)
})