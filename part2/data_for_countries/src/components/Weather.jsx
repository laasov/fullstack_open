import axios from 'axios'
import { useEffect, useState } from 'react'

const api_key = import.meta.env.VITE_SOME_KEY

const Display = ({ capital, weatherData }) => {

    if (!weatherData) {
        return (<><p>Failed loading weather data</p></>)
    }

    const temp = Math.round((weatherData.main.temp - 273.15) * 1000) / 1000
    const wind = weatherData.wind.speed
    const icon = weatherData.weather[0].icon
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <>
          <h2>Weather in {capital}</h2>
          <p>temperature {temp} Celsius</p>
          <img src={iconUrl}/>
          <p>wind {wind}</p>
        </>
    )
}

const Weather = ({ capital }) => {
    const [weatherData, setWeatherData] = useState(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`

    useEffect(() => {
        axios
        .get(url)
        .then(response => {
            setWeatherData(response.data)
        })
    }, [])

    return (
        <>
          <Display capital={capital} weatherData={weatherData} />
        </>
    )
}

export default Weather