import React, { useState, useEffect  } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BORN } from '../queries'

const BornForm = ({ authors, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeNumber ] = useMutation(EDIT_BORN, {
    onError: (error) => {
      setError('Unvalid author or year!')
    },
  })

  useEffect(() => {
    setName(authors[0])
    }, []) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, born } })
    document.getElementById('select').value = ''

    setName('')
    setBorn('')
  }

  const changeSelected = (event) => {
      setName(event.target.value)
  }

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <select id='select' defaultValue={""} onChange={changeSelected}>
          <option key={0} value={""} >--Select--</option>
          {authors.map(a => (
              <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BornForm