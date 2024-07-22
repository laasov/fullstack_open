import axios from 'axios'
import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Form from "./components/Form"
import Filter from "./components/Filter"
import Header from "./components/Header"
//import { useEffect } from 'react'

const App = () => {
  /**
   * persons -- The actual phone book
   * newName -- input to the "name" field
   * newPhone -- phone number, input "number" field
   * filter -- filter shown records
   */
  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  /**
   *  Query persons from json db
   */
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response  => setPersons(response.data))
  }, [])

  /*
  Handlers
  */
  const handleNameInputChange = (event) => setNewName(event.target.value)
  const handlePhoneInputChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  /*
  Adds a person to the array persons in format
  {
    name: *input*
  }
  Sets newName to empty string after addition
  */
  const addPerson = (event) => {
    event.preventDefault()

    const newRecord = {name : newName, number: newPhone, id: persons.length + 1}

    if (persons.find(e => e.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }
    
    setPersons(persons.concat(newRecord))
    console.log(persons)
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Filter filter={filter} handler={handleFilterChange} />
      <Header text="Add a new" />
      <Form nameVal={newName}
            nameHandle={handleNameInputChange}
            phoneVal={newPhone}
            phoneHandle={handlePhoneInputChange}
            submitHandle={addPerson} />
      <Header text="Numbers" />
      <Numbers numbers={persons.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))} />
    </div>
  )
}

export default App