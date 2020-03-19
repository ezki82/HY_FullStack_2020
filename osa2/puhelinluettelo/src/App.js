import React, { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const changeNameHandler = (event) => {
    setNewName(event.target.value)
  }

  const changeNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFilterHanlder = (event) => {
    setFilter(event.target.value)
  }

  const addClickHandler = (event) => {
    event.preventDefault()

    const personExists = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0 ? true : false
   
    if (personExists) {
      window.alert(`Person ${newName} is alredy in the phonebook!`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} filterOnChange={changeFilterHanlder}/>
      <h3>Add new person:</h3>
      <PersonForm nameValue={newName} nameOnChange={changeNameHandler} numberValue={newNumber} numberOnChange={changeNumberHandler} onClick={addClickHandler}/>
      <h3>Numbers:</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App