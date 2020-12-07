import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import Togglable from './Togglable'
import CommentList from './CommentList'

const Blog = ({ blog, createLike, removeBlog }) => {

  const [comments, setComments] = useState([])

  if (!blog) {
    return null
  }

  const likeBlog = (event) => {
    event.preventDefault()
    createLike(blog.id, {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const addComment = (comment) => {
    setComments(comments.concat(comment.comment))
  }

  return (
    <div className='blog'>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span className='like-span'>Likes {blog.likes}</span>
        <button onClick={likeBlog} id='like-button'>Like</button>
      </div>
      <div>added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link></div>
      <Togglable buttonLabel="New comment">
        <CommentForm createComment={addComment} />
      </Togglable>
      <CommentList comments={comments} />
      <button onClick={deleteBlog} id='remove-button'>Remove</button>
    </div>
  )
}

export default Blog
