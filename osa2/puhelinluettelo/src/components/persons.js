import React from 'react'
import Person from './person'

const Persons = ({ persons, filter }) => {
    const filterActive = filter.length > 0 ? true : false
    const showPersonsList = filterActive ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : persons
  
    return (
      <div>
        {showPersonsList.map((person,i) => <Person key={i} person={person}/>)}
      </div>
    )
  }

export default Persons