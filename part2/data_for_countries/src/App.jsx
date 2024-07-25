import axios from 'axios'
import { useState, useEffect } from 'react'

import SearchField from './components/SearchField'

import './App.css'
import Countries from './components/Countries'

/* const CountryList = ({ countries, filt }) => {
  // remove non matched in flatMap
  // map to Country component or empty string
  // filter empty strings
  const filteredCountries = countries.flatMap(country =>
    country.name.common.toLowerCase().includes(filt.toLowerCase())
      ? <Country key={country.name.common} country={country}/>
      : '').filter(c => c !== '')

  if (filteredCountries.filter(c => c !== '').length > 10) {

    return (<p>Too many matches, specify another filter</p>)

  } else if (filteredCountries.length !== 1) {

    return (filteredCountries)

  } else {
    
    const matchName = filteredCountries.filter(c => c !== '')[0].key
    const matchData = countries.find(country => country.name.common === matchName)
    return (<CountryFull countryData={matchData}/>)

  }
} */

function App() {
  const [countryList, setCountryList] = useState([])
  //const [showCountries, setShowCountries] = useState([])
  const [filter, setFilter] = useState('')

  //  handlers
  const inputHandler = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setCountryList(response.data)
      console.log(countryList)
    })
  }, [])

  return (
    <>
      <SearchField handler={inputHandler} />
      <Countries countries={countryList} filter={filter} />
    </>
  )
}

export default App
