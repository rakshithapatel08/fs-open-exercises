

const Form = ({addName,newname,setNewname,newnumber,setNewnumber}) => {
  return (
    <>
    <form onSubmit={addName}>
        name : <input type="text" placeholder="add new name" value={newname} onChange={(e) => setNewname(e.target.value)} />
        <br/>
        number: <input type="text" placeholder="add new number" value={newnumber} onChange={(e)=> setNewnumber(e.target.value)}/>
        <br/>
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default Form