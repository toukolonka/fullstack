import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

const App = () => {

    const dispatch = useDispatch()
    const grades = useSelector(state => state)

    const good = () => {
      dispatch({
        type: 'GOOD'
      })
    }
    const neutral = () => {
      dispatch({
        type: 'OK'
      })
    }
    const bad = () => {
      dispatch({
        type: 'BAD'
      })
    }
    const reset = () => {
      dispatch({
        type: 'ZERO'
      })
    }
  
    return (
      <div>
        <button onClick={good}>good</button> 
        <button onClick={neutral}>neutral</button> 
        <button onClick={bad}>bad</button>
        <button onClick={reset}>reset stats</button>
        <div>good {grades.good}</div>
        <div>neutral {grades.ok}</div>
        <div>bad {grades.bad}</div>
      </div>
    )
  }

  export default App