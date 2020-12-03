const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.notification
  default:
    return state
  }
}

let timeId = 0

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      notification,
    })

    if (timeId !== 0) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(function () {
      timeId = 0
      dispatch({
        type: 'SET',
        notification: null,
      })
    }, time*1000)
  }
}

export default notificationReducer
