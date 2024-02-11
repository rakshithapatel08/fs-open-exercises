import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas",number:"040-1234567" }])
  const [newname, setNewname] = useState("")
  const [newnumber,setNewnumber] = useState("")

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
      setPersons(persons.concat({ name: newname,number: newnumber }));
      setNewname("")
      setNewnumber("")
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        name : <input type="text" placeholder="add new name" value={newname} onChange={(e) => setNewname(e.target.value)} />
        <br/>
        number: <input type="text" placeholder="add new number" value={newnumber} onChange={(e)=> setNewnumber(e.target.value)}/>
        <br/>
        <button type="submit">Add</button>
      </form>
      <h1>Numbers</h1>
      {persons.map((person, i) => {
        return (
          <div key={i}>
            {person.name} {person.number}
            <br />
          </div>
        )
      })}
    </>
  )
}

export default App
