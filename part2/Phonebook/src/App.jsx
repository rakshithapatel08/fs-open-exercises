import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto hellas" }])
  const [newname, setNewname] = useState("")

  const addName = (event) => {
    event.preventDefault();
    let flag = 0;
    persons.forEach(person => {
      console.log(newname)
      if (person.name.toLowerCase() === newname.toLowerCase()) {
        alert(`${newname} already exists in the phonebook`)
        flag = 1; 
        setNewname("")      
      }

    });
    if (flag === 0) {
      setPersons(persons.concat({ name: newname }));
      setNewname("")
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        name : <input type="text" placeholder="add new name" value={newname} onChange={(e) => setNewname(e.target.value)} />
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
