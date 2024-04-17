const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/",(req,res)=>{
    res.send("<h1>phonebook backend</h1>")
})

app.get("/api/persons",(req,res)=>{
    res.json(persons)
})

app.get("/api/info",(req,res)=>{
    const requestTime = new Date();
    res.send(`<div><p>The phonebook has info of ${persons.length} people</p><br>${requestTime}</div>`)
})

app.get("/api/persons/:id",(req,res)=>{
    const id = Number(req.params.id)
    const person = persons.find(person=>person.id === id)
    if(person){
        res.json(person)
    }
    else{
        res.status(404).send("Person not found")
    }    
})

app.delete("/api/persons/:id",(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post("/api/persons",(req,res)=>{
    const person = req.body
    person.id = Math.floor(Math.random()*100000000+1)
    console.log(person)
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log("server running successfully")
})