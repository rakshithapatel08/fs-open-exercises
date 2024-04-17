const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(express.json())

//logs the body for post requests
morgan.token("body",(req,res)=>{
    if(req.method === "POST"){
        return JSON.stringify(req.body)
    }
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

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
    // the name, number is received from req.body
    const person = req.body
    const existingPerson = persons.find(p => person.name === p.name)
    person.id = Math.floor(Math.random()*100000000+1)
    console.log(person)
    if(!person.name){
        res.status(400).json({error:"Name is missing"})
    }
    if(!person.number){
        res.status(400).json({error:"Number is missing"})
    }
    if(existingPerson){
        res.status(400).json({error:"Name must be unique"})
    }
    else{
        persons = persons.concat(person)
        res.json(person)
    }  
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log("server running successfully")
})