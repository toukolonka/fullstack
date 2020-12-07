import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ createComment }) => {
  const [comment, setNewComment] = useState('')

  const handleCommentChange = (event) => {
    setNewComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    if (comment !== '') createComment({ comment: comment })
    setNewComment('')
  }

  return (
    <div>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Label><h3>Comment</h3></Form.Label>
          <Form.Control
            id='comment'
            type="text"
            name="comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <Button variant="primary" type="submit" id='login-button'>
            Add
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CommentForm
