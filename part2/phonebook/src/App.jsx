import { useState, useEffect } from 'react'
import './styles.css'
import SearchFilter from './components/SearchFilter'
import AddEntryForm from './components/AddEntryForm'
import Numbers from './components/Numbers'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifStyle, setNotifStyle] = useState('notification')

  useEffect(() => {
    personService
      .getAll()
      .then(person => {
        setPersons(person)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') return
    
    if (checkAlreadyExisting()) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(p => p.name === newName)
        const changedNumber = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          })
          .catch( error => {
            setNotifMessage(`Information of ${newName} has already been removed from the server`)
            setNotifStyle('notification error')
            setTimeout(() => {
              setNotifMessage(null)
              setNotifStyle('notification')
            }, 5000);
          })
        setNotifMessage(`Updated ${newName}'s number to: ${newNumber}`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setNotifMessage(`Information of ${newName} has already been removed from the server`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000);
        })
      
      setNotifMessage(`Added ${newName}`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000);
    }

    setNewName('')
    setNewNumber('')
  }

  const checkAlreadyExisting = () => {
    return persons.some(person => person.name === newName)
  }

  const deleteBookEntryOf = (currentPerson) => {
    if (window.confirm(`Delete ${currentPerson.name} ?`)) {
      personService
        .deleteEntry(currentPerson.id)
        .then(setPersons(persons.filter(person => person.id !== currentPerson.id)))
    }
  }

  const personsToShow = newFilterName === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(newFilterName.toLowerCase()))

  const handleInputNameChange = (event) => setNewName(event.target.value)
  const handleInputNumberChange = (event) => setNewNumber(event.target.value)
  const handleInputFilterChange = (event) => setNewFilterName(event.target.value)

  return (
    <div className='phonebook'>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} style={notifStyle} />
      <SearchFilter newFilterName={newFilterName}
                    handleInputFilterChange={handleInputFilterChange} />
      <AddEntryForm newName={newName}
                    newNumber={newNumber}
                    handleInputNameChange={handleInputNameChange} handleInputNumberChange={handleInputNumberChange}
                    addPerson={addPerson} />
      <Numbers personsToShow={personsToShow}
              deleteBookEntry={deleteBookEntryOf}
      />

    </div>
  )
}

export default App