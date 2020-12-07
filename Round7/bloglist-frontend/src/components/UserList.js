import React from 'react'

import { Table } from 'react-bootstrap'

import {
  Link
} from 'react-router-dom'

const UserList = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>Blogs: {user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList