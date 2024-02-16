import { useState, useEffect } from "react"
import axios from "axios"
import Countries from "./components/Countries"
import CountryDetails from "./components/CountryDetails"

function App() {
  const [input, setInput] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => res.data)
      .then(data => setCountries(data))
  }, [])

  const filteredArray = countries.filter((country) => country.name.common.toLowerCase().includes(input.toLowerCase()))

  return (
    <>
      <p>find countries : <input type="text" onChange={(e) => setInput(e.target.value)} /></p>
      {filteredArray.length > 10 ? <p>Too many matches specify some more filters</p> : (filteredArray.length === 1) ? <Countries filteredArray={filteredArray} /> : filteredArray.map((country) => <CountryDetails key={country.name.common} country={country}/>)}
    </>
  )
}

export default App
