import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jesse',
    url: 'www',
    likes: 10,
    user: '5fbe25ab83ba4b537526b88c'

  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'Jesse'
  )

  expect(component.container).not.toHaveTextContent(
    'www'
  )

  expect(component.container).not.toHaveTextContent(
    '10'
  )
  const bt = component.container.querySelector('button')
  console.log(prettyDOM(bt))
})

test('renders url and likes when view-button clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jesse',
    url: 'www',
    likes: 10,
    user: '5fbe25ab83ba4b537526b88c'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'www'
  )
  expect(component.container).toHaveTextContent(
    '10'
  )
})

test('eventhandler called twice when like-button clicked twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jesse',
    url: 'www',
    likes: 10,
    user: '5fbe25ab83ba4b537526b88c'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} createLike={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const button2 = component.getByText('Like')
  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Testing forms' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'Tokkeri' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'www.http' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing forms' )
  expect(createBlog.mock.calls[0][0].author).toBe('Tokkeri' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.http' )
})