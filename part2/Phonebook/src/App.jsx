import { useEffect, useState } from "react"
import personsData from "../persons.js"
import Filter from "./components/Filter"
import Form from "./components/Form"
import Display from "./components/Display"
import axios from "axios"
import "./app.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [deletedPerson, setDeletedPerson] = useState(null)
  const [newname, setNewname] = useState("")
  const [newnumber,setNewnumber] = useState("")
  const [filter, setFilter] = useState("")
  const [addNotify,setAddNotify] = useState(null)
  const [deleteNotify,setDeleteNotify] = useState(null)
  const [updateNotify,setUpdateNotify] = useState(null)
  const [error,setError] = useState(null)

  useEffect(()=>{
    personsData.getPersons()
    .then(result=>setPersons(result))
  },[deletedPerson])
  
  const filteredArray = persons.filter((person)=>person.name.toLowerCase().includes(filter.toLowerCase()))
  // console.log(filteredArray)
  const addName = (event) => {
    event.preventDefault();
    let flag = 0;
    persons.forEach(person => {
      // console.log(newname)
      if (person.name.toLowerCase() === newname.toLowerCase()) {
        const confirmUpdate = window.confirm(`${newname} already exists in the phonebook,replace the old number with new one?`)
        if(confirmUpdate){
          const changedPerson = {...person,number:newnumber}
          console.log(changedPerson)
          console.log(person._id)
          axios.put(`/api/persons/${person._id}`,changedPerson)
          .then(res=>res.data)
          .then(data => setPersons(persons.map(p => p.id != person.id ? p : data)))
          .then(()=> setUpdateNotify(`${person.name} is updated with ${newnumber}`))
          .then(()=> setTimeout(()=>setUpdateNotify(null),3000))
          .catch(()=>{setError(`Information of ${newname} is not updated`)
                    setTimeout(()=>setError(null),3000)
                  })      
                   
        }
        flag = 1; 
        setNewname("") 
        setNewnumber("")     
      }

    });
    if (flag === 0) {      
      personsData.addPersons({ name: newname, number: newnumber })
      .then(result=>{
        // console.log(result)
        setAddNotify(`Added ${newname}`)
        setTimeout(()=>setAddNotify(null),3000)
        setPersons(persons.concat(result));
        setNewname("")
        setNewnumber("")
      })
      .catch((error)=>{
        setError(error.response.data.error)
        setTimeout(()=>setError(null),3000)
      })
    }
  }

  return (
    <>
      <h1>Phonebook</h1>
      {(addNotify!=null)?<div className="addNotify">{addNotify}</div> :<p></p>}
      {(deleteNotify!=null)? <div className="deleteNotify">{deleteNotify}</div> : <p></p>}
      {(updateNotify!=null)? <div className="updateNotify">{updateNotify}</div> : <p></p>} 
      {(error!=null)?<div className="error">{error}</div>:<p></p>}        
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add new numbers</h2>
      <Form addName={addName} newname={newname} setNewname={setNewname} newnumber={newnumber} setNewnumber={setNewnumber}/>
      <h2>Numbers</h2>     
     <Display filteredArray={filteredArray} setDeleteNotify={setDeleteNotify} setDeletedPerson={setDeletedPerson}/>
    </>
  )
}

export default App
