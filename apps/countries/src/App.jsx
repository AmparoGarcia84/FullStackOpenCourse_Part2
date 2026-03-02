import { useState, useEffect } from 'react'
import Message from './components/Message'
import ShowCountries from './components/ShowCountries'
import CountryDetail from './components/CountryDetail'
import countriesService from './services/countries'
import Search from './components/Search'

const App = () => {
  const [value, setValue] = useState('')
  const [allCountries, setAllCountries] = useState([]) // Array with all countries names
  const [countries, setCountries] = useState([]) // Array with countries names that match the search
  const [message, setMessage] = useState(null) // Message when there are too many matches, so the user needs to be more specific
  const [countryDetail, setCountryDetail] = useState(null) // When is a only one Country object that matches the search

  
  // ************** Functions **************
  
  const clearSearchResults = () => {
    setCountries([])
    setMessage(null)
    setCountryDetail(null)
  }

  const getCountryDetail = (countrySelected) => {
    countriesService.getCountryDetail(countrySelected).then(country => {
      setCountryDetail(country)
    }).catch(error => {
      console.log(error)
      setMessage('Error fetching country detail')
    })
  }

  // ************** Effects **************
  
  useEffect(() => {
    countriesService.getAll().then(initialCountries => {
      const allCountriesNames = initialCountries.map(country => country.name.common)
      setAllCountries(allCountriesNames)
    }).catch(error => {
      console.log(error)
      setMessage('Error fetching countries')
    })
  }, [])

  useEffect(() => {
    // Reset the search values
    clearSearchResults()
    // Filter how many names of allCountries match the search value
    const matchingCountries = allCountries.filter(country => country.toLowerCase().includes(value.toLowerCase()))
    if (matchingCountries.length === 0 || value === '') {
      setMessage('No countries found')
      return
    }
    if (matchingCountries.length === 1) {
      // Search in the API the complete object of the country that matches the search.
      getCountryDetail(matchingCountries[0])
      return
    }
    if (matchingCountries.length > 10) {
      // Not show any country, only a message of too many matches
      setMessage('Too many matches, specify another filter')
    } else {
      // A list of the names of the countries that match the search
      setCountries(matchingCountries)
    }
  }, [value, allCountries])

  // ************** Handlers **************
  
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = (countrySelected) => {    
    clearSearchResults()
    getCountryDetail(countrySelected)
  }

  return (
    <div>
      <Search value={value} handleChange={handleChange} />
      <Message message={message} />
      <ShowCountries countries={countries} handleClick={handleClick} />
      <CountryDetail country={countryDetail} />
    </div>
  )
}

export default App
