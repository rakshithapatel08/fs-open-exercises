import { useState } from "react"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Display from "./components/Display"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newname, setNewname] = useState("")
  const [newnumber,setNewnumber] = useState("")
  const [filter, setFilter] = useState("")
  
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
      setPersons(persons.concat({ name: newname, number: newnumber }));
      setNewname("")
      setNewnumber("")
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
