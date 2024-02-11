import { useState } from "react"

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
      <p>filter using names : search here</p>
      <input type="text" placeholder="search by name" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
      <h2>Add new numbers</h2>
      <form onSubmit={addName}>
        name : <input type="text" placeholder="add new name" value={newname} onChange={(e) => setNewname(e.target.value)} />
        <br/>
        number: <input type="text" placeholder="add new number" value={newnumber} onChange={(e)=> setNewnumber(e.target.value)}/>
        <br/>
        <button type="submit">Add</button>
      </form>
      <h2>Numbers</h2>     
       {filteredArray.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <br />
          </div>
        )
      })}
    </>
  )
}

export default App
