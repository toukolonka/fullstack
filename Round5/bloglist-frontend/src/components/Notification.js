import React from 'react'

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null
  }

  const messageStyle = {
    color: `${message === null ? 'red' : 'green'}`,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const msg = message === null ? errorMessage : message

  return (
    <div style={messageStyle}>
      {msg}
    </div>
  )
}

export default Notification