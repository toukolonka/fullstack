import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      setMessage(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const addLike = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    })
  }

  const deleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id))
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        setErrorMessage(
          'Cannot remove blog because it is added by another user'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1))

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} errorMessage={errorMessage} />
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div>
            <h2>Blogs</h2>
            {sortedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                createLike={addLike}
                removeBlog={deleteBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
