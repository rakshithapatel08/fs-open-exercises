import personsData from "../../persons"

const Display = ({filteredArray,setDeleteNotify,setDeletedPerson}) => {

  const removePerson = (_id,name)=>{
    console.log(_id)
    const confirmation = window.confirm(`delete ${name}?`)
    if(confirmation){            
      personsData.removePersons(_id)
      .then(result=>setDeletedPerson(result[0]))
      .then(()=>setDeleteNotify(`${name} was deleted`))
      .then(()=>setTimeout(()=>setDeleteNotify(null),5000))
    }    
  }
  return (
    <>
      {filteredArray.map((person) => {
        console.log(person._id)
        return (
          <div key={person._id}>
            {person.name} {person.number} <button onClick={()=>removePerson(person._id,person.name)}>delete</button>
            <br />
          </div>
        )
      })}
    </>
  )
}

export default Display