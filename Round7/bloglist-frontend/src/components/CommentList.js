import React from 'react'

const CommentList = ({ comments }) => {


  return (
    <div>
      <h3>Comments</h3>
      <table>
        <tbody>
          {comments.map((c, i) => (
            <tr key={i}>
              <td>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CommentList