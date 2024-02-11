const Display = ({filteredArray}) => {
  return (
    <>
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

export default Display