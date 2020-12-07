import React from 'react'

import { Table } from 'react-bootstrap'

import {
  Link
} from 'react-router-dom'

const Bloglist = ({ blogs }) => {

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))

  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              <td><Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Bloglist