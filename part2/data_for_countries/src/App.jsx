import axios from 'axios'
import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import SearchField from './components/SearchField'

import './App.css'

function App() {
  const [countryList, setCountryList] = useState([])
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
