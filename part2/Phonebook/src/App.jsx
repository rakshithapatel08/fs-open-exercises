import { useEffect, useState } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Display from "./components/Display"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newname, setNewname] = useState("")
  const [newnumber,setNewnumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(()=>{
    axios.get("http://localhost:3001/persons")
    .then(res=>setPersons(res.data))
  },[persons])
  
  const filteredArray = persons.filter((person)=>person.name.toLowerCase().includes(filter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault();
    let flag = 0;
    persons.forEach(person => {
      console.log(newname)
      if (person.name.toLowerCase() === newname.toLowerCase()) {
        alert(`${newname} already exists in the phonebook`)
        flag = 1; 
        setNewname("") 
        setNewnumber("")     
      }

    });
    if (flag === 0) {
      axios.post("http://localhost:3001/persons",{ name: newname, number: newnumber })
      .then(res=>{
        console.log(res)
        setPersons(persons.concat(res.data));
        setNewname("")
        setNewnumber("")
      })
     
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add new numbers</h2>
      <Form addName={addName} newname={newname} setNewname={setNewname} newnumber={newnumber} setNewnumber={setNewnumber}/>
      <h2>Numbers</h2>     
     <Display filteredArray={filteredArray}/>
    </>
  )
}

export default App
