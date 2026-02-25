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

  const resetPersonForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const newPersonObject = (name, number) => {
    return {
      name: name,
      number: number
    }
  }

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
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with the new one?`)) {
        const id = persons.find(person => person.name === newName).id
        const personObject = newPersonObject(newName, newNumber)
        updatePerson(id, personObject)
        return
      }
      return
    }
    const personObject = newPersonObject(newName, newNumber)
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(prev => prev.concat(returnedPerson))
      resetPersonForm()
    }).catch(error => {
      console.log(error)
      alert(`error creating ${newName} in the phonebook: ${error.message}`)
    })
  }

  const updatePerson = (id, newPerson) => {
    personService.update(id, newPerson)
    .then(returnedPerson => {
      setPersons(prev => prev.map(person => person.id === returnedPerson.id ? returnedPerson : person))
      resetPersonForm()
    }).catch(error => {
      console.log(error)
      alert(`error updating ${newName} in the phonebook: ${error.message}`)
    })
  }

  const deletePerson = (id) => {
    console.log(`deleting person with id: ${id}`)
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
    personService
    .deletePerson(id)
    .then(response => {
      console.log(response)
      setPersons(prev => prev.filter(person => person.id !== id))
    }).catch(error => {
      console.log(error)
      alert(`error deleting ${persons.find(person => person.id === id).name} from the phonebook: ${error.message}`)
    })
    }
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
