import Persons from './components/Persons'
import Header from './components/Header'
import Filter from './components/Filter'
import Form from './components/Form'
import { useState, useEffect } from 'react'
import personService from './services/persons'
  
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialData => {
      setPersons(initialData)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === "") {
      alert(`A name is required`)
      return
    }
    if (newNumber === "") {
      alert(`${newName} has no number`)
      return
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
  
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  return (
    <div>
      <Header title="Phonebook" />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Header title="Add a new" />
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <Header title="Numbers" />
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App
