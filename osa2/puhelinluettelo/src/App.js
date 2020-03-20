import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Person from './components/person'
import PersonForm from './components/personform'
import personService from './services/persons_service'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
    
    const personExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (personExists) {
      if(window.confirm(`Person ${newName} is alredy in the phonebook! Replace old number with new one?`)) {
        const changePerson = { ...personExists, number: newNumber}
        personService
        .update(changePerson.id, changePerson)
        .then(response => {      
          setPersons(persons.map(person => person.id !== changePerson.id ? person : changePerson))
          setNewName('')
          setNewNumber('')
        })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }
  
  const deleteClickHandler = (id) => {
    const deletePerson = persons.find((p) => p.id === id)
    if (!window.confirm(`Poistetaanko ${deletePerson.name}`)) {
      return
    }
    personService
    .del(id)
    .then(response =>{
      console.log(response);      
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filter} filterOnChange={changeFilterHanlder} />
      <h3>Add new person:</h3>
      <PersonForm nameValue={newName} nameOnChange={changeNameHandler} numberValue={newNumber} numberOnChange={changeNumberHandler} onClick={addClickHandler} />
      <h3>Numbers:</h3>
      {persons.map((person, i) =>
        <Person key={i} person={person} deleteClickHandler={() => deleteClickHandler(person.id)} />
      )}
    </div>
  )
}

export default App