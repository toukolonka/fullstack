import React, { useState } from 'react'
const Blog = ({ blog, createLike, removeBlog }) => {
  const [showAll, setShowAll] = useState(false)

  console.log(blog.user.name)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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

  if (showAll === false) {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setShowAll(!showAll)} className='view-button'>view</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='blog'>
        <div>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => setShowAll(!showAll)} >
              Hide
            </button>
          </div>
          <div>{blog.url}</div>
          <div>
            <span className='like-span'>Likes {blog.likes}</span>
            <button onClick={likeBlog} id='like-button'>Like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={deleteBlog} id='remove-button'>Remove</button>
        </div>
      </div>
    )
  }
}

export default Blog
