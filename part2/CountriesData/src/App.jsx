import {useState, useEffect} from "react"
import axios from "axios"

function App() {
  const [input,setInput] = useState("Finland")
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    console.log(input)
     axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
     .then(res => res.data)
     .then(data =>setCountries(data))
  },[])

  return (
    <>
     <p>find countries : <input type="text" onChange={(e)=>setInput(e.target.value)}/></p>
     {countries.map(c=> c.name.common.toLowerCase().includes("ks"))}
     {countries.length}
    </>
  )
}

export default App
