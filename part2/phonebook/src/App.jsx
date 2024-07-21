import { useState } from 'react'

const Number = ({ number }) => {
  return (
    <>
      <p>{number.name}</p>
    </>
  )
}

const Numbers = ({ numbers }) => numbers.map(number => <Number key={number.name} number={number} />)

const App = () => {
  /*
    persons -- The actual phone book
    newName -- input to the "name" field
  */
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  /*
  Handler for Name field Input change
  */
  const handleInputChange = (event) => setNewName(event.target.value)

  /*
  Adds a person to the array persons in format
  {
    name: *input*
  }
  Sets newName to empty string after addition
  */
  const addPerson = (event) => {
    event.preventDefault()

    const newRecord = {name : newName}

    if (persons.find(e => e.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }
    
    setPersons(persons.concat(newRecord))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers numbers={persons} />
    </div>
  )
}

export default App