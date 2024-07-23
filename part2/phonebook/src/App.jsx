import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Form from "./components/Form"
import Filter from "./components/Filter"
import Header from "./components/Header"

import phoneService from './services/phoneService'

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
  const [deleteeId, setDeleteeId] = useState('')

  /**
   * Handlers
   */
  const handleNameInputChange = (event) => setNewName(event.target.value)
  const handlePhoneInputChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  //const handleDeleteAction = (event) => setDeleteeId(event.target.value)

  /**
   *  GET persons from json db
   */
  useEffect(() => {
    phoneService
      .getAll()
      .then(response  => setPersons(response.data))
  }, [])

  /**
   * POST a person to the database
   */
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(e => e.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }

    const newRecord = {name : newName, number: newPhone, id: crypto.randomUUID().toString()}
    
    phoneService
      .create(newRecord)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('')
      })
  }

  /**
   * DELETE a person from the database
   */
  const removePerson = (id) => {
    
    if (window.confirm("Delete?")) {
        setPersons(persons.filter(p => p.id != id))
        phoneService
          .remove(id)
    }

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
      <Numbers numbers={persons.filter(e => e.name.toLowerCase().includes(filter.toLowerCase()))} 
               handler={removePerson}/>
    </div>
  )
}

export default App