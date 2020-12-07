import React from 'react'

import { Link } from 'react-router-dom'

const User = ({ user }) => {

  if (!user) {
    return null
  }

  return (
    <div >
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.map((blog, i) => (
        <div key={i}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default User