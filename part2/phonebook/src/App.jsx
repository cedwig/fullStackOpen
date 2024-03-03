import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import AddEntryForm from './components/AddEntryForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') return
    if (checkAlreadyExisting()) {
      alert(`${newName} is already added to phonebook.`)
      setNewName('')
      return
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const checkAlreadyExisting = () => {
    return persons.some(person => person.name === newName)
  }

  const personsToShow = newFilterName === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(newFilterName.toLowerCase()))

  const handleInputNameChange = (event) => setNewName(event.target.value)
  const handleInputNumberChange = (event) => setNewNumber(event.target.value)
  const handleInputFilterChange = (event) => setNewFilterName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter newFilterName={newFilterName}
                    handleInputFilterChange={handleInputFilterChange} />
      <AddEntryForm newName={newName}
                    newNumber={newNumber}
                    handleInputNameChange={handleInputNameChange} handleInputNumberChange={handleInputNumberChange}
                    addPerson={addPerson} />
      <Numbers personsToShow={personsToShow} />

    </div>
  )
}

export default App