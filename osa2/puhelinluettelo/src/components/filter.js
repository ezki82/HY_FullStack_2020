import React from 'react'

const Filter = (props) => {

    return (
      <div>
        Filter names with: <input value={props.filterValue} onChange={props.filterOnChange}/>
      </div>
    )
  }

  export default Filter