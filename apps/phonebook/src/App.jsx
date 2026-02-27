import Persons from './components/Persons'
import Header from './components/Header'
import Filter from './components/Filter'
import Form from './components/Form'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
  
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClassName, setNotificationClassName] = useState('success')

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(initialData => {
      setPersons(initialData)
      handleNotificationMessage(`Phonebook has ${initialData.length} persons`, 'success')
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

  const handleNotificationMessage = (message, className) => {
    setNotificationMessage(message)
    setNotificationClassName(className)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
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
        handleNotificationMessage(`Person ${newName} updated`, 'success')
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
      handleNotificationMessage(`Person ${newName} added`, 'success')
    }).catch(error => {
      console.log(error)
      handleNotificationMessage(`error creating ${newName} in the phonebook`, 'error')
    })
  }

  const updatePerson = (id, newPerson) => {
    personService.update(id, newPerson)
    .then(returnedPerson => {
      setPersons(prev => prev.map(person => person.id === returnedPerson.id ? returnedPerson : person))
      resetPersonForm()
      handleNotificationMessage(`Person ${newName} updated`, 'success')
    }).catch(error => {
      console.log(error)
      handleNotificationMessage(`error updating ${newName} in the phonebook: ${error.message}`, 'error')
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
      handleNotificationMessage(`Person ${persons.find(person => person.id === id).name} deleted`, 'success')
    }).catch(error => {
      console.log(error)
      handleNotificationMessage(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`, 'error')
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
      <Notification message={notificationMessage} className={notificationClassName} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Header title="Add a new" />
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <Header title="Numbers" />
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
