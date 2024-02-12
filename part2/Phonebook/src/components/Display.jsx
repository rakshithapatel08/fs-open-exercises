import axios from "axios"
const Display = ({filteredArray}) => {

  const removePerson = (id,name)=>{
    console.log(id)
    const confirmation = window.confirm(`delete ${name}?`)
    if(confirmation){
      axios.delete(`http://localhost:3001/persons/${id}`)
      .then(res=>console.log(`${res.data.name} was deleted`))
    }    
  }
  return (
    <>
      {filteredArray.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number} <button onClick={()=>removePerson(person.id,person.name)}>delete</button>
            <br />
          </div>
        )
      })}
    </>
  )
}

export default Display