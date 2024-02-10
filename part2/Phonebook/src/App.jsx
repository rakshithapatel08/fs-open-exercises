import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto hellas" }])
  const [newname, setNewname] = useState("")

  const addName = (event) => {
    event.preventDefault();
    console.log(event.target)
    console.log(newname)
    setPersons(persons.concat({ name: newname }));
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
