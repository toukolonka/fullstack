import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control value={newTitle} onChange={handleTitleChange} id='title' />
          <Form.Label>Author:</Form.Label>
          <Form.Control value={newAuthor} onChange={handleAuthorChange} id='author' />
          <Form.Label>URL:</Form.Label>
          <Form.Control value={newUrl} onChange={handleUrlChange} id='url' />
          <Button variant="primary" type="submit" id='create'>Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
