import React from 'react'

const Notification = ({ message, type }) => {

    if (message === null) {
        return null
    }

    if (type === 'notification') {
        return (
            <div className="notification">
                {message}
            </div>
        )
    }

    if (type === 'error') {
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    return <></>
}

export default Notification