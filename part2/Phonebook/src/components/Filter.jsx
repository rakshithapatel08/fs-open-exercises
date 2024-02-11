const Filter = ({filter,setFilter}) => {
  return (
    <>
    <p>filter using names : search here</p>
      <input type="text" placeholder="search by name" value={filter} onChange={(e)=>setFilter(e.target.value)}/>
    </>
  )
}

export default Filter