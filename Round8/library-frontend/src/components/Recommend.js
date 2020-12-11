import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {

    const result = useQuery(ALL_BOOKS, {
        pollInterval: 2000
    })

    const resultMe = useQuery(ME, {
        pollInterval: 2000
      })
    
      if (!props.show) {
        return null
      }
    
      if (result.loading || resultMe.loading) {
        return <div>loading...</div>
      }

      const genre = resultMe.data.me.favoriteGenre
    
      const books = result.data.allBooks

      const filteredBooks = books.filter(b => b.genres.find(g => g === genre))
      

    return (
        <div>
          <h2>recommendations</h2>

          {genre === '' ? '' : <p>books in your favorite genre <b>{genre}</b></p>}
    
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
        </div>
      )
}

export default Recommend