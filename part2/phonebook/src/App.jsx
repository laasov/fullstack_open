import { useState, useEffect } from 'react'

import Error from './components/Error'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
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
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  /**
   * Handlers
   */
  const handleNameInputChange = (event) => setNewName(event.target.value)
  const handlePhoneInputChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

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
      const t = `${newName} is already added to the phonebook, replace the old number with a new one?`
      
      if (window.confirm(t)) {  
        const tmpId = persons.find(p => p.name === newName).id
        
        phoneService
          .update(tmpId, {name: newName, number: newPhone, id: tmpId})
          .then(response => {
            setPersons(persons.map(p => p.id !== tmpId ? p : response))
            setMessage(`Added ${newName}`)
            setNewName('')
            setNewPhone('')
            setTimeout(() => { setMessage(null) }, 3000)
          })
          .catch(error => {
            const tmpMsg = error.response.data.error
            setErrorMessage(tmpMsg)
            setTimeout(() => { setErrorMessage(null) }, 5000)
            return
          })
      }
    } else {
        const newRecord = {name : newName, number: newPhone}
    
        phoneService
          .create(newRecord)
          .then(response => {
            setPersons(persons.concat(response.data))
            setMessage(`Added ${newName}`)
            setNewName('')
            setNewPhone('')
            setTimeout(() => { setMessage(null) }, 3000)
          })
          .catch(error => {
            const tmpMsg = error.response.data.error
            setErrorMessage(tmpMsg)
            setTimeout(() => { setErrorMessage(null) }, 5000)
            return
          })
    }
  }

  /**
   * DELETE a person from the database
   */
  const removePerson = (id) => {

    const tmpName = persons.find(p => p.id === id).name
    
    if (window.confirm(`Delete ${tmpName}?`)) {
      setPersons(persons.filter(p => p.id != id))
      phoneService
        .remove(id)
        .then(response => {
          console.log("success ahaha")
        })
        .catch(error => {
          console.log('fail oh nooooo')
          const tmpMsg = `Information on ${tmpName} has already been removed from the server`
          setErrorMessage(tmpMsg)
          setTimeout(() => { setErrorMessage(null) }, 3000)
        })
    }

  }

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={message} />
      <Error message={errorMessage} />
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