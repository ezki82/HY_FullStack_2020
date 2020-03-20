import React from 'react'

const Person = ({ person, deleteClickHandler }) => {
    return (
      <div>
        {person.name} {person.number} <button onClick={deleteClickHandler}>Delete</button>
      </div>
    )
  }

export default Person