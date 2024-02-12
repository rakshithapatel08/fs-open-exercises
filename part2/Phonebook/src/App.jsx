import { useEffect, useState } from "react"
import personsData from "../persons.js"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Display from "./components/Display"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newname, setNewname] = useState("")
  const [newnumber,setNewnumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(()=>{
    personsData.getPersons()
    .then(result=>setPersons(result))
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
      personsData.addPersons({ name: newname, number: newnumber })
      .then(result=>{
        console.log(result)
        setPersons(persons.concat(result));
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
