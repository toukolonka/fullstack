import React from "react";

const Notification = ({ message, error }) => {

    let notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: '5',
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
      return null
    }

    if (error === 1) {
        notificationStyle = {...notificationStyle, color: 'red'}
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
 
export default Notification;