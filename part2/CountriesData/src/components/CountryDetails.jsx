import { useState } from "react"
import Countries from "./Countries"

const CountryDetails = ({country}) => {
  const[show, setShow] = useState(false)
  return (
    <>
    {(!show) && <p>{country.name.common} <button onClick={()=>setShow(!show)}>Show</button></p>}
    {(show) && <Countries filteredArray={[country]}/>}
    </>
  )
}

export default CountryDetails