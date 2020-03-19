import React from 'react'

const PersonForm = (props) => {
    return (
      <div>
        <form>
          <div>
            name: <input value={props.nameValue} onChange={props.nameOnChange} />
          </div>
          <div>
            number: <input value={props.numberValue} onChange={props.numberOnChange} />
          </div>
          <div>
            <button type="submit" onClick={props.onClick}>add</button>
          </div>
        </form>
      </div>
    )
  }

  export default PersonForm