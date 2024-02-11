import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto hellas" }])
  const [newname, setNewname] = useState("")

  const addName = (event) => {
    event.preventDefault();
     persons.forEach(person => {
      console.log(newname)
      if(person.name.toLowerCase() === newname.toLowerCase()){
        alert(`${newname} already exists in the phonebook`)
      }
      else setPersons(persons.concat({ name: newname }));
    });
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        name : <input type="text" placeholder="add new name" onChange={(e) => setNewname(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <h1>Numbers</h1>
      {persons.map((person, i) => {
        return (
          <div key={i}>
            {person.name}
            <br />
          </div>
        )
      })}
    </>
  )
}

export default App
