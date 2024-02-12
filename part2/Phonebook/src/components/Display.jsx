import personsData from "../../persons"

const Display = ({filteredArray}) => {

  const removePerson = (id,name)=>{
    console.log(id)
    const confirmation = window.confirm(`delete ${name}?`)
    if(confirmation){
      personsData.removePersons(id)
      .then(result=>console.log(`${result.name} was deleted`))
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