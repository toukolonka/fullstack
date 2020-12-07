import React from 'react'

import { Alert } from 'react-bootstrap'

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null
  }

  if (message !== null) {
    return (
      <Alert variant="success">
        {message}
      </Alert>
    )
  }
  else {
    return (
      <Alert variant="danger">
        {errorMessage}
      </Alert>
    )
  }
}

export default Notification