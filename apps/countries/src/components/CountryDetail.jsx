import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        if (country && country.capital) {
        weatherService.getWeather(country.capital[0]).then(weather => {
                setWeather(weather)
            })
        }
    }, [country])
    if (country === null) {
        return null
    }
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} km²</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature: {weather?.main.temp} °C</p>
            <p>Weather: {weather?.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} alt={weather?.weather[0].description} />
            <p>Wind: {weather?.wind.speed} m/s</p> 
        </div>
    )
}

export default CountryDetail
