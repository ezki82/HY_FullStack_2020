import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Notification from './components/notification'
import Person from './components/person'
import PersonForm from './components/personform'
import personService from './services/persons_service'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({
    content:'',
    type:''
  })

  const showPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

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
          setMessage({
            content:`Changed ${changePerson.name}`,
            type:'notification'
          })
          setTimeout(() => {
            setMessage({
              content:null,
              type: null
            })
          }, 5000)
        })
        .catch(error => {
          setMessage({
            content:`Person ${changePerson.name} was already removed from server`,
            type:'error'
          })
          setTimeout(() => {
            setMessage({
              content:null,
              type: null
            })
          }, 5000)
          setPersons(persons.filter(person => person.id !== changePerson.id))
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
      setMessage({
        content:`Added ${response.data.name}`,
        type:'notification'
      })
      setTimeout(() => {
        setMessage({
          content:null,
          type: null
        })
      }, 5000)
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
      setPersons(persons.filter(person => person.id !== id))
      setMessage({
        content:`Deleted ${deletePerson.name}`,
        type:'notification'
      })
      setTimeout(() => {
        setMessage({
          content:null
        })
      }, 5000)
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message.content} type={message.type}/>
      <Filter filterValue={filter} filterOnChange={changeFilterHanlder} />
      <h3>Add new person:</h3>
      <PersonForm nameValue={newName} nameOnChange={changeNameHandler} numberValue={newNumber} numberOnChange={changeNumberHandler} onClick={addClickHandler} />
      <h3>Numbers:</h3>
      {showPersons.map((person, i) =>
        <Person key={i} person={person} deleteClickHandler={() => deleteClickHandler(person.id)} />
      )}
    </div>
  )
}

export default App