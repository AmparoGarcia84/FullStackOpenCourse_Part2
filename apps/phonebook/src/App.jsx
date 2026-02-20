import Person from './components/Person'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <input value={newName} onChange={handleNameChange}/>
        <button type="submit">add</button>
      </form> 
      <h2>Numbers</h2>
      <ul>
      {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
