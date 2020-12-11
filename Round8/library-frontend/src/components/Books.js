import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const[genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const genres = [...new Set([].concat.apply([], books.map(b => b.genres)))]

  const changeGenre = (chosenGenre) => {
    setGenre(chosenGenre)
  }

  let filteredBooks = genre === '' ? books : books.filter(b => b.genres.find(g => g === genre))

  return (
    <div>
      <h2>books</h2>

      {genre === '' ? '' : <p>in genre <b>{genre}</b></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g => (
          <button key={g} onClick={() => changeGenre(g)}>{g}</button>
        ))}
        <button key={''} onClick={() => changeGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books