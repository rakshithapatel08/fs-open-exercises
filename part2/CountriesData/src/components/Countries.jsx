import { useEffect, useState } from "react"
import axios from "axios"

const api_key = import.meta.env.VITE_API_KEY

const Countries = ({ filteredArray }) => {
    const [weather,setWeather] = useState([])
    // console.log(filteredArray[0])
    const languages = filteredArray.map((item) => item.languages)
    // console.log(languages)

    const values = Object.values(languages[0])
    // console.log(values)

    // console.log(weather)

    useEffect(()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredArray[0].capital[0]}&appid=${api_key}`)
        .then(res=>setWeather(res.data))
    },[filteredArray])

    return (
        <>
            <h2>{filteredArray[0].name.common}</h2>
            <div>
                <p> capital: {filteredArray[0].capital[0]}</p>
                <p> area: {filteredArray[0].area}</p>
            </div>
            <ul>
                {values.map((value) => <li key={value}>{value}</li>)}
            </ul>
            <img src={filteredArray[0].flags.png} alt="flagImage" />
            <h3>Weather in {filteredArray[0].capital[0]}</h3>
            <p>temperature is {weather.main?.temp}</p>
            <p>wind speed is {weather.wind?.speed}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} width="100px" />            
        </>
    )
}

export default Countries