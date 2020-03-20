import React, { useState, useEffect } from 'react';
import axios from 'axios'


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Filter = (props) => {
  return (
    <div>
      Find countries: <input value={props.filterValue} onChange={props.filterOnChange} />
    </div>
  )
}

const WeatherInfo = ({capital}) => {
  const [weather, setWeather] = useState({location:{}, current: {}})
  const [loading, setLoading] = useState(true);
  const weather_api_key = process.env.REACT_APP_MAIDEN_TIEDOT
  const url = `http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${capital}`  

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setLoading(false);
        setWeather(response.data)
      })
  },[url])

  return loading ? <p>Loading...</p> : (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.current.temperature} °C</p>
      <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}/> 
      <p>Wind: {weather.current.wind_speed} mph, direction: {weather.current.wind_dir}</p>
    </div>
  )
}

const Country = ({ country, showDetailedInfo }) => {
  const [showDetails, setShowDetails] = useState(false)
  const buttonText = showDetails || showDetailedInfo ? "hide" : "show"

  const showClickHandler = () => {
    setShowDetails(!showDetails)
  }

  if (showDetailedInfo || showDetails) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>
          Capital: {country.capital} <br />
          Population: {country.population}
        </p>
        <h2>Languages:</h2>
        <ul>
          {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={`${country.name} flag`} width="200" />
        <WeatherInfo capital={country.capital}/>
      </div>
    )
  } else {
    return (
      <div>
        {country.name} <Button onClick={showClickHandler} text={buttonText} />
      </div>
    )
  }
}

const CountryList = ({ countries, filter }) => {
  const showCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (showCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (showCountries.length <= 0) {
    return <div>No matches</div>
  }

  const showDetailedInfo = showCountries.length === 1

  return (
    <div>
      {showCountries.map((country, i) => <Country key={i} country={country} showDetailedInfo={showDetailedInfo} />)}
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterChangeHandler = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filterValue={filter} filterOnChange={filterChangeHandler} />
      <CountryList countries={countries} filter={filter} />
    </div>
  )
}

export default App;
