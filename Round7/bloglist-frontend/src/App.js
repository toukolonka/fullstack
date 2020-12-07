import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { Navbar, Nav } from 'react-bootstrap'

import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState(false)
  const blogFormRef = useRef()

  const history = useHistory()

  useEffect(() => {
    const loadContent = async () => {
      const tempBlogs = await blogService.getAll()
      setBlogs(tempBlogs)
      const tempUsers = await userService.getAll()
      setUsers(tempUsers)
    }
    loadContent()
  }, [])

  useEffect(() => {
    const loadContent = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = await JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
      setAuth(true)
    }
    loadContent()
  }, [])

  const Menu = () => {
    const padding = {
      paddingRight: 5,
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

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
      const newLikes = returnedBlog.likes
      const oldBlog = blogs.find((blog) => blog.id === id)
      const newBlog = { ...oldBlog, likes: newLikes }
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : newBlog)))
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
    history.push('/blogs')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    history.push('/login')
  }

  const userMatch = useRouteMatch('/users/:id')
  const userById = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogById = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (auth === false) return null

  return (
    <div className="container">
      {user === null ? <Redirect to="/login" /> : <Menu />}
      <h1>Blog App</h1>
      <Notification message={message} errorMessage={errorMessage} />
      <Switch>
        <Route path="/login">
          {user === null ? (
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          ) : (
            <Redirect to="/blogs" />
          )}
        </Route>
        <Route path="/users/:id">
          <User user={userById} />
        </Route>
        <Route path="/users">
          <UserList users={users} />
        </Route>
        <Route path="/blogs/:id">
          <Blog
            blog={blogById}
            createLike={addLike}
            removeBlog={deleteBlog}
          />
        </Route>
        <Route path="/blogs">
          <Togglable buttonLabel="New blog" ref={blogFormRef} id="newblog">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogList blogs={blogs} />
        </Route>
        <Route path="/">
          {user === null ? (
            <Redirect to="/login" />
          ) : (
            <Redirect to="/blogs" />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App
